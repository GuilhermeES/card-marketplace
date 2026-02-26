<script setup lang="ts">
import { ref } from 'vue'
import { Field } from 'vee-validate'

type Props = {
  name?: string
  label?: string
  rules?: string
}

const props = withDefaults(defineProps<Props>(), {
  name: 'password',
  label: 'Senha',
  rules: 'required|min:6',
})

const show = ref(false)
</script>

<template>
  <Field :name="props.name" :rules="props.rules" v-slot="{ field, errorMessage }">
    <q-input
        outlined
        :type="show ? 'text' : 'password'"
        :label="props.label"
        :model-value="field.value"
        @update:model-value="field.onChange"
        @blur="field.onBlur"
        :error="!!errorMessage"
        :error-message="errorMessage"
    >
      <template #append>
        <q-icon
            :name="show ? 'visibility_off' : 'visibility'"
            class="cursor-pointer"
            @click="show = !show"
        />
      </template>
    </q-input>
  </Field>
</template>