import { clerkMiddleware } from "@clerk/nextjs/server";

const isProduction = process.env.NODE_ENV === "production";

const clerkAuthMiddleware = clerkMiddleware(
  isProduction
    ? {
        authorizedParties: [
          "https://swattlasagna.com",
          "https://www.swattlasagna.com",
        ],
      }
    : {}
);

export default clerkMiddleware(async (auth, request, event) => {
  await auth.protect();

  return clerkAuthMiddleware(request, event);
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
