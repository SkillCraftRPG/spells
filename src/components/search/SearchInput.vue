<template>
  <TarInput
    floating
    :id="id"
    :label="label ? t(label) : undefined"
    :model-value="modelValue"
    :placeholder="label ? t(label) : undefined"
    type="search"
    @update:model-value="$emit('update:model-value', $event ?? '')"
  />
</template>

<script setup lang="ts">
import { useI18n } from "vue-i18n";

import TarInput from "@/components/tar/TarInput.vue";

const { t } = useI18n();

withDefaults(
  defineProps<{
    id?: string;
    label?: string;
    modelValue?: string;
  }>(),
  {
    id: "search",
    label: "actions.search",
  },
);

defineEmits<{
  (e: "update:model-value", value: string): void;
}>();
</script>
