<template>
  <q-dialog v-model="open" class="dialog-blur">
    <q-card style="min-width: 380px;">
      <q-card-section class="row items-center q-pb-sm">
        <div class="row items-center q-gutter-sm">
          <q-icon name="person" size="22px" />
          <div class="text-h6 text-cinzel text-weight-bold">Login</div>
        </div>

        <q-space />

        <q-btn flat round dense icon="close" v-close-popup />
      </q-card-section>

      <q-card-section>
        <Form @submit="onSubmit" class="column q-gutter-md">
          <EmailInput />
          <PasswordInput />
          <div>
            <q-btn
                class="full-width btn__primary btn__primary--pink text-white"
                label="Login"
                icon="login"
                type="submit"
                :loading="loading"
                :disable="loading"
            />
          </div>
        </Form>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { Form } from 'vee-validate'
import { useQuasar } from 'quasar'
import { useUiStore } from '@/stores/ui.store'

import EmailInput from "@/components/form/EmailInput.vue";
import PasswordInput from "@/components/form/PasswordInput.vue";
import {useAuthStore} from "@/stores/auth";
import {LoginPayload} from "@/types/auth";
import {login} from "@/services/auth.service";

const loading = ref(false)
const auth = useAuthStore()
const $q = useQuasar()
const ui = useUiStore()

const open = computed({
  get: () => ui.activeAuthModal === 'login',
  set: (v: boolean) => {
    if (!v) ui.closeAuthModal()
    else ui.openLogin()
  }
})


async function onSubmit(values: LoginPayload) {
  loading.value = true
  try {
    const data = await login(values)
    auth.setAuth({ token: data.token, user: data.user })

    $q.notify({ type: 'positive', message: 'Login realizado com sucesso!' })
    ui.closeAuthModal()
  } catch (e: any) {
    $q.notify({
      type: 'negative',
      message: e.response?.data?.message || 'E-mail ou senha inválidos'
    })
  } finally {
    loading.value = false
  }
}
</script>
