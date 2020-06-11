<template lang="pug">
  div(v-mdl="").change-password
    div.form
      div.mdl-textfield.mdl-js-textfield.mdl-textfield--floating-label
        input#changePassword_oldPassword.mdl-textfield__input(type='password', :pattern='user.password', v-model='oldPassword')
        label.mdl-textfield__label(for='changePassword_oldPassword') Senha atual
        span.mdl-textfield__error Senha incorreta.
      div.mdl-textfield.mdl-js-textfield.mdl-textfield--floating-label
        input#changePassword_newPassword.mdl-textfield__input(type='password', v-model='newPassword')
        label.mdl-textfield__label(for='changePassword_newPassword') Senha nova
      // div.mdl-textfield.mdl-js-textfield.mdl-textfield--floating-label
        input#changePassword_confirmPassword.mdl-textfield__input(type='password', :pattern='newPassword', v-model='passwordConfirm')
        label.mdl-textfield__label(for='changePassword_confirmPassword') Confirme a senha
        span.mdl-textfield__error As senhas não conferem.
      div.button
        button.mdl-button.mdl-js-button.mdl-button--accent.mdl-button--raised(@click='onClick', :disabled='isFormInvalid()')
          | Trocar senha
    footer-trwip.footer
</template>

<script>
import FooterTrwip from '@/components/FooterTrwip'
import util from '@/helpers/util'
import userApi from '@/api/user'
import * as actionTypes from '@/store/actionTypes'

export default {
  name: 'change-password',
  components: {
    'footer-trwip': FooterTrwip
  },
  async beforeRouteEnter (to, from, next) {
    try {
      // await Do something before router PUSH
      // next(vm => vm.foo = bar)
      next(async vm => {
        let user = vm.$route.params.user
        let {data} = await userApi.getPassword(user.id)
        vm.user = user
        vm.user.password = data
      })
    } catch (err) {
      console.log(err)
    }
  },
  props: {
    /*
    foo: {
      type: String,
      default: 'bar'
    }
    */
  },
  data () {
    return {
      user: {},
      oldPassword: '',
      newPassword: '',
      passwordConfirm: '',
      isOldPasswordValid: false
    }
  },
  computed: {
  },
  methods: {
    isFormInvalid () {
      let isInvalid =
      this.oldPassword === '' ||
      this.newPassword === '' ||
      this.oldPassword !== this.user.password

      return isInvalid
    },
    async onClick () {
      this.user.password = this.newPassword

      let {data} = await this.$store.dispatch(actionTypes.UPDATE_USER, this.user)

      if (data) {
        util.showSnackbar('Informações atualizadas com sucesso')
        this.$router.push('/profile')
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.form {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
}
label, span {
  font-size: 16px;
}
.footer {
  margin-top: 70px;
}
.button {
  padding-top: 3%;
}
</style>
