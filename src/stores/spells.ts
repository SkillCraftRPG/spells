import { computed, ref } from "vue";
import { defineStore } from "pinia";

import type { SearchSpellsPayload } from "@/types/spells";

export const useSpellStore = defineStore("spells", () => {
  const filters = ref<SearchSpellsPayload>({ level: { minimum: 0, maximum: 7 } });

  const hasFilters = computed<boolean>(() =>
    Boolean(
      filters.value.classes?.length ||
      filters.value.group ||
      filters.value.level?.minimum !== 0 ||
      filters.value.level?.maximum !== 7 ||
      filters.value.school ||
      filters.value.search,
    ),
  );

  function clearFilters(): void {
    filters.value = { level: { minimum: 0, maximum: 7 } };
  }

  return { filters, hasFilters, clearFilters };
});
