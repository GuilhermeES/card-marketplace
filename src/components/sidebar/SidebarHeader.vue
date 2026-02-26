<template>
  <div class="profile">


    <q-avatar

        size="80px"
        class="profile__avatar"
    >
      <img
          :src="yugi"
          alt="avatar"
          class="avatar-img"
      />
    </q-avatar>

    <div

        class="profile__meta"
    >
      <div class="profile__name">{{ auth.user?.name ?? 'Olá, duelista' }}</div>
      <div class="profile__email">{{ auth.user?.email ?? 'Faça login para continuar' }}</div>
    </div>

  </div>
</template>

<script setup lang="ts">
import yugi from "@/assets/images/yugi.jpg";
import yugi_bg from "@/assets/images/yugioh-bg.png";

import { useAuthStore } from '@/stores/auth'
const auth = useAuthStore()
</script>

<style lang="scss">
.profile {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 12px;
}

.profile__avatar {
  display: flex;
  justify-content: center;
  margin-bottom: 5px;
}

.q-avatar__content{
  border: 2px solid $primary-color;
}

.profile__avatar--guest {
  margin-top: 10px;
}

.avatar-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.profile__name {
  font-weight: 700;
  font-family: "Cinzel", serif;
}

.profile__email {
  font-size: 13px;
  opacity: 0.7;
}
</style>