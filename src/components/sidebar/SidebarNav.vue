<template>
  <q-list class="menu" padding>
    <q-item v-if="auth.isAuthenticated"
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

   <div v-if="!auth.isAuthenticated">
     <q-btn icon="login" label="Login" class="menu__item full-width btn__primary--login"  @click="ui.openLogin()"/>
     <q-btn icon="person" label="Registrar" class="menu__item full-width btn__primary"  @click="ui.openRegister()"/>
   </div>

  </q-list>
</template>

<script setup lang="ts">
import { useUiStore } from '@/stores/ui.store'
import type { SidebarItem } from "@/components/sidebar/sidebar.ts";

import { useAuthStore } from '@/stores/auth'
const auth = useAuthStore()

const topItems: SidebarItem[] = [
  { label: "Home", icon: "home", to: "/" },
];

const ui = useUiStore()
</script>

<style>
.menu {
  margin-top: 4px;
  border-top: 1px solid rgba(255, 255, 255, 0.28);
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
  background: #9d085b33;
  font-weight: 800;
  border: none;
}

.is-active .menu__icon {
  color: $wine;
}

</style>