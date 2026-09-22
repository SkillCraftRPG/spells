<template>
  <main class="container-fluid page">
    <h1>{{ title }}</h1>
    <p class="text-body-secondary">{{ spells.length }} School of Abjuration spells</p>
    <SpellTable :spells="spells" />
  </main>
</template>

<script setup lang="ts">
import { arrayUtils } from "logitar-js";
import { computed, watchEffect } from "vue";
import { useI18n } from "vue-i18n";

import SpellTable from "@/components/spells/SpellTable.vue";
import spellData from "@/assets/data/spells.json";
import type { Spell } from "@/types/spells";
import { useDocument } from "@/composables/document";

const document = useDocument();
const { orderBy } = arrayUtils;
const { t } = useI18n();

const spells = computed<Spell[]>(
  () =>
    orderBy(
      spellData.filter((spell) => spell.school === "Abjuration").map((spell) => ({ ...spell, sort: [spell.level, spell.name].join("_") })),
      "sort",
    ) as Spell[],
);
const title = computed<string>(() => t("spells.title.abjuration"));

watchEffect(() => document.setTitle(title.value));
</script>
