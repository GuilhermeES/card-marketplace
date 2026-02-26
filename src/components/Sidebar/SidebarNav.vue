<template>
  <q-list class="menu" padding>
    <q-item
        v-for="item in topItems"
        :key="item.label"
        clickable
        v-ripple
        :to="item.to"
        active-class="is-active"
        class="menu__item"
    >
      <q-item-section avatar>
        <q-icon :name="item.icon" class="menu__icon" />
      </q-item-section>

      <q-item-section>
        <q-item-label class="menu__label">
          {{ item.label }}
        </q-item-label>
      </q-item-section>
    </q-item>
  </q-list>
</template>

<script setup lang="ts">
import type { SidebarItem } from "@/components/Sidebar/sidebar.ts";

const topItems: SidebarItem[] = [
  { label: "Home", icon: "home", to: "/" },
];

</script>

<style>
.menu {
  margin-top: 4px;
}

.menu__item {
  border-radius: 14px;
  padding: 10px 12px;
  margin: 6px 4px;
  color: rgba(255, 255, 255, 0.72);
  transition: 0.18s ease;
}

.menu__item:hover {
  background: rgba(255, 255, 255, 0.06);
  color: rgba(255, 255, 255, 0.92);
}

.menu__icon {
  opacity: 0.85;
}

.menu__label {
  font-size: 14px;
  letter-spacing: 0.2px;
}

.is-active {
  border: 1px solid #ffffff17;
  background: rgba(255, 255, 255, 0.06);
  color: rgba(255, 255, 255, 0.95);
}

.is-active .menu__icon {
  color: $wine;
}

</style>