<template>
  <table class="table table-sm table-striped text-center">
    <thead>
      <tr>
        <th scope="col">{{ t("spells.level.label") }}</th>
        <th scope="col">{{ t("spells.school.label") }}</th>
        <th scope="col">{{ t("spells.name") }}</th>
        <th scope="col">{{ t("spells.classes") }}</th>
        <th scope="col">{{ t("spells.castingTime.label") }}</th>
        <th scope="col">{{ t("spells.components") }}</th>
        <th scope="col">{{ t("spells.duration.label") }}</th>
        <th scope="col">{{ t("spells.range.label") }}</th>
        <th scope="col">{{ t("brand") }}</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="spell in spells" :key="spell.name">
        <td>{{ spell.level ? n(spell.level, "integer") : t("spells.level.cantrip") }}</td>
        <td>{{ t(`spells.school.options.${spell.school}`) }}</td>
        <td>
          <a href="#" @click.prevent="$emit('clicked', spell)">{{ spell.name }}</a>
        </td>
        <td>{{ formatClasses(spell.classes) }}</td>
        <td>{{ formatCastingTime(spell.castingTime, t) }}<template v-if="spell.ritual">&nbsp;(R)</template></td>
        <td>{{ formatComponents(spell, "short") }}</td>
        <td>{{ formatDuration(spell, "short", t) }}</td>
        <td>{{ formatRange(spell.range, n, t) }}</td>
        <td>
          <!-- TODO(fpion): {{ spell.group }} -->
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script setup lang="ts">
import { useI18n } from "vue-i18n";

import type { Spell } from "@/types/spells";
import { formatCastingTime, formatClasses, formatComponents, formatDuration, formatRange } from "@/utils/spells";

const { n, t } = useI18n();

defineProps<{
  spells: Spell[];
}>();

defineEmits<{
  (e: "clicked", value: Spell): void;
}>();
</script>
