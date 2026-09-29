<template>
  <TarCard class="h-100" :title="t('spells.tier.format', { tier: n(tier, 'integer') })">
    <template v-if="groups.length">
      <div v-for="(group, index) in groups" :key="index">
        <a href="#" @click.prevent="setGroup(group)">{{ group }}</a>
      </div>
    </template>
    <span v-else class="text-body-secondary">N/A</span>
  </TarCard>
</template>

<script setup lang="ts">
import { useI18n } from "vue-i18n";

import TarCard from "@/components/tar/TarCard.vue";
import { useSpellStore } from "@/stores/spells";

const spellStore = useSpellStore();
const { n, t } = useI18n();

defineProps<{
  groups: string[];
  tier: number;
}>();

function setGroup(group: string): void {
  spellStore.filters.group = group;
}
</script>
