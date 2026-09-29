<template>
  <div>
    <TarInput
      floating
      :id="`${id}-input`"
      :label="t('spells.school.label')"
      :model-value="t('spells.school.selected', modelValue.length)"
      readonly
      @click="open"
    />
    <TarModal centered :close="t('actions.close')" fade :id="`${id}-modal`" ref="modal" scrollable :title="t('spells.school.select')">
      <div class="d-flex justify-content-between align-items-center gap-3 mb-3">
        {{ t("spells.school.selected", selected.size) }}
        <TarButton
          :icon="schools.length === selected.size ? 'far fa-square' : 'far fa-square-check'"
          outline
          size="small"
          :text="t(schools.length === selected.size ? 'actions.unselectAll' : 'actions.selectAll')"
          variant="primary"
          @click="toggleAll"
        />
      </div>
      <div>
        <TarButton
          v-for="school in options"
          :key="school"
          class="me-2 mb-2"
          :outline="!selected.has(school)"
          size="small"
          :variant="selected.has(school) ? 'primary' : 'secondary'"
          @click="toggle(school)"
          >{{ t(`spells.school.options.${school}`) }}</TarButton
        >
      </div>
      <template #footer>
        <TarButton icon="fas fa-ban" :text="t('actions.cancel')" variant="secondary" @click="cancel" />
        <TarButton :disabled="!hasChanges" icon="fas fa-check" :text="t('actions.apply')" variant="primary" @click="apply" />
      </template>
    </TarModal>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import { useI18n } from "vue-i18n";

import TarButton from "@/components/tar/TarButton.vue";
import TarModal from "@/components/tar/TarModal.vue";
import TarInput from "@/components/tar/TarInput.vue";
import type { School } from "@/types/spells";

const { t } = useI18n();

const props = withDefaults(
  defineProps<{
    id?: string;
    modelValue?: School[];
    schools?: School[];
  }>(),
  {
    id: "school",
    modelValue: () => [],
    schools: () => [],
  },
);

const emit = defineEmits<{
  (e: "update:model-value", value: School[]): void;
}>();

const modal = ref<InstanceType<typeof TarModal> | null>(null);
const selected = ref<Set<School>>(new Set());

const hasChanges = computed<boolean>(() => props.modelValue.length !== selected.value.size || props.modelValue.some((value) => !selected.value.has(value)));
const options = computed<School[]>(() =>
  [...props.schools].sort((a, b) => {
    const textA: string = t(`spells.school.options.${a}`);
    const textB: string = t(`spells.school.options.${b}`);
    return textA > textB ? 1 : textA < textB ? -1 : 0;
  }),
);

function apply(): void {
  emit("update:model-value", [...selected.value]);
  modal.value?.hide();
}

function cancel(): void {
  selected.value = new Set(props.modelValue);
  modal.value?.hide();
}

function open(): void {
  modal.value?.show();
}

function toggle(school: School): void {
  if (selected.value.has(school)) {
    selected.value.delete(school);
  } else {
    selected.value.add(school);
  }
}

function toggleAll(): void {
  if (props.schools.length === selected.value.size) {
    selected.value.clear();
  } else {
    props.schools.forEach((school) => selected.value.add(school));
  }
}
</script>
