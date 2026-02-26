<template>
  <q-dialog v-model="open">
    <q-card style="min-width: 380px;">
      <q-card-section class="row items-center q-pb-sm">
        <div class="row items-center q-gutter-sm">
          <q-icon name="person" size="22px" />
          <div class="text-h6">Criar conta</div>
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
                class="full-width btn__primary"
                color="primary"
                label="Registrar"
                type="submit"
            />
          </div>
        </Form>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { Form } from 'vee-validate'
import { useQuasar } from 'quasar'
import NameInput from "@/components/form/NameInput.vue";
import EmailInput from "@/components/form/EmailInput.vue";
import PasswordInput from "@/components/form/PasswordInput.vue";
import { useUiStore } from '@/stores/ui.store'

const $q = useQuasar()
const ui = useUiStore()

const open = computed({
  get: () => ui.activeAuthModal === 'register',
  set: (v: boolean) => {
    if (!v) ui.closeAuthModal()
    else ui.openRegister()
  }
})

const emit = defineEmits<{
  (e: 'success', payload: any): void
}>()

function onSubmit(values: any) {
  $q.notify({ type: 'positive', message: 'Cadastro realizado!' })
  ui.closeAuthModal()
}
</script>