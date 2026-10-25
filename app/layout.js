// import { Space_Grotesk, Inter } from "next/font/google";
// import "./globals.css";
// import SmoothScroll from "@/components/SmoothScroll";
// import { site } from "@/lib/config";

// const space = Space_Grotesk({
//   subsets: ["latin"],
//   variable: "--font-space",
//   display: "swap",
// });

// const inter = Inter({
//   subsets: ["latin"],
//   variable: "--font-inter",
//   display: "swap",
// });

// export const metadata = {
//   title: `${site.name} | ${site.tagline}`,
//   description: site.description,
// };

// export default function RootLayout({ children }) {
//   return (
//     <html lang="en" className={`${space.variable} ${inter.variable}`}>
//       <body>
//         <SmoothScroll>{children}</SmoothScroll>
//       </body>
//     </html>
//   );
// }
















// import { Space_Grotesk, Inter } from "next/font/google";
// import "./globals.css";
// import SmoothScroll from "@/components/SmoothScroll";
// import { site } from "@/lib/config";

// const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

// const space = Space_Grotesk({
//   subsets: ["latin"],
//   variable: "--font-space",
//   display: "swap",
// });

// const inter = Inter({
//   subsets: ["latin"],
//   variable: "--font-inter",
//   display: "swap",
// });

// const title = `${site.name} | ${site.tagline}`;

// export const metadata = {
//   metadataBase: new URL(siteUrl),
//   title,
//   description: site.description,
//   openGraph: {
//     title,
//     description: site.description,
//     url: "/",
//     siteName: site.name,
//     locale: "en_IN",
//     type: "website",
//   },
//   twitter: {
//     card: "summary_large_image",
//     title,
//     description: site.description,
//   },
//   robots: { index: true, follow: true },
// };

// export const viewport = { themeColor: "#05060a" };

// const jsonLd = {
//   "@context": "https://schema.org",
//   "@type": "ProfessionalService",
//   name: site.name,
//   url: siteUrl,
//   description: site.description,
//   areaServed: "IN",
// };

// export default function RootLayout({ children }) {
//   return (
//     <html lang="en" className={`${space.variable} ${inter.variable}`}>
//       <body>
//         <script
//           type="application/ld+json"
//           dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
//         />
//         <SmoothScroll>{children}</SmoothScroll>
//       </body>
//     </html>
//   );
// }















import { Space_Grotesk, Inter } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import { site } from "@/lib/config";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

const space = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const title = `${site.name} | ${site.tagline}`;

export const metadata = {
  metadataBase: new URL(siteUrl),
  title,
  description: site.description,
  openGraph: {
    title,
    description: site.description,
    url: "/",
    siteName: site.name,
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description: site.description,
  },
  robots: { index: true, follow: true },
     verification: { google: <meta name="google-site-verification" content="G3BSSLyCtazbu0Em0RWXaqDWNHckw5CLjBsd9t-_ZYU" /> },
};

export const viewport = { themeColor: "#05060a" };

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: site.name,
  url: siteUrl,
  description: site.description,
  areaServed: "IN",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${space.variable} ${inter.variable}`}>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}