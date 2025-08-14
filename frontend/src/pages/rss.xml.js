import rss, { pagesGlobToRssItems } from '@astrojs/rss';
export async function GET(context) {
  return rss({
     description: 'Free and premium multipage themes and UI Kits For freelancers, developers, businesses, and personal use.Beautifully crafted with Astro.js, and Tailwind CSS — Simple & easy to customise.',
    items: await pagesGlobToRssItems(
      import.meta.glob('./blog/*.{md,mdx}'),
    ),
    site: context.site,
    title: 'Lexington Themes',
  });
}