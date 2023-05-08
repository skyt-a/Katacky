import { GTProviders } from "~/providers";
import "./globals.css";
import { Noto_Sans_Javanese } from "next/font/google";
import { Toaster } from "~/components/common/toater";
import { Notification } from "~/components/domain/notification/Notification";
import { cn } from "~/lib/ui/utils";
import { getBaseUrl } from "~/util/api";

const notoSansJp = Noto_Sans_Javanese({
  subsets: ["latin"],
});

export const metadata = {
  title: "Katacky",
  description:
    "オリジナルチケットを発行して使用したり、他の人に渡すことができるアプリです",
};

const RootLayout = async ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="ja">
      <head>
        <meta name="application-name" content="Katacky" />
        <meta name="apple-touch-fullscreen" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-title" content="Katacky" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <link rel="apple-touch-icon" href="/icon-192x192.png" />
        <link rel="icon" type="image/png" href="icon-512.png" />
        <link
          href="splashscreens/iphone5_splash.png"
          media="(device-width: 320px) and (device-height: 568px) and (-webkit-device-pixel-ratio: 2)"
          rel="apple-touch-startup-image"
        />
        <link
          href="splashscreens/iphone6_splash.png"
          media="(device-width: 375px) and (device-height: 667px) and (-webkit-device-pixel-ratio: 2)"
          rel="apple-touch-startup-image"
        />
        <link
          href="splashscreens/iphoneplus_splash.png"
          media="(device-width: 621px) and (device-height: 1104px) and (-webkit-device-pixel-ratio: 3)"
          rel="apple-touch-startup-image"
        />
        <link
          href="splashscreens/iphonex_splash.png"
          media="(device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3)"
          rel="apple-touch-startup-image"
        />
        <link
          href="splashscreens/iphonexr_splash.png"
          media="(device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 2)"
          rel="apple-touch-startup-image"
        />
        <link
          href="splashscreens/iphonexsmax_splash.png"
          media="(device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 3)"
          rel="apple-touch-startup-image"
        />
        <link
          href="splashscreens/ipad_splash.png"
          media="(device-width: 768px) and (device-height: 1024px) and (-webkit-device-pixel-ratio: 2)"
          rel="apple-touch-startup-image"
        />
        <link
          href="splashscreens/ipadpro1_splash.png"
          media="(device-width: 834px) and (device-height: 1112px) and (-webkit-device-pixel-ratio: 2)"
          rel="apple-touch-startup-image"
        />
        <link
          href="splashscreens/ipadpro3_splash.png"
          media="(device-width: 834px) and (device-height: 1194px) and (-webkit-device-pixel-ratio: 2)"
          rel="apple-touch-startup-image"
        />
        <link
          href="splashscreens/ipadpro2_splash.png"
          media="(device-width: 1024px) and (device-height: 1366px) and (-webkit-device-pixel-ratio: 2)"
          rel="apple-touch-startup-image"
        />
        <meta name="format-detection" content="telephone=no" />
        <meta name="mobile-web-app-capable" content="yes" />
        {/* <meta name="msapplication-config" content="/icons/browserconfig.xml" /> */}
        <meta name="msapplication-TileColor" content="#fff" />
        <meta name="msapplication-tap-highlight" content="no" />
        <meta name="theme-color" content="#fff" />
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, user-scalable=no, viewport-fit=cover"
        />
        <link
          rel="manifest"
          href="/manifest.json"
          crossOrigin="use-credentials"
        />

        <meta name="twitter:card" content="summary" />
        <meta name="twitter:url" content={getBaseUrl()} />
        <meta name="twitter:title" content="Katacky" />
        <meta
          name="twitter:description"
          content="オリジナルチケットを発行して使用したり、他の人に渡すことができるアプリです"
        />
        <meta name="twitter:image" content="/tw-image.png" />
        <meta name="twitter:creator" content="@skyt" />
        {/* <meta property="og:type" content="website" />
        <meta property="og:title" content="katacky" />
        <meta property="og:description" content="チケット発行アプリ" />
        <meta property="og:site_name" content="katacky" />
        <meta property="og:url" content={getBaseUrl()} />
        <meta property="og:image" content="/apple-touch-icon.png" /> */}
      </head>
      <body
        className={cn("h-screen w-screen bg-background", notoSansJp.className)}
      >
        <main className="container bg-background min-h-full p-8 box-border pb-24">
          <GTProviders>
            {children}
            <Toaster />
            <Notification />
          </GTProviders>
        </main>
      </body>
    </html>
  );
};

export default RootLayout;
