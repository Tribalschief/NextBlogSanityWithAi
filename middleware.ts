import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

// Define which routes require authentication
const isProtectedRoute = createRouteMatcher([
  "/blog(.*)", // Matches all /blogs routes, including dynamic ones // Example: Add more protected routes
]);



export default clerkMiddleware(async (auth, req) => {
  if (isProtectedRoute(req)) await auth.protect()
})

export const config = {
  matcher: [
    "/((?!_next|.*\\.(?:css|js|ico|jpg|png|svg|json)).*)", // Matches all pages except static files
    "/api/(.*)", // Ensures API routes go through Clerk authentication
  ],
};
