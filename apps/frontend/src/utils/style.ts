/**
 * Génère une couleur hexadécimale unique basée sur une chaîne de caractères
 * Les couleurs générées sont moyennement foncées et réparties sur tout le spectre
 *
 * @param category - Le nom de la catégorie
 * @returns Une couleur au format hexadécimal (#RRGGBB)
 */
export function getCategoryColor(category: string): string {
  // Couleurs prédéfinies pour certaines catégories
  const predefinedColors: Record<string, string> = {
    Numérique: '#1864ab',
    Mobile: '#294668',
    Pro: '#545ba6',
    Dev: '#7b3756',
    Cybersécurité: '#7C6868',
    Domotique: '#5f8f56',
    Apple: '#3A707F',
    Hardware: '#404040',
  };
  if (predefinedColors[category]) {
    return predefinedColors[category];
  }

  // Calcul d'un hachage de la chaîne pour obtenir une valeur unique
  let hash = 0;
  for (let i = 0; i < category.length; i++) {
    hash = category.charCodeAt(i) + ((hash << 5) - hash);
  }

  // Conversion du hachage en teinte (0-360)
  const hue = hash % 360;

  // Conversion HSL vers RGB avec une saturation et luminosité contrôlées
  // pour éviter les couleurs trop claires ou criardes
  return hslToHex(hue, 25, 45);
}

/**
 * Convertit une couleur HSL en valeur hexadécimale
 *
 * @param h - Teinte (0-360)
 * @param s - Saturation (0-100)
 * @param l - Luminosité (0-100)
 * @returns Couleur au format hexadécimal
 */
function hslToHex(h: number, s: number, l: number): string {
  h /= 360;
  s /= 100;
  l /= 100;

  let r, g, b;

  if (s === 0) {
    r = g = b = l;
  } else {
    const hue2rgb = (p: number, q: number, t: number) => {
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1 / 6) return p + (q - p) * 6 * t;
      if (t < 1 / 2) return q;
      if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
      return p;
    };

    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;

    r = hue2rgb(p, q, h + 1 / 3);
    g = hue2rgb(p, q, h);
    b = hue2rgb(p, q, h - 1 / 3);
  }

  // Conversion en valeurs hexadécimales
  const toHex = (x: number) => {
    const hex = Math.round(x * 255).toString(16);
    return hex.length === 1 ? '0' + hex : hex;
  };

  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}
