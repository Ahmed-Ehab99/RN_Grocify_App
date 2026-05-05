# Grocify

**Grocify** is a cross-platform grocery planning app built with [Expo](https://expo.dev). It helps you build a structured shopping list with categories, quantities, and priorities, sync data through a serverless Postgres backend, and review simple insights about your list—all behind social sign-in.

---

## Features

### Authentication

- **Clerk** integration with **Google** and **Apple** sign-in (SSO via `expo-auth-session` redirect flow).
- **Secure token storage** using Clerk’s Expo token cache and `expo-secure-store`.
- **Protected main app**: tab navigation loads only when the user is signed in; guests are redirected to the sign-in screen.
- **Profile & session** on the Insights tab: avatar, display name, email, and **sign out**.

### List (home)

- **Active items** in a scrollable list with hero summary and item count.
- **Per-item actions**: mark purchased, adjust quantity with +/- controls, delete.
- **Priority badges** (low / medium / high) and **category** chips (Produce, Dairy, Bakery, Pantry, Snacks).
- **Completed section** at the bottom: strikethrough items, uncheck to restore, or remove individually.

### Planner

- **Quick stats**: pending count, high-priority count, total units across pending items.
- **Rich form** to add items: name, numeric quantity, category chips with icons, priority selector.
- **Keyboard-friendly** layout using `react-native-keyboard-controller` so the form stays usable on smaller screens.

### Insights

- **Aggregate stats**: pending, completed, total items, and a **completion rate** with a visual progress bar.
- **Items by category**: counts and proportional bars with distinct colors per category.
- **High-priority remaining**: count of unpurchased high-priority items with contextual messaging.
- **Clear completed**: bulk-remove all purchased items from the list (server + local state).
- **Feedback**: floating control that opens **Sentry’s feedback widget** for in-app user reports.

### Backend & data

- **REST-style API routes** under `src/app/api/` (Expo Router server routes) for CRUD on grocery items.
- **PostgreSQL** via **Neon** serverless driver and **Drizzle ORM** (schema migrations with `drizzle-kit`).
- **Optional seed script** (`npm run db:seed`) for demo or local data.

### UX & platform

- **Native tab bar** using Expo Router **native tabs** (SF Symbols on iOS, Material icons on Android) with a green tint that adapts to light/dark mode.
- **NativeWind (Tailwind)** for styling; **system light/dark** support with `nativewind` / React Navigation themes.
- **Polished UI**: cards, borders, `expo-image`, gradients-ready stack (`expo-linear-gradient` available), splash and adaptive icons configured in `app.json`.
- **Web support** with Metro bundler and **server output** so API routes can run in the same project as the web app.
- **Observability**: **Sentry** initialization with feedback integration; React Compiler experiment enabled in Expo config.

---

## Tech stack

| Area | Technology |
|------|------------|
| Framework | [Expo SDK 55](https://docs.expo.dev/), [React Native 0.83](https://reactnative.dev/), [React 19](https://react.dev/) |
| Routing | [Expo Router 55](https://docs.expo.dev/router/introduction/) (file-based routes, typed routes) |
| Language | [TypeScript 5.9](https://www.typescriptlang.org/) (strict mode) |
| Styling | [NativeWind 4](https://www.nativewind.dev/), [Tailwind CSS 3.4](https://tailwindcss.com/) |
| Auth | [Clerk Expo](https://clerk.com/docs/quickstarts/expo) (`@clerk/expo`, `expo-web-browser`, `expo-auth-session`) |
| Client state | [Zustand](https://github.com/pmndrs/zustand) (grocery store + API calls) |
| Database | [Neon](https://neon.tech/) (`@neondatabase/serverless`), [Drizzle ORM](https://orm.drizzle.team/) |
| Navigation UI | [React Navigation 7](https://reactnavigation.org/) (themes, elements, bottom tabs primitives) |
| Motion & gestures | [Reanimated 4](https://docs.swmansion.com/react-native-reanimated/), [Gesture Handler](https://docs.swmansion.com/react-native-gesture-handler/), [react-native-worklets](https://github.com/software-mansion/react-native-worklets) |
| Keyboard | [react-native-keyboard-controller](https://kirillzyusko.github.io/react-native-keyboard-controller/) |
| Media | [expo-image](https://docs.expo.dev/versions/latest/sdk/image/) |
| Monitoring | [@sentry/react-native](https://docs.sentry.io/platforms/react-native/) |
| Tooling | [drizzle-kit](https://orm.drizzle.team/kit-docs/overview), [tsx](https://github.com/privatenumber/tsx), [dotenv](https://github.com/motdotla/dotenv), ESLint via `expo lint` |

---

## Prerequisites

- **Node.js** (LTS recommended) and **npm**
- **Expo CLI** (via `npx expo` or global install)
- For native builds: **Xcode** (iOS) and/or **Android Studio** (Android)
- **Clerk** application with Google and Apple SSO configured
- **Neon** (or compatible Postgres) database and connection string
- **Sentry** project (optional but expected if you use the DSN env var)

---

## Environment variables

Create a `.env` file in the project root (values are not committed):

| Variable | Purpose |
|----------|---------|
| `EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY` | Clerk publishable key (required at runtime in `src/app/_layout.tsx`) |
| `DATABASE_URL` | Postgres connection string for API routes and Drizzle (`src/db/client.ts`, `drizzle.config.ts`) |
| `EXPO_PUBLIC_SENTRY_DNS` | Sentry DSN passed to `Sentry.init` in the root layout (name matches the current codebase) |

---

## Scripts

```bash
npm install          # Install dependencies
npm start            # expo start — dev server, QR, platform pickers
npm run android      # expo run:android — native Android build/run
npm run ios          # expo run:ios — native iOS build/run
npm run web          # expo start --web
npm run lint         # expo lint
npm run db:push      # drizzle-kit push — apply schema to DATABASE_URL
npm run db:seed      # tsx src/db/seed.ts — seed grocery_items (optional)
```

---

## Project structure (high level)

```
src/
  app/                 # Expo Router: layouts, auth, tabs, API routes (+api.ts)
  components/          # UI: list, planner, insights, shared backgrounds
  db/                  # Drizzle schema, Neon client, actions, seed
  store/               # Zustand grocery store (sync with /api/items)
hooks/                 # e.g. useSocialAuth (Clerk SSO)
assets/                # Images, icons referenced from app.json and screens
```

---

## Learn more

- [Expo documentation](https://docs.expo.dev/)
- [Expo Router](https://docs.expo.dev/router/introduction/)
- [Clerk + Expo](https://clerk.com/docs/quickstarts/expo)
- [Drizzle + Neon](https://orm.drizzle.team/docs/get-started-postgresql#neon)

---

## License

Private project (`"private": true` in `package.json`). Adjust as needed for your distribution.
