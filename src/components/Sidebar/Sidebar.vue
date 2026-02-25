<template>
  <div class="sidebar">

    <div class="profile">
      <q-avatar size="50px">
        <img
            :src="yugi"
            alt="avatar"
        />
      </q-avatar>
      <div class="profile__meta">
        <div class="profile__name">Nome</div>
        <div class="profile__email">email@email.com</div>
      </div>
    </div>

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

    <div class="spacer" />

    <div class="bottom">
      <q-separator dark class="bottom__sep" />

      <q-list padding>
        <q-item clickable v-ripple class="menu__item menu__item--danger" @click="">
          <q-item-section avatar>
            <q-icon name="logout" class="menu__icon menu__icon--danger" />
          </q-item-section>
          <q-item-section>
            <q-item-label class="menu__label menu__label--danger">Sair</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { SidebarItem } from "@/components/Sidebar/sidebar.ts";
import yugi from "@/assets/images/yugi.jpg";

const topItems: SidebarItem[] = [
  { label: "Home", icon: "home", to: "/" },
];

</script>

<style scoped lang="scss">
.sidebar {
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: 18px 14px 14px;
  color: rgba(255, 255, 255, 0.92);
  background-color: #111117;
}

.profile {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 8px 10px 14px;
}

.profile__meta { line-height: 1.1; }
.profile__name {
  font-weight: 800;
  letter-spacing: 0.6px;
}
.profile__email {
  margin-top: 3px;
  font-size: 12px;
  opacity: 0.75;
}

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

.spacer { flex: 1; }

.bottom__sep {
  opacity: 0.28;
  margin: 10px 8px 6px;
}

.menu__item--danger:hover {
  background: rgba(255, 60, 60, 0.08);
}

.menu__label--danger,
.menu__icon--danger {
  color: rgba(255, 80, 80, 0.95);
}
</style>