<template>
  <div class="row">
    <div class="col-md-2">
      <SearchInput class="mb-3" :model-value="modelValue?.search" @update:model-value="updateSearch($event ?? '')" />
    </div>
    <div class="col-md-1">
      <LevelSelect
        class="mb-3"
        id="min-level"
        label="spells.level.minimum"
        :model-value="modelValue?.level.minimum ?? undefined"
        @update:model-value="updateMinimumLevel"
      />
    </div>
    <div class="col-md-1">
      <LevelSelect
        class="mb-3"
        id="max-level"
        label="spells.level.maximum"
        :model-value="modelValue?.level.maximum ?? undefined"
        @update:model-value="updateMaximumLevel"
      />
    </div>
    <div class="col-md-2">
      <SchoolSelect class="mb-3" :model-value="modelValue?.school" @update:model-value="updateSchool($event ?? '')" />
    </div>
  </div>
</template>

<script setup lang="ts">
import LevelSelect from "./LevelSelect.vue";
import SearchInput from "@/components/search/SearchInput.vue";
import type { SearchSpellsPayload } from "@/types/spells";
import SchoolSelect from "./SchoolSelect.vue";

const props = defineProps<{
  modelValue?: SearchSpellsPayload;
}>();

const emit = defineEmits<{
  (e: "update:model-value", value: SearchSpellsPayload): void;
}>();

function updateMaximumLevel(maximum: number | undefined): void {
  const filters: SearchSpellsPayload = props.modelValue ? { ...props.modelValue } : { level: {}, school: "", search: "" };
  filters.level.maximum = maximum;
  emit("update:model-value", filters);
}
function updateMinimumLevel(minimum: number | undefined): void {
  const filters: SearchSpellsPayload = props.modelValue ? { ...props.modelValue } : { level: {}, school: "", search: "" };
  filters.level.minimum = minimum;
  emit("update:model-value", filters);
}
function updateSchool(school: string): void {
  const filters: SearchSpellsPayload = props.modelValue ? { ...props.modelValue } : { level: {}, school: "", search: "" };
  filters.school = school;
  emit("update:model-value", filters);
}
function updateSearch(search: string): void {
  const filters: SearchSpellsPayload = props.modelValue ? { ...props.modelValue } : { level: {}, school: "", search: "" };
  filters.search = search;
  emit("update:model-value", filters);
}
</script>
