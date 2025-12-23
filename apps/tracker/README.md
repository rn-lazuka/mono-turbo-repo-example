# Yield Up

**Yield Up** is a React-based frontend application for tracking yield and managing DeFi vaults.


---

## 📦 Tech Stack

- **React 19** + **React Router v7**
- **Vite** for fast bundling and dev experience
- **Redux Toolkit** for state management
- **TypeScript** with strict linting and formatting
- **Material UI (MUI)** for styling and UI components
- **Wagmi + Ethers.js** for web3 interactions

---

## 🚀 Setup Instructions

1. **Clone the repo**
   ```bash
   git clone https://github.com/minterest-finance/yield-up.git
   cd yield-up
   ```

2. **Install dependencies**
   ```bash
   yarn install
   ```

3. **Run the app locally**
   ```bash
   yarn dev
   ```

4. **Build for production**
   ```bash
   yarn build
   ```

5. **Preview production build**
   ```bash
   yarn preview
   ```

---

## 🧰 Available Scripts

| Script         | Description                                  |
|----------------|----------------------------------------------|
| `yarn dev`     | Run local dev server with Vite               |
| `yarn start`   | Alias for `vite` (with cross-env)            |
| `yarn build`   | Build production app with TypeScript + Vite  |
| `yarn preview` | Preview production build                     |
| `yarn lint`    | Run ESLint across the codebase               |
| `yarn prepare` | Setup Husky for Git hooks                    |

Linting and formatting are handled via `eslint`, `prettier`, and `lint-staged` (pre-commit hook via Husky).

---

## 📁 Folder Structure

```
src/
├── assets/              # Images, fonts, SVGs
├── pages/               # Top-level routed pages: Dashboard, Vault, Portfolio
├── features/
│   ├── portfolio/       # Logic specific to user portfolio
│   └── vaults/          # Vault UI, logic, and hooks
│       ├── hooks/       # Custom React hooks
│       └── utils/       # Vault-related utilities
├── shared/
│   ├── components/      # Reusable UI components
│   ├── ui/              # Design system and MUI wrappers
│   ├── hooks/           # Shared application-wide hooks
│   ├── lib/             # Generic helpers and utilities
│   ├── config/          # Environment, constants, chain config
│   ├── services/        # wagmi, ethers.js, API clients
│   ├── types/           # Global TypeScript types/interfaces
│   └── enums/           # Global enums
├── store/               # Redux slices, state, RTK Query APIs
├── styles/              # Themes, global styles, overrides
├── App.tsx              # Main app entry (layout, routing)
└── index.tsx            # React root render
```

---

## 📌 Notes

- Routing is configured with **React Router v7** using `@react-router/*` packages.
- Page-level components use **lazy loading** with `React.lazy()` for code-splitting.
- App theme and styles are powered by **MUI ThemeProvider**.
- ESLint is configured using the new **flat config** approach with import order, a11y, React/TypeScript rules.
