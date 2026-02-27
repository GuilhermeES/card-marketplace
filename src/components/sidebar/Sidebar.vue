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
  background: radial-gradient(circle at top left, rgb(157 57 109 / 4%), transparent 50%), linear-gradient(180deg, #0b0c10 0%, #12121a 100%);
}

.spacer { flex: 1; }

.avatar-yugi-bg{
  position: relative;
  bottom: -13px;
  opacity: 0.6;
  left: -13px;
}
</style>