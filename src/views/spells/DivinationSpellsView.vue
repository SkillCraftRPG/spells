<template>
  <main class="container-fluid page">
    <h1>{{ title }}</h1>
    <SpellList school="Divination" />
  </main>
</template>

<script setup lang="ts">
import { computed, watchEffect } from "vue";
import { useI18n } from "vue-i18n";

import SpellList from "@/components/spells/SpellList.vue";
import { useDocument } from "@/composables/document";

const document = useDocument();
const { t } = useI18n();

const title = computed<string>(() => t("spells.title.divination"));

watchEffect(() => document.setTitle(title.value));
</script>
