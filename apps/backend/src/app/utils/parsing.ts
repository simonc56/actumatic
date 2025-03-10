const frenchShortMonthsMap: { [key: string]: string } = {
  jan: 'Jan',
  fév: 'Feb',
  mar: 'Mar',
  avr: 'Apr',
  mai: 'May',
  jun: 'Jun',
  jui: 'Jul',
  aoû: 'Aug',
  sep: 'Sep',
  oct: 'Oct',
  nov: 'Nov',
  déc: 'Dec',
  // Variantes possibles
  fev: 'Feb',
  aou: 'Aug',
  juil: 'Jul',
};
const frenchMonthsMap: { [key: string]: string } = {
  janvier: 'January',
  février: 'February',
  mars: 'March',
  avril: 'April',
  mai: 'May',
  juin: 'June',
  juillet: 'July',
  août: 'August',
  septembre: 'September',
  octobre: 'October',
  novembre: 'November',
  décembre: 'December',
};

const frenchShortDaysMap: { [key: string]: string } = {
  lun: 'Mon',
  mar: 'Tue',
  mer: 'Wed',
  jeu: 'Thu',
  ven: 'Fri',
  sam: 'Sat',
  dim: 'Sun',
};

const frenchDaysMap: { [key: string]: string } = {
  lundi: 'Monday',
  mardi: 'Tuesday',
  mercredi: 'Wednesday',
  jeudi: 'Thursday',
  vendredi: 'Friday',
  samedi: 'Saturday',
  dimanche: 'Sunday',
};

export function parseFrenchDate(dateStr: string): Date {
  // Si la date est déjà en anglais, on la retourne telle quelle
  if (/^(Mon|Tue|Wed|Thu|Fri|Sat|Sun)/.test(dateStr)) {
    return new Date(dateStr);
  }

  // Conversion de la date française en format anglais
  let englishDate = dateStr.toLowerCase();

  // Conversion des mois (avant les jours pour éviter collision 'mars' et 'mardi')
  Object.entries(frenchMonthsMap).forEach(([fr, en]) => {
    englishDate = englishDate.replace(fr, en);
  });
  Object.entries(frenchShortMonthsMap).forEach(([fr, en]) => {
    englishDate = englishDate.replace(fr, en);
  });

  // Conversion des jours
  Object.entries(frenchDaysMap).forEach(([fr, en]) => {
    englishDate = englishDate.replace(fr, en);
  });
  Object.entries(frenchShortDaysMap).forEach(([fr, en]) => {
    englishDate = englishDate.replace(fr, en);
  });

  // Parse la date convertie
  const result = new Date(englishDate);

  // Vérifie si la date est valide
  if (isNaN(result.getTime())) {
    throw new Error(`Invalid date format: ${dateStr}`);
  }

  return result;
}

export function removeUnwantedPrefix(text: string): string {
  const unwantedPrefixes = ['☕️ ', 'Actualité : '];
  return unwantedPrefixes.reduce(
    (acc, prefix) => (acc.startsWith(prefix) ? acc.slice(prefix.length) : acc),
    text,
  );
}
