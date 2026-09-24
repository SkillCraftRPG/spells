<template>
  <section class="row">
    <div class="col">
      <SearchInput class="mb-3" :model-value="spell.filters.search ?? ''" @update:model-value="updateSearch" />
    </div>
    <div class="col">
      <div class="row">
        <div class="col">
          <LevelSelect
            class="mb-3"
            id="min-level"
            label="spells.level.minimum"
            :model-value="spell.filters.level?.minimum ?? undefined"
            @update:model-value="updateMinimumLevel"
          />
        </div>
        <div class="col">
          <LevelSelect
            class="mb-3"
            id="max-level"
            label="spells.level.maximum"
            :model-value="spell.filters.level?.maximum ?? undefined"
            @update:model-value="updateMaximumLevel"
          />
        </div>
      </div>
    </div>
    <div class="col">
      <SchoolSelect class="mb-3" :model-value="spell.filters.school ?? ''" @update:model-value="updateSchool" />
    </div>
    <div class="col">
      <ClassSelect class="mb-3" :classes="classes" :model-value="spell.filters.classes ?? []" @update:model-value="updateClasses" />
    </div>
    <div class="col">
      <TagSelect class="mb-3" :model-value="spell.filters.tags ?? []" :tags="tags" @update:model-value="updateTags" />
    </div>
    <div class="col">
      <GroupSelect class="mb-3" :groups="groups" :model-value="spell.filters.group ?? ''" @update:model-value="updateGroup" />
    </div>
  </section>
</template>

<script setup lang="ts">
import ClassSelect from "./ClassSelect.vue";
import GroupSelect from "./GroupSelect.vue";
import LevelSelect from "./LevelSelect.vue";
import SchoolSelect from "./SchoolSelect.vue";
import SearchInput from "@/components/search/SearchInput.vue";
import type { School } from "@/types/spells";
import { SCHOOLS } from "@/types/spells";
import { useSpellStore } from "@/stores/spells";
import TagSelect from "./TagSelect.vue";

const spell = useSpellStore();

defineProps<{
  classes?: string[];
  groups?: string[];
  school?: School;
  tags?: string[];
}>();

function updateClasses(classes: string[]): void {
  spell.filters.classes = [...classes];
}
function updateGroup(group: string): void {
  spell.filters.group = group;
}
function updateMaximumLevel(maximum: number | undefined): void {
  if (spell.filters.level) {
    spell.filters.level.maximum = maximum;
  } else {
    spell.filters.level = { maximum };
  }
}
function updateMinimumLevel(minimum: number | undefined): void {
  if (spell.filters.level) {
    spell.filters.level.minimum = minimum;
  } else {
    spell.filters.level = { minimum };
  }
}
function updateSearch(search: string): void {
  spell.filters.search = search;
}
function updateSchool(school: string): void {
  spell.filters = { ...spell.filters, school: SCHOOLS.includes(school) ? (school as School) : null };
}
function updateTags(tags: string[]): void {
  spell.filters.tags = [...tags];
}
</script>
