<template>
  <TarSelect
    floating
    :id="id"
    :label="label ? t(label) : undefined"
    :model-value="modelValue"
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

const { orderBy } = arrayUtils;
const { t } = useI18n();

const props = withDefaults(
  defineProps<{
    groups?: string[];
    id?: string;
    label?: string;
    modelValue?: string;
    placeholder?: string;
  }>(),
  {
    groups: () => [],
    id: "group",
    label: "brand",
    placeholder: "all",
  },
);

defineEmits<{
  (e: "update:model-value", value: string): void;
}>();

const options = computed<SelectOption[]>(() => {
  const options: SelectOption[] = [
    { text: t("any"), value: "any" },
    { text: t("none"), value: "none" },
  ];
  options.push(
    ...orderBy(
      props.groups.map((group) => ({ text: group, value: group })),
      "text",
    ),
  );
  return options;
});
</script>
