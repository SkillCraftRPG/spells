<template>
  <div>
    <TarInput floating :id="`${id}-input`" :label="t('spells.tags.label')" :model-value="t('spells.tags.selected', modelValue.length)" readonly @click="open" />
    <TarModal centered :close="t('actions.close')" fade :id="`${id}-modal`" ref="modal" scrollable size="x-large" :title="t('spells.tags.select')">
      <div class="d-flex justify-content-between align-items-center gap-3 mb-3">
        {{ t("spells.tags.selected", selected.size) }}
        <TarButton
          :icon="tags.length === selected.size ? 'far fa-square' : 'far fa-square-check'"
          outline
          size="small"
          :text="t(tags.length === selected.size ? 'actions.unselectAll' : 'actions.selectAll')"
          variant="primary"
          @click="toggleAll"
        />
      </div>
      <div>
        <TarButton
          v-for="tag in options"
          :key="tag"
          class="me-2 mb-2"
          :outline="!selected.has(tag)"
          size="small"
          :variant="selected.has(tag) ? 'primary' : 'secondary'"
          @click="toggle(tag)"
          >{{ tag }}</TarButton
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

const { t } = useI18n();

const props = withDefaults(
  defineProps<{
    id?: string;
    modelValue?: string[];
    tags?: string[];
  }>(),
  {
    id: "tags",
    modelValue: () => [],
    tags: () => [],
  },
);

const emit = defineEmits<{
  (e: "update:model-value", value: string[]): void;
}>();

const modal = ref<InstanceType<typeof TarModal> | null>(null);
const selected = ref<Set<string>>(new Set());

const hasChanges = computed<boolean>(() => props.modelValue.length !== selected.value.size || props.modelValue.some((value) => !selected.value.has(value)));
const options = computed<string[]>(() => [...props.tags].sort((a, b) => (a > b ? 1 : a < b ? -1 : 0)));

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

function toggle(tag: string): void {
  if (selected.value.has(tag)) {
    selected.value.delete(tag);
  } else {
    selected.value.add(tag);
  }
}

function toggleAll(): void {
  if (props.tags.length === selected.value.size) {
    selected.value.clear();
  } else {
    props.tags.forEach((tag) => selected.value.add(tag));
  }
}
</script>
