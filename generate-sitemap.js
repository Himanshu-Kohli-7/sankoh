const { SitemapStream, streamToPromise } = require("sitemap");
const fs = require("fs");

const generateSitemap = async () => {
  const smStream = new SitemapStream({
    hostname: "https://www.sankohtech.com",
  });

  // Add URLs to your sitemap
  const pages = [
    { url: "/", changefreq: "daily", priority: 1.0 },
    { url: "/about", changefreq: "monthly", priority: 0.8 },
    { url: "/services", changefreq: "monthly", priority: 0.8 },
    { url: "/products", changefreq: "monthly", priority: 0.8 },
    { url: "/contact", changefreq: "monthly", priority: 0.8 },
  ];

  pages.forEach((page) => smStream.write(page));
  smStream.end();

  // Write the sitemap to a file
  const sitemap = await streamToPromise(smStream).then((data) =>
    data.toString()
  );
  fs.writeFileSync("./public/sitemap.xml", sitemap);
};

generateSitemap().catch((error) => {
  console.error("Error generating sitemap:", error);
});
