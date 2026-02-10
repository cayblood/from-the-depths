// Handle React Router's __manifest endpoint requests
// This endpoint is used for incremental updates in SSR mode, but isn't available on static hosting
// Return empty response to suppress 404 errors
export const loader = () => {
  return new Response(null, { status: 404 });
};

export default function Manifest() {
  return null;
}
