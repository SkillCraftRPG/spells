<template>
  <main class="container">
    <h1>{{ title }}</h1>
    <p>{{ t("home.text") }}</p>
    <section class="text-center">
      <RouterLink class="card clickable mb-3" :to="{ name: 'Spells' }">
        <div class="card-body">
          <div class="fw-semibold">{{ t("spells.title.all") }}</div>
        </div>
      </RouterLink>
    </section>
    <section>
      <h2 class="h3">{{ t("spells.spirituality") }}</h2>
      <div class="row text-center">
        <div v-for="domain in spirituality" :key="domain.key" class="col-md-6">
          <RouterLink class="card clickable mb-3" :to="{ name: domain.route }">
            <div class="card-body">
              <div class="fw-semibold">{{ t(`spells.title.${domain.key}`) }}</div>
            </div>
          </RouterLink>
        </div>
      </div>
    </section>
    <section>
      <h2 class="h3">{{ t("spells.school.title") }}</h2>
      <div class="row text-center">
        <div v-for="(domain, index) in schools" :key="index" class="col-md-6 col-lg-4 col-xl-3">
          <RouterLink class="card clickable mb-3" :to="{ name: domain.route }">
            <div class="card-body">
              <div class="fw-semibold">{{ t(`spells.title.${domain.key}`) }}</div>
            </div>
          </RouterLink>
        </div>
      </div>
    </section>
  </main>
</template>

<script setup lang="ts">
import { computed, watchEffect } from "vue";
import { useI18n } from "vue-i18n";

import { SCHOOLS } from "@/types/spells";
import { useDocument } from "@/composables/document";

const document = useDocument();
const { t } = useI18n();

type Domain = {
  key: string;
  route: string;
};
const schools = computed<Domain[]>(() => SCHOOLS.map((key) => ({ key: key.toLowerCase(), route: `${key}Spells` })));
const spirituality = computed<Domain[]>(() => [
  { key: "animism", route: "AnimismSpells" },
  { key: "divine", route: "DivineSpells" },
]);

const title = computed<string>(() => t("home.title"));

watchEffect(() => document.setTitle(title.value));
</script>
