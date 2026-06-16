/** All 80 North Macedonia municipalities (Macedonian Cyrillic), alphabetically sorted. */
export const MACEDONIAN_CITIES = [
  'Аеродром',
  'Арачиново',
  'Берово',
  'Битола',
  'Богданци',
  'Боговиње',
  'Босилово',
  'Брвеница',
  'Бутел',
  'Валандово',
  'Василево',
  'Вевчани',
  'Велес',
  'Виница',
  'Врапчиште',
  'Гази Баба',
  'Гевгелија',
  'Гостивар',
  'Градско',
  'Дебар',
  'Дебарца',
  'Делчево',
  'Демир Капија',
  'Демир Хисар',
  'Дојран',
  'Долнени',
  'Ѓорче Петров',
  'Желино',
  'Зелениково',
  'Зрновци',
  'Илинден',
  'Јегуновце',
  'Кавадарци',
  'Карбинци',
  'Карпош',
  'Кисела Вода',
  'Кичево',
  'Конче',
  'Кочани',
  'Кратово',
  'Крива Паланка',
  'Кривогаштани',
  'Крушево',
  'Куманово',
  'Липково',
  'Лозово',
  'Маврово и Ростуше',
  'Македонска Каменица',
  'Македонски Брод',
  'Могила',
  'Неготино',
  'Новаци',
  'Ново Село',
  'Охрид',
  'Петровец',
  'Пехчево',
  'Плашница',
  'Прилеп',
  'Пробиштип',
  'Радовиш',
  'Ранковце',
  'Ресен',
  'Росоман',
  'Сарај',
  'Свети Николе',
  'Скопје',
  'Сопиште',
  'Старо Нагоричане',
  'Струга',
  'Струмица',
  'Студеничани',
  'Теарце',
  'Тетово',
  'Центар',
  'Центар Жупа',
  'Чаир',
  'Чашка',
  'Чешиново-Облешево',
  'Чучер Сандево',
  'Штип',
  'Шуто Оризари',
] as const;

export type MacedonianCity = (typeof MACEDONIAN_CITIES)[number];

export const MACEDONIAN_CITY_SET = new Set<string>(MACEDONIAN_CITIES);

export function isMacedonianCity(value: string): value is MacedonianCity {
  return MACEDONIAN_CITY_SET.has(value);
}

const TRANSLITERATION_PAIRS: [string, string][] = [
  ['Џ', 'Dzh'],
  ['џ', 'dzh'],
  ['Ѓ', 'Gj'],
  ['ѓ', 'gj'],
  ['Ќ', 'Kj'],
  ['ќ', 'kj'],
  ['Ж', 'Zh'],
  ['ж', 'zh'],
  ['Ч', 'Ch'],
  ['ч', 'ch'],
  ['Ш', 'Sh'],
  ['ш', 'sh'],
  ['Ј', 'J'],
  ['ј', 'j'],
  ['А', 'A'],
  ['а', 'a'],
  ['Б', 'B'],
  ['б', 'b'],
  ['В', 'V'],
  ['в', 'v'],
  ['Г', 'G'],
  ['г', 'g'],
  ['Д', 'D'],
  ['д', 'd'],
  ['Е', 'E'],
  ['е', 'e'],
  ['З', 'Z'],
  ['з', 'z'],
  ['И', 'I'],
  ['и', 'i'],
  ['К', 'K'],
  ['к', 'k'],
  ['Л', 'L'],
  ['л', 'l'],
  ['М', 'M'],
  ['м', 'm'],
  ['Н', 'N'],
  ['н', 'n'],
  ['О', 'O'],
  ['о', 'o'],
  ['П', 'P'],
  ['п', 'p'],
  ['Р', 'R'],
  ['р', 'r'],
  ['С', 'S'],
  ['с', 's'],
  ['Т', 'T'],
  ['т', 't'],
  ['У', 'U'],
  ['у', 'u'],
  ['Ф', 'F'],
  ['ф', 'f'],
  ['Х', 'H'],
  ['х', 'h'],
  ['Ц', 'C'],
  ['ц', 'c'],
];

export function transliterateMacedonianToLatin(text: string): string {
  let result = text;
  for (const [from, to] of TRANSLITERATION_PAIRS) {
    result = result.split(from).join(to);
  }
  return result;
}

/** Fold Latin text so "caska", "chashka", and "cas" all match Čaška. */
export function foldLatinForSearch(text: string): string {
  return transliterateMacedonianToLatin(text)
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/dzh/g, 'dz')
    .replace(/zh/g, 'z')
    .replace(/ch/g, 'c')
    .replace(/sh/g, 's')
    .replace(/gj/g, 'g')
    .replace(/kj/g, 'k')
    .replace(/[^a-z0-9]/g, '');
}

type CitySearchEntry = {
  city: MacedonianCity;
  cyrillicLower: string;
  latinKey: string;
};

const CITY_SEARCH_INDEX: CitySearchEntry[] = MACEDONIAN_CITIES.map((city) => ({
  city,
  cyrillicLower: city.toLocaleLowerCase('mk'),
  latinKey: foldLatinForSearch(city),
}));

export function cityMatchesSearch(city: string, query: string): boolean {
  const q = query.trim();
  if (!q) return true;

  const qLower = q.toLocaleLowerCase('mk');
  const qLatin = foldLatinForSearch(q);
  const entry = CITY_SEARCH_INDEX.find((item) => item.city === city);
  if (!entry) return false;

  return entry.cyrillicLower.includes(qLower) || entry.latinKey.includes(qLatin);
}

export function filterCitiesBySearch(query: string): MacedonianCity[] {
  const q = query.trim();
  if (!q) return [...MACEDONIAN_CITIES];

  const qLower = q.toLocaleLowerCase('mk');
  const qLatin = foldLatinForSearch(q);

  return CITY_SEARCH_INDEX.filter(
    (entry) =>
      entry.cyrillicLower.includes(qLower) || entry.latinKey.includes(qLatin)
  ).map((entry) => entry.city);
}
