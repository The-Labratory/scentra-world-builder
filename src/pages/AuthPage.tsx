import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import { Lock, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { supabase } from "@/integrations/supabase/client";
import { lovable } from "@/integrations/lovable/index";
import { toast } from "sonner";
import { useTranslation } from "react-i18next";

const PRODUCTION_ORIGIN = "https://theperfumelab.de";

export default function AuthPage() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [mode, setMode] = useState<"login" | "signup" | "forgot">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const referralCode = searchParams.get("ref") || "";
  const redirectTo = searchParams.get("redirect") || "/";

  useEffect(() => {
    // If there's a referral code, default to signup mode
    if (referralCode) setMode("signup");

    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        // If signed in and has referral code, process it then redirect
        if (referralCode) {
          supabase.rpc("process_referral_signup", {
            _new_user_id: session.user.id,
            _referral_code: referralCode,
          }).then(({ data }) => {
            const result = data as { success?: boolean };
            if (result?.success) toast.success("You've been linked to your inviter's network!");
            navigate(redirectTo);
          });
        } else {
          navigate(redirectTo);
        }
      }
    });
  }, [navigate, referralCode, redirectTo]);

  const getRedirectOrigin = () => {
    if (window.location.hostname === "theperfumelab.de" || window.location.hostname === "www.theperfumelab.de") {
      return PRODUCTION_ORIGIN;
    }
    return window.location.origin;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (mode === "forgot") {
        const { error } = await supabase.auth.resetPasswordForEmail(email, {
          redirectTo: `${getRedirectOrigin()}/reset-password`,
        });
        if (error) throw error;
        toast.success("Check your email for a password reset link");
        setMode("login");
      } else if (mode === "signup") {
        const { data: signupData, error } = await supabase.auth.signUp({ email, password, options: { emailRedirectTo: getRedirectOrigin() } });
        if (error) throw error;
        // If auto-confirmed and we have a referral code, process it
        if (signupData.user && referralCode) {
          await supabase.rpc("process_referral_signup", {
            _new_user_id: signupData.user.id,
            _referral_code: referralCode,
          });
        }
        toast.success(t("auth.checkEmail"));
      } else {
        const { data: loginData, error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        // Process referral on login if code present and not yet linked
        if (loginData.user && referralCode) {
          await supabase.rpc("process_referral_signup", {
            _new_user_id: loginData.user.id,
            _referral_code: referralCode,
          });
        }
        toast.success(t("auth.signedIn"));
        navigate(redirectTo);
      }
    } catch (err) {
      toast.error((err as Error).message || t("auth.error"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center relative overflow-hidden">
      <ParticleField count={8} />

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 w-full max-w-sm mx-4"
      >
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 border border-primary/30 mb-4">
            <Sparkles className="w-5 h-5 text-primary" />
          </div>
          <h1 className="font-display text-2xl font-black tracking-wider gradient-text">
            SCENTRA
          </h1>
          <p className="text-xs text-muted-foreground font-body mt-1">
            Staff & Admin Access
          </p>
        </div>

        <div className="glass-surface rounded-2xl p-6 sm:p-8">
          {/* Mode toggle */}
          <div className="flex rounded-lg overflow-hidden border border-border mb-6">
            <button
              onClick={() => { setMode("password"); setMagicSent(false); }}
              className={`flex-1 py-2 text-xs font-display tracking-wide transition-all ${
                mode === "password"
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Password
            </button>
            <button
              onClick={() => { setMode("magic"); setMagicSent(false); }}
              className={`flex-1 py-2 text-xs font-display tracking-wide transition-all ${
                mode === "magic"
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Magic Link
            </button>
          </div>

          {mode === "password" && (
            <form onSubmit={handlePassword} className="space-y-4">
              <div>
                <label className="text-[10px] font-display tracking-wider text-muted-foreground uppercase block mb-1.5">
                  Email
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <input
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    required
                    autoComplete="email"
                    placeholder="admin@scentra.com"
                    className="w-full bg-background/50 border border-border rounded-lg pl-9 pr-4 py-2.5 text-sm font-body text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary/50 transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="text-[10px] font-display tracking-wider text-muted-foreground uppercase block mb-1.5">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <input
                    type="password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    required
                    autoComplete="current-password"
                    placeholder="••••••••"
                    className="w-full bg-background/50 border border-border rounded-lg pl-9 pr-4 py-2.5 text-sm font-body text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary/50 transition-colors"
                  />
                </div>
              </div>

              <Button
                type="submit"
                disabled={submitting}
                className="w-full glow-primary font-display tracking-wider text-sm mt-2"
                size="lg"
              >
                <LogIn className="w-4 h-4 mr-2" />
                {submitting ? "Signing in…" : "Sign In"}
              </Button>
            </form>
          )}

          {mode === "magic" && !magicSent && (
            <form onSubmit={handleMagicLink} className="space-y-4">
              <div>
                <label className="text-[10px] font-display tracking-wider text-muted-foreground uppercase block mb-1.5">
                  Email
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <input
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    required
                    autoComplete="email"
                    placeholder="admin@scentra.com"
                    className="w-full bg-background/50 border border-border rounded-lg pl-9 pr-4 py-2.5 text-sm font-body text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary/50 transition-colors"
                  />
                </div>
              </div>

              <Button
                type="submit"
                disabled={submitting}
                variant="outline"
                className="w-full font-display tracking-wider text-sm mt-2"
                size="lg"
              >
                <Send className="w-4 h-4 mr-2" />
                {submitting ? "Sending…" : "Send Magic Link"}
              </Button>
            </form>
          )}

          {mode === "magic" && magicSent && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-4"
            >
              <div className="text-3xl mb-3">✉️</div>
              <p className="font-body text-sm text-foreground mb-1">
                Check your inbox
              </p>
              <p className="font-body text-xs text-muted-foreground">
                A sign-in link was sent to <span className="text-primary">{email}</span>
              </p>
            </motion.div>
          )}
        </div>

        <p className="text-center text-[10px] text-muted-foreground font-body mt-4">
          This portal is for authorised staff only.
        </p>
      </motion.div>
    </div>
  );
};
