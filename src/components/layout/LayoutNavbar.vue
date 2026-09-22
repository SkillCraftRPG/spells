<template>
  <nav class="navbar navbar-expand-lg bg-body-tertiary" data-bs-theme="dark">
    <div class="container-fluid">
      <RouterLink :to="{ name: 'Home' }" class="navbar-brand">
        <img src="@/assets/img/logo.png" :alt="`${t('brand')} Logo`" height="32" />
        {{ t("brand") }}
        <TarBadge v-if="environment !== 'production'" variant="warning">{{ environment }}</TarBadge>
      </RouterLink>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li v-if="swaggerUrl" class="nav-item">
            <a class="nav-link" :href="swaggerUrl" target="_blank"><font-awesome-icon icon="fas fa-vial" />&nbsp;Swagger</a>
          </li>
          <!-- <li class="nav-item">
            <RouterLink class="nav-link" :to="{ name: 'Worlds' }"><font-awesome-icon icon="fas fa-dungeon" />&nbsp;{{ t("worlds.title") }}</RouterLink>
          </li> -->
        </ul>
        <ul class="navbar-nav mb-2 mb-lg-0">
          <template v-if="i18n.locale">
            <li v-if="otherLocale" class="nav-item">
              <a class="nav-link" href="#" @click.prevent="i18n.setLocale(otherLocale)">{{ otherLocale.nativeName }}</a>
            </li>
            <li v-else-if="otherLocales.length > 1" class="nav-item dropdown">
              <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">{{ i18n.locale.nativeName }}</a>
              <ul class="dropdown-menu dropdown-menu-end">
                <li v-for="option in otherLocales" :key="option.code">
                  <a class="dropdown-item" href="#" @click.prevent="i18n.setLocale(option)">{{ option.nativeName }}</a>
                </li>
              </ul>
            </li>
          </template>
          <li class="nav-item">
            <LayoutTheme />
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { RouterLink } from "vue-router";
import { arrayUtils, parsingUtils, stringUtils } from "logitar-js";
import { computed, watchEffect } from "vue";
import { useI18n } from "vue-i18n";

import LayoutTheme from "@/components/layout/LayoutTheme.vue";
import TarBadge from "@/components/tar/TarBadge.vue";
import locales from "@/assets/data/locales.json";
import type { Locale } from "@/types/i18n";
import { useI18nStore } from "@/stores/i18n";

const apiBaseUrl: string = import.meta.env.VITE_APP_API_BASE_URL ?? "";
const environment: string = import.meta.env.MODE;
const i18n = useI18nStore();
const { availableLocales, locale, t } = useI18n();
const { combineURL } = stringUtils;
const { orderBy } = arrayUtils;
const { parseBoolean } = parsingUtils;

const otherLocale = computed<Locale | undefined>(() => (otherLocales.value.length === 1 ? otherLocales.value[0] : undefined));
const otherLocales = computed<Locale[]>(() => {
  const otherLocales = new Set<string>(availableLocales.filter((item) => item !== locale.value));
  return orderBy(
    locales.filter(({ code }) => otherLocales.has(code)),
    "nativeName",
  );
});
const swaggerUrl = computed<string | undefined>(() => {
  const isSwaggerEnabled: boolean = parseBoolean(import.meta.env.VITE_APP_SWAGGER_ENABLED) ?? false;
  return isSwaggerEnabled ? combineURL(apiBaseUrl, "/swagger") : undefined;
});

watchEffect(() => {
  if (i18n.locale) {
    locale.value = i18n.locale.code;
  } else {
    const currentLocale = locales.find(({ code }) => code === locale.value);
    if (!currentLocale) {
      throw new Error(`The locale "${locale.value}" is not supported.'`);
    }
    i18n.setLocale(currentLocale);
  }
});
</script>
