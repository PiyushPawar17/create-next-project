# Create Next Project

A CLI tool to create a [Next.js](https://nextjs.org/) project with the configurations I prefer.

### ⭐ Motivation

I had to add/remove/update same files and packages everytime I made a project which added a little friction just to start working on a project. This project aims to remove the friction, but by adding/removing/updating only required files and packages, thus keeping the project simple to start with.

> _**Note:** This will not include configurations for packages like Redux, React Query, etc. as they are project specific and should be configured separately._

### 🛠️ Included Configurations

-   [Next.js](https://nextjs.org/) (updates to files)
-   [TSConfig](https://www.typescriptlang.org/docs/handbook/tsconfig-json.html) (with configuration for path aliases)
-   [ESLint](https://eslint.org/) (with prettier plugins)
-   [Prettier](https://prettier.io/)
-   [TailwindCSS](https://tailwindcss.com/) (optional)
-   [SCSS](https://sass-lang.com/) (optional)

### 🧑🏻‍💻 Usage

##### Setup

-   Clone the project

```sh
git clone https://github.com/PiyushPawar17/create-next-project.git
```

-   Move into the project and install it globally

```sh
cd create-next-project
npm i -g
```

##### Creating a project

-   Create a directory with your project and move into it

```sh
mkdir my-next-app
cd my-next-app
```

-   Run globally available `cnp` command

```sh
cnp [flags]
```

### ⌨️ CLI

| Command | Description                                                                                                                                                                 |
| ------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `cnp`   | Creates a Next.js project. Adds ESLint and Pretter. Removes `api` directory, styles for home page. Updates global styles, tsconfig, `pages/index.tsx` and `pages/_app.tsx`. |

| Flags                | Description                                                                           |
| -------------------- | ------------------------------------------------------------------------------------- |
| `--tailwind` or `-t` | Adds TailwindCSS to the project. Updates global styles to include tailwind utilities. |
| `--sass` or `-s`     | Adds SCSS to the project. Updates CSS files to SCSS.                                  |

### 🔧 Using your own configurations

See `templates` directory for the current configurations

-   Update the file(s) for which you want to use your configuration
-   Re-install the project globally using `npm i -g` while been in the project
-   To add additional templates, add your template file and check `utils/scripts.js` where the logic for using template exist

### 🤷🏻‍♂️ Why not publish to npm?

-   Already a lot of packages/templates are available
-   It will not be customizable for everyone if they want to customize

### 🤝🏻 Contributing

_**Note:** The project is only been tested on windows as of now_

-   If you find any bugs or want to suggest updates to the template, create an [issue](https://github.com/PiyushPawar17/create-next-project/issues)
-   If you want to make a [Pull Request](https://github.com/PiyushPawar17/create-next-project/pulls), avoid changes to the templates as those are based on my preferences

### 📄 License

See [License](./LICENSE.txt)
