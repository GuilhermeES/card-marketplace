<template>
  <div class="profile">

    <q-avatar
        v-if="auth.isAuthenticated"
        size="80px"
        class="profile__avatar"
    >
      <img
          :src="yugi"
          alt="avatar"
          class="avatar-img"
      />
    </q-avatar>

    <div class="profile__meta">
      <div class="profile__name">{{ auth.user?.name ?? 'Olá, duelista' }}</div>
      <div class="profile__email">{{ auth.user?.email ?? 'Entre ou crie sua conta para continuar.' }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import yugi from "@/assets/images/yugi.jpg";
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
  margin-bottom: 10px;
}

.profile__avatar {
  display: flex;
  justify-content: center;
  margin-bottom: 5px;
}

.q-avatar__content{
  border: 2px solid $dark-pink;
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
  font-size: 16px;
}

.profile__email {
  font-size: 14px;
  opacity: 0.7;
}
</style>