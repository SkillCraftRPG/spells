<template>
  <section class="row">
    <div class="col">
      <SearchInput class="mb-3" :model-value="filters.search ?? ''" @update:model-value="updateSearch" />
    </div>
    <div class="col">
      <div class="row">
        <div class="col">
          <LevelSelect
            class="mb-3"
            id="min-level"
            label="spells.level.minimum"
            :model-value="filters.level?.minimum ?? undefined"
            @update:model-value="updateMinimumLevel"
          />
        </div>
        <div class="col">
          <LevelSelect
            class="mb-3"
            id="max-level"
            label="spells.level.maximum"
            :model-value="filters.level?.maximum ?? undefined"
            @update:model-value="updateMaximumLevel"
          />
        </div>
      </div>
    </div>
    <div class="col">
      <SchoolSelect class="mb-3" :model-value="filters.school ?? ''" @update:model-value="updateSchool" />
    </div>
    <div class="col">
      <GroupSelect class="mb-3" :groups="groups" :model-value="filters.group ?? ''" @update:model-value="updateGroup" />
    </div>
    <!-- TODO(fpion): Class(es) Filter -->
    <!-- TODO(fpion): Tag(s) Filter -->
  </section>
</template>

<script setup lang="ts">
import { computed } from "vue";

import GroupSelect from "./GroupSelect.vue";
import LevelSelect from "./LevelSelect.vue";
import SchoolSelect from "./SchoolSelect.vue";
import SearchInput from "@/components/search/SearchInput.vue";
import type { School, SearchSpellsPayload } from "@/types/spells";
import { SCHOOLS } from "@/types/spells";

const props = defineProps<{
  classes?: string[];
  groups?: string[];
  modelValue?: SearchSpellsPayload;
  school?: School;
  tags?: string[];
}>();

const emit = defineEmits<{
  (e: "update:model-value", value: SearchSpellsPayload): void;
}>();

const filters = computed<SearchSpellsPayload>(() => props.modelValue ?? {});

function updateGroup(group: string): void {
  emit("update:model-value", { ...filters.value, group });
}
function updateMaximumLevel(maximum: number | undefined): void {
  const modelValue: SearchSpellsPayload = { ...filters.value };
  if (modelValue.level) {
    modelValue.level.maximum = maximum;
  } else {
    modelValue.level = { maximum };
  }
  emit("update:model-value", modelValue);
}
function updateMinimumLevel(minimum: number | undefined): void {
  const modelValue: SearchSpellsPayload = { ...filters.value };
  if (modelValue.level) {
    modelValue.level.minimum = minimum;
  } else {
    modelValue.level = { minimum };
  }
  emit("update:model-value", modelValue);
}
function updateSchool(school: string): void {
  emit("update:model-value", { ...filters.value, school: SCHOOLS.includes(school) ? (school as School) : null });
}
function updateSearch(search: string): void {
  emit("update:model-value", { ...filters.value, search });
}
</script>
