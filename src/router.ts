import { createRouter, createWebHistory } from "vue-router";

import HomeView from "./views/HomeView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "Home",
      component: HomeView,
    },
    // Spells
    {
      name: "AbjurationSpells",
      path: "/spells/abjuration",
      component: () => import("./views/spells/AbjurationSpellsView.vue"),
    },
    {
      name: "AnimismSpells",
      path: "/spells/animism",
      component: () => import("./views/spells/AnimismSpellsView.vue"),
    },
    {
      name: "ConjurationSpells",
      path: "/spells/conjuration",
      component: () => import("./views/spells/ConjurationSpellsView.vue"),
    },
    {
      name: "DivinationSpells",
      path: "/spells/divination",
      component: () => import("./views/spells/DivinationSpellsView.vue"),
    },
    {
      name: "DivineSpells",
      path: "/spells/divine",
      component: () => import("./views/spells/DivineSpellsView.vue"),
    },
    {
      name: "EnchantmentSpells",
      path: "/spells/enchantment",
      component: () => import("./views/spells/EnchantmentSpellsView.vue"),
    },
    {
      name: "EvocationSpells",
      path: "/spells/evocation",
      component: () => import("./views/spells/EvocationSpellsView.vue"),
    },
    {
      name: "IllusionSpells",
      path: "/spells/illusion",
      component: () => import("./views/spells/IllusionSpellsView.vue"),
    },
    {
      name: "NecromancySpells",
      path: "/spells/necromancy",
      component: () => import("./views/spells/NecromancySpellsView.vue"),
    },
    {
      name: "TransmutationSpells",
      path: "/spells/transmutation",
      component: () => import("./views/spells/TransmutationSpellsView.vue"),
    },
    // NotFound
    {
      name: "NotFound",
      path: "/:pathMatch(.*)*",
      component: () => import("./views/NotFound.vue"),
      // route level code-splitting
      // this generates a separate chunk (NotFound.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
    },
  ],
});

export default router;
