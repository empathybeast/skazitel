import { useEffect, useMemo, useRef, useState } from "react";
import * as Tabs from "@radix-ui/react-tabs";
import {
  BookOpen,
  Check,
  Copy,
  GitBranch,
  Hourglass,
  KeyRound,
  Languages,
  Palette,
  PenLine,
  Sunrise,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { CornerMarks, Fleuron } from "@/components/ornaments";
import { cn } from "@/lib/utils";
import {
  generateDay,
  generateFate,
  generateRelations,
  generateSecrets,
  type FateYears,
  type HeroGender,
  type HeroProfile,
  type Manuscript,
  type NameCard,
  type Swatch,
  type TabId,
} from "@/lib/generators";
import { generateNames } from "@/lib/names";
import { generatePalette, PALETTE_KEYWORDS } from "@/lib/palette";

const STORAGE_KEY = "character-workshop:v2";

const CHAPTERS: {
  id: TabId;
  roman: string;
  label: string;
  short: string;
  blurb: string;
  icon: typeof GitBranch;
}[] = [
  {
    id: "relations",
    roman: "I",
    label: "Родословная",
    short: "Род",
    blurb:
      "Семья, долги, наставник, соперник, тайный ребёнок. Сеть, в которой держится герой.",
    icon: GitBranch,
  },
  {
    id: "day",
    roman: "II",
    label: "День из жизни",
    short: "День",
    blurb:
      "Подъём, стол, маршруты, привычки, разговоры и страх перед сном — без длинной биографии.",
    icon: Sunrise,
  },
  {
    id: "secrets",
    roman: "III",
    label: "Тайны",
    short: "Тайна",
    blurb:
      "Преступление, чужое имя, человек, которого нельзя встретить. То, что сильнее анкеты.",
    icon: KeyRound,
  },
  {
    id: "fate",
    roman: "IV",
    label: "Судьба",
    short: "Судьба",
    blurb:
      "Год, пятилетие, двадцать лет: брак, увечье, слава, ссылка. Герой стареет на странице.",
    icon: Hourglass,
  },
  {
    id: "palette",
    roman: "V",
    label: "Палитра",
    short: "Цвет",
    blurb:
      "До трёх черт из длинного списка. Они пятнают друг друга — и каждое прочтение той же тройки выходит иным.",
    icon: Palette,
  },
  {
    id: "names",
    roman: "VI",
    label: "Имена",
    short: "Имена",
    blurb:
      "Английский звук / русская запись, корень, ласкательное. Среди них — имена, которых нет в святцах.",
    icon: Languages,
  },
];

const GENDERS: { id: HeroGender; label: string }[] = [
  { id: "m", label: "Мужской" },
  { id: "f", label: "Женский" },
  { id: "u", label: "Не указан" },
];

const FATE_YEARS: { years: FateYears; label: string }[] = [
  { years: 1, label: "I год" },
  { years: 5, label: "V лет" },
  { years: 20, label: "XX лет" },
];

const GENERATE_LABEL: Record<Exclude<TabId, "fate">, string> = {
  relations: "Вывести окружение",
  day: "Прожить день",
  secrets: "Снять печать",
  palette: "Смешать краски",
  names: "Наречь",
};

type Persisted = {
  name: string;
  gender: HeroGender;
  tab: TabId;
  page: number;
  keywords: string[];
  results: Partial<Record<TabId, Manuscript>>;
};

function loadState(): Persisted | null {
  try {
    const raw =
      localStorage.getItem(STORAGE_KEY) ??
      localStorage.getItem("character-workshop:v1");
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Persisted;
    if (!parsed || typeof parsed !== "object") return null;
    return parsed;
  } catch {
    return null;
  }
}

async function copyText(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    try {
      const area = document.createElement("textarea");
      area.value = text;
      area.setAttribute("readonly", "");
      area.style.position = "fixed";
      area.style.left = "-9999px";
      document.body.appendChild(area);
      area.select();
      const ok = document.execCommand("copy");
      document.body.removeChild(area);
      return ok;
    } catch {
      return false;
    }
  }
}

export function Workshop() {
  const [name, setName] = useState("");
  const [gender, setGender] = useState<HeroGender>("u");
  const [tab, setTab] = useState<TabId>("relations");
  const [page, setPage] = useState(0);
  const [keywords, setKeywords] = useState<string[]>([]);
  const [results, setResults] = useState<Partial<Record<TabId, Manuscript>>>({});
  const [copied, setCopied] = useState(false);
  const [hydrated, setHydrated] = useState(false);
  const articleRef = useRef<HTMLElement>(null);

  const profile = useMemo<HeroProfile>(() => ({ name, gender }), [name, gender]);

  useEffect(() => {
    const saved = loadState();
    if (saved) {
      setName(typeof saved.name === "string" ? saved.name : "");
      if (saved.gender === "m" || saved.gender === "f" || saved.gender === "u") {
        setGender(saved.gender);
      }
      if (CHAPTERS.some((chapter) => chapter.id === saved.tab)) setTab(saved.tab);
      if (typeof saved.page === "number" && saved.page >= 0) setPage(saved.page);
      if (saved.results) setResults(saved.results);
      if (Array.isArray(saved.keywords)) {
        const allowed = new Set(PALETTE_KEYWORDS.map((kw) => kw.id));
        setKeywords(
          saved.keywords.filter((id) => allowed.has(id)).slice(0, 3),
        );
      }
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    const payload: Persisted = { name, gender, tab, page, keywords, results };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
  }, [name, gender, tab, page, keywords, results, hydrated]);

  useEffect(() => {
    if (!copied) return;
    const timer = window.setTimeout(() => setCopied(false), 1600);
    return () => window.clearTimeout(timer);
  }, [copied]);

  const current = results[tab];

  function writePage(next: Manuscript) {
    setResults((prev) => ({ ...prev, [tab]: next }));
    setPage((n) => n + 1);
    setCopied(false);
    window.requestAnimationFrame(() => {
      articleRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  }

  function onGenerate() {
    if (tab === "relations") writePage(generateRelations(profile));
    else if (tab === "day") writePage(generateDay(profile));
    else if (tab === "secrets") writePage(generateSecrets(profile));
    else if (tab === "palette") {
      if (keywords.length === 0) return;
      writePage(generatePalette(keywords));
    } else if (tab === "names") writePage(generateNames(profile));
  }

  function onFate(years: FateYears) {
    writePage(generateFate(profile, years));
  }

  function toggleKeyword(id: string) {
    setKeywords((prev) => {
      if (prev.includes(id)) return prev.filter((item) => item !== id);
      if (prev.length >= 3) return prev;
      return [...prev, id];
    });
  }

  async function onCopy() {
    if (!current) return;
    const ok = await copyText(current.plainText);
    if (ok) setCopied(true);
  }

  return (
    <div className="desk min-h-dvh px-3 py-5 text-ink sm:px-6 sm:py-10">
      <div className="mx-auto w-full max-w-6xl">
        <header className="mb-5 flex flex-col items-center text-page sm:mb-8">
          <p className="letterpress font-display text-xs text-page-dark">
            Мастерская персонажа
          </p>
          <h1 className="mt-2 font-display text-4xl leading-none font-semibold tracking-tight text-balance text-page sm:text-5xl">
            Сказитель
          </h1>
          <p className="mt-2 max-w-xl text-center font-body text-base text-pretty text-page-dark italic">
            Шесть граней одной души — род, день, тайна, срок, цвет и имя.
          </p>
        </header>

        <Tabs.Root
          value={tab}
          onValueChange={(value) => setTab(value as TabId)}
          className="codex overflow-hidden rounded-lg"
        >
          <CornerMarks />
          <div className="relative grid lg:grid-cols-2">
            <section className="leaf-left relative order-2 flex flex-col border-t border-ink/10 px-5 py-7 sm:px-10 sm:py-10 lg:order-1 lg:border-t-0 lg:border-r">
              <div className="flex items-center justify-between gap-3 text-ink-faint">
                <span className="font-display text-sm tracking-widest uppercase">
                  Форзац
                </span>
                <BookOpen className="size-4" strokeWidth={1.4} aria-hidden="true" />
              </div>
              <div className="rule-double mt-3" />

              <p className="mt-7 font-display text-sm tracking-[0.22em] text-sage uppercase">
                Досье
              </p>
              <label className="mt-4 block">
                <span className="font-display text-sm tracking-wide text-ink-soft">
                  Имя героя
                </span>
                <input
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  placeholder="необязательно"
                  autoComplete="off"
                  spellCheck={false}
                  suppressHydrationWarning
                  className="mt-1 h-11 w-full border-0 border-b border-ink/25 bg-transparent font-display text-xl text-ink caret-jambalaya outline-none placeholder:text-ink-faint/70 focus:border-jambalaya"
                />
              </label>

              <fieldset className="mt-6">
                <legend className="font-display text-sm tracking-wide text-ink-soft">
                  Род
                </legend>
                <div className="mt-2 grid grid-cols-3 gap-1 rounded-sm border border-ink/15 p-1">
                  {GENDERS.map((item) => {
                    const selected = gender === item.id;
                    return (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => setGender(item.id)}
                        aria-pressed={selected}
                        className={cn(
                          "h-11 font-display text-sm tracking-wide transition-colors duration-150",
                          selected
                            ? "bg-ink text-page"
                            : "text-ink-soft hover:text-ink",
                        )}
                      >
                        {item.label}
                      </button>
                    );
                  })}
                </div>
                <p className="mt-2 font-body text-xs leading-relaxed text-ink-faint">
                  Род правит глаголами и местоимениями. Имя встанет в заголовок
                  записи.
                </p>
              </fieldset>

              <Tabs.List
                aria-label="Главы мастерской"
                className="mt-8 hidden flex-col gap-1 lg:flex"
              >
                {CHAPTERS.map((chapter) => {
                  const Icon = chapter.icon;
                  return (
                    <Tabs.Trigger
                      key={chapter.id}
                      value={chapter.id}
                      className={cn(
                        "group flex min-h-11 items-baseline gap-3 px-2 py-2 text-left transition-colors duration-150",
                        "text-ink-soft hover:text-ink data-[state=active]:text-ink",
                      )}
                    >
                      <span className="w-6 font-display text-sm text-sage">
                        {chapter.roman}
                      </span>
                      <span className="flex-1 font-display text-lg leading-tight group-data-[state=active]:underline group-data-[state=active]:decoration-sage/80 group-data-[state=active]:underline-offset-4">
                        {chapter.label}
                      </span>
                      <Icon
                        className="size-3.5 shrink-0 opacity-50"
                        strokeWidth={1.5}
                        aria-hidden="true"
                      />
                    </Tabs.Trigger>
                  );
                })}
              </Tabs.List>

              <p className="mt-8 font-body text-xs tracking-wide text-ink-faint lg:mt-auto lg:pt-10">
                Чернила держатся в этой книге, пока вы не сотрёте их в браузере.
              </p>
            </section>

            <section className="leaf relative order-1 flex min-h-0 flex-col px-5 py-7 sm:px-10 sm:py-10 lg:order-2 lg:min-h-[720px]">
              <Tabs.List
                aria-label="Главы мастерской"
                className="mb-5 grid grid-cols-3 gap-1 lg:hidden"
              >
                {CHAPTERS.map((chapter) => (
                  <Tabs.Trigger
                    key={chapter.id}
                    value={chapter.id}
                    className={cn(
                      "group inline-flex h-11 items-center justify-center gap-1 px-1 font-display text-sm tracking-wide",
                      "text-ink-soft hover:text-ink",
                      "data-[state=active]:bg-ink data-[state=active]:text-page",
                    )}
                  >
                    <span className="text-sage group-data-[state=active]:text-page-dark">
                      {chapter.roman}
                    </span>
                    {chapter.short}
                  </Tabs.Trigger>
                ))}
              </Tabs.List>

              {CHAPTERS.map((chapter) => (
                <Tabs.Content
                  key={chapter.id}
                  value={chapter.id}
                  className="flex min-h-0 flex-1 flex-col outline-none"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="font-display text-sm tracking-[0.22em] text-sage uppercase">
                        {chapter.roman}. {chapter.label}
                      </p>
                      <p className="mt-3 max-w-md font-body text-sm leading-relaxed text-pretty text-ink-soft italic">
                        {chapter.blurb}
                      </p>
                    </div>
                    <span className="shrink-0 font-display text-sm tabular-nums text-ink-faint">
                      {current && page > 0 ? `стр. ${page}` : "стр. —"}
                    </span>
                  </div>
                  <div className="rule-double mt-4" />

                  {chapter.id === "palette" ? (
                    <fieldset className="mt-5">
                      <legend className="font-display text-sm tracking-wide text-ink-soft">
                        Черты · {keywords.length} из 3
                      </legend>
                      <div className="mt-2 max-h-36 overflow-y-auto pr-1 sm:max-h-44">
                        <div className="grid grid-cols-3 gap-1 sm:grid-cols-5">
                        {PALETTE_KEYWORDS.map((kw) => {
                          const selected = keywords.includes(kw.id);
                          const locked = !selected && keywords.length >= 3;
                          return (
                            <button
                              key={kw.id}
                              type="button"
                              onClick={() => toggleKeyword(kw.id)}
                              aria-pressed={selected}
                              disabled={locked}
                              className={cn(
                                "h-11 px-1 font-display text-xs tracking-wide transition-colors duration-150 sm:text-sm",
                                selected
                                  ? "bg-ink text-page"
                                  : "border border-ink/15 text-ink-soft hover:text-ink",
                                locked && "opacity-40",
                              )}
                            >
                              {kw.label}
                            </button>
                          );
                        })}
                        </div>
                      </div>
                    </fieldset>
                  ) : null}

                  <div className="mt-5 flex flex-wrap items-center gap-2">
                    {chapter.id !== "fate" ? (
                      <Button
                        type="button"
                        onClick={onGenerate}
                        disabled={chapter.id === "palette" && keywords.length === 0}
                      >
                        <PenLine className="size-4" strokeWidth={1.6} />
                        {current && results[chapter.id]
                          ? "Переписать"
                          : GENERATE_LABEL[chapter.id]}
                      </Button>
                    ) : (
                      FATE_YEARS.map((item) => (
                        <Button
                          key={item.years}
                          type="button"
                          variant="page"
                          size="sm"
                          onClick={() => onFate(item.years)}
                        >
                          {item.years === 1 ? (
                            <Hourglass className="size-3.5" strokeWidth={1.6} />
                          ) : null}
                          {item.label}
                        </Button>
                      ))
                    )}
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={onCopy}
                      disabled={!current}
                      aria-label={copied ? "Запись скопирована" : "Скопировать запись"}
                    >
                      {copied ? (
                        <Check className="size-4" strokeWidth={1.6} />
                      ) : (
                        <Copy className="size-4" strokeWidth={1.6} />
                      )}
                      {copied ? "Списано" : "Списать"}
                    </Button>
                  </div>

                  <article
                    ref={chapter.id === tab ? articleRef : undefined}
                    aria-live="polite"
                    className="mt-6 min-h-0 flex-1 overflow-y-auto pr-1 scroll-mt-4"
                  >
                    {current ? (
                      <ManuscriptView
                        key={`${chapter.id}-${current.plainText.slice(0, 40)}`}
                        manuscript={current}
                        onTakeName={setName}
                      />
                    ) : (
                      <EmptyPage />
                    )}
                  </article>
                </Tabs.Content>
              ))}
            </section>
          </div>
        </Tabs.Root>
      </div>
    </div>
  );
}

function EmptyPage() {
  return (
    <div className="flex h-full min-h-52 flex-col items-center justify-center py-10 text-center">
      <Fleuron className="h-4 w-40" />
      <p className="mt-5 max-w-sm font-display text-xl text-ink-soft italic">
        Страница ещё чиста.
      </p>
      <p className="mt-2 max-w-xs font-body text-sm text-ink-faint">
        Окуните перо — и на лист ляжет первая запись.
      </p>
    </div>
  );
}

function ManuscriptView({
  manuscript,
  onTakeName,
}: {
  manuscript: Manuscript;
  onTakeName: (name: string) => void;
}) {
  return (
    <div className="fade-page">
      <p className="font-display text-xs tracking-[0.2em] text-ink-faint uppercase">
        {manuscript.chapter} · {manuscript.kicker}
      </p>
      <h2 className="mt-2 font-display text-2xl font-semibold text-balance text-ink sm:text-3xl">
        {manuscript.title}
      </h2>
      <Fleuron className="mt-4 h-4 w-36" />
      <div className="mt-5 space-y-4">
        {manuscript.blocks.map((block, index) => {
          if (block.kind === "p") {
            return (
              <p
                key={index}
                className={cn(
                  "font-body text-base leading-relaxed text-pretty text-ink",
                  index === 0 && "drop-cap",
                )}
              >
                {block.text}
              </p>
            );
          }
          if (block.kind === "entry") {
            return (
              <div key={index} className="border-l border-oxblood/40 pl-4">
                <h3 className="font-display text-lg text-oxblood">{block.label}</h3>
                <p className="mt-1 font-body text-base leading-relaxed text-pretty text-ink">
                  {block.body}
                </p>
              </div>
            );
          }
          if (block.kind === "swatches") {
            return <SwatchList key={index} colors={block.colors} />;
          }
          if (block.kind === "namecard") {
            return (
              <NameCardView
                key={index}
                card={block.card}
                onTakeName={onTakeName}
              />
            );
          }
          return (
            <aside
              key={index}
              className="border-t border-ink/15 pt-4 font-body text-sm leading-relaxed text-ink-soft italic"
            >
              <span className="mr-2 font-display not-italic tracking-wide text-oxblood uppercase">
                {block.label}.
              </span>
              {block.body}
            </aside>
          );
        })}
      </div>
    </div>
  );
}

function SwatchList({ colors }: { colors: Swatch[] }) {
  return (
    <ul className="space-y-2">
      {colors.map((color) => (
        <li key={`${color.hex}-${color.nameEn}`}>
          <div
            className="flex items-center justify-between gap-3 rounded-md px-4 py-3"
            style={{
              backgroundColor: color.hex,
              color: color.onDark
                ? "var(--color-cream)"
                : "var(--color-ink)",
            }}
          >
            <div>
              <p className="font-display text-xl leading-tight">{color.nameEn}</p>
              <p className="mt-0.5 font-body text-xs tracking-wide opacity-80">
                {color.nameRu} · {color.role}
              </p>
              <p className="mt-2 font-body text-xs tracking-[0.14em] uppercase opacity-80">
                HEX: {color.hex}
              </p>
            </div>
            <span aria-hidden="true" className="font-display text-lg leading-none opacity-70">
              ∴
            </span>
          </div>
        </li>
      ))}
    </ul>
  );
}

function NameCardView({
  card,
  onTakeName,
}: {
  card: NameCard;
  onTakeName: (name: string) => void;
}) {
  return (
    <article className="border-l border-oxblood/40 pl-4">
      <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
        <h3 className="font-display text-xl text-ink">{card.display}</h3>
        <span className="font-display text-xs tracking-[0.16em] text-sage uppercase">
          {card.invented ? "вымышлено" : "историческое"}
        </span>
      </div>
      <p className="mt-2 font-body text-base leading-relaxed text-pretty text-ink">
        <span className="font-display text-oxblood">Значение.</span> {card.meaning}
      </p>
      <p className="mt-1 font-body text-base leading-relaxed text-pretty text-ink">
        <span className="font-display text-oxblood">Происхождение.</span> {card.origin}
      </p>
      <p className="mt-1 font-body text-base leading-relaxed text-pretty text-ink">
        <span className="font-display text-oxblood">Сокращения.</span> {card.nick}
      </p>
      <p className="mt-1 font-body text-sm leading-relaxed text-pretty text-ink-soft italic">
        {card.context}
      </p>
      <button
        type="button"
        onClick={() => onTakeName(card.ru)}
        className="mt-2 h-11 font-display text-sm tracking-wide text-ink-soft hover:text-ink"
      >
        Взять в досье · {card.ru}
      </button>
    </article>
  );
}
