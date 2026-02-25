import type { RouteRecordRaw } from "vue-router";
import AppLayout from "@/layouts/AppLayout.vue";
import MarketplacePage from "@/pages/MarketplacePage.vue"

export const routes: RouteRecordRaw[] = [
    {
        path: "/",
        component: () => AppLayout,
        children: [
            { path: "", name: "marketplace", component: ()   => MarketplacePage },
        ],
    },
];