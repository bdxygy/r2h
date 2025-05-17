# ⚛️ R2H Boilerplate

![Node Version](https://img.shields.io/badge/node-22%2B-brightgreen)
![TypeScript](https://img.shields.io/badge/TypeScript-Strict-blue)
![Rspack](https://img.shields.io/badge/Bundler-Rspack-red)
![React 19](https://img.shields.io/badge/React-19.1.0-61dafb)

> A blazing-fast SSR starter powered by **React 19**, **Rspack**, and **Hono** — engineered for modern development with cutting-edge performance, beautiful UI components, and secure production builds.

---

## 💡 Motivation

I built this boilerplate out of a growing need to break free from the limitations imposed by popular frameworks like Next.js and Remix.

While those frameworks offer great DX, their performance often relies heavily on specific deployment architectures (like Vercel for Next.js). This can result in unnecessary complexity, vendor lock-in, and suboptimal flexibility for developers who want full control over their stack.

This boilerplate is my answer to that problem — a lean, fast, and unopinionated SSR setup using:

✅ React with full flexibility,

✅ Rspack for blazing fast builds,

✅ Hono for a lightweight and modern web server,

✅ Manual control over server-side data fetching, hydration, and routing.

No limits. No lock-in. Just raw power and freedom.

---

## 🚀 Tech Stack

| Tool                        | Purpose                                                           |
|-----------------------------|-------------------------------------------------------------------|
| **React 19**                | UI Library (Concurrent Features Ready)                            |
| **Rspack**                  | Ultra-fast Rust-based bundler                                     |
| **Hono**                    | Lightning-fast web framework for Node                             |
| **React Router**            | Seamless routing with SSR compatibility                           |
| **shadcn/ui + Radix UI**    | Accessible, customizable UI components                            |
| **TailwindCSS 4**           | Utility-first styling with animation                              |
| **JavaScript Obfuscator**   | Protect source code in production builds                          |
| **dotenv**                  | Manage environment variables                                      |
| **TypeScript (strict)**     | Type-safe code for frontend and backend                           |
| **Better-auth (upcoming)**  | Simple extensibility for OAuth, magic links, or custom strategies |
| **Prisma ORM (upcoming)**   | Type-safe database access with powerful query capabilities        |

---

## 🌐 Features

- ✅ **Server-Side Rendering (SSR)** with `hono` and `react-dom/server`
- ⚡ **Rspack HMR & Build Speed** like Vite but for complex apps
- 🧠 **Custom `useServerQuery` Hook** for pre-hydration data fetching
- 🔄 **React Router v7 SSR-Ready Routing**
- 💅 **shadcn Components + Tailwind Merge + AnimateCSS**
- 🛡️ **Obfuscated JavaScript** in production using `webpack-obfuscator`
- 🧪 **Full TypeScript Support** with strict mode enabled

---

## 🔐 Authentication Made Easy

With **better-auth**, this boilerplate supports:
- JWT-based sessions
- Authenticated route protection
- Secure cookie/token management
- Simple extensibility for OAuth, magic links, or custom strategies

---

## 📁 Project Structure

```

.
├── client/             # React entry and routes
├── server/             # Hono server logic (SSR handler)
├── shared/             # Common hooks and contexts (e.g., useServerQuery)
├── \_module/            # Output for built SSR server (server.js)
├── public/             # Static assets
└── rspack.config.ts    # Rspack build and plugin setup

```

---

## 🧠 Intelligent Data Hydration

The `useServerQuery` hook allows components to fetch data **during SSR** and rehydrate seamlessly on the client — no flicker, no double-fetching, and no boilerplate.

---

## 🛡️ Obfuscated & Optimized for Production

With `webpack-obfuscator` and `javascript-obfuscator`, your production code is transformed to resist reverse engineering while maintaining blazing runtime performance.

---

## 🖼️ UI-Ready Out of the Box

Style your app with:
- **shadcn/ui** component system
- **Radix UI primitives**
- **TailwindCSS + tailwind-merge**
- **Animate.css utility classes** (`tw-animate-css`)

---

## ⚙️ Scripts

| Command       | Description                            |
|---------------|----------------------------------------|
| `pnpm dev`    | Build in watch mode with Rspack        |
| `pnpm build`  | Production build (obfuscation enabled) |
| `pnpm start`  | Run the built SSR app (Node server)    |

---

## 📦 Dependency Highlights

- **@rspack/core**, **@rspack/cli** – Core bundler setup
- **@hono/node-server**, **hono** – Fast HTTP server
- **tailwindcss**, **postcss-loader** – Styling and CSS utilities
- **webpack-obfuscator**, **javascript-obfuscator** – Code protection

---

## 🧪 Ready for Expansion

Ideal for:
- Fullstack React apps
- Headless CMS integrations
- E-commerce storefronts
- Admin dashboards
- SaaS apps

---

## 🪪 License

MIT © Budi Santoso (@bdxygy)

---

> Built with ❤️ using modern tools to deliver fast, beautiful, and secure web experiences.

---

Credit: Budi Santoso

---

Email: main.budisantoso@gmail.com

---