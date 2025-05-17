# ⚛️ React + Rspack + Hono SSR Boilerplate

[![GitHub Stars](https://github.com/bdxygy/react-hono?style=social)](https://github.com/bdxygy/react-hono/stargazers)
[![GitHub License](https://github.com/bdxygy/react-hono)](https://github.com/bdxygy/react-hono/blob/main/LICENSE)
![Node Version](https://img.shields.io/badge/node-22%2B-brightgreen)
![TypeScript](https://img.shields.io/badge/TypeScript-Strict-blue)
![Rspack](https://img.shields.io/badge/Bundler-Rspack-red)
![React 19](https://img.shields.io/badge/React-19.1.0-61dafb)

> A blazing-fast SSR starter powered by **Rspack**, **React 19**, and **Hono** — engineered for modern development with cutting-edge performance, beautiful UI components, and secure production builds.

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
| **Better-auth (Upcomming)** | Simple extensibility for OAuth, magic links, or custom strategies |

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

MIT © [Your Name or Company]

---

> Built with ❤️ using modern tools to deliver fast, beautiful, and secure web experiences.

---

Credit: Budi Santoso

---

Email: main.budisantoso@gmail.com

---