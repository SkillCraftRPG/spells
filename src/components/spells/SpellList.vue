<template>
  <div>
    <SpellFilters :classes="classes" :groups="groups" :school="school" :tags="tags" v-model="filters" />
    <p class="text-body-secondary">{{ t("spells.total", { total: scopedSpells.length }) }}</p>
    <SpellTable v-if="filteredSpells.length" :spells="filteredSpells" @clicked="onClicked" />
    <p v-else>{{ t("spells.empty") }}</p>
    <SpellModal v-if="spell" ref="modal" :spell="spell" />
  </div>
</template>

<script setup lang="ts">
import { computed, nextTick, ref } from "vue";
import { useI18n } from "vue-i18n";

import SpellFilters from "./SpellFilters.vue";
import SpellModal from "./SpellModal.vue";
import SpellTable from "./SpellTable.vue";
import spells from "@/assets/data/spells.json";
import type { School, SearchSpellsPayload, Spell } from "@/types/spells";
import { matchGroup, matchLevel, matchSchool, matchSearch } from "@/utils/spells.ts";

const { t } = useI18n();

const props = withDefaults(
  defineProps<{
    classes?: string[];
    school?: School;
  }>(),
  {
    classes: () => [],
  },
);

const filters = ref<SearchSpellsPayload>({ level: { minimum: 0, maximum: 9 } });
const modal = ref<InstanceType<typeof SpellModal> | null>(null);
const spell = ref<Spell>();

const scopedSpells = computed<Spell[]>(
  () =>
    spells.filter(
      (spell) => (!props.classes.length || props.classes.some((_class) => spell.classes.includes(_class))) && (!props.school || spell.school === props.school),
    ) as Spell[],
);
const filteredSpells = computed<Spell[]>(() =>
  scopedSpells.value.filter(
    (spell) =>
      matchGroup(filters.value.group, spell) &&
      matchLevel(filters.value.level, spell) &&
      matchSchool(filters.value.school, spell) &&
      matchSearch(filters.value.search, spell),
  ),
);

const classes = computed<string[]>(() => {
  const classes: Set<string> = new Set();
  scopedSpells.value.forEach((spell) => spell.classes.forEach((_class) => classes.add(_class)));
  return [...classes];
});
const groups = computed<string[]>(() => {
  // const groups: Set<string> = new Set();
  // scopedSpells.value.forEach((spell) => {
  //   if (spell.group) {
  //     const parts: string[] = spell.group.split("|");
  //     parts.forEach((part) => {
  //       part = part.trim();
  //       if (part) {
  //         groups.add(part);
  //       }
  //     });
  //   }
  // });
  // return [...groups];
  return []; // TODO(fpion): implement
});
const tags = computed<string[]>(() => {
  const tags: Set<string> = new Set();
  scopedSpells.value.forEach((spell) => spell.tags.forEach((tag) => tags.add(tag)));
  return [...tags];
});

function onClicked(value: Spell): void {
  spell.value = value;
  nextTick(() => modal.value?.open());
}
</script>
