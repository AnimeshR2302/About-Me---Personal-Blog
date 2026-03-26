import "./globals.css";

export const metadata = {
  metadataBase: new URL("https://anix-portfolio.example"),
  title: {
    default: "Anix | Software Developer",
    template: "%s | Anix"
  },
  description:
    "Portfolio of Anix, a software developer building modern web applications, product experiences, and resilient backend systems.",
  openGraph: {
    title: "Anix | Software Developer",
    description:
      "Portfolio of Anix, a software developer building modern web applications, product experiences, and resilient backend systems.",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "Anix | Software Developer",
    description:
      "Portfolio of Anix, a software developer building modern web applications, product experiences, and resilient backend systems."
  }
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
