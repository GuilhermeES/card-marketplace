<template>
  <q-separator class="bottom__sep" />

  <q-list padding>
    <q-item clickable v-ripple class="menu__item--danger" @click="logout()">
      <q-item-section avatar>
        <q-icon name="logout" class="menu__icon menu__icon--danger" />
      </q-item-section>
      <q-item-section>
        <q-item-label class="menu__label menu__label--danger">Sair</q-item-label>
      </q-item-section>
    </q-item>
  </q-list>
</template>

<script setup lang="ts">
import { useAuthStore } from '@/stores/auth'
import { useRouter } from 'vue-router'

const auth = useAuthStore()
const router = useRouter()

function logout() {
  auth.logout()
  router.push('/')
}

</script>

<style>
.menu__item--danger {
  border-radius: 10px;
}

.menu__item--danger:hover {
  background: rgba(255, 60, 60, 0.08);
}

.menu__label--danger,
.menu__icon--danger {
  color: rgba(255, 80, 80, 0.95);
}

.menu__label--danger{
  font-size: 15px;
}

.bottom__sep{
  background: rgba(163, 163, 163, 0.1882352941) !important;
}
</style>