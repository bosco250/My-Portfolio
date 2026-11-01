# SEO checklist

Site: https://boscodev.vercel.app/

The site itself is configured (titles, description, structured data, sitemap, robots.txt, share image). These steps need your own accounts and only take about 20 minutes once.

## 1. Deploy

Commit and push, so Vercel publishes the new version. Then check:

- https://boscodev.vercel.app/robots.txt shows the robots rules
- https://boscodev.vercel.app/sitemap.xml shows the sitemap
- https://boscodev.vercel.app/og-image.png shows the share image

## 2. Google Search Console (most important)

1. Go to https://search.google.com/search-console and add a **URL prefix** property: `https://boscodev.vercel.app/`
2. Choose **HTML tag** verification. Copy the code inside `content="..."`.
3. In `index.html`, find `google-site-verification`, remove the `<!-- -->` around it and paste your code. Push.
4. Click **Verify**.
5. Open **Sitemaps** and submit `sitemap.xml`.
6. Open **URL inspection**, paste `https://boscodev.vercel.app/`, click **Request indexing**.

Expect your name to start appearing in Google within a few days to two weeks.

## 3. Bing (also powers DuckDuckGo and Yahoo)

1. Go to https://www.bing.com/webmasters and choose **Import from Google Search Console** (fastest), or add the site manually.
2. If manual: use the meta tag option, paste the code into `msvalidate.01` in `index.html`, push, verify.
3. Submit `https://boscodev.vercel.app/sitemap.xml`.

## 4. Link previews

Paste `https://boscodev.vercel.app/` into the LinkedIn Post Inspector, https://www.linkedin.com/post-inspector/, and click **Inspect**. This refreshes the preview so LinkedIn shows the new share image.

## 5. Links that point to you (what makes your name rank)

Search engines trust a site more when other trusted sites link to it. Add `https://boscodev.vercel.app/` to:

- **LinkedIn**: Contact info → Website, and in the Featured section
- **GitHub**: profile → Website field, and in your `bosco250` profile README
- Your email signature
- Any project you built where a credit is allowed (for example a "Built by" footer link)

Use the same name everywhere: **Dusengimana Jean Bosco**. Consistency helps Google connect all of them to one person.

## 6. Check it worked (after 1 to 2 weeks)

Search Google for:

- `Dusengimana Jean Bosco`
- `Jean Bosco software engineer Rwanda`
- `site:boscodev.vercel.app` (shows everything Google has indexed)

Structured data test: https://search.google.com/test/rich-results with your URL.

## Keep it fresh

When you change roles, projects or titles, update both the visible text and the matching details in `index.html` (description, structured data, crawler copy), then change `lastmod` in `public/sitemap.xml` to the current date.

## Optional upgrade: your own domain

A custom domain like `jeanbosco.dev` or `boscodev.rw` ranks and looks better than a `vercel.app` address. If you buy one, connect it in Vercel and update every `boscodev.vercel.app` in `index.html`, `public/robots.txt`, `public/sitemap.xml` and this file.
