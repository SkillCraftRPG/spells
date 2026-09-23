<template>
  <div>
    <SpellFilters v-model="filters" />
    <!-- <p class="text-body-secondary">{{ spells.length }} Druid & Ranger spells</p> -->
    <SpellTable :spells="spells" />
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";

import SpellFilters from "./SpellFilters.vue";
import SpellTable from "./SpellTable.vue";
import spellData from "@/assets/data/spells.json";
import type { School, SearchSpellsPayload, Spell } from "@/types/spells";

const props = withDefaults(
  defineProps<{
    classes?: string[];
    school?: School;
  }>(),
  {
    classes: () => [],
  },
);

const filters = ref<SearchSpellsPayload>({ level: { minimum: 0, maximum: 9 }, school: "", search: "" });

const spells = computed<Spell[]>(
  () =>
    spellData.filter((spell) => {
      if (props.classes.length && props.classes.every((_class) => !spell.classes.includes(_class))) {
        return false;
      }
      if (props.school && spell.school !== props.school) {
        return false;
      }

      if (typeof filters.value.level.minimum === "number" && spell.level < filters.value.level.minimum) {
        return false;
      }
      if (typeof filters.value.level.maximum === "number" && spell.level > filters.value.level.maximum) {
        return false;
      }

      if (filters.value.school && spell.school !== filters.value.school) {
        return false;
      }

      const search: string = filters.value.search.trim().toLocaleLowerCase();
      if (search && !spell.name.toLocaleLowerCase().includes(search)) {
        return false;
      }

      return true;
    }) as Spell[],
);
</script>
