# REACT HONO

A high-performance, modular React application with **Server-Side Rendering (SSR)** using **Rspack** and **Hono**, styled with **shadcn/ui** and built with a strong focus on speed, type safety, and maintainability.

## 🔧 Tech Stack

* **React 18** – Modern UI library
* **Rspack** – Fast Rust-based bundler
* **Hono** – Lightweight web framework for backend/server routes
* **shadcn/ui** – Accessible, beautifully styled component library powered by Radix UI and Tailwind CSS
* **TypeScript** – Type safety with strict mode
* **PNPM** – Efficient package manager

---

## 📁 Folder Structure

```
.
├── client/                  # Frontend (React) code
│   ├── assets/             # Static assets (images, fonts, etc.)
│   ├── pages/              # React pages or routed components
│   ├── App.tsx            # Main App component
│   ├── bootstrap.tsx      # Entry point for client hydration
│   ├── Root.tsx           # Root-level layout/routing
│   └── styles (css)       # Global CSS and Tailwind setup
│
├── server/                 # Server-side logic using Hono
│   ├── api.ts             # API route definitions
│   ├── hono.tsx           # Hono server configuration
│   └── index.ts           # Server entry point
│
├── shared/                # Shared logic between client & server
│   └── stores/            # State/context management
│       ├── server-context.tsx
│       └── stream.ts
│
├── .gitignore             # Git ignored files
├── package.json           # Project metadata and scripts
├── pnpm-lock.yaml         # Lockfile for reproducible installs
├── README.md              # You are here 📘
├── rspack.config.ts       # Rspack bundler config
└── tsconfig.json          # TypeScript configuration
```

---

## 🧠 Features

* ⚡ Blazing-fast bundling and dev server via **Rspack**
* 🧩 Universal rendering with **Hono** SSR
* 💅 Elegant, accessible UI components via **shadcn/ui**
* 🎯 Strictly typed codebase with **TypeScript**
* 📦 Modular structure with shared contexts and stores
* 🌈 Tailwind CSS for utility-first styling

---

## 🚀 Getting Started

### 1. Install dependencies

```bash
pnpm install
```

### 2. Run in development mode

```bash
pnpm dev
```

### 3. Build for production

```bash
pnpm build
```

### 4. Start the production server

```bash
pnpm start
```

---

## 📌 Notes

* `client/bootstrap.tsx` handles client-side hydration.
* `server/hono.tsx` initializes the Hono server and routes.
* `shared/stores` contains context and stream logic usable in both environments.
* Tailwind CSS is assumed to be configured (as required by shadcn/ui).

---

## 🧠 What `useServerQuery` Does

This custom hook allows you to fetch data **on the server during SSR** and **reuse the result on the client without fetching it again**, preventing flickers or loading spinners post-hydration.

---

### 🔄 How It Works

Let’s walk through the code in **logical steps**:

---

### 🔧 `ServerContext`

```ts
export interface ServerContextI {
    isServer: boolean;
    handlers: Promise<any>[],
    dataMap: Record<string, any>,
}
```

* `isServer`: Indicates if the code is running on the server.
* `handlers`: An array to collect promises (data fetching) during SSR.
* `dataMap`: Stores fetched data by `id`, so the same data is accessible during hydration.

```tsx
const ServerContext = createContext<ServerContextI>({} as ServerContextI);
```

You wrap your app in `ServerQueryProvider` with this context before rendering. This is done inside your server entry, usually in `server/hono.tsx`.

---

### 🌐 `useServerQuery` Hook Logic

```tsx
const { data, isLoading } = useServerQuery({ id: "home", handler: () => axios.get(...).then(...) });
```

#### On the **server**:

1. `context.isServer` is true.
2. If no data exists for this `id`, it **adds the handler to the `handlers` array** (but doesn’t execute it immediately).
3. Later in SSR, you `await Promise.all(context.handlers)` to **run all the data fetches in parallel**, before `ReactDOMServer.renderToString()`.

#### On the **client**:

1. On hydration, `context.isServer` is false.
2. `useEffect()` runs `fetchClient()` only **if the data is not already available** from SSR.
3. This ensures no refetch if the data was already embedded in `dataMap`.

---

## 📜 License

MIT – Use it, build on it, and share it.

---

Credit: Budi Santoso
Email: main.budisantoso@gmail.com
