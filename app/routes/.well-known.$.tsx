// Handle .well-known requests (e.g., Chrome DevTools, Apple App Site Association, etc.)
// This route exists to prevent "No route matches URL" errors for automated requests
// The component returns null, and GitHub Pages will serve 404.html for unmatched routes
export default function WellKnown() {
  return null;
}
