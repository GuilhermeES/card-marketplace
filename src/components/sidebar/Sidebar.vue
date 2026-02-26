<template>
  <div class="sidebar">

    <SidebarHeader />

    <SidebarNav/>

    <div class="spacer" />

    <img
        v-if="!auth.isAuthenticated"
        :src="yugi_bg"
        alt="avatar"
        class="avatar-yugi-bg"
    />

    <SidebarFooter v-if="auth.isAuthenticated"/>
  </div>
</template>

<script setup lang="ts">
import SidebarFooter from "@/components/sidebar/SidebarFooter.vue";
import SidebarNav from "@/components/sidebar/SidebarNav.vue";
import SidebarHeader from "@/components/sidebar/SidebarHeader.vue";

import { useAuthStore } from '@/stores/auth'
import yugi_bg from "@/assets/images/yugioh-bg.png";
const auth = useAuthStore()
</script>

<style lang="scss">
.sidebar {
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: 18px 14px 14px;
  color: rgba(255, 255, 255, 0.92);
  background-color: $background-color-sidebar;
  border-right: 1px solid #a3a3a330;
}

.spacer { flex: 1; }

.avatar-yugi-bg{
  position: relative;
  bottom: -13px;
  opacity: 0.8;
  left: -13px;
}
</style>