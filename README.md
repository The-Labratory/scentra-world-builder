# Scentra World Builder - The Perfume Lab

A fragrance atelier where you can craft your signature scent, explore fragrance worlds, build custom compositions, and shop luxury perfumes.

## 🚀 Download and Run the App

### Option 1: Use the Live Web App (Easiest)
Visit the deployed app at: **[https://lawrencehariri.github.io/scentra-world-builder](https://lawrencehariri.github.io/scentra-world-builder)**

### Option 2: Download Pre-Built Release
1. Go to the [Releases page](https://github.com/LawrenceHariri/scentra-world-builder/releases)
2. Download the latest `scentra-world-builder.zip`
3. Extract the zip file to your computer
4. Open `index.html` in your web browser

**Or run with a local server:**
```bash
# Using Python (if installed)
cd scentra-world-builder
python -m http.server 8080

# Using Node.js (if installed)
npx serve

# Then open http://localhost:8080 in your browser
```

### Option 3: Build From Source
See the "Development" section below.

## Project info

**URL**: https://lovable.dev/projects/REPLACE_WITH_PROJECT_ID

## 🛠️ Development

### Prerequisites
- Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

### Setup and Run Locally

```sh
# Clone the repository
git clone https://github.com/LawrenceHariri/scentra-world-builder.git

# Navigate to the project directory
cd scentra-world-builder

# Install dependencies
npm install

# Start development server
npm run dev
```

The app will be available at `http://localhost:8080`

### Build for Production

```sh
# Create optimized production build
npm run build

# Preview production build
npm run preview
```

The build output will be in the `dist/` directory.

### Other Development Options

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/REPLACE_WITH_PROJECT_ID) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

**Edit directly in GitHub**

- Navigate to the desired file(s)
- Click the "Edit" button (pencil icon) at the top right
- Make your changes and commit

**Use GitHub Codespaces**

- Navigate to the main page of your repository
- Click on the "Code" button (green button) near the top right
- Select the "Codespaces" tab
- Click on "New codespace" to launch a new Codespace environment

## 🌸 New to Programming? Understanding the Tech Stack

Think of this app as a real perfume laboratory. Every great lab has three things: **recipes** for the formulas, a **storage room** for ingredients, and **equipment** that puts it all together. The code in this repository works the same way — here's a plain-English tour.

---

### The Three "Languages" at Work

#### 🧴 TypeScript — 94.9% of the code (The Recipe Cards)

Imagine every perfume formula written on a very precise recipe card. The card doesn't just say "add some rose oil" — it says *exactly* how many milliliters of which grade of rose oil to use, and it refuses to let you substitute water for oil by mistake.

That's **TypeScript**. It is the main language of this app. Almost everything you see on screen — buttons, pages, forms, shopping carts — is written in TypeScript. It builds on top of a simpler language called **JavaScript** (the language browsers understand natively) by adding *type safety*: a set of rules that catch mistakes early, before a bad formula ever reaches a customer.

> **Analogy:** A master perfumer labels every bottle in the lab. TypeScript is the labelling system — if you reach for a bottle labelled "citrus top note" and try to pour it into a slot marked "fixative", it will stop you with a clear error message.

---

#### 🗄️ PLpgSQL — 4.5% of the code (The Ingredient Vault Rulebook)

Every lab needs a secure storeroom where ingredients are kept, catalogued, and dispensed safely. In this app the storeroom is a **database** (powered by Supabase). The database holds things like user accounts, saved scent blends, orders, and ingredient details.

**PLpgSQL** (short for *Procedural Language/PostgreSQL*) is the language used to write the *rules* inside that storeroom. Rules like: "Only the person who saved this blend can read it back" or "When a new user signs up, create their profile automatically."

> **Analogy:** Think of the storeroom manager's instruction manual. The shelves themselves are the database; PLpgSQL is the written procedures on the wall that tell the manager how to handle every situation — who is allowed in, what to do when stock runs low, and how to log every transaction.

---

#### 🎨 Other — 0.6% of the code (The Lab's Look and Feel)

This small slice covers things like **HTML** (the skeleton of every web page — like the glass bottles and display shelves) and **CSS** (the styling — like the gold labels, the colour palette, and the elegant fonts). You also find configuration files here that tell the building tools how to package everything up for shipment.

---

### How It All Fits Together

| Layer | Analogy | Language / Tool |
|---|---|---|
| What you see on screen | The display counter and testing strips | TypeScript + React |
| How it looks | Bottle labels, colour palette, fonts | Tailwind CSS |
| Where your data lives | The ingredient vault | Supabase (PostgreSQL) |
| Vault rules & security | The storeroom manager's handbook | PLpgSQL |
| How it's packaged & shipped | The delivery crate | Vite + GitHub Actions |

---

### The Bigger Picture

When you open the app and blend a new scent:

1. **TypeScript** runs in your browser and shows you the interactive lab interface.
2. When you save your blend, TypeScript sends it to the **Supabase** database.
3. **PLpgSQL** rules inside the database make sure only *you* can see your private formulas.
4. Everything is packaged by **Vite** (a build tool — think of it as the machine that seals and labels the final product) and delivered through a web browser.

That's the whole loop — from your fingertips to the vault and back again, all in a fraction of a second.

---

## 🧪 Technologies

This project is built with:

- **Vite** - Fast build tool and dev server
- **TypeScript** - Type-safe JavaScript
- **React** - UI library
- **shadcn-ui** - Component library
- **Tailwind CSS** - Utility-first CSS
- **Supabase** - Backend and authentication
- **PWA** - Progressive Web App support

## 📦 Deployment

### Automated Deployment

This project uses GitHub Actions for automated builds and deployments:
- **Pushes to `main`** trigger automatic deployment to GitHub Pages
- **Tagged releases** create downloadable zip files
- All builds are available as artifacts for 90 days

### Manual Deployment

**Via Lovable:**

Simply open [Lovable](https://lovable.dev/projects/REPLACE_WITH_PROJECT_ID) and click on Share → Publish.

**Via GitHub Pages:**

Enable GitHub Pages in your repository settings and point it to the `gh-pages` branch or GitHub Actions.

**Custom Domain:**

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more: [Setting up a custom domain](https://docs.lovable.dev/features/custom-domain#custom-domain)

## 📝 License

This project is part of the Lovable platform.
