<template>
  <TarSelect
    floating
    :id="id"
    :label="label ? t(label) : undefined"
    :model-value="modelValue?.toString()"
    :options="options"
    :placeholder="placeholder ? t(placeholder) : undefined"
    @update:model-value="$emit('update:model-value', $event ?? '')"
  />
</template>

<script setup lang="ts">
import { arrayUtils } from "logitar-js";
import { computed } from "vue";
import { useI18n } from "vue-i18n";

import TarSelect from "@/components/tar/TarSelect.vue";
import type { SelectOption } from "@/types/tar/select";

const { rt, t, tm } = useI18n();
const { orderBy } = arrayUtils;

withDefaults(
  defineProps<{
    id?: string;
    label?: string;
    modelValue?: number | string;
    placeholder?: string;
  }>(),
  {
    id: "school",
    label: "spells.school.label",
    placeholder: "all",
  },
);

defineEmits<{
  (e: "update:model-value", value: string): void;
}>();

const options = computed<SelectOption[]>(() =>
  orderBy(
    Object.entries(tm(rt("spells.school.options"))).map(([value, text]) => ({ text, value })),
    "text",
  ),
);
</script>
