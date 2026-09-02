import {
  pick,
  sample,
  toPlainText,
  type HeroGender,
  type HeroProfile,
  type Manuscript,
  type NameCard,
} from "@/lib/generators";

type NameSeed = {
  en: string;
  ru: string;
  gender: HeroGender;
  invented: boolean;
  meaning: string;
  origin: string;
  nickEn: string;
  nickRu: string;
  context: string;
};

const NAMES: readonly NameSeed[] = [
  {
    en: "Ilya",
    ru: "Илья",
    gender: "m",
    invented: false,
    meaning: "«Господь мой Яхве»; в русском ухе — тихое упрямство и деревенский гром.",
    origin: "библейское / восточнославянское, через Илью-пророка.",
    nickEn: "Illy, Ily",
    nickRu: "Илья, Илюша, Иль",
    context: "Герой, которого зовут коротко и не formal: поле, двор, дорога, не салон.",
  },
  {
    en: "Rowan",
    ru: "Роуэн",
    gender: "m",
    invented: false,
    meaning: "рябина; дерево, которым в кельтских краях отгоняли худое.",
    origin: "гэльское / шотландское, имя-дерево.",
    nickEn: "Ro, Row",
    nickRu: "Ро, Роу, Рон",
    context: "Лесник, изгой, человек с рыжим отсветом в волосах — или тот, кого так прозвали.",
  },
  {
    en: "Soren",
    ru: "Сорен",
    gender: "m",
    invented: false,
    meaning: "«суровый», «строгий»; звучит как холодный ум в тёплой комнате.",
    origin: "датское / скандинавское (Søren), от лат. severus.",
    nickEn: "Sor, Ren",
    nickRu: "Сор, Рен, Сёра",
    context: "Учёный, следователь, молчаливый наследник северного дома.",
  },
  {
    en: "Caspian",
    ru: "Каспиан",
    gender: "m",
    invented: false,
    meaning: "от Каспийского моря; имя, в котором слышна вода и даль.",
    origin: "географическое / литературное (укоренилось в английском как имя).",
    nickEn: "Cas, Cass",
    nickRu: "Кас, Кася, Пиан",
    context: "Путешественник, принц с чужим морем в роду, человек, которого нельзя удержать в городе.",
  },
  {
    en: "Leander",
    ru: "Леандр",
    gender: "m",
    invented: false,
    meaning: "«лев-человек»; миф о пловце, который тонул ради любви.",
    origin: "древнегреческое (Leandros).",
    nickEn: "Leo, Lea, Ander",
    nickRu: "Лео, Леша (редко), Андр",
    context: "Романтический риск, дуэль, переправа ночью — имя, которое обязывает к жесту.",
  },
  {
    en: "Osip",
    ru: "Осип",
    gender: "m",
    invented: false,
    meaning: "русский Иосиф — «Бог прибавит»; сухое, как сукно, и очень старое.",
    origin: "еврейское через церковнославянское.",
    nickEn: "Os, Sip",
    nickRu: "Ося, Осипка, Сип",
    context: "Дворник, писец, купец, человек из прошлого века, живущий в этом.",
  },
  {
    en: "Vesperin",
    ru: "Весперин",
    gender: "m",
    invented: true,
    meaning: "от vesper — вечерня; «тот, кого зовут, когда гаснет день».",
    origin: "вымышлено для этой книги: латынь vesper + суффикс -in.",
    nickEn: "Ves, Perry, Rin",
    nickRu: "Вес, Перин, Рин",
    context: "Священник без сана, ночной писец, человек, который лучше всего думает в сумерках.",
  },
  {
    en: "Thornel",
    ru: "Торнел",
    gender: "m",
    invented: true,
    meaning: "терновник; имя-изгородь — колет, держит границу, не пускает внутрь.",
    origin: "вымышлено: англ. thorn + уменьшительный -el.",
    nickEn: "Thorn, Nel, Tor",
    nickRu: "Торн, Нел, Торя",
    context: "Страж, охотник, человек с жёстким именем, которое не ласкают при дворе.",
  },
  {
    en: "Morvain",
    ru: "Морвейн",
    gender: "m",
    invented: true,
    meaning: "море + пустота (vain); «напрасное море» — странник, которому не к чему пристать.",
    origin: "вымышлено: кельтское mor «море» и франц. vain.",
    nickEn: "Mor, Vain, Morr",
    nickRu: "Мор, Вейн, Моря",
    context: "Изгнанник, капитан без корабля, герой, чья биография написана на воде.",
  },
  {
    en: "Solmir",
    ru: "Сольмир",
    gender: "m",
    invented: true,
    meaning: "соль + мир, или солнце + мир; имя-договор: сохранить покой ценой горечи.",
    origin: "вымышлено в славянском ключе: соль/солнце + мир.",
    nickEn: "Sol, Mir",
    nickRu: "Соль, Мир, Солик",
    context: "Миротворец с тяжёлой рукой, князь маленькой земли, человек, которого боятся за справедливость.",
  },
  {
    en: "Caldrin",
    ru: "Калдрин",
    gender: "m",
    invented: true,
    meaning: "от cauldron — котёл; «тот, в ком всё варится».",
    origin: "вымышлено: англ. cauldron, обрезанный до имени.",
    nickEn: "Cal, Rin, Ald",
    nickRu: "Кал, Рин, Альдин",
    context: "Алхимик, повар при дворе, человек, вокруг которого всегда жар и шёпот.",
  },
  {
    en: "Kaelith",
    ru: "Келит",
    gender: "m",
    invented: true,
    meaning: "от cael- «небо» и -lith «камень»: небесный камень, упавший и остывший.",
    origin: "вымышлено: лат. caelum + греч. lithos.",
    nickEn: "Kae, Lith, Kel",
    nickRu: "Кей, Лит, Келя",
    context: "Молчаливый чужак, учёный камней, герой, которого считают не совсем человеком.",
  },
  {
    en: "Elowen",
    ru: "Элоуэн",
    gender: "f",
    invented: false,
    meaning: "«вяз» по-корнуоллски; имя-дерево, гибкое и упрямое.",
    origin: "корнуоллское, женское.",
    nickEn: "Ellie, El, Wen",
    nickRu: "Элли, Эль, Уэн",
    context: "Лесная наследница, тихая колдунья, девушка, чьё имя звучит как заклинание, но держится просто.",
  },
  {
    en: "Vera",
    ru: "Вера",
    gender: "f",
    invented: false,
    meaning: "вера; одно из коротких русских имён, которые не размениваются на ласку зря.",
    origin: "русское / церковнославянское, греч. pistis в переводе.",
    nickEn: "Vee",
    nickRu: "Верочка, Веруня, Вера",
    context: "Сестра, свидетельница, женщина, на чьё слово опирается дом.",
  },
  {
    en: "Isolde",
    ru: "Изольда",
    gender: "f",
    invented: false,
    meaning: "спорная этимология: «льдистая» или «справедливая»; имя мифа о любовном яде.",
    origin: "кельтское / германское, через легенду о Тристане.",
    nickEn: "Izzy, Isol, Solde",
    nickRu: "Иза, Зольда, Изо",
    context: "Запретная любовь, двор, корабль — имя, которое уже несёт сюжет, пока героиня молчит.",
  },
  {
    en: "Maeve",
    ru: "Мейв",
    gender: "f",
    invented: false,
    meaning: "«опьяняющая»; имя королевы, которая вела войны из-за быка и гордости.",
    origin: "ирландское (Medb / Méabh).",
    nickEn: "Mae, Vee",
    nickRu: "Мей, Ви, Мева",
    context: "Воительница, хозяйка дома, женщина, которую не просят — ей докладывают.",
  },
  {
    en: "Lyra",
    ru: "Лира",
    gender: "f",
    invented: false,
    meaning: "лира; созвездие и инструмент — имя, которое поёт, даже когда молчат.",
    origin: "греческое, через астрономию.",
    nickEn: "Ly, Lye",
    nickRu: "Лира, Лирочка, Ли",
    context: "Музыкантша, астроном, девочка с картой неба вместо приданого.",
  },
  {
    en: "Nadia",
    ru: "Надя",
    gender: "f",
    invented: false,
    meaning: "надежда; короткое, домашнее, способное выдержать зиму.",
    origin: "русское, от Надежда; вошло и в европейские языки.",
    nickEn: "Nad, Dia, Nadi",
    nickRu: "Надя, Надежда, Надюша",
    context: "Сестра, медсестра, революционерка — имя без бархата, с хребтом.",
  },
  {
    en: "Sylvara",
    ru: "Сильвара",
    gender: "f",
    invented: true,
    meaning: "от silva — лес; «та, что принадлежит чаще, а не улице».",
    origin: "вымышлено: лат. silva + женское -ara.",
    nickEn: "Syl, Vara, Silva",
    nickRu: "Силь, Вара, Сильва",
    context: "Охотница, лесная ведьма, дама, которую в городе считают провинциалкой — к своей беде.",
  },
  {
    en: "Vellara",
    ru: "Веллара",
    gender: "f",
    invented: true,
    meaning: "от velum — покрывало, парус; «скрытая» или «надутая ветром».",
    origin: "вымышлено: лат. velum + -ara.",
    nickEn: "Vella, Lara, Vel",
    nickRu: "Велла, Лара, Веля",
    context: "Невеста с тайной, актриса, женщина, которую видят сквозь ткань — и ошибаются.",
  },
  {
    en: "Orinthia",
    ru: "Оринтия",
    gender: "f",
    invented: true,
    meaning: "от ornis — птица; имя с крылом в середине.",
    origin: "вымышлено: греч. ornis, оформлено как античное женское.",
    nickEn: "Ori, Rin, Thia",
    nickRu: "Ори, Риня, Тия",
    context: "Посланница, шпионка, девушка, которую нельзя посадить в комнату без окна.",
  },
  {
    en: "Lumira",
    ru: "Люмира",
    gender: "f",
    invented: true,
    meaning: "lux + mira — «дивный свет»; не святой, а странный.",
    origin: "вымышлено: лат. lux и mirus.",
    nickEn: "Lu, Mira, Lumi",
    nickRu: "Лю, Мира, Люми",
    context: "Целительница, еретичка, женщина, возле которой лампам делается стыдно.",
  },
  {
    en: "Caelis",
    ru: "Келис",
    gender: "f",
    invented: true,
    meaning: "от caelum — небо; короткое, как вдох перед прыжком.",
    origin: "вымышлено: лат. caelum, обрезанное до имени.",
    nickEn: "Cae, Lis, Cel",
    nickRu: "Кея, Лис, Сель",
    context: "Авиатор в любом веке, астролог, холодный ум в светлом платье.",
  },
  {
    en: "Mirenka",
    ru: "Миренка",
    gender: "f",
    invented: true,
    meaning: "мир + ласкательное -енка; «маленький мир», который носят в кармане.",
    origin: "вымышлено в славянском ключе: мир + уменьшительный суффикс.",
    nickEn: "Mira, Ren, Miri",
    nickRu: "Мира, Ренка, Миша (дома)",
    context: "Младшая сестра, деревенская ведунья, девочка, чьё имя взрослые произносят слишком нежно — и ошибаются в силе.",
  },
  {
    en: "Sage",
    ru: "Сейдж",
    gender: "u",
    invented: false,
    meaning: "шалфей и мудрец сразу; горькая трава, ясная голова.",
    origin: "английское слово-имя.",
    nickEn: "Say",
    nickRu: "Сей, Саша (если нужно обрусеть)",
    context: "Лекарь, советник, человек без явного рода в анкете — и это часть характера.",
  },
  {
    en: "Wren",
    ru: "Рен",
    gender: "u",
    invented: false,
    meaning: "крапивник — маленькая птица с большой песней.",
    origin: "английское имя-птица.",
    nickEn: "Wrenny",
    nickRu: "Рен, Рени",
    context: "Разведчик, ребёнок на крыше, герой, которого не замечают, пока не станет поздно.",
  },
  {
    en: "Ash",
    ru: "Эш",
    gender: "u",
    invented: false,
    meaning: "ясень и пепел; имя после пожара.",
    origin: "английское, от ash «ясень / пепел».",
    nickEn: "Ashy",
    nickRu: "Эш, Яша (если крестить по-русски)",
    context: "Выживший, угольщик, человек, который не говорит, откуда взялось короткое имя.",
  },
  {
    en: "Greyvorn",
    ru: "Грейворн",
    gender: "u",
    invented: true,
    meaning: "серый + ворон / worn — «серое, что носят»; имя-плащ.",
    origin: "вымышлено: grey + worn / vorn.",
    nickEn: "Grey, Vorn",
    nickRu: "Грей, Ворн, Серый",
    context: "Наёмник, архивариус, фигура, у которой цвет важнее лица.",
  },
  {
    en: "Nyssa",
    ru: "Нисса",
    gender: "u",
    invented: false,
    meaning: "род дерева (tupelo); в мифе — также имя, которое носили разные.",
    origin: "ботаническое / греческое географическое.",
    nickEn: "Nyss, Nia",
    nickRu: "Ниса, Няся",
    context: "Садовник, отравитель, человек, чьё имя пахнет листом и не держит род.",
  },
  {
    en: "Riven",
    ru: "Ривен",
    gender: "u",
    invented: true,
    meaning: "расколотый (riven); имя после разлома — семьи, страны, души.",
    origin: "вымышлено: англ. riven «расщеплённый».",
    nickEn: "Riv, Ven",
    nickRu: "Рив, Вен, Ривка",
    context: "Беглец, близнец без пары, герой, которого сюжет уже однажды сломал.",
  },
];

function cap(text: string) {
  if (!text) return text;
  return text.charAt(0).toUpperCase() + text.slice(1);
}

function toCard(seed: NameSeed): NameCard {
  return {
    display: `${seed.en} / ${seed.ru}`,
    meaning: cap(seed.meaning),
    origin: cap(seed.origin),
    nick: `${seed.nickEn} / ${seed.nickRu}`,
    context: seed.context,
    invented: seed.invented,
    ru: seed.ru,
  };
}

function poolFor(gender: HeroGender): NameSeed[] {
  if (gender === "u") return [...NAMES];
  const primary = NAMES.filter((n) => n.gender === gender || n.gender === "u");
  return primary;
}

export function generateNames(profile: HeroProfile): Manuscript {
  const pool = poolFor(profile.gender);
  const invented = pool.filter((n) => n.invented);
  const historical = pool.filter((n) => !n.invented);

  const chosen: NameSeed[] = [];
  chosen.push(...sample(historical, Math.min(3, historical.length)));
  chosen.push(...sample(invented, Math.min(2, invented.length)));

  const rest = pool.filter((n) => !chosen.includes(n));
  while (chosen.length < 5 && rest.length > 0) {
    const next = pick(rest);
    chosen.push(next);
    rest.splice(rest.indexOf(next), 1);
  }

  const cards = sample(chosen, Math.min(5, chosen.length)).map(toCard);
  const who = profile.name.trim();
  const title = who ? `Имена рядом с ${who}` : "Имена на выбор";

  const blocks = [
    {
      kind: "p" as const,
      text: who
        ? `Пять имён, которые могли бы стоять рядом с ${who} — в метрике, на письме, в чужой семье или на фальшивом паспорте. Через слэш — английский звук и русская запись. Среди них есть вымышленные: они не из святцев, они из этой книги.`
        : "Пять имён: живые и вымышленные. Английский звук / русская запись. Сокращения — как зовут дома и как кричат на улице. Вымышленные помечены: их не сыскать в святцах, только в этой тетради.",
    },
    ...cards.map((card) => ({ kind: "namecard" as const, card })),
    {
      kind: "aside" as const,
      label: "Заметка",
      body: "Вымышленное имя держится, если у него есть корень, который рот узнаёт. Не склеивайте слоги зря — дайте имени тень настоящего языка.",
    },
  ];

  return {
    chapter: "Глава VI",
    kicker: "Звук, корень и ласкательное",
    title,
    blocks,
    plainText: toPlainText(title, blocks),
  };
}
