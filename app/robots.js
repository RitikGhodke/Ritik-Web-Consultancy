// const base = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

// export default function robots() {
//   return {
//     rules: [{ userAgent: "*", allow: "/", disallow: ["/admin", "/api/"] }],
//     sitemap: `${base}/sitemap.xml`,
//   };
// }














const base = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

export default function robots() {
  return {
    rules: [{ userAgent: "*", allow: "/", disallow: ["/admin", "/api/"] }],
    sitemap: `${base}/sitemap.xml`,
  };
}