import { parsingUtils } from "logitar-js";

import type { RangeFilter, School, Spell } from "@/types/spells";

const { parseNumber } = parsingUtils;

type TimeSpan = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};
function parseTimeSpan(value: string): TimeSpan {
  const index: number = value.indexOf(".");
  const parts: string[] = value.substring(index < 0 ? 0 : index + 1).split(":");
  if (parts.length !== 3) {
    throw new Error("invalid time span: " + value);
  }
  return {
    days: index < 0 ? 0 : (parseNumber(value.substring(0, index)) ?? 0),
    hours: parseNumber(parts[0]) ?? 0,
    minutes: parseNumber(parts[1]) ?? 0,
    seconds: parseNumber(parts[2]) ?? 0,
  };
}

export function formatCastingTime(key: string, t: (key: string) => string): string {
  return t(`spells.castingTime.options.${key}`);
}

export function formatClasses(classes: string[]): string {
  return classes.join(", ");
}

export function formatComponents(spell: Spell, format: "short" | "long"): string {
  const components: string[] = [];
  if (spell.verbal) {
    components.push("V");
  }
  if (spell.somatic) {
    components.push("S");
  }
  if (spell.material) {
    components.push(format === "short" ? "M" : `M (${spell.material})`);
  }
  return components.join(", ");
}

export function formatDuration(spell: Spell, format: "short" | "long", t: (key: string, count?: number | object) => string): string {
  if (spell.duration === null) {
    return t("spells.duration.untilDispelled");
  }
  const duration: TimeSpan = parseTimeSpan(spell.duration);
  if (!duration.days && !duration.hours && !duration.minutes && !duration.seconds) {
    return t("spells.duration.instantaneous");
  }
  const parts: string[] = [];
  if (duration.days) {
    parts.push(t("spells.duration.days", duration.days));
  }
  if (duration.hours) {
    parts.push(t("spells.duration.hours", duration.hours));
  }
  if (duration.minutes) {
    parts.push(t("spells.duration.minutes", duration.minutes));
  }
  if (duration.seconds) {
    parts.push(duration.seconds % 6 === 0 ? t("spells.duration.rounds", duration.seconds / 6) : t("spells.duration.seconds", duration.seconds));
  }
  const formatted: string = parts.join(", ");
  if (!spell.concentration) {
    return formatted;
  }
  return format === "short" ? `${formatted} (C)` : t("spells.concentration.format", { duration: formatted });
}

export function formatRange(squares: number | null, n: (value: number, format: string) => string, t: (key: string) => string): string {
  switch (squares) {
    case null:
      return t("spells.range.unlimited");
    case 0:
      return t("spells.range.self");
    case 1:
      return t("spells.range.touch");
    default:
      return n(squares, "integer");
  }
}

export function matchGroup(group: string | null | undefined, spell: Spell): number {
  if (!group) {
    return -1;
  }
  switch (group) {
    case "any":
      return spell.groups.size ? 1 : 0;
    case "none":
      return spell.groups.size ? 0 : 1;
    default:
      return spell.groups.has(group) ? 1 : 0;
  }
}

export function matchLevel(level: RangeFilter<number> | null | undefined, spell: Spell): number {
  if (!level) {
    return -1;
  }
  return (typeof level.minimum !== "number" || spell.level >= level.minimum) && (typeof level.maximum !== "number" || spell.level <= level.maximum) ? 1 : 0;
}

export function matchSchool(school: School | null | undefined, spell: Spell): number {
  if (!school) {
    return -1;
  }
  return spell.school === school ? 1 : 0;
}

export function matchSearch(search: string | null | undefined, spell: Spell): number {
  const terms: string[] = (search ?? "")
    .split(" ")
    .filter((term) => term)
    .map((term) => term.toLocaleLowerCase());
  if (!terms.length) {
    return -1;
  }
  let score: number = 0;
  terms.forEach((term) => {
    if (spell.name.toLocaleLowerCase().includes(term)) {
      score += 10;
    } else if (spell.description.toLocaleLowerCase().includes(term)) {
      score += 1;
    }
  });
  return score;
}
