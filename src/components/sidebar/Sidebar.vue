<template>
  <div class="sidebar">

    <SidebarHeader/>

    <SidebarNav/>

    <div class="spacer" />

    <SidebarFooter/>
  </div>
</template>

<script setup lang="ts">
import SidebarFooter from "@/components/sidebar/SidebarFooter.vue";
import SidebarNav from "@/components/sidebar/SidebarNav.vue";
import SidebarHeader from "@/components/sidebar/SidebarHeader.vue";
</script>

<style lang="scss">
.sidebar {
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: 18px 14px 14px;
  color: rgba(255, 255, 255, 0.92);
  background-color: #111117;
}

.spacer { flex: 1; }

</style>