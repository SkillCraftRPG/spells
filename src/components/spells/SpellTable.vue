<template>
  <table class="table table-sm table-striped text-center">
    <thead>
      <tr>
        <th scope="col" class="w-5">{{ t("spells.level") }}</th>
        <th scope="col" class="w-10">{{ t("spells.school") }}</th>
        <th scope="col" class="w-15">{{ t("spells.name") }}</th>
        <th scope="col" class="w-10">{{ t("spells.castingTime.label") }}</th>
        <th scope="col" class="w-5">{{ t("spells.castingTime.ritual") }}</th>
        <th scope="col" class="w-5">{{ t("spells.components.material") }}</th>
        <th scope="col" class="w-5">{{ t("spells.components.somatic") }}</th>
        <th scope="col" class="w-5">{{ t("spells.components.verbal") }}</th>
        <th scope="col" class="w-10">{{ t("spells.duration.label") }}</th>
        <th scope="col" class="w-5">{{ t("spells.duration.concentration") }}</th>
        <th scope="col" class="w-10">{{ t("spells.range.label") }}</th>
        <th scope="col" class="w-15">{{ t("brand") }}</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="spell in spells" :key="spell.name">
        <td class="w-5">{{ spell.level ? n(spell.level, "integer") : t("spells.cantrip") }}</td>
        <td class="w-10">{{ spell.school }}</td>
        <td class="w-15">
          <a :href="spell.src" target="_blank">{{ spell.name }}</a>
        </td>
        <td class="w-10">{{ t(`spells.castingTime.options.${spell.castingTime}`) }}</td>
        <td class="w-5">
          <span v-if="spell.ritual">{{ "✓" }}</span>
        </td>
        <td class="w-5">
          <span v-if="spell.material">{{ "✓" }}</span>
        </td>
        <td class="w-5">
          <span v-if="spell.somatic">{{ "✓" }}</span>
        </td>
        <td class="w-5">
          <span v-if="spell.verbal">{{ "✓" }}</span>
        </td>
        <td class="w-10">{{ parseDuration(spell.duration) }}</td>
        <td class="w-5">
          <span v-if="spell.concentration">{{ "✓" }}</span>
        </td>
        <td class="w-10">
          <span v-if="spell.range === 0">{{ t("spells.range.self") }}</span>
          <span v-else-if="spell.range === 1">{{ t("spells.range.touch") }}</span>
          <span v-else-if="typeof spell.range === 'number'">{{ n(spell.range, "integer") }}</span>
          <span v-else>{{ t("spells.range.unlimited") }}</span>
        </td>
        <td class="w-15">{{ spell.group }}</td>
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
