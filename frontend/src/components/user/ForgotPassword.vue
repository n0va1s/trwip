<template lang='pug'>
div#forgot-password
  div.mdl-layout.mdl-js-layout
    div.layer
      div.card
        div.mdl-card.mdl-shadow--8dp
          div.login__form
            h3 Recuperar Senha
            div.forms(v-if='didSendEmail === false')
              form(action='#')
                div#text-field-email.mdl-textfield.mdl-js-textfield.mdl-textfield--floating-label
                  input#email.mdl-textfield__input(pattern='[^@]+@[^@]+\.[a-zA-Z]{2,6}', type='text', v-model='email')
                  label.mdl-textfield__label(for='email') E-mail
                  span.mdl-textfield__error E-mail inválido, por favor insira um email correto.
              div.buttons
                button.mdl-button.mdl-button--colored.mdl-js-button.mdl-js-ripple-effect(@click='sendEmail', :disabled='validateLoginForm()')
                  | Trocar senha
                a.forgot-password(href='/login') Voltar
            div.formsend(v-if='didSendEmail')
              label.sendLabel {{emailMessage}}
            div.button.mdl-button.mdl-button--colored.mdl-js-button.mdl-js-ripple-effect.button-back(v-if='didSendEmail' @click='backHome')
                  | Voltar para login
</template>

<script>
import Vue from 'vue'
import util from '../../helpers/util'
import userApi from '@/api/user'

export default {
  name: 'forgot-password',
  mounted () {
    Vue.nextTick(() => {
      window.componentHandler.upgradeAllRegistered()
    })

    this.validateLoginForm()
  },
  data () {
    return {
      emailMessage: 'Se seu email constar na nossa base de dados, te enviaremos instruções para recuperação da conta',
      email: '',
      didSendEmail: false
    }
  },
  methods: {
    validateLoginForm () {
      var isErrorShowing = document.querySelector('.mdl-textfield')

      var isInvalid = false

      if (isErrorShowing) {
        isErrorShowing = isErrorShowing.classList.contains('is-invalid')
      }

      isInvalid = isErrorShowing ||
        this.email === ''

      return isInvalid
    },
    sendEmail () {
      const host = window.location.origin
      userApi.sendForgotPasswordMail(this.email, host)
      this.email = ''
      this.didSendEmail = true
      window.componentHandler.upgradeAllRegistered()
      util.showSnackbar(`Se seu email constar na nossa base de dados, te
                        enviaremos instruções para recuperação da conta`)
    },
    backHome () {
      this.$router.push('/login')
    }
  }
}
</script>

<style lang="scss" scoped>

.formsend{
  padding-top: 40px;
}
.mdl-layout {
  align-items: center;
  justify-content: center;
  background: url('../../assets/login-bg.jpg') center / cover;
}

.mdl-card {
  background: none;
  border-radius: 8px;
  width: 100%;
  display: flex;
  flex-direction: row;
}

.layer {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.card {
  display: flex;
  flex-direction: row;
  transition: all 0.5s ease;
  width: 40%;
}

.mdl-textfield__label {
  color: #3f51b5 !important;
}

.mdl-grid, .mdl-cell, .mdl-cell--6-col, .mdl-card {
  padding: 0;
  margin: 0;
}

.login__form {
  padding: 12px;
  // min-width: 400px;
  width: 100%;
  background: #fff;
}

form {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.login__catchphrase {
  // height: 100%;
  background: #434446;
  color: #fff;
  display: flex;
  font-size: 32px;
  line-height: 32px;
  max-width: 250px;
  flex-direction: column;
  align-items: bottom;
  opacity: 0.7;
  justify-content: flex-end;
  filter: alpha(opacity=60);
  border-radius: 0 8px 8px 0;
}

.login__catchphrase > span {
  margin: 12px;
}

.buttons {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.button-back{
  margin-top: 20px;
}

a, .register, button {
	text-decoration: none;
	color: #444;
	transition: all 0.5s ease;
	text-align: left;
}

a:hover, .register:hover, button:hover {
  cursor: pointer;
	color: #2980b9;
}

@media (max-width: 720px) {
  .card {
    width: 90%;
  }
}
</style>
