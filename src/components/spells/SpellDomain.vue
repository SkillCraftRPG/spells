<template>
  <div class="row text-center">
    <div v-for="item in tiers" :key="item.tier" class="col">
      <SpellDomainTier :groups="item.groups" :tier="item.tier" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";

import SpellDomainTier from "./SpellDomainTier.vue";
import domains from "@/assets/data/domains.json";

const props = defineProps<{
  domain: string;
}>();

type DomainTier = {
  groups: string[];
  tier: number;
};
const tiers = computed<DomainTier[]>(() => {
  const records = domains as Record<string, Record<number, string[]>>;
  const domain: Record<number, string[]> | undefined = records[props.domain];
  const tiers: DomainTier[] = [];
  for (let tier = 0; tier <= 3; tier++) {
    const groups: string[] = (domain ? domain[tier] : undefined) ?? [];
    tiers.push({ tier, groups });
  }
  return tiers;
});
</script>
