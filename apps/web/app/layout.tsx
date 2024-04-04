import "@ui/styles/globals.css";

import localFont from "next/font/local";
const avenir = localFont({
  src: "../public/avenir-regular.woff2",
  display: "swap",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={avenir.className}>
      <body className="antialiased">
        <div className="backdrop" />
        {children}
      </body>
    </html>
  );
}
