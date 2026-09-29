<template>
  <main class="container-fluid page">
    <h1>{{ title }}</h1>
    <SpellList class="mb-3" school="Enchantment" />
    <SpellDomain domain="enchantment" />
  </main>
</template>

<script setup lang="ts">
import { computed, watchEffect } from "vue";
import { useI18n } from "vue-i18n";

import SpellDomain from "@/components/spells/SpellDomain.vue";
import SpellList from "@/components/spells/SpellList.vue";
import { useDocument } from "@/composables/document";

const document = useDocument();
const { t } = useI18n();

const title = computed<string>(() => t("spells.title.enchantment"));

watchEffect(() => document.setTitle(title.value));
</script>
