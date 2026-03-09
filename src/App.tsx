// src/App.tsx
import { Suspense, lazy } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useCartSync } from "@/hooks/useCartSync";
import ProtectedRoute from "@/components/ProtectedRoute";

// ── Lazy-load every page for code splitting (single, non-duplicated block)
const Index = lazy(() => import("./pages/Index"));
const GatewayPage = lazy(() => import("./pages/GatewayPage"));
const OnboardingPage = lazy(() => import("./pages/OnboardingPage"));
const WorldsPage = lazy(() => import("./pages/WorldsPage"));
const ScentLabPage = lazy(() => import("./pages/ScentLabPage"));
const StorePage = lazy(() => import("./pages/StorePage"));
const ProductPage = lazy(() => import("./pages/ProductPage"));
const WorldDetailPage = lazy(() => import("./pages/WorldDetailPage"));
const CollectionPage = lazy(() => import("./pages/CollectionPage"));
const ScentDNAPage = lazy(() => import("./pages/ScentDNAPage"));
const GiftingPage = lazy(() => import("./pages/GiftingPage"));
const GiftRevealPage = lazy(() => import("./pages/GiftRevealPage"));
const InstallPage = lazy(() => import("./pages/InstallPage"));
const PartnerPage = lazy(() => import("./pages/PartnerPage"));
const ExclusiveAccessPage = lazy(() => import("./pages/ExclusiveAccessPage"));
const LaunchPage = lazy(() => import("./pages/LaunchPage"));
const SharePage = lazy(() => import("./pages/SharePage"));
const MilestonesPage = lazy(() => import("./pages/MilestonesPage"));
const FormulationLabPage = lazy(() => import("./pages/FormulationLabPage"));
const AuthPage = lazy(() => import("./pages/AuthPage"));
const AffiliatePage = lazy(() => import("./pages/AffiliatePage"));
const PerfumerGamePage = lazy(() => import("./pages/PerfumerGamePage"));
const ReferralNetworkPage = lazy(() => import("./pages/ReferralNetworkPage"));
const PartnerProgramPage = lazy(() => import("./pages/PartnerProgramPage"));
const AffiliateSignupPage = lazy(() => import("./pages/AffiliateSignupPage"));
const AffiliateStarterPackPage = lazy(() => import("./pages/AffiliateStarterPackPage"));
const CreatorPortalPage = lazy(() => import("./pages/CreatorPortalPage"));
const SEOPageGeneratorPage = lazy(() => import("./pages/SEOPageGeneratorPage"));
const TeamPage = lazy(() => import("./pages/TeamPage"));
const ResetPasswordPage = lazy(() => import("./pages/ResetPasswordPage"));

// Admin and SuperAdmin
const AdminLayout = lazy(() => import("./pages/admin/AdminLayout"));
const AdminDashboard = lazy(() => import("./pages/admin/AdminDashboard"));
const IngredientsManager = lazy(() => import("./pages/admin/IngredientsManager"));
const InteractionsManager = lazy(() => import("./pages/admin/InteractionsManager"));
const FormulasManager = lazy(() => import("./pages/admin/FormulasManager"));
const IFRARulesManager = lazy(() => import("./pages/admin/IFRARulesManager"));
const AuditLogPage = lazy(() => import("./pages/admin/AuditLogPage"));
const PartnerManager = lazy(() => import("./pages/admin/PartnerManager"));
const EmployeeManager = lazy(() => import("./pages/admin/EmployeeManager"));
const PyramidManager = lazy(() => import("./pages/admin/PyramidManager"));
const EmployeeOnboardingPage = lazy(() => import("./pages/admin/EmployeeOnboardingPage"));
const AffiliateAdminPage = lazy(() => import("./pages/admin/AffiliateAdminPage"));
const TeamAdminPage = lazy(() => import("./pages/TeamPage"));

// Super admin
const SuperAdminLayout = lazy(() => import("./pages/superadmin/SuperAdminLayout"));
const SuperAdminDashboard = lazy(() => import("./pages/superadmin/SuperAdminDashboard"));
const SACustomersPage = lazy(() => import("./pages/superadmin/CustomersPage"));
const SAAgentsPage = lazy(() => import("./pages/superadmin/AgentsPage"));
const SAAuditLogsPage = lazy(() => import("./pages/superadmin/AuditLogsPage"));
const SASecurityEventsPage = lazy(() => import("./pages/superadmin/SecurityEventsPage"));
const SASystemSettingsPage = lazy(() => import("./pages/superadmin/SystemSettingsPage"));
const SAPyramidBuilderPage = lazy(() => import("./pages/superadmin/PyramidBuilderPage"));
const SAEmployeeRequestsPage = lazy(() => import("./pages/superadmin/EmployeeRequestsPage"));
const SADatabaseExplorerPage = lazy(() => import("./pages/superadmin/DatabaseExplorerPage"));
const SAStorageManagerPage = lazy(() => import("./pages/superadmin/StorageManagerPage"));
const SAPermissionsPage = lazy(() => import("./pages/superadmin/PermissionsPage"));
const SAReferralManagementPage = lazy(() => import("./pages/superadmin/ReferralManagementPage"));

const queryClient = new QueryClient();

// Small fallback + loader components (both properly closed)
const PageFallback = () => (
  <div className="min-h-screen bg-background flex items-center justify-center">
    <p className="text-muted-foreground text-sm font-body animate-pulse">Loading…</p>
  </div>
);

const Loader = () => (
  <div className="min-h-screen bg-background flex items-center justify-center">
    <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
  </div>
);

const AppContent = () => {
  useCartSync();
  return (
    <Suspense fallback={<Loader />}>
      <Routes>
        {/* public routes */}
        <Route path="/" element={<Index />} />
        <Route path="/gateway" element={<GatewayPage />} />
        <Route path="/home" element={<Index />} />
        <Route path="/onboarding" element={<OnboardingPage />} />
        <Route path="/worlds" element={<WorldsPage />} />
        <Route path="/worlds/:worldId" element={<WorldDetailPage />} />
        <Route path="/lab" element={<ScentLabPage />} />
        <Route path="/formulation" element={<FormulationLabPage />} />
        <Route path="/collection" element={<CollectionPage />} />
        <Route path="/dna" element={<ScentDNAPage />} />
        <Route path="/gifting" element={<GiftingPage />} />
        <Route path="/gift/:shareCode" element={<GiftRevealPage />} />
        <Route path="/store" element={<StorePage />} />
        <Route path="/product/:handle" element={<ProductPage />} />
        <Route path="/install" element={<InstallPage />} />
        <Route path="/access" element={<ExclusiveAccessPage />} />
        <Route path="/launch" element={<LaunchPage />} />
        <Route path="/share" element={<SharePage />} />
        <Route path="/partner" element={<PartnerPage />} />
        <Route path="/milestones" element={<MilestonesPage />} />
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/reset-password" element={<ResetPasswordPage />} />

        {/* Admin */}
        <Route path="/admin" element={<ProtectedRoute requiredRole="admin"><AdminLayout /></ProtectedRoute>}>
          <Route index element={<AdminDashboard />} />
          <Route path="ingredients" element={<IngredientsManager />} />
          <Route path="interactions" element={<InteractionsManager />} />
          <Route path="formulas" element={<FormulasManager />} />
          <Route path="ifra" element={<IFRARulesManager />} />
          <Route path="audit" element={<AuditLogPage />} />
          <Route path="partners" element={<PartnerManager />} />
          <Route path="employees" element={<EmployeeManager />} />
          <Route path="pyramid" element={<PyramidManager />} />
          <Route path="affiliates" element={<AffiliateAdminPage />} />
          <Route path="onboarding" element={<EmployeeOnboardingPage />} />
        </Route>

        {/* Super Admin */}
        <Route path="/superadmin" element={<ProtectedRoute requiredRole="superadmin"><SuperAdminLayout /></ProtectedRoute>}>
          <Route index element={<SuperAdminDashboard />} />
          <Route path="customers" element={<SACustomersPage />} />
          <Route path="agents" element={<SAAgentsPage />} />
          <Route path="audit-logs" element={<SAAuditLogsPage />} />
          <Route path="security-events" element={<SASecurityEventsPage />} />
          <Route path="system-settings" element={<SASystemSettingsPage />} />
          <Route path="analytics/pyramid-builder" element={<SAPyramidBuilderPage />} />
          <Route path="employee-requests" element={<SAEmployeeRequestsPage />} />
          <Route path="database" element={<SADatabaseExplorerPage />} />
          <Route path="storage" element={<SAStorageManagerPage />} />
          <Route path="permissions" element={<SAPermissionsPage />} />
          <Route path="referrals" element={<SAReferralManagementPage />} />
        </Route>

        <Route path="*" element={<Index />} />
      </Routes>
    </Suspense>
  );
};

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AppContent />
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
