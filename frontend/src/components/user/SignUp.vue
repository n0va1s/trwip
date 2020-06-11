<template lang="pug">
div#sign-up
  a(name='top')
  div#sign-up__form
    div.mdl-layout__content.mainSection
      div.layer
        h2 Crie sua conta
    div.sign-up__form-body
      form(@submit.prevent='')
        div.sign-up__form-odd-part
          h4 Escreva um pouco sobre você para tornar seu perfil mais atrativo
          div.mdl-textfield.mdl-js-textfield.mdl-textfield--floating-label
            input#signup_name.mdl-textfield__input(type='text', v-model='user.name')
            label.mdl-textfield__label(for='signup_name') Nome*
          div.mdl-textfield.mdl-js-textfield.mdl-textfield--floating-label
            input#signup_country.mdl-textfield__input(type='text', v-model='user.country')
            label.mdl-textfield__label(for='signup_country') País*
          div.mdl-textfield.mdl-js-textfield.mdl-textfield--floating-label
            textarea#signup_bios.mdl-textfield__input(type='text' rows='4' v-model='user.bios')
            label.mdl-textfield__label(for='signup_bios') Fale um pouco sobre você
          div.gender
            label.gender-label Sexo*
            div.gender_button
              button(@click="setGender('male')", :class="['mdl-button mdl-js-button mdl-button--colored', user.gender === 'male' ? 'mdl-button--raised' : '']")
                | Masculino
              button(@click="setGender('female')", :class="['mdl-button mdl-js-button mdl-button--accent', user.gender === 'female' ? 'mdl-button--raised' : '']")
                | Feminino
              button(@click="setGender('none')", :class="['mdl-button mdl-js-button', user.gender === 'none' ? 'mdl-button--raised' : '']")
                | Não desejo informar
        div.sign-up__form-even-part
          h4 Algumas informações sobre a conta
          div.mdl-textfield.mdl-js-textfield.mdl-textfield--floating-label
            input#signup_email.mdl-textfield__input(type='email', pattern='[^@]+@[^@]+\.[a-zA-Z]{2,6}', v-model='user.email')
            label.mdl-textfield__label(for='signup_email') E-mail*
            span.mdl-textfield__error {{ emailErrorMessage }}
          div.mdl-textfield.mdl-js-textfield.mdl-textfield--floating-label
            input#signup_phone.mdl-textfield__input(type='tel', v-model='user.phone')
            label.mdl-textfield__label(for='signup_phone') Telefone
          div.mdl-textfield.mdl-js-textfield.mdl-textfield--floating-label
            input#signup_password.mdl-textfield__input(type='password', v-model='user.password')
            label.mdl-textfield__label(for='signup_password') Senha*
          div.mdl-textfield.mdl-js-textfield.mdl-textfield--floating-label
            input#signup_confirm-password.mdl-textfield__input(type='password', :pattern='user.password', v-model='passwordConfirm')
            label.mdl-textfield__label(for='signup_confirm-password') Confirme a senha*
            span.mdl-textfield__error As senhas não conferem.
        div.sign-up__form-odd-part
          h4 Não esqueça de subir uma foto
          vue-gravatar.profile-pic(v-if='!user.pathToProfilePic', :size='150', :email='user.email', default-img='identicon')
          button.fileUpload.mdl-button.mdl-js-button(v-if='!user.pathToProfilePic')
            span
              | Escolher foto
            input.upload(type='file', @change='setProfilePic')
          img.profile-pic(v-if='user.pathToProfilePic', :style="{ background: 'url(' + user.pathToProfilePic + ') center / cover' }")
          button.fileUpload.mdl-button.mdl-js-button(v-if='user.pathToProfilePic', @click="user.pathToProfilePic = ''")
            span
              | Remover foto
        div.sign-up__form-even-part
          label.mdl-checkbox.mdl-js-checkbox.mdl-js-ripple-effect(for='checkbox-2')
            input#checkbox-2.mdl-checkbox__input(type='checkbox', v-model='agreededWithTerms')
            span.mdl-checkbox__label
              | Concorda com nossos
              a(target='_blank', href='terms_of_use') {{useTermsLabel}}
              | ?
          button.mdl-button.mdl-js-button.mdl-button--accent.mdl-button--raised(@click='onClick', :disabled='isFormInvalid()')
            | Criar conta
          label.requiredFields * Campos obrigatórios
  footer-trwip
</template>
<script>
import FooterTrwip from '../FooterTrwip'
import imageApi from '@/api/image'
import userApi from '@/api/user'
import helper from '@/helpers/user'
import util from '@/helpers/util'
import * as actionTypes from '@/store/actionTypes'
import gravatar from 'vue-gravatar'
import AwesomeMask from 'awesome-mask'
import Vue from 'vue'
import utilHelper from '../../helpers/util'

export default {
  name: 'sign-up',
  components: {
    'footer-trwip': FooterTrwip,
    'vue-gravatar': gravatar
  },
  mounted () {
    Vue.nextTick(() => {
      window.componentHandler.upgradeAllRegistered()
    })

    userApi.getEmails()
    .then((results) => {
      this.emails = results.data
    })
  },
  directives: {
    'mask': AwesomeMask
  },
  data () {
    return {
      uploads: '/uploads',
      url: '/uploads/signUpCover.jpeg',
      agreededWithTerms: false,
      validCPF: false,
      emailExists: false,
      emails: [],
      useTermsLabel: ' Termos de Uso',
      passwordConfirm: '',
      emailErrorMessage: 'Email inválido.',
      user: {
        pathToProfilePic: '',
        gender: '',
        email: '',
        phone: '',
        name: '',
        password: '',
        bios: '',
        link: '',
        country: ''
      }
    }
  },
  methods: {
    setGender (gender) {
      this.user.gender = gender
    },
    setProfilePic (e) {
      if (e.target.files) {
        let image = e.target.files[0]
        if (image.type.startsWith('image')) {
          imageApi.uploadDisposable(image)
          .then((res) => {
            this.user.pathToProfilePic = res.data.path
          })
        } else {
          utilHelper.showSnackbar('Imagem inválida')
        }
      }
    },
    checkCPFValidation (e) {
      this.validCPF = this.user.cpf && !helper.isCPFValid(this.user.cpf)
      if (this.validCPF) {
        e.target.parentElement.classList.add('is-invalid')
      } else {
        e.target.parentElement.classList.remove('is-invalid')
      }
    },
    checkEmailExistence () {
      this.emailExists = this.emails.indexOf(this.user.email) !== -1
      if (this.emailExists) {
        return false
      } else {
        return true
      }
    },
    isFormInvalid () {
      let isInvalid = this.user.name === '' ||
      this.user.country === '' ||
      this.user.gender === '' ||
      this.user.email === '' ||
      this.user.password === '' ||
      this.passwordConfirm === '' ||
      this.user.cpf === '' ||
      !this.agreededWithTerms

      return isInvalid
    },
    onClick () {
      if (this.checkEmailExistence()) {
        this.registerUser()
      } else {
        util.showSnackbar('Email já cadastrado')
      }
    },
    registerUser () {
      this.user.email = this.user.email.toLowerCase()
      this.$store.dispatch(actionTypes.REGISTER, this.user)
      .then((results) => {
        if (typeof results.data === 'object' && results.data !== null) {
          util.showSnackbar('Cadastro realizado com sucesso.')
          this.$router.push('login')
        } else {
          util.showSnackbar('Ocorreu um erro. Por favor, tente novamente.')
        }
      })
      .catch((err) => {
        console.log(err)
        util.showSnackbar('Ocorreu um erro. Por favor, tente novamente.')
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.mdl-checkbox {
  align-self: center;
  max-width: 305px;
}
.mainSection {
  height: 37vh;
  width: 100%;
  background: url('/uploads/trwipMainHeader4.jpg') center 30% no-repeat;
  background-size: cover;
  display: flex;
  flex-direction: column;
}
.layer {
  background-color: rgba(66, 66, 66, 0.55);
  height: 37vh;
  display: flex;
  align-items: center;
  justify-content: center;
}
h2 {
  font-family: 'Roboto', 'Helvetica', 'Arial', sans-serif;
  line-height: 1;
  color: white;
  font-weight: 500;
  font-size: 5em;
}
#sign-up__form {
  display: flex;
  flex-direction: column;
}
.sign-up__form-odd-part, .sign-up__form-even-part {
  padding: 24px 12px 24px 12px;
}
form, .sign-up__form-body {
  display: flex;
  flex-direction: column;
  width: 100%;
}
.mdl-textfield {
  align-self: center;
  min-width: 240px;
  max-width: 480px;
}
.gender {
  align-self: center;
  align-items: center;
  justify-content: center;
  display: flex;
  align-items: baseline;
}
.gender-label {
  font-size: 16px;
  align-self: center;
  padding-right: 5%;
}
.gender_button {
  width: 50%;
}
@media (max-width: 420px) {
  .gender_button {
    width: 100%;
  }
}
.mdl-button {
  margin: 2%;
}
.sign-up__form-odd-part {
  display: flex;
  flex-direction: column;
}
.sign-up__form-even-part {
  background: #f4f4f4;
  display: flex;
  flex-direction: column;
}
button {
  align-self: center;
  min-width: 120px;
  max-width: 240px;
}
.fileUpload {
  position: relative;
  overflow: hidden;
  margin: 10px;
}
.fileUpload input.upload {
  position: absolute;
  top: 0;
  right: 0;
  margin: 0;
  padding: 0;
  font-size: 20px;
  cursor: pointer;
  opacity: 0;
  filter: alpha(opacity=0);
}
.profile-pic {
  width: 150px;
  height: 150px;
  border-radius: 50%;
}
img {
  align-self: center;
}
.requiredFields {
  padding-top: 24px;
}
</style>
