import { Inter, JetBrains_Mono } from "next/font/google";
import Script from "next/script";
import { ToastProvider } from "@/src/components/ui/Toast";
import "./globals.css";

const inter = Inter({
  subsets: ["latin", "cyrillic"],
  weight: ["300", "400", "500", "600", "700", "900"],
  variable: "--font-inter",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${jetbrains.variable} font-sans h-full overflow-hidden`}
      >
        <ToastProvider>
          {children}
        </ToastProvider>
        <Script
          id="widget-wfp-script"
          src="https://secure.wayforpay.com/server/pay-widget.js"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}