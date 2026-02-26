// src/plugins/vee-validate.ts
import { configure, defineRule } from 'vee-validate'
import { localize, setLocale } from '@vee-validate/i18n'
import pt_BR from '@vee-validate/i18n/dist/locale/pt_BR.json'
import { required, email, min } from '@vee-validate/rules'

defineRule('required', required)
defineRule('email', email)
defineRule('min', required)

localize({ pt_BR: { ...pt_BR, names: {
    name: 'Nome',
    email: 'E-mail',
    password: 'Senha',
}}})

configure({
    generateMessage: localize('pt_BR'),
    validateOnInput: true,
})

setLocale('pt_BR')