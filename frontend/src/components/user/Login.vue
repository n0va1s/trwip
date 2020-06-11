<template lang='pug'>
div#login
  div.mdl-layout.mdl-js-layout
    div.layer
      div.card
        div.mdl-card.mdl-shadow--8dp
          div.login__form
            h3 Login
            form(action='#')
              div#text-field-email.mdl-textfield.mdl-js-textfield.mdl-textfield--floating-label
                input#email.mdl-textfield__input(pattern='[^@]+@[^@]+\.[a-zA-Z]{2,6}', type='text', v-model='email')
                label.mdl-textfield__label(for='email') E-mail
                span.mdl-textfield__error E-mail inválido, por favor insira um email correto.
              div#text-field-password.mdl-textfield.mdl-js-textfield.mdl-textfield--floating-label
                input#pass.mdl-textfield__input(type='password', v-model='password')
                label.mdl-textfield__label(for='pass', type='password') Senha
            div.buttons
              button.mdl-button.mdl-button--colored.mdl-js-button.mdl-js-ripple-effect(@click='authenticate', :disabled='!isFormValid')
                | Entrar
              span(style='cursor: pointer;', @click='goToRegister').register Cadastro
              a.forgot-password(href='/forgot_password') Esqueci a senha
        div.login__catchphrase.mdl-shadow--8dp
          span(align='right') Viajando em boa companhia
</template>

<script>
import Vue from 'vue'
import util from '../../helpers/util'
import { Toast } from 'quasar-framework'

export default {
  name: 'login',
  mounted () {
    Vue.nextTick(() => {
      window.componentHandler.upgradeAllRegistered()
    })
  },
  data () {
    return {
      email: '',
      password: ''
    }
  },
  computed: {
    isFormValid () {
      return /[^@]+@[^@]+\.[a-zA-Z]{2,6}/.test(this.email) &&
        this.email !== '' &&
        this.password !== ''
    }
  },
  methods: {
    goToRegister () {
      this.$router.push('/sign_up')
    },
    async authenticate () {
      try {
        await this.$store.dispatch('login', { email: this.email, password: this.password })
        util.showSnackbar('Seja bem vindo, ' + this.$store.getters.name)
        this.$bus.$emit('eitanois')
        this.$router.push({
          name: 'HomePage',
          params: {
            success: true
          }
        })
      } catch (err) {
        this.displayTextFieldsWithError()
        Toast.create.negative({
          html: err.message
        })
      }
    },
    displayTextFieldsWithError () {
      const emailTextField = document.querySelector('#text-field-email')
      emailTextField.children[0].style.borderColor = '#d50000'
      emailTextField.children[1].style.color = '#d50000'

      const passwordTextField = document.querySelector('#text-field-password')
      passwordTextField.children[0].style.borderColor = '#d50000'
      passwordTextField.children[1].style.color = '#d50000'
    }
  }
}
</script>

<style lang="scss" scoped>
.mdl-layout {
  align-items: center;
  justify-content: center;
  background: url('../../assets/login-bg.jpg') center / cover;
}

.mdl-card {
  background: none;
  border-radius: 8px 0 0 8px;
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
  width: 50%;
}

.mdl-textfield__label {
  color: #3f51b5;
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

.mdl-snackbar{
  background-color: blue;
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

.card, .login__catchphrase {
  transition: all 0.3s ease;
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
    flex-direction: column-reverse;
  }
  .login__catchphrase {
    border-radius: 8px 8px 0 0;
    max-width: 100%;
  }
  .mdl-card {
    border-radius: 0 0 8px 8px;
  }
}
</style>
