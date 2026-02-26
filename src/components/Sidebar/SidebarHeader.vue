<template>
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
</template>

<script setup lang="ts">
import yugi from "@/assets/images/yugi.jpg";
</script>

<style>
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
</style>