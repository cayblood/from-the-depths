# youngbloods-org

This application uses [React Router v7](https://reactrouter.com/) with [Vite](https://vitejs.dev/) to build a Single-Page Application.

## Development Environment

This project uses [mise](https://mise.jdx.dev/) (formerly rtx) for managing development tools and versions. Make sure you have mise installed, then run:

```shellscript
mise install
```

This will install the required Node.js version and other tools specified in `.mise.toml`.

## Development

Always use the "mise exec" prefix when running pnpm.

Start the development server:

```shellscript
mx pnpm run dev
```

## Production

Build the production version:

```shellscript
mx pnpm run build
```

This will generate optimized production assets in the `dist` directory.

### Preview

Preview the production build locally:

```shellscript
mx pnpm run preview
```

## Styling

This project uses [Tailwind CSS](https://tailwindcss.com/) for styling. See the [Vite docs on CSS](https://vitejs.dev/guide/features.html#css) for more information.
