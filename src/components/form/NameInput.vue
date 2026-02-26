<script setup lang="ts">
import { Field } from 'vee-validate'

type Props = {
  name?: string
  label?: string
  rules?: string
}

const props = withDefaults(defineProps<Props>(), {
  name: 'name',
  label: 'Nome',
  rules: 'required|min:2',
})
</script>

<template>
  <Field :name="props.name" :rules="props.rules" v-slot="{ field, errorMessage }">
    <q-input
        outlined
        :label="props.label"
        :model-value="field.value"
        @update:model-value="field.onChange"
        @blur="field.onBlur"
        :error="!!errorMessage"
        :error-message="errorMessage"
        autocomplete="name"
    />
  </Field>
</template>