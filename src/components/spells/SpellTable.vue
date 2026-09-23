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
          <a :href="spell.src" target="_blank">{{ spell.name }}</a>
        </td>
        <td>{{ spell.classes.join(", ") }}</td>
        <td>{{ t(`spells.castingTime.options.${spell.castingTime}`) }}<template v-if="spell.ritual">&nbsp;(R)</template></td>
        <td>{{ formatComponents(spell) }}</td>
        <td>{{ parseDuration(spell.duration) }}<template v-if="spell.concentration">&nbsp;(C)</template></td>
        <td>
          <span v-if="spell.range === 0">{{ t("spells.range.self") }}</span>
          <span v-else-if="spell.range === 1">{{ t("spells.range.touch") }}</span>
          <span v-else-if="typeof spell.range === 'number'">{{ n(spell.range, "integer") }}</span>
          <span v-else>{{ t("spells.range.unlimited") }}</span>
        </td>
        <td>
          <!-- TODO(fpion): {{ spell.group }} -->
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script setup lang="ts">
import { parsingUtils } from "logitar-js";
import { useI18n } from "vue-i18n";

import type { Spell } from "@/types/spells";

const { n, t } = useI18n();
const { parseNumber } = parsingUtils;

defineProps<{
  spells: Spell[];
}>();

function formatComponents(spell: Spell): string {
  const components: string[] = [];
  if (spell.verbal) {
    components.push("V");
  }
  if (spell.somatic) {
    components.push("S");
  }
  if (spell.material) {
    components.push("M");
  }
  return components.join(", ");
}

function parseDuration(duration: string | null): string {
  if (duration === null) {
    return t("spells.duration.untilDispelled");
  }
  const index: number = duration.indexOf(".");
  const parts: string[] = duration.substring(index < 0 ? 0 : index).split(":");
  if (parts.length !== 3) {
    throw new Error(`The duration '${duration}' is not valid.`);
  }
  const days: number = (index >= 0 ? parseNumber(duration.substring(0, index)) : undefined) ?? 0;
  const hours: number = parseNumber(parts[0]) ?? 0;
  const minutes: number = parseNumber(parts[1]) ?? 0;
  const seconds: number = parseNumber(parts[2]) ?? 0;
  if (!days && !hours && !minutes && !seconds) {
    return t("spells.duration.instantaneous");
  }
  const formatted: string[] = [];
  if (days) {
    formatted.push(t("spells.duration.days", days));
  }
  if (hours) {
    formatted.push(t("spells.duration.hours", hours));
  }
  if (minutes) {
    formatted.push(t("spells.duration.minutes", minutes));
  }
  if (seconds) {
    formatted.push(seconds % 6 === 0 ? t("spells.duration.rounds", seconds / 6) : t("spells.duration.seconds", seconds));
  }
  return formatted.join(", ");
}
</script>
