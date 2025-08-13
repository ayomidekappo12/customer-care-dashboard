import type { Metadata } from "next";
import "./globals.css";
import App from "@/components/layout/app";
import { Sora, Inter } from "next/font/google";

const inter = Inter({ variable: "--font-inter", subsets: ["latin"] });

const sora = Sora({
  variable: "--font-sora",
  subsets: ["latin"],
});

// Combined class name
const fontClass = `${inter.variable} ${sora.variable}`;

export const metadata: Metadata = {
  title: "customer-care-dashboard - customer-care website",
  description: "We - Provide customer-care.",
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "customer-care-dashboard",
  url: "https://SynaraDev.com",
  logo: "https://SynaraDev.com/images/logo.svg",
  description: "customer-care-dashboard Provide customer-care.",
  sameAs: [
    "https://x.com/synaradev",
    "https://www.linkedin.com/company",
    "https://www.instagram.com",
    "http://www.tiktok.com",
    "https://www.youtube.com",
    "https://web.facebook.com",
  ],
  contactPoint: {
    "@type": "ContactPoint",
    email: "synara.dev@gmail.com",
    contactType: "customer support",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html suppressHydrationWarning lang="en" className={fontClass}>
      <head>
        <script
          id="organization-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationSchema),
          }}
        />
      </head>
      <body>
        <App>{children}</App>
      </body>
    </html>
  );
}
