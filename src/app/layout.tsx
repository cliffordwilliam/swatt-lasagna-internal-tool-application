import ModeSwitch from "@/components/ModeSwitch";
import theme from "@/theme";
import { ClerkProvider, UserButton, SignedIn } from '@clerk/nextjs'
import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";
import CssBaseline from "@mui/material/CssBaseline";
import InitColorSchemeScript from "@mui/material/InitColorSchemeScript";
import { ThemeProvider } from "@mui/material/styles";
import * as React from "react";

export default function RootLayout(props: { children: React.ReactNode }) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <body>
          <InitColorSchemeScript attribute="class" />
          <AppRouterCacheProvider options={{ enableCssLayer: true }}>
            <ThemeProvider theme={theme}>
              {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
              <CssBaseline />
              <ModeSwitch />
              <SignedIn>
                <UserButton />
              </SignedIn>
              {props.children}
            </ThemeProvider>
          </AppRouterCacheProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
