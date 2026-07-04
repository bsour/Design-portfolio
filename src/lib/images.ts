// Curated, verified Unsplash photography (all HTTP 200).
// Centralised so treatment + credits stay consistent across sections.

const base = "https://images.unsplash.com/photo-";
const q = "&q=80&auto=format&fit=crop";

export const img = {
  heroForest: `${base}1441974231531-c6227db76b6e?w=2400${q}`,
  mistRoad: `${base}1476231682828-37e571bc172f?w=1600${q}`,
  fogForest: `${base}1470071459604-3b5ec3a7fe05?w=1600${q}`,
  aerial: `${base}1418065460487-3e41a6c84dc5?w=1600${q}`,
  canopy: `${base}1523712999610-f77fbcfc3843?w=1600${q}`,
  pines: `${base}1425913397330-cf8af2ff40a1?w=1600${q}`,
  trail: `${base}1511497584788-876760111969?w=1600${q}`,
  trunks: `${base}1502082553048-f009c37129b9?w=1600${q}`,
  redwoods: `${base}1447069387593-a5de0862481e?w=1600${q}`,
  dark: `${base}1513836279014-a89f7a76ae86?w=1600${q}`,
  ridge: `${base}1500534623283-312aade485b7?w=1600${q}`,
} as const;

export type ImgKey = keyof typeof img;
