/**
 * DEBUHCO — Source de vérité du contenu.
 * Toutes les données ci-dessous proviennent du plan d'affaires officiel
 * « Projet de fabrication des préformes et des bouteilles plastiques au Burundi »
 * (Développement Buhumuza Company). Ne pas inventer de chiffres hors de ce document.
 */

export const company = {
  name: 'DEBUHCO',
  legalName: 'Développement Buhumuza Company',
  shortName: 'DEBUHCO',
  tagline: "L'emballage plastique durable, fabriqué au Burundi.",
  baseline:
    "La première unité industrielle burundaise de préformes, bouchons et bouteilles PET — pensée pour l'économie circulaire.",
  founder: {
    name: 'Francine Niyonsaba',
    role: 'Promotrice du projet',
    bio: "Athlète burundaise de renommée internationale, spécialiste des courses de demi-fond. Elle incarne la persévérance, la détermination et l'excellence — et investit aujourd'hui dans une industrie durable au service de l'environnement et de la jeunesse burundaise.",
  },
  legal: {
    form: 'Société Privée à Responsabilité Limitée (SPRL)',
    nif: '4002915900',
    rc: '0064441/25',
  },
  address: {
    line1: 'Quartier Industriel, Zone Ngagara',
    line2: 'Commune Ntahangwa',
    city: 'Bujumbura Mairie',
    country: 'Burundi',
  },
  email: 'contact@debuhco.bi',
  phone: '+257 00 00 00 00',
  social: {
    linkedin: '#',
    facebook: '#',
    instagram: '#',
  },
} as const;

export const nav = [
  { label: 'Entreprise', href: '/entreprise' },
  { label: 'Produits', href: '/produits' },
  { label: 'Durabilité', href: '/durabilite' },
  { label: 'Impact', href: '/#impact' },
  { label: 'Contact', href: '/contact' },
] as const;

/** Chiffres-clés vérifiés dans le plan d'affaires. */
export const stats = [
  { value: 19, suffix: ' M', label: 'bouteilles PET / an', detail: 'Capacité annuelle de soufflage' },
  { value: 6, suffix: ' M', label: 'préformes / an', detail: 'Ligne d\'injection dédiée' },
  { value: 100, suffix: ' %', label: 'Made in Burundi', detail: 'Première usine du genre au pays' },
  { value: 70, suffix: ' %', label: 'PET recyclé', detail: 'Mix 70 % recyclé · 30 % vierge' },
] as const;

export const products = [
  {
    id: 'preformes',
    name: 'Préformes PET',
    summary:
      "Ébauches injectées prêtes au soufflage, disponibles selon le grammage et le volume cible.",
    specs: [
      { k: '1,5 L', v: '38 – 45 g' },
      { k: '1 L', v: '28 – 35 g' },
      { k: '500 mL', v: '18 – 22 g' },
      { k: '350 mL', v: '14 – 18 g' },
    ],
    usage: 'Eau minérale, sodas, jus, boissons lactées.',
  },
  {
    id: 'bouteilles',
    name: 'Bouteilles PET',
    summary:
      "Bouteilles soufflées en 350 mL, 500 mL, 1 L et 1,5 L, prêtes à l'emploi pour l'embouteillage.",
    specs: [
      { k: '1,5 L', v: 'Eau · sodas' },
      { k: '1 L', v: 'Eau · jus' },
      { k: '500 mL', v: 'Eau · boissons' },
      { k: '350 mL', v: 'Jus · lactés' },
    ],
    usage: 'Industries de l\'eau, des boissons et de l\'agroalimentaire.',
  },
  {
    id: 'bouchons',
    name: 'Bouchons PEHD',
    summary:
      "Bouchons standard 28 mm en polyéthylène haute densité, contrôlés et triés en interne.",
    specs: [
      { k: 'Diamètre', v: '28 mm' },
      { k: 'Poids', v: '≈ 2,5 g' },
      { k: 'Matière', v: 'PEHD / PP' },
      { k: 'Qualité', v: 'Vierge ou recyclé' },
    ],
    usage: 'Compatibles avec l\'ensemble de la gamme de bouteilles.',
  },
  {
    id: 'etiquettes',
    name: 'Étiquetage & emballage',
    summary:
      "Impression et application d'étiquettes (manchon thermo-rétractable ou autocollant), mise en paquet et filmage.",
    specs: [
      { k: 'Type', v: 'Manchon / autocollant' },
      { k: 'Service', v: 'Guichet unique' },
      { k: 'Conditionnement', v: 'Film / carton' },
      { k: 'Logistique', v: 'Prêt à distribuer' },
    ],
    usage: 'Chaîne complète, de la préforme au produit étiqueté.',
  },
] as const;

export const processSteps = [
  {
    n: '01',
    title: 'Collecte & recyclage',
    text: 'Bouteilles usagées collectées, triées, broyées, lavées et extrudées en granulés recyclés.',
  },
  {
    n: '02',
    title: 'Injection des préformes',
    text: 'Séchage des granulés puis injection dans des moules interchangeables selon le grammage.',
  },
  {
    n: '03',
    title: 'Injection des bouchons',
    text: 'Moulage des bouchons PEHD, refroidissement rapide, contrôle qualité et tri.',
  },
  {
    n: '04',
    title: 'Soufflage des bouteilles',
    text: 'Préformes chauffées au four infrarouge puis soufflées et étirées à l\'air comprimé.',
  },
  {
    n: '05',
    title: 'Étiquetage & livraison',
    text: 'Étiquetage, conditionnement et distribution vers les clients locaux et la sous-région.',
  },
] as const;

export const impacts = [
  {
    key: 'eco',
    title: 'Impact économique',
    points: [
      'Réduction des importations et conservation des devises étrangères',
      'Approvisionnement local fiable et rapide pour les industriels',
      'Prix inférieurs de 10 à 15 % aux produits importés',
      'Contribution aux recettes fiscales et à l\'économie formelle',
    ],
  },
  {
    key: 'social',
    title: 'Impact social',
    points: [
      'Création d\'emplois directs et indirects',
      'Formation et montée en compétences en plasturgie',
      'Inclusion des femmes et des jeunes diplômés',
      'Soutien aux initiatives en faveur des plus vulnérables',
    ],
  },
  {
    key: 'env',
    title: 'Impact environnemental',
    points: [
      'Collecte et recyclage des bouteilles plastiques usagées',
      'Économie circulaire : les déchets redeviennent ressource',
      'Machines à meilleure efficacité énergétique',
      'Étude d\'une alimentation solaire du site',
    ],
  },
] as const;

export const markets = [
  'Burundi (12 millions d\'habitants)',
  'Rwanda',
  'Est de la RDC',
  'Tanzanie',
  'Ouganda',
] as const;

export const differentiators = [
  {
    title: 'Guichet unique intégré',
    text: 'Préformes, bouchons et étiquettes produits en interne : coûts maîtrisés et qualité contrôlée de bout en bout.',
  },
  {
    title: 'Un vide industriel comblé',
    text: 'Aucune usine de préformes et bouteilles PET n\'existe au Burundi. DEBUHCO devient le fournisseur local de référence.',
  },
  {
    title: 'Économie circulaire',
    text: 'Un réseau de collecte transforme les bouteilles usagées en matière première, réduisant pollution et coûts.',
  },
  {
    title: 'Alignée Vision Burundi 2040–2060',
    text: 'Industrialisation, emplois, durabilité et intégration régionale au cœur de la stratégie nationale.',
  },
] as const;
