export type RangeFilter<T> = {
  minimum?: T | null;
  maximum?: T | null;
};

export type School = "Abjuration" | "Conjuration" | "Divination" | "Enchantment" | "Evocation" | "Illusion" | "Necromancy" | "Transmutation";

export type SearchSpellsPayload = {
  level: RangeFilter<number>;
  school: string;
  search: string;
};

export type Spell = {
  name: string;
  src: string;
  school: School;
  level: number;
  castingTime: CastingTime;
  concentration: boolean;
  duration: string | null;
  material: string;
  range: number | null;
  ritual: boolean;
  somatic: boolean;
  verbal: boolean;
  description: string;
  classes: string[];
  tags: string[];
  group?: string | null;
};

export type CastingTime = "10m" | "12H" | "1H" | "1m" | "24H" | "8H" | "A" | "A/8H" | "BA" | "R";
