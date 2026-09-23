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
import { SCHOOLS } from "@/types/spells";

const { orderBy } = arrayUtils;
const { t } = useI18n();

withDefaults(
  defineProps<{
    id?: string;
    label?: string;
    modelValue?: string;
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
    SCHOOLS.map((value) => ({ text: t(`spells.school.options.${value}`), value })),
    "text",
  ),
);
</script>
