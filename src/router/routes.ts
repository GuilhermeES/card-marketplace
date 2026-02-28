import type { RouteRecordRaw } from "vue-router";
import AppLayout from "@/layouts/AppLayout.vue";
import MarketplacePage from "@/pages/MarketplacePage.vue"
import CardsPage from "@/pages/CardsPage.vue";
import MyDeckPage from "@/pages/MyDeckPage.vue";

export const routes: RouteRecordRaw[] = [
    {
        path: "/",
        component: () => AppLayout,
        children: [
            { path: "", name: "marketplace", component: ()   => MarketplacePage },
            { path: "/cards", name: "cards", component: ()   => CardsPage, meta: { requiresAuth: true } },
            { path: "/deck", name: "deck", component: ()   =>   MyDeckPage, meta: { requiresAuth: true } },
        ],
    },
];