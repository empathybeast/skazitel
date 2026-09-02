import { pick, toPlainText, type Manuscript, type Swatch } from "@/lib/generators";

type Pole = {
  h: readonly number[];
  s: readonly [number, number];
  l: readonly [number, number];
};

type Harmony = "dominion" | "clash" | "veil" | "split" | "bind" | "echo";

export type PaletteKeyword = {
  id: string;
  label: string;
  poles: readonly Pole[];
  names: readonly { en: string; ru: string }[];
};

const n = (
  en: string,
  ru: string,
): { en: string; ru: string } => ({ en, ru });

const p = (
  h: readonly number[],
  s: readonly [number, number],
  l: readonly [number, number],
): Pole => ({ h, s, l });

export const PALETTE_KEYWORDS: readonly PaletteKeyword[] = [
  {
    id: "air",
    label: "воздух",
    poles: [p([188, 204, 216], [6, 22], [58, 86]), p([40, 48], [4, 12], [72, 90]), p([140, 160], [8, 18], [50, 74])],
    names: [n("Thin Breath", "Тонкий вдох"), n("Open Draft", "Сквозняк"), n("High Room", "Высокая комната"), n("Altitude", "Высота")],
  },
  {
    id: "malice",
    label: "злоба",
    poles: [p([78, 92], [28, 54], [14, 36]), p([6, 14], [36, 58], [12, 30]), p([310, 328], [18, 40], [16, 34])],
    names: [n("Green Gall", "Зелёная желчь"), n("Old Grudge", "Старая обида"), n("Closed Fist", "Сжатый кулак"), n("Bile Ink", "Желчные чернила")],
  },
  {
    id: "despair",
    label: "отчаяние",
    poles: [p([222, 236, 250], [6, 22], [6, 24]), p([24, 32], [8, 18], [10, 26]), p([160, 176], [6, 16], [12, 28])],
    names: [n("Spent Hour", "Истраченный час"), n("No Answer", "Без ответа"), n("Last Well", "Последний колодец"), n("Dead Letter", "Мёртвое письмо")],
  },
  {
    id: "stone",
    label: "камень",
    poles: [p([28, 36, 210], [3, 12], [22, 56]), p([28, 38], [10, 22], [30, 52]), p([214, 226], [6, 16], [18, 44])],
    names: [n("Quincy", "Куинси"), n("Held Weight", "Удержанный вес"), n("Unmoved", "Несдвинутый"), n("Quarry", "Каменоломня")],
  },
  {
    id: "love",
    label: "любовь",
    poles: [p([346, 356, 8], [30, 58], [28, 62]), p([32, 42], [36, 60], [40, 68]), p([218, 230], [16, 34], [28, 56])],
    names: [n("Kept Pulse", "Сдержанный пульс"), n("Warm Debt", "Тёплый долг"), n("Open Vein", "Открытая жила"), n("Quiet Vow", "Тихий обет")],
  },
  {
    id: "pride",
    label: "гордость",
    poles: [p([36, 46], [38, 64], [24, 50]), p([350, 358], [32, 56], [16, 36]), p([40, 48], [8, 20], [64, 82])],
    names: [n("Gold Spine", "Золотой хребет"), n("Unbent", "Несогнутый"), n("Jambalaya", "Джамбалайя"), n("High Seat", "Высокое место")],
  },
  {
    id: "silence",
    label: "тишина",
    poles: [p([92, 110], [4, 16], [48, 78]), p([200, 214], [4, 14], [40, 72]), p([30, 40], [4, 10], [70, 88])],
    names: [n("Held Tongue", "Прикушенный язык"), n("Empty Choir", "Пустой хор"), n("Willow Grove", "Ивовая роща"), n("Still Page", "Неподвижная страница")],
  },
  {
    id: "fear",
    label: "страх",
    poles: [p([68, 84], [16, 40], [16, 40]), p([262, 278], [14, 32], [14, 36]), p([40, 50], [6, 16], [62, 82])],
    names: [n("Wrong Step", "Неверный шаг"), n("Cold Stomach", "Холод в желудке"), n("Back Stair", "Задняя лестница"), n("Pale Wait", "Бледное ожидание")],
  },
  {
    id: "loyalty",
    label: "верность",
    poles: [p([216, 230], [18, 42], [16, 42]), p([24, 34], [16, 36], [20, 44]), p([210, 220], [8, 18], [28, 50])],
    names: [n("Steel Oath", "Стальная клятва"), n("Kept Watch", "Несменный дозор"), n("Oak Bond", "Дубовая связь"), n("Same Road", "Та же дорога")],
  },
  {
    id: "longing",
    label: "тоска",
    poles: [p([258, 276], [12, 34], [26, 52]), p([38, 48], [14, 32], [36, 58]), p([204, 218], [10, 24], [30, 56])],
    names: [n("Dusty Distance", "Пыльная даль"), n("Unsent", "Неотправленное"), n("Low Window", "Низкое окно"), n("Rain Room", "Комната дождя")],
  },
  {
    id: "shame",
    label: "стыд",
    poles: [p([6, 16, 24], [20, 48], [22, 48]), p([18, 28], [16, 32], [16, 36]), p([330, 344], [14, 30], [28, 50])],
    names: [n("Hot Ear", "Горячее ухо"), n("Lowered Gaze", "Опущенный взгляд"), n("Spicy Mix", "Пряная смесь"), n("Hidden Collar", "Скрытый ворот")],
  },
  {
    id: "hope",
    label: "надежда",
    poles: [p([44, 56], [28, 52], [48, 74]), p([88, 104], [18, 40], [42, 68]), p([12, 22], [16, 32], [58, 80])],
    names: [n("First Light", "Первый свет"), n("Thin Gold", "Тонкое золото"), n("Mongoose", "Мангуст"), n("Unspent", "Неистраченное")],
  },
  {
    id: "lie",
    label: "ложь",
    poles: [p([50, 68], [6, 22], [48, 76]), p([196, 210], [4, 14], [58, 82]), p([72, 88], [10, 26], [40, 64])],
    names: [n("Pale Mercury", "Бледная ртуть"), n("Twice Said", "Сказано дважды"), n("False Pearl", "Фальшивая жемчужина"), n("Sweet Ink", "Сладкие чернила")],
  },
  {
    id: "honor",
    label: "честь",
    poles: [p([226, 238], [12, 32], [16, 40]), p([38, 46], [8, 22], [62, 84]), p([24, 34], [18, 38], [22, 44])],
    names: [n("Clean Iron", "Чистое железо"), n("Ivory Seal", "Костяная печать"), n("Unbought", "Некупленный"), n("Straight Edge", "Прямой край")],
  },
  {
    id: "tenderness",
    label: "нежность",
    poles: [p([10, 20, 32], [16, 36], [58, 84]), p([340, 352], [12, 26], [62, 84]), p([28, 36], [6, 16], [66, 86])],
    names: [n("Soft Debt", "Мягкий долг"), n("Bare Wrist", "Голое запястье"), n("Quiet Heat", "Тихое тепло"), n("Milk Light", "Молочный свет")],
  },
  {
    id: "fury",
    label: "ярость",
    poles: [p([4, 12], [48, 74], [18, 42]), p([18, 28], [52, 78], [28, 50]), p([0, 8], [20, 40], [8, 22])],
    names: [n("Open Ember", "Открытый уголь"), n("Torn Scarlet", "Рваный алый"), n("Hot Iron", "Горячее железо"), n("No Bridle", "Без узды")],
  },
  {
    id: "cold",
    label: "холод",
    poles: [p([196, 210, 222], [8, 28], [48, 82]), p([180, 192], [4, 14], [70, 90]), p([150, 168], [6, 16], [36, 60])],
    names: [n("Glass Frost", "Стеклянный иней"), n("Blue Room", "Синяя комната"), n("Dead Green", "Мёртвая зелень"), n("Held Winter", "Удержанная зима")],
  },
  {
    id: "hunger",
    label: "голод",
    poles: [p([32, 42], [18, 40], [28, 52]), p([40, 50], [6, 16], [62, 82]), p([20, 28], [8, 18], [18, 36])],
    names: [n("Hollow Plate", "Пустая тарелка"), n("Bone Broth", "Костный бульон"), n("Lean Gold", "Тощее золото"), n("Unfed", "Некормленный")],
  },
  {
    id: "peace",
    label: "покой",
    poles: [p([88, 104], [8, 22], [46, 72]), p([36, 46], [8, 18], [68, 88]), p([206, 220], [8, 20], [36, 62])],
    names: [n("Even Breath", "Ровный вдох"), n("Closed Book", "Закрытая книга"), n("Still Water", "Стоячая вода"), n("Noon Shade", "Полуденная тень")],
  },
  {
    id: "guilt",
    label: "вина",
    poles: [p([8, 18], [18, 40], [14, 34]), p([32, 42], [16, 34], [22, 44]), p([230, 246], [8, 20], [16, 36])],
    names: [n("Old Stain", "Старое пятно"), n("Heavy Pew", "Тяжёлая скамья"), n("Unsaid Name", "Несказанное имя"), n("Night Ledger", "Ночная ведомость")],
  },
  {
    id: "revenge",
    label: "месть",
    poles: [p([12, 22], [34, 58], [18, 38]), p([214, 226], [10, 26], [16, 36]), p([342, 354], [28, 50], [16, 34])],
    names: [n("Slow Rust", "Медленная ржавчина"), n("Cold Return", "Холодный возврат"), n("Kept Blade", "Придержанный клинок"), n("Long Account", "Длинный счёт")],
  },
  {
    id: "envy",
    label: "зависть",
    poles: [p([82, 98], [28, 52], [22, 46]), p([48, 60], [24, 44], [36, 56]), p([168, 184], [16, 34], [16, 38])],
    names: [n("Acid Glance", "Кислотный взгляд"), n("Borrowed Green", "Заёмная зелень"), n("Jaundice", "Желтуха"), n("Other's Gold", "Чужое золото")],
  },
  {
    id: "duty",
    label: "долг",
    poles: [p([220, 232], [6, 18], [16, 38]), p([26, 36], [12, 28], [22, 44]), p([0, 20], [2, 8], [10, 28])],
    names: [n("Iron Column", "Железная колонна"), n("Ledger Brown", "Бурый реестр"), n("Unpaid", "Неоплаченный"), n("Same Hour", "Тот же час")],
  },
  {
    id: "power",
    label: "власть",
    poles: [p([272, 288], [16, 40], [14, 36]), p([38, 48], [32, 58], [28, 50]), p([24, 32], [4, 12], [8, 24])],
    names: [n("Deep Seat", "Глубокое кресло"), n("Coin Shadow", "Тень монеты"), n("Closed Door", "Закрытая дверь"), n("Purple Hem", "Пурпурный подол")],
  },
  {
    id: "solitude",
    label: "одиночество",
    poles: [p([210, 224], [8, 22], [28, 54]), p([24, 34], [28, 50], [32, 52]), p([40, 50], [2, 8], [70, 90])],
    names: [n("One Lamp", "Одна лампа"), n("Empty Coat", "Пустое пальто"), n("Spare Chair", "Лишний стул"), n("Far Street", "Дальняя улица")],
  },
  {
    id: "mercy",
    label: "милость",
    poles: [p([40, 52], [18, 38], [52, 76]), p([8, 18], [12, 26], [60, 82]), p([196, 210], [8, 20], [48, 72])],
    names: [n("Open Palm", "Открытая ладонь"), n("Rain Gold", "Дождевое золото"), n("Soft Verdict", "Мягкий приговор"), n("Unclenched", "Разжатый")],
  },
  {
    id: "madness",
    label: "безумие",
    poles: [p([300, 318], [28, 56], [28, 54]), p([72, 88], [30, 54], [32, 56]), p([48, 58], [40, 70], [48, 72])],
    names: [n("Wrong Music", "Неверная музыка"), n("Bright Fever", "Яркая лихорадка"), n("Broken Step", "Сбитый шаг"), n("Too Much Light", "Слишком много света")],
  },
  {
    id: "jealousy",
    label: "ревность",
    poles: [p([88, 102], [22, 46], [20, 42]), p([348, 358], [28, 52], [18, 38]), p([312, 328], [16, 34], [18, 36])],
    names: [n("Watching Green", "Стерегущая зелень"), n("Tight Ring", "Тусклое кольцо"), n("Other Door", "Чужая дверь"), n("Night Count", "Ночной счёт")],
  },
  {
    id: "fire",
    label: "огонь",
    poles: [p([18, 28, 36], [48, 76], [28, 54]), p([8, 16], [10, 24], [8, 22]), p([40, 48], [8, 20], [74, 90])],
    names: [n("Hearth Tongue", "Язык очага"), n("Charcoal", "Древесный уголь"), n("White Heat", "Белый жар"), n("Live Coal", "Живой уголёк")],
  },
  {
    id: "water",
    label: "вода",
    poles: [p([186, 200], [18, 44], [28, 56]), p([220, 234], [16, 36], [12, 32]), p([40, 50], [4, 12], [72, 90])],
    names: [n("Deep Current", "Глубокое течение"), n("Well Dark", "Тьма колодца"), n("Foam Edge", "Край пены"), n("Wet Stone", "Мокрый камень")],
  },
];

const ROLES = ["Тень", "Кожа", "Пятно", "Акцент", "Свет"] as const;

const HARMONY_NOTE: Record<Harmony, string> = {
  dominion: "Первая черта держит остальные, как старший в роду.",
  clash: "Акцент взят наперекор: пятно спорит с тенью.",
  veil: "Светлая черта покрывает шкалу дымкой — цвета слышат друг друга сквозь неё.",
  split: "Палитра рвётся на два полюса; середина — место, где они не помирились.",
  bind: "Пять пятен держатся одного хребта и только слегка расходятся.",
  echo: "Одна черта красится нравом других: тот же тон, чужая плотность.",
};

const SLOT_LIGHT = [16, 30, 44, 36, 76];

type Hsl = { h: number; s: number; l: number };

function clamp(n: number, min: number, max: number) {
  return Math.min(max, Math.max(min, n));
}

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

function rand() {
  return Math.random();
}

function rrange(min: number, max: number) {
  return min + rand() * (max - min);
}

function mixHue(a: number, b: number, t: number) {
  const d = ((b - a + 540) % 360) - 180;
  return (a + d * t + 360) % 360;
}

function hueDist(a: number, b: number) {
  return Math.abs(((a - b + 540) % 360) - 180);
}

function hslToHex(h: number, s: number, l: number): string {
  const hue = ((h % 360) + 360) % 360;
  const sat = clamp(s, 0, 100) / 100;
  const lig = clamp(l, 0, 100) / 100;
  const k = (n: number) => (n + hue / 30) % 12;
  const a = sat * Math.min(lig, 1 - lig);
  const f = (n: number) =>
    lig - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)));
  const to = (x: number) =>
    Math.round(255 * x)
      .toString(16)
      .padStart(2, "0");
  return `#${to(f(0))}${to(f(8))}${to(f(4))}`;
}

function onDark(hex: string): boolean {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255 < 0.48;
}

function samplePole(pole: Pole): Hsl {
  return {
    h: pick([...pole.h]) + rrange(-14, 14),
    s: rrange(pole.s[0], pole.s[1]),
    l: rrange(pole.l[0], pole.l[1]),
  };
}

function pairKey(a: string, b: string) {
  return a < b ? `${a}|${b}` : `${b}|${a}`;
}

function firstWord(name: string) {
  return name.split(" ")[0] ?? name;
}

function lastWord(name: string) {
  const parts = name.split(" ");
  return parts[parts.length - 1] ?? name;
}

type Reaction = (c: Hsl, slot: number) => Hsl;

const REACTIONS: Record<string, Reaction> = {
  "air|stone": (c, i) =>
    i === 2 ? { ...c, s: c.s * 0.45, h: mixHue(c.h, 210, 0.25) } : { ...c, s: c.s * 0.82 },
  "love|malice": (c, i) =>
    i === 2 || i === 3
      ? { ...c, h: mixHue(c.h, 322, 0.55), s: c.s + 8, l: c.l - 4 }
      : { ...c, h: mixHue(c.h, 340, 0.12) },
  "despair|hope": (c, i) =>
    i === 0
      ? { ...c, l: c.l * 0.55, s: c.s * 0.7 }
      : i === 4
        ? { ...c, h: mixHue(c.h, 48, 0.5), s: c.s + 6, l: Math.max(c.l, 68) }
        : { ...c, h: mixHue(c.h, i % 2 ? 50 : 230, 0.2) },
  "honor|lie": (c, i) =>
    i === 3 ? { ...c, s: Math.max(8, c.s * 0.35), l: clamp(c.l + 18, 40, 88) } : c,
  "fear|pride": (c, i) =>
    i === 3 ? { ...c, h: mixHue(c.h, 46, 0.6), s: c.s + 12, l: c.l + 4 } : c,
  "fire|water": (c, i) =>
    i === 2
      ? { ...c, h: mixHue(c.h, 40, 0.3), s: c.s * 0.28, l: 52 + rrange(-6, 6) }
      : i === 0
        ? { ...c, h: mixHue(c.h, 220, 0.4), l: c.l * 0.7 }
        : c,
  "cold|love": (c, i) =>
    i === 1 || i === 2 ? { ...c, h: mixHue(c.h, 330, 0.35), s: c.s * 0.75 } : c,
  "fury|silence": (c, i) =>
    i === 3
      ? { ...c, h: mixHue(c.h, 8, 0.7), s: clamp(c.s + 18, 0, 80) }
      : { ...c, s: c.s * 0.9 },
  "envy|love": (c) => ({ ...c, h: mixHue(c.h, 92, 0.28), s: c.s + 4 }),
  "guilt|mercy": (c, i) =>
    i === 4
      ? { ...c, h: mixHue(c.h, 42, 0.4), l: Math.max(c.l, 64) }
      : { ...c, s: c.s * 0.88 },
  "duty|revenge": (c, i) =>
    i === 0 ? { ...c, l: c.l * 0.7, s: c.s * 0.8 } : { ...c, h: mixHue(c.h, 14, 0.18) },
  "power|tenderness": (c, i) =>
    i === 2 ? { ...c, h: mixHue(c.h, 320, 0.4), s: c.s * 0.7 } : c,
  "madness|peace": (c, i) =>
    i % 2 === 0
      ? { ...c, s: c.s * 0.55 }
      : { ...c, s: clamp(c.s + 16, 0, 78), h: c.h + rrange(-20, 20) },
  "hunger|pride": (c, i) =>
    i === 3 ? { ...c, h: mixHue(c.h, 42, 0.5), s: c.s + 10 } : { ...c, l: c.l * 0.92 },
  "jealousy|loyalty": (c, i) =>
    i === 1 || i === 2 ? { ...c, h: mixHue(c.h, 96, 0.4), s: c.s + 6 } : c,
  "solitude|fire": (c, i) =>
    i === 3
      ? { ...c, h: mixHue(c.h, 22, 0.65), s: c.s + 14, l: c.l + 6 }
      : { ...c, s: c.s * 0.78 },
  "shame|hope": (c, i) =>
    i === 2 ? { ...c, h: mixHue(c.h, 18, 0.45), s: c.s + 8 } : c,
  "cold|fury": (c, i) =>
    i === 2 ? { ...c, s: c.s * 0.3, h: mixHue(c.h, 200, 0.4), l: 42 } : c,
  "water|stone": (c) => ({ ...c, s: c.s * 0.7, h: mixHue(c.h, 200, 0.2) }),
  "air|fire": (c, i) =>
    i === 4
      ? { ...c, h: mixHue(c.h, 36, 0.35), l: Math.max(c.l, 72), s: c.s * 0.5 }
      : c,
  "despair|malice": (c, i) =>
    i === 0
      ? { ...c, l: Math.min(c.l, 14), s: c.s * 0.85 }
      : { ...c, h: mixHue(c.h, 300, 0.12) },
  "longing|solitude": (c) => ({ ...c, h: mixHue(c.h, 250, 0.3), s: c.s * 0.8 }),
  "lie|madness": (c, i) =>
    i === 3 ? { ...c, h: c.h + rrange(40, 80), s: clamp(c.s + 14, 0, 70) } : c,
};

function applyReactions(c: Hsl, slot: number, ids: string[]): Hsl {
  let next = c;
  for (let i = 0; i < ids.length; i++) {
    for (let j = i + 1; j < ids.length; j++) {
      const fn = REACTIONS[pairKey(ids[i]!, ids[j]!)];
      if (fn) next = fn(next, slot);
    }
  }
  return next;
}

function applyHarmony(
  c: Hsl,
  slot: number,
  harmony: Harmony,
  spine: number,
  poles: Hsl[],
): Hsl {
  const dark = poles.reduce((a, b) => (a.l <= b.l ? a : b));
  const light = poles.reduce((a, b) => (a.l >= b.l ? a : b));
  const loud = poles.reduce((a, b) => (a.s >= b.s ? a : b));
  switch (harmony) {
    case "dominion":
      return { ...c, h: mixHue(c.h, poles[0]!.h, 0.38 + slot * 0.04) };
    case "clash":
      return slot === 3
        ? { ...c, h: mixHue(c.h, (loud.h + 180 + rrange(-22, 22)) % 360, 0.72), s: clamp(c.s + 10, 0, 78) }
        : { ...c, h: mixHue(c.h, spine, 0.15) };
    case "veil":
      return {
        h: mixHue(c.h, light.h, 0.22),
        s: c.s * 0.78,
        l: lerp(c.l, light.l, 0.18),
      };
    case "split":
      return slot <= 1
        ? { ...c, h: mixHue(c.h, dark.h, 0.45), l: c.l * 0.86 }
        : slot >= 3
          ? { ...c, h: mixHue(c.h, light.h, 0.45), l: Math.max(c.l, light.l * 0.7) }
          : { h: mixHue(dark.h, light.h, 0.5), s: (dark.s + light.s) * 0.35, l: 40 + rrange(-6, 6) };
    case "bind": {
      const offsets = [-42, -16, 4, 28, 52];
      return { ...c, h: (spine + offsets[slot]! + rrange(-8, 8) + 360) % 360 };
    }
    case "echo":
      return { h: mixHue(spine, c.h, 0.18), s: c.s, l: c.l };
  }
}

function separate(colors: Hsl[]): Hsl[] {
  const next = colors.map((c) => ({ ...c }));
  for (let i = 1; i < next.length; i++) {
    const prev = next[i - 1]!;
    const cur = next[i]!;
    if (hueDist(prev.h, cur.h) < 12 && Math.abs(prev.l - cur.l) < 10) {
      cur.h = (cur.h + rrange(18, 40)) % 360;
      cur.l = clamp(cur.l + (i % 2 === 0 ? -8 : 8), 6, 90);
    }
    if (Math.abs(prev.l - cur.l) < 5) {
      cur.l = clamp(cur.l + (i === 4 ? 10 : 7), 6, 90);
    }
  }
  return next;
}

function pickName(
  owner: PaletteKeyword,
  stain: PaletteKeyword | undefined,
  used: Set<string>,
): { en: string; ru: string } {
  const compound = stain && rand() < 0.42;
  if (compound && stain) {
    const a = pick([...owner.names]);
    const b = pick([...stain.names]);
    const en = `${firstWord(a.en)} ${lastWord(b.en)}`;
    const ru = `${firstWord(a.ru)} ${lastWord(b.ru)}`;
    if (!used.has(en) && firstWord(a.en) !== lastWord(b.en)) {
      used.add(en);
      return { en, ru };
    }
  }
  const pool = owner.names.filter((item) => !used.has(item.en));
  const chosen = pick(pool.length > 0 ? pool : [...owner.names]);
  used.add(chosen.en);
  return chosen;
}

function ownersFor(
  keys: PaletteKeyword[],
  poles: Hsl[],
): { owner: PaletteKeyword; stain: PaletteKeyword }[] {
  const darkIdx = poles.reduce((best, _, i, arr) => (arr[i]!.l < arr[best]!.l ? i : best), 0);
  const lightIdx = poles.reduce((best, _, i, arr) => (arr[i]!.l > arr[best]!.l ? i : best), 0);
  const loudIdx = poles.reduce((best, _, i, arr) => (arr[i]!.s > arr[best]!.s ? i : best), 0);
  const nKeys = keys.length;
  const randIdx = () => Math.floor(rand() * nKeys);
  const shadow = rand() < 0.62 ? darkIdx : randIdx();
  const light = rand() < 0.62 ? lightIdx : randIdx();
  const accent = rand() < 0.55 ? loudIdx : randIdx();
  const midA = randIdx();
  const midB = randIdx();
  const ownerIdx = [shadow, midA, midB, accent, light];
  return ownerIdx.map((idx, slot) => {
    const owner = keys[idx]!;
    const stain = keys[(idx + 1 + (slot % nKeys)) % nKeys]!;
    return { owner, stain };
  });
}

export function generatePalette(keywordIds: string[]): Manuscript {
  const chosen = PALETTE_KEYWORDS.filter((kw) => keywordIds.includes(kw.id));
  const keys = chosen.length > 0 ? chosen : [PALETTE_KEYWORDS[0]!];
  const labels = keys.map((k) => k.label);
  const ids = keys.map((k) => k.id);

  const poles = keys.map((k) => samplePole(pick([...k.poles])));
  const spine = poles.reduce((sum, p) => mixHue(sum, p.h, 0.5), poles[0]!.h);
  const harmony = pick([
    "dominion",
    "clash",
    "veil",
    "split",
    "bind",
    "echo",
  ] as const);
  const temp = rrange(-16, 16);
  const satMul = rrange(0.72, 1.22);
  const spread = rrange(0.72, 1.28);
  const invert = rand() < 0.1;
  const assignments = ownersFor(keys, poles);
  const usedNames = new Set<string>();

  const raw: Hsl[] = SLOT_LIGHT.map((baseL, slot) => {
    const { owner } = assignments[slot]!;
    const ownerPole = poles[keys.indexOf(owner)] ?? poles[0]!;
    const stainPole = poles[(keys.indexOf(owner) + 1) % poles.length]!;
    const mixT = rrange(0.12, 0.52);
    let h = mixHue(ownerPole.h, stainPole.h, mixT);
    let s = lerp(ownerPole.s, stainPole.s, mixT * 0.6) * satMul;
    let targetL = invert ? 92 - baseL : baseL;
    targetL = 50 + (targetL - 50) * spread;
    let l = lerp(ownerPole.l, targetL, 0.62) + rrange(-9, 9);

    if (keys.length === 3 && slot === 2) {
      h = mixHue(mixHue(poles[0]!.h, poles[1]!.h, 0.5), poles[2]!.h, 0.33);
      s = (poles[0]!.s + poles[1]!.s + poles[2]!.s) / 3;
    }

    h = (h + temp + rrange(-18, 18) + 360) % 360;
    s = clamp(s + rrange(-11, 11), 3, 78);
    l = clamp(l, 6, 90);

    let color = applyHarmony({ h, s, l }, slot, harmony, spine, poles);
    color = applyReactions(color, slot, ids);
    color.h = (color.h + 360) % 360;
    color.s = clamp(color.s, 3, 80);
    color.l = clamp(color.l, 6, 92);
    return color;
  });

  const colorsHsl = separate(raw);
  const colors: Swatch[] = colorsHsl.map((c, slot) => {
    const { owner, stain } = assignments[slot]!;
    const name = pickName(owner, stain !== owner ? stain : undefined, usedNames);
    const hex = hslToHex(c.h, c.s, c.l);
    return {
      nameEn: name.en,
      nameRu: name.ru,
      hex,
      role: ROLES[slot]!,
      onDark: onDark(hex),
    };
  });

  const wordList =
    labels.length === 1
      ? labels[0]
      : labels.length === 2
        ? `${labels[0]} и ${labels[1]}`
        : `${labels[0]}, ${labels[1]} и ${labels[2]}`;

  const blocks = [
    {
      kind: "p" as const,
      text:
        labels.length === 3
          ? `Три черты — ${wordList}. Они не складываются поровну: спорят, пятнают друг друга, тянут шкалу в свою сторону. Пять пятен — тень, кожа, пятно, акцент и свет — выходят иначе при каждом прочтении.`
          : `Черты — ${wordList}. Палитра собрана заново: тот же нрав, другой свет.`,
    },
    { kind: "swatches" as const, colors },
    {
      kind: "aside" as const,
      label: "Связь",
      body: HARMONY_NOTE[harmony],
    },
  ];

  const title = wordList ? `Палитра · ${wordList}` : "Палитра";
  return {
    chapter: "Глава V",
    kicker: "Черты спорят на бумаге",
    title,
    blocks,
    plainText: toPlainText(title, blocks),
  };
}
