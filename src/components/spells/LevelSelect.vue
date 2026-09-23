<template>
  <TarSelect
    floating
    :id="id"
    :label="label ? t(label) : undefined"
    :model-value="modelValue?.toString()"
    :options="options"
    :placeholder="placeholder ? t(placeholder) : undefined"
    @update:model-value="$emit('update:model-value', parseNumber($event))"
  />
</template>

<script setup lang="ts">
import { computed } from "vue";
import { parsingUtils } from "logitar-js";
import { useI18n } from "vue-i18n";

import TarSelect from "@/components/tar/TarSelect.vue";
import type { SelectOption } from "@/types/tar/select";

const { n, t } = useI18n();
const { parseNumber } = parsingUtils;

withDefaults(
  defineProps<{
    id?: string;
    label?: string;
    modelValue?: number | string;
    placeholder?: string;
  }>(),
  {
    id: "level",
    label: "spells.level.label",
  },
);

defineEmits<{
  (e: "update:model-value", value: number | undefined): void;
}>();

const options = computed<SelectOption[]>(() => {
  const options: SelectOption[] = [{ text: t("spells.level.cantrip"), value: "0" }];
  for (let level = 1; level <= 9; level++) {
    options.push({ text: n(level, "integer"), value: level.toString() });
  }
  return options;
});
</script>
