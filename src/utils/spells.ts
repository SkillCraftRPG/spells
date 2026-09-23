import type { RangeFilter, School, Spell } from "@/types/spells";

export function matchGroup(group: string | null | undefined, spell: Spell): number {
  if (!group) {
    return -1;
  }
  return 0;
  // TODO(fpion): switch (group) {
  //   case "any":
  //     return spell.group ? 1 : 0;
  //   case "none":
  //     return spell.group ? 0 : 1;
  //   default:
  //     return Boolean(spell.group && spell.group.includes(group)) ? 1 : 0;
  // }
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
