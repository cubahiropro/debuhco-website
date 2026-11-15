# DEBUHCO — Site web corporate

Site vitrine premium de **Développement Buhumuza Company (DEBUHCO)**, première unité
industrielle burundaise de préformes, bouchons et bouteilles PET — pensée pour
l'économie circulaire.

Construit avec **Astro + TypeScript**, CSS moderne et animations **GSAP / ScrollTrigger**.
Site 100 % statique, déployable sans serveur ni base de données.

---

## Stack

| Rôle | Choix |
|------|-------|
| Framework | [Astro](https://astro.build) 5 (sortie statique) |
| Langage | TypeScript (strict) |
| Animations | GSAP 3 + ScrollTrigger |
| Icônes | SVG inline (style Lucide, sans dépendance runtime) |
| Illustrations | [unDraw](https://undraw.co) (MIT), inline et recolorées à la marque |
| Police | **Calibri** (repli : Carlito / Segoe UI / `system-ui`) — aucune police chargée à distance |
| SEO | `@astrojs/sitemap`, JSON-LD, Open Graph, canonical |
| Hébergement cible | GitHub Pages (`base: /debuhco-website`) · config Netlify également fournie |

Aucune photo de stock n'est présentée comme une photo d'usine réelle : l'identité
visuelle repose sur des illustrations vectorielles (unDraw, recolorées à l'orange
de la marque), des dégradés sur mesure et quelques photos libres dûment créditées.

## Démarrage

```bash
npm install        # installer les dépendances
npm run dev        # serveur de dev  → http://localhost:4321
npm run build      # build statique  → dist/
npm run preview    # prévisualiser le build de production
```

> Node.js ≥ 18.20 requis (testé sous Node 26).

## Structure

```
src/
├── assets/undraw/  Illustrations unDraw (SVG inline, licence MIT) + LICENSE
├── components/     Logo, Header, Footer, Hero, Icon, SectionHeading, PageHero, Illustration
├── data/site.ts    Source de vérité du contenu (issue du plan d'affaires)
├── layouts/        Base.astro — <head>, SEO, header/footer, chargement des scripts
├── lib/path.ts     Préfixe les liens internes avec le base path (GitHub Pages)
├── pages/          index, entreprise, produits, durabilite, contact, merci, credits, 404
├── scripts/        animations.ts — GSAP/ScrollTrigger (respecte prefers-reduced-motion)
└── styles/         global.css — design system (tokens, boutons, cartes, utilitaires)
public/             favicon.svg, og.svg, robots.txt, images/ (photos créditées)
```

> Les illustrations utilisent `currentColor` : le composant `Illustration.astro`
> les insère en ligne pour que l'accent reprenne l'orange de la marque via CSS.
> Le contenu masqué par les animations (`[data-reveal]`) n'est caché que si JS est
> actif (`html.js`), donc il reste visible sans JavaScript.

## Contenu

Toutes les données factuelles (chiffres, produits, calendrier, identité légale)
proviennent du plan d'affaires officiel et sont centralisées dans
[`src/data/site.ts`](src/data/site.ts). **Modifier le contenu se fait là en priorité**,
ce qui garantit la cohérence sur l'ensemble des pages.

## Déploiement (Netlify)

Le fichier [`netlify.toml`](netlify.toml) est fourni :

- Build : `npm run build` · Publication : `dist/`
- En-têtes de sécurité + cache long sur `/_astro/*`
- Le formulaire de contact utilise **Netlify Forms** (`data-netlify="true"`),
  avec redirection vers `/merci` et piège anti-spam (honeypot).

Avant la mise en ligne :

1. Remplacer le domaine `https://www.debuhco.bi` dans `astro.config.mjs` et `public/robots.txt`.
2. Compléter le téléphone et les liens réseaux sociaux dans `src/data/site.ts`.
3. (Optionnel) remplacer `public/og.svg` par une image `og.png` 1200×630 si besoin d'un meilleur rendu sur certaines plateformes.

## Accessibilité & performance

- HTML sémantique, lien d'évitement, focus visibles, `aria-label` sur les icônes.
- Animations désactivées via `prefers-reduced-motion`; le contenu reste visible sans JS (rendu statique).
- Pas de framework UI lourd : seul GSAP est chargé côté client.

---

© Développement Buhumuza Company — Burundi.
