<template>
  <div>
    <template v-if="scopedSpells.length">
      <div class="d-flex justify-content-between align-items-center gap-3 mb-3">
        <div class="text-body-secondary">{{ t("spells.total", { total: scopedSpells.length }) }}</div>
        <TarButton
          v-if="spellStore.hasFilters"
          icon="fas fa-arrow-rotate-left"
          outline
          :text="t('actions.clearFilters')"
          variant="secondary"
          @click="spellStore.clearFilters"
        />
      </div>
      <SpellFilters :classes="classes" :groups="groups" :school="school" :tags="tags" />
      <SpellTable v-if="filteredSpells.length" :spells="filteredSpells" @clicked="onClicked" />
      <p v-else>{{ t("spells.empty") }}</p>
      <SpellModal v-if="spell" ref="modal" :spell="spell" />
    </template>
    <p v-else>{{ t("spells.none") }}</p>
  </div>
</template>

<script setup lang="ts">
import { computed, nextTick, ref } from "vue";
import { useI18n } from "vue-i18n";

import SpellFilters from "./SpellFilters.vue";
import SpellModal from "./SpellModal.vue";
import SpellTable from "./SpellTable.vue";
import groupPairs from "@/assets/data/groups.txt?raw";
import spells from "@/assets/data/spells.json";
import type { School, Spell } from "@/types/spells";
import { matchClasses, matchGroup, matchLevel, matchSchool, matchSearch, matchTags } from "@/utils/spells";
import { useSpellStore } from "@/stores/spells";
import TarButton from "@/components/tar/TarButton.vue";

const spellStore = useSpellStore();
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

const modal = ref<InstanceType<typeof SpellModal> | null>(null);
const spell = ref<Spell>();

const spellGroups = computed<Map<string, Set<string>>>(() => {
  const map: Map<string, Set<string>> = new Map();
  const lines: string[] = groupPairs.split(/\r?\n/);
  lines.forEach((line) => {
    const parts: string[] = line.split("|").map((s) => s.trim());
    if (parts.length === 2) {
      const [group, spell] = parts;
      if (group && spell) {
        let groups: Set<string> | undefined = map.get(spell);
        if (groups) {
          groups.add(group);
        } else {
          groups = new Set<string>([group]);
          map.set(spell, groups);
        }
      }
    }
  });
  return map;
});
const scopedSpells = computed<Spell[]>(
  () =>
    spells
      .filter(
        (spell) =>
          (!props.classes.length || props.classes.some((_class) => spell.classes.includes(_class))) && (!props.school || spell.school === props.school),
      )
      .map((spell) => ({ ...spell, groups: spellGroups.value.get(spell.name) ?? new Set<string>() })) as Spell[],
);
const filteredSpells = computed<Spell[]>(() =>
  scopedSpells.value.filter(
    (spell) =>
      matchClasses(spellStore.filters.classes, spell) &&
      matchGroup(spellStore.filters.group, spell) &&
      matchLevel(spellStore.filters.level, spell) &&
      matchSchool(spellStore.filters.school, spell) &&
      matchSearch(spellStore.filters.search, spell) &&
      matchTags(spellStore.filters.tags, spell),
  ),
);

const classes = computed<string[]>(() => {
  const classes: Set<string> = new Set();
  scopedSpells.value.forEach((spell) => spell.classes.forEach((_class) => classes.add(_class)));
  return [...classes];
});
const groups = computed<string[]>(() => {
  const groups: Set<string> = new Set();
  scopedSpells.value.forEach((spell) => spell.groups.forEach((group) => groups.add(group)));
  return [...groups];
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
