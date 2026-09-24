<template>
  <TarModal centered :close="t('actions.close')" fade :id="id" ref="modal" scrollable size="x-large" :title="spell.name">
    <div class="mb-3 fst-italic">{{ subtitle }}</div>
    <section class="mb-3">
      <div>
        <strong>{{ t("spells.castingTime.label") }}.</strong> {{ formatCastingTime(spell.castingTime, t) }}
      </div>
      <div>
        <strong>{{ t("spells.range.label") }}.</strong> {{ formatRange(spell.range, n, t) }}
      </div>
      <div>
        <strong>{{ t("spells.components") }}.</strong> {{ formatComponents(spell, "long") }}
      </div>
      <div>
        <strong>{{ t("spells.duration.label") }}.</strong> {{ formatDuration(spell, "long", t) }}
      </div>
    </section>
    <MarkdownContent :text="spell.description" />
    <div v-if="spell.classes.length" class="mb-3">
      <strong class="fst-italic">{{ t("spells.lists") }}.</strong> {{ formatClasses(spell.classes) }}
    </div>
    <div>
      <a :href="spell.src" target="_blank">{{ t("spells.wikidot") }}</a>
    </div>
    <template #footer>
      <TarButton icon="fas fa-xmark" :text="t('actions.close')" variant="secondary" @click="close" />
    </template>
  </TarModal>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import { useI18n } from "vue-i18n";

import MarkdownContent from "@/components/shared/MarkdownContent.vue";
import TarButton from "@/components/tar/TarButton.vue";
import TarModal from "@/components/tar/TarModal.vue";
import type { Spell } from "@/types/spells";
import { formatCastingTime, formatClasses, formatComponents, formatDuration, formatRange } from "@/utils/spells";

const { n, t } = useI18n();

const props = withDefaults(
  defineProps<{
    id?: string;
    spell: Spell;
  }>(),
  {
    id: "spell",
  },
);

const modal = ref<InstanceType<typeof TarModal> | null>(null);

const subtitle = computed<string>(() => {
  const school: string = t(`spells.school.options.${props.spell.school}`);
  const parts: string[] = [];
  switch (props.spell.level) {
    case 0:
      return [school, t("spells.level.cantrip").toLocaleLowerCase()].join(" ");
    case 1:
      parts.push(t("spells.level.first"));
      break;
    case 2:
      parts.push(t("spells.level.second"));
      break;
    case 3:
      parts.push(t("spells.level.third"));
      break;
    default:
      parts.push(t("spells.level.format", { level: n(props.spell.level, "integer") }));
      break;
  }
  parts.push(school);
  if (props.spell.ritual) {
    parts.push(`(${t("spells.ritual")})`);
  }
  return parts.join(" ").toLocaleLowerCase();
});

function close(): void {
  modal.value?.hide();
}
function open(): void {
  modal.value?.show();
}
defineExpose({ close, open });
</script>
