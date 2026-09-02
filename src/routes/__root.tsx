import { createRootRoute, HeadContent, Outlet, Scripts } from "@tanstack/react-router";
import { AuthProvider } from "@/lib/auth/provider";
import { PreviewHostBridge } from "@/components/preview-host-bridge";
import { publicUrl } from "@/lib/base-url";
import appCss from "../styles.css?url";

const APP_NAME = "Сказитель";

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: APP_NAME },
      {
        name: "description",
        content:
          "Сказитель — винтажная мастерская персонажа: род, день, тайна, судьба, палитра и имя.",
      },
      { name: "theme-color", content: "#1c1914" },
    ],
    links: [
      { rel: "icon", type: "image/svg+xml", href: publicUrl("/favicon.svg") },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      {
        rel: "preconnect",
        href: "https://fonts.gstatic.com",
        crossOrigin: "anonymous",
      },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,500;0,600;0,700;1,500;1,600&family=Source+Serif+4:ital,opsz,wght@0,8..60,400;0,8..60,500;0,8..60,600;1,8..60,400&display=swap",
      },
      { rel: "stylesheet", href: appCss },
      { rel: "manifest", href: publicUrl("/__grok/manifest.webmanifest") },
      { rel: "apple-touch-icon", href: publicUrl("/__grok/icon-180.png") },
    ],
  }),
  component: () => (
    <html lang="ru" className="antialiased" suppressHydrationWarning>
      <head>
        <HeadContent />
      </head>
      <body className="font-body desk">
        <PreviewHostBridge />
        <AuthProvider>
          <Outlet />
        </AuthProvider>
        <Scripts />
      </body>
    </html>
  ),
});
