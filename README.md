# hasibai.com — calculator site

Static site. No build step, no dependencies, no server code. Every calculator runs in the browser.

```
index.html                    home + directory + search filter
loan-calculator.html          amortising loan payment
bmi-calculator.html           BMI, metric + imperial
calorie-calculator.html       BMR / TDEE (Mifflin-St Jeor)
percentage-calculator.html    percent of / percent is / percent change
age-calculator.html           exact age between two dates
about.html  privacy.html  terms.html    required for AdSense
assets/styles.css  assets/site.js
sitemap.xml  robots.txt
```

---

## 1. Test it locally

Links use absolute paths (`/assets/styles.css`), so opening the files directly with
`file://` will not load the CSS. Run a local server instead:

```bash
cd site
python3 -m http.server 8000
```

Then open http://localhost:8000

## 2. Push to GitHub

```bash
cd site
git init
git add .
git commit -m "Initial calculator site"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/hasibai.git
git push -u origin main
```

## 3. Deploy on Cloudflare Pages

1. Cloudflare dashboard → **Compute** → **Workers & Pages** → **Create** → **Pages** → **Connect to Git**
2. Pick the repo. Leave the build command **empty** and set the output directory to `/`
3. **Save and Deploy** — you get a live `*.pages.dev` URL in about a minute

## 4. Attach hasibai.com

In the Pages project → **Custom domains** → **Set up a custom domain** → enter `hasibai.com`.

Cloudflare creates the DNS record itself because the domain is in the same account. Repeat
for `www.hasibai.com`. Do **not** hand-add the A/CNAME record — let Pages do it, or the two
will conflict.

Leave the existing MX and TXT records alone. They handle email and don't affect the website.

## 5. Google Search Console

Add a **Domain** property (not URL prefix) for `hasibai.com`. It gives you a TXT record to
paste into Cloudflare DNS, and covers www automatically. Then submit
`https://hasibai.com/sitemap.xml`.

## 6. AdSense

Apply only once the site is live on the real domain and the legal pages are reachable.

- Update the contact address — `contact@hasibai.com` appears in `about.html`, `privacy.html`
  and `terms.html`. Set it up with Cloudflare Email Routing, which is already configured on
  this domain, or change it to an address you own.
- After approval, paste Google's snippet in the `<head>` of every page (the placeholder
  comment in `index.html` marks the spot).
- Replace each `<div class="ad">…</div>` with a real ad unit. They're already sized and
  positioned so the layout won't shift.

Expect rejection if you apply with only these six calculators. "Low value content" is the
usual reason. Add several more tools with real explanatory text first.

---

## Adding a calculator

Copy `percentage-calculator.html` — it's the simplest. Then:

1. Change the `<title>`, meta description and canonical URL
2. Replace the fields in `.panel` and the `calc()` function
3. Call `printTape(tape, rows, note)` with your rows — `[label, value]`, or
   `[label, value, true]` for the total line
4. Add the page to the dropdown in **every** header, to the homepage card grid, and to
   `sitemap.xml`

## Notes on the calculations

- Loan uses `M = P·r / (1 − (1+r)⁻ⁿ)` with `r` converted from annual percent to monthly
  decimal. Zero-rate loans are handled separately to avoid dividing by zero.
- Age counts whole months first, then remaining days, clamping to month end
  (31 Jan + 1 month = 28 Feb). Dividing days by 365 drifts and is not used.
- BMI imperial converts to metric first, so both unit modes give an identical result.
- Calories use Mifflin-St Jeor. The page states its accuracy limits rather than hiding them.

If you change a formula, check it against a worked example before deploying. Wrong results
are the fastest way to lose repeat visitors.
