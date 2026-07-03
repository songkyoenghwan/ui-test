# Astro Starter Kit: Basics

```sh
bun i
```

## 🚀 Project Structure

Inside of your Astro project, you'll see the following folders and files:

```text
/
├── public/
│   └── favicon.svg
├── src
│   ├── assets
│   │   └── astro.svg
│   ├── components
│   │   └── Welcome.astro
│   ├── layouts
│   │   └── Layout.astro
│   └── pages
│       └── index.astro
└── package.json
```

## 🧞 Commands

All commands are run from the root of the project, from a terminal:

| Command                   | Action                                                                                      |
| :------------------------ | :------------------------------------------------------------------------------------------ |
| `bun install`             | Installs dependencies                                                                       |
| `bun run dev`             | Starts the local Astro dev server via the `astro` script on port `5194`                     |
| `bun run astro`           | Runs `astro dev --host --port 5194`                                                         |
| `bun run build`           | Runs formatting first with `bun run fm`, then builds using `astro build -c vite.config.mjs` |
| `bun run preview`         | Previews the Astro build locally on port `5196`                                             |
| `bun run preview:astro`   | Runs `astro preview`                                                                        |
| `bun run check`           | Runs `svelte-kit sync` and `svelte-check`                                                   |
| `bun run check:watch`     | Runs `svelte-check` in watch mode                                                           |
| `bun run doctor`          | Runs `svelte-doctor check`                                                                  |
| `bun run mock`            | Starts `json-server` with `./public/json/db.json` on port `5195`                            |
| `bun run lint`            | Runs `oxlint .`                                                                             |
| `bun run fmt`             | Formats code with `oxfmt`                                                                   |
| `bun run fmt:check`       | Checks formatting with `oxfmt --check`                                                      |
| `bun run fm`              | Formats the project with Prettier and `oxfmt`                                               |
| `bun run format:prettier` | Formats files using Prettier only                                                           |
| `bun run lang`            | Runs machine translation with `@inlang/cli`                                                 |
| `bun run lang:val`        | Validates the inlang project                                                                |
| `bun run pb`              | Starts PocketBase using `./pocketbase serve`                                                |
| `bun run wc`              | Builds the web component bundle with `vite.config.sv.mjs`                                   |
| `bun run sp:fix`          | Fixes dependency versions with Syncpack                                                     |
| `bun run sp:format`       | Formats dependency entries with Syncpack                                                    |
| `bun run sp:lint`         | Lints production and development dependencies with Syncpack                                 |
| `bun run node:kill`       | Forces `node.exe` to stop on Windows                                                        |
