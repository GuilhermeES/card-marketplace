<template>
  <q-dialog v-model="open" class="dialog-blur">
    <q-card style="min-width: 380px;">
      <q-card-section class="row items-center q-pb-sm">
        <div class="row items-center q-gutter-sm">
          <q-icon name="person" size="22px" />
          <div class="text-h6 text-cinzel  text-weight-bold">Criar conta</div>
        </div>

        <q-space />

        <q-btn flat round dense icon="close" v-close-popup />
      </q-card-section>

      <q-card-section>
        <Form @submit="onSubmit" class="column q-gutter-md">
            <NameInput />
            <EmailInput />
            <PasswordInput />
          <div>
            <q-btn
                icon="person"
                class="full-width btn__primary"
                label="Registrar"
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
import {computed, ref} from 'vue'
import { Form } from 'vee-validate'
import { useQuasar } from 'quasar'
import { useUiStore } from '@/stores/ui.store'

import NameInput from "@/components/form/NameInput.vue";
import EmailInput from "@/components/form/EmailInput.vue";
import PasswordInput from "@/components/form/PasswordInput.vue";
import {RegisterPayload} from "@/types/auth";
import {register} from "@/services/auth.service";

const loading = ref(false)
const $q = useQuasar()
const ui = useUiStore()

const open = computed({
  get: () => ui.activeAuthModal === 'register',
  set: (v: boolean) => {
    if (!v) ui.closeAuthModal()
    else ui.openRegister()
  }
})

async function onSubmit(values: RegisterPayload) {
  loading.value = true
  try {
    await register(values)

    $q.notify({ type: 'positive', message: 'Cadastro realizado com sucesso!' })
    ui.closeAuthModal()
  } catch (e: any) {
    $q.notify({
      type: 'negative',
      message: e.response?.data?.message || 'Erro ao realizar cadastro'
    })
  } finally {
    loading.value = false
  }
}
</script>