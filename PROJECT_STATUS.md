# SemanticKC (own marketing site) — Project Status

*Living document — updated in place at the end of any round that changes what's true about this project. Not a changelog (see `C:\Users\seanj\Desktop\SemanticKC\reports\` for dated history); this is "what's true right now," so a fresh Organizer instance with zero memory can pick up here instead of being re-briefed from scratch.*

## Standing facts (don't relitigate these — they're decided)

- **This is SemanticKC's own business site**, not a client project — maintained directly in the repo by Sean + Claude Code, no CMS, no admin panel, no self-edit requirement (contrast with EMI-KC's pattern; see `Websites/_site-build-playbook.md`).
- **Architecture**: 100% static Astro (`output: 'static'`), no backend at all — not even ATGM's one dynamic contact-form route. Contact is a plain `mailto:admin@semantickc.com` link.
- **Domain**: `semantickc.com`, Sean owns and controls DNS directly.
- **GitHub account**: `github.com/SemanticKC` is Sean's **personal GitHub user account**, not an organization — confirmed via the API (`/orgs/SemanticKC` → 404, `/users/SemanticKC` → `"type": "User"`). Earlier planning language in this project called it an "org" by mistaken analogy to the `Website_EMI-KC` repo's URL shape; that was wrong and is corrected here.
- **Hosting decision**: GitHub Pages, free, no VPS. Decided 2026-08-09, re-confirmed and executed 2026-08-29. A separate, still-parked idea (a small paid VPS backend for a real server-side contact form, ~$5–7/mo) remains recorded but not acted on — see `project_semantickc-vps-recommendation-deferred.md` in project memory. Not needed for the current static site.
- **DNS cutover is done.** Sean completed it himself; `semantickc.com` is now live on the real domain (fronted by Cloudflare, backed by GitHub Pages — confirmed via response headers showing both `server: cloudflare` and a real `x-github-request-id`). Independently re-verified 2026-08-29: `https://semantickc.com/` returns real HTTP 200 with genuine SemanticKC content, not a placeholder or cache miss.

## Current state (as of 2026-08-29, case-study copy round)

**Repo**: `https://github.com/SemanticKC/Website_SemanticKC` — public, created by Sean directly, pushed and building via GitHub Actions.

**Deploy pipeline**: `.github/workflows/deploy.yml` (checkout → build → `actions/upload-pages-artifact` → `actions/deploy-pages`, triggered on push to `main`). Real deploy history so far: run 1 failed (GitHub's default Actions Node version is 20; this project's `package.json` requires `>=22.12.0`), run 2 fixed it (pinned Node 22) and succeeded, run 3 (adding the CNAME) also succeeded. Currently green.

**Live and independently verified** (checked directly against the real GitHub API and real HTTP responses, not taken on any delegate's or relay's word):
- Repo exists, is public, and has real pushed content (confirmed via `GET /repos/SemanticKC/Website_SemanticKC`).
- All 3 Actions runs' real status confirmed via the Actions API (1 real failure → fix → 2 successes, matching the reported history exactly).
- `public/CNAME` exists in the repo and contains exactly `semantickc.com` (fetched directly via raw.githubusercontent.com).
- Live interim URL `https://semantickc.github.io/Website_SemanticKC/` serves real, distinct content on all 5 real pages (home, `/services`, `/process`, `/work`, `/contact` — each fetched directly, each returns HTTP 200 with a distinct real `<title>` and real body copy, not a placeholder).
- **Root-absolute asset path behavior specifically stress-tested, not just asserted**: the built HTML uses root-absolute paths (`/favicon.svg`, `/_astro/NodeGraph.*.css` — no `base` set, since `astro.config.mjs`'s `site` is `https://semantickc.com`, the real eventual domain root). Confirmed these 404 at the bare `https://semantickc.github.io/` root (expected, since the site is actually deployed under the `/Website_SemanticKC/` subpath on the interim URL) and confirmed the identical assets return 200 at `https://semantickc.github.io/Website_SemanticKC/favicon.svg` etc. (where they're really deployed). This confirms the assets will resolve correctly once served from the real domain root (`https://semantickc.com/favicon.svg` etc.) — the interim subpath breakage is expected and correct, not a bug to fix.
- DNS for `semantickc.com` independently re-confirmed untouched both before and after this deploy (`nslookup` shows no A record; `http://semantickc.com/` connection fails) — the GitHub side of the setup was completed without touching the registrar, exactly as scoped.

**DNS cutover: done, closed out.** `semantickc.com` resolves and serves the real site over valid HTTPS (Cloudflare-fronted, GitHub-Pages-backed). Root-absolute asset paths resolve correctly at the real domain root as predicted pre-cutover.

## Case-study copy round (2026-08-29)

Sean asked for two changes to the homepage "Case Study" panel and `/work` page (both about Elite Midwest Integrators): reference EMI-KC's live marketing site, and drop the "first real build / our only one" framing since it might be stale. Investigated before touching anything (see `reports/2026-08-29.md` in the SemanticKC hub repo for the full fact-finding writeup):

- **EMI-KC's marketing site is genuinely live** at `https://emi-kc.com` (verified via direct `curl`: real 200, valid TLS, real distinct branded content) — safe to link to.
- **"Our only one" was stale but not simply deletable.** A second real engagement exists for the same client (the EMI-KC CRM, 8 build rounds — see `Websites/Elite Midwest Integrators CRM/PROJECT_STATUS.md`), but it's local-dev-only and has never been deployed, so it isn't a second live case study to point to either. Resolved by dropping the absolute "only one" claim without naming or implying the CRM is live/shippable.

**Sean confirmed the recommended default rewrite** (doesn't name the CRM, since publicizing an unfinished/undeployed internal client tool is a client-relationship call, not the Organizer's to make unilaterally). Shipped 2026-08-29:
- Homepage Case Study panel now links to `emi-kc.com` and reads "Our first build, and still the clearest example of how we approach every engagement..." (was "Our first real build, and the template for how we approach every engagement since...").
- `/work` page intro softened ("our first client build" / "more work," was "our first real client build" / "more clients").
- `/work` page closing paragraph and its internal HTML comment rewritten to drop "and right now our only one," now links to `emi-kc.com`, and the comment notes a second (undeployed) engagement exists without naming it as public-facing.

**Deploy verification (this round, independent, not taken on the build succeeding alone):**
- Local: `npm run build` clean; ran `astro preview` on a non-default port (4399 — port 4321 was already occupied by an unrelated local process, per this project's own Gotcha 3 discipline) and confirmed via real HTTP fetches that both new paragraphs, both `emi-kc.com` links, and the removal of "our only one" were present, and all 5 other pages still returned 200 with no regression.
- Committed (`bd2f4f2`) and pushed directly to `main` (this repo's established pattern — Actions builds/deploys straight off push, no PR gate, consistent with the prior 2026-08-09/29 deploy rounds).
- Confirmed via the real GitHub Actions API that the run for commit `bd2f4f2` specifically (not just "the latest run") completed with `conclusion: success`.
- Confirmed live on the real production domain, not just the Actions log: fetched `https://semantickc.com/` and `https://semantickc.com/work/` directly, found the exact new copy and both live `emi-kc.com` links present, confirmed "our only one" is genuinely gone, and checked response headers (`Age: 0`, a fresh `last-modified` timestamp matching the deploy time) to rule out a stale cache hit being mistaken for a live check. All 5 pages re-checked at 200 on the real domain post-deploy.

## EMI-KC screenshot + framing corrections round (2026-08-29)

Sean asked for a real screenshot of the live emi-kc.com homepage, added near the top of the case-study content, styled as a clickable link to `https://emi-kc.com` — applied to both the homepage's condensed "Case Study" panel and the dedicated `/work` page (judgment call: both, for consistency, as Sean's brief anticipated).

**Screenshot**: real Playwright capture of the live `https://emi-kc.com` homepage (1440×900 desktop viewport), converted from a 990KB PNG to a 151KB JPEG (quality 82, via `sharp`, already a project dependency) with no visible quality loss. Saved at `public/images/case-study/emi-kc-screenshot.jpg` — first raster asset in this project, establishing the `public/images/<category>/` convention. Wrapped in `<a href="https://emi-kc.com" target="_blank" rel="noopener noreferrer">` on both pages, styled to match the site's existing card language (`rounded-2xl border border-line`, `hover:-translate-y-1 hover:border-accent-500`, `overflow-hidden` on the link). Real, specific alt text describing what's actually visible (nav, hero headline, KC skyline photo, CTA buttons).

**Mid-round correction (relayed from Sean while this was in flight)**: two more factual/framing fixes to `/work`'s "Why This Approach" section, folded into the same round/deploy rather than a separate one:
1. Removed "non-technical" describing the EMI-KC owner (he's technical, just in a different trade — low-voltage/security integration) — reworded to state the actual reason that build needed a CMS (he updates his own content without a developer), not a characterization of his technical skill.
2. Removed the unqualified "our first client" claim in that section (visible text + its HTML comment) — clarified context: EMI-KC is the first client built through this Organizer/agent process specifically, not literally Sean's first client ever. Dropped the ordinal claim entirely rather than inventing a replacement one; didn't fabricate or name any other client.

**Flagged, not fixed** — two more instances of the same "first client"/"first build" framing exist outside the explicitly-scoped section, found via a full `src/` sweep, and were deliberately left untouched pending an explicit Sean decision (same category of claim, same likely fix, but not authorized in this round):
- `src/pages/work.astro` line 39 (hero intro): "...using Elite Midwest Integrators, our first client build, as the concrete example."
- `src/pages/index.astro` line 147 (homepage case-study panel body): "Our first build, and still the clearest example of how we approach every engagement..."

**Verification, this round** (independent, by the Organizer — build/copy work was done by Build in two dispatches):
- Local: `npm run build` clean; viewed the actual saved screenshot file directly to confirm it's a genuine, undoctored EMI-KC capture (not a mockup); `astro preview` on port 4477 (non-default, per this project's Gotcha 3 discipline), confirmed via `netstat` what was actually bound before trusting fetches against it.
- Confirmed via real HTTP fetches: all 5 pages 200, the image itself fetches 200/`image/jpeg`/151046 bytes, both pages' `<a>` wraps point to `https://emi-kc.com` with `target="_blank" rel="noopener noreferrer"`, "non-technical" is fully absent from `/work`, both corrected paragraphs render with the exact intended wording, and both flagged-but-untouched instances are still present as expected (proving nothing was silently over-fixed).
- Real visual verification, not just HTML presence: ran Playwright against the local preview at both desktop (1280×900) and mobile (375×700) viewports, viewed the actual screenshots — image renders cleanly with correct rounded-corner/border/hover styling on both pages; mobile confirmed no horizontal overflow (`scrollWidth === innerWidth` on both pages) and a full-width, clearly clickable image (bounding boxes 291×182px on home, 341×213px on /work — well above any minimal tap-target concern).
- Committed (`76035f7`) and pushed directly to `main` (this repo's established pattern, no PR gate). Confirmed via the real GitHub Actions API that the run for commit `76035f7` specifically completed with `conclusion: success`.
- Confirmed live on the real production domain: fetched `https://semantickc.com/` and `https://semantickc.com/work/` directly (not just the Actions log), found the exact new HTML/copy/links present, confirmed fresh headers (`Age: 1`, `last-modified` matching the deploy) to rule out a stale cache hit, and took a real Playwright screenshot of the live production homepage — pixel-identical to the verified local render.

## Known playbook additions from this project

`Websites/_site-build-playbook.md` had no GitHub Pages deploy guidance before this — worth adding two real gotchas from this rollout: (1) GitHub's default Actions runner Node version can be older than a project's `engines` requirement, causing a first-run failure that isn't visible until the workflow actually runs; pin the Node version explicitly in the workflow rather than relying on the default. (2) A static site configured with `site:` set to its real custom domain (no `base` path) will have root-absolute asset paths that 404 on any interim subpath preview URL (like the default `<user>.github.io/<repo>/` URL) — this is expected and correct, not a bug, and shouldn't be "fixed" by adding a `base`, which would break the real domain-root deployment it's actually configured for.
