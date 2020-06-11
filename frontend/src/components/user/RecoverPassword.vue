<template lang='pug'>
div#recover-password
  div.mdl-layout.mdl-js-layout
    div.layer
      div.card
        div.mdl-card.mdl-shadow--8dp
          div.login__form
            h3 Recuperar Senha
            form(action='#')
              div#text-field-password.mdl-textfield.mdl-js-textfield.mdl-textfield--floating-label
                input#pass.mdl-textfield__input(type='password', v-model='password')
                label.mdl-textfield__label(for='pass', type='password') Senha
              div.mdl-textfield.mdl-js-textfield.mdl-textfield--floating-label
                input#signup_confirm-password.mdl-textfield__input(type='password', :pattern='password', v-model='passwordConfirm')
                label.mdl-textfield__label(for='signup_confirm-password') Confirme a senha*
                span.mdl-textfield__error As senhas não conferem.
            div.buttons
              button.mdl-button.mdl-button--colored.mdl-js-button.mdl-js-ripple-effect(@click='recoverPassword', :disabled='validateLoginForm')
                | Trocar senha
</template>

<script>
import Vue from 'vue'
import util from '../../helpers/util'
import store from '@/store'
import * as actionTypes from '@/store/actionTypes'
import { mapActions } from 'vuex'

export default {
  name: 'recover-password',
  async beforeRouteEnter (to, from, next) {
    try {
      let {data} = await store.dispatch(actionTypes.RETRIEVE_USER, to.params.id)
      next(vm => {
        vm.user = data
      })
    } catch (err) {
      console.log(err)
      next()
    }
  },
  mounted () {
    Vue.nextTick(() => {
      window.componentHandler.upgradeAllRegistered()
    })
  },
  data () {
    return {
      password: '',
      passwordConfirm: '',
      user: {}
    }
  },
  computed: {
    validateLoginForm () {
      const isInvalid = this.password === '' ||
        this.passwordConfirm === '' ||
        this.password !== this.passwordConfirm

      return isInvalid
    }
  },
  methods: {
    ...mapActions([
      actionTypes.UPDATE_USER
    ]),
    async recoverPassword () {
      try {
        this.user.password = this.password
        await this.updateUser(this.user)
        util.showSnackbar('Senha atualizada com sucesso!')
        this.$router.push('/login')
      } catch (err) {
        util.showSnackbar('Ops! Alguma coisa deu errado. Por favor, tente novamente.')
        console.log(err)
      }
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
