// Handle .well-known requests (e.g., Chrome DevTools, Apple App Site Association, etc.)
// Return 404 to suppress error logging for these automated requests
export async function loader() {
  return new Response(null, { status: 404 });
}

export default function WellKnown() {
  return null;
}
