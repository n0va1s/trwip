<template lang="pug">
  div(v-mdl="").edit-profile

    // gravatar profile picture
    vue-gravatar.profile-pic(v-if='!user.pathToProfilePic && isUserLoaded', :size='150', :email='user.email', default-img='identicon')
    button.fileUpload.mdl-button.mdl-js-button(v-if='!user.pathToProfilePic')
      span
        | Escolher foto
      input.upload(type='file', @change='setProfilePic')
    // uploaded image profile picture
    img.profile-pic(v-if='user.pathToProfilePic', :style="{ background: 'url(' + user.pathToProfilePic + ') center / cover' }")
    button.fileUpload.mdl-button.mdl-js-button(v-if='user.pathToProfilePic', @click="user.pathToProfilePic = ''")
      span
        | Remover foto

    div#name.mdl-textfield.mdl-js-textfield.mdl-textfield--floating-label
      input#edit_name.mdl-textfield__input(type='text', v-model='user.name')
      label.mdl-textfield__label(for='edit_name') Nome
    div#country.mdl-textfield.mdl-js-textfield.mdl-textfield--floating-label
      input#edit_country.mdl-textfield__input(type='text', v-model='user.country')
      label.mdl-textfield__label(for='edit_country') País
    div#bios.mdl-textfield.mdl-js-textfield.mdl-textfield--floating-label
      textarea#edit_bios.mdl-textfield__input(type='text', v-model='user.bios')
      label.mdl-textfield__label(for='edit_bios') Fale um pouco sobre você
    div.gender_button
      button(@click="setGender('male')", :class="['mdl-button mdl-js-button mdl-button--colored', user.gender === 'male' ? 'mdl-button--raised' : '']")
        | Homem
      button(@click="setGender('female')", :class="['mdl-button mdl-js-button mdl-button--accent', user.gender === 'female' ? 'mdl-button--raised' : '']")
        | Mulher
      button(@click="setGender('none')", :class="['mdl-button mdl-js-button', user.gender === 'none' ? 'mdl-button--raised' : '']")
        | Não desejo informar
    div#email.mdl-textfield.mdl-js-textfield.mdl-textfield--floating-label
      input#edit_email.mdl-textfield__input(type='email', pattern='[^@]+@[^@]+\.[a-zA-Z]{2,6}', v-model='user.email', @change='sendEmailToVerify')
      label.mdl-textfield__label(for='edit_email') E-mail
      span.mdl-textfield__error {{ emailErrorMessage }}
    div#phone.mdl-textfield.mdl-js-textfield.mdl-textfield--floating-label
      input#edit_phone.mdl-textfield__input(type='tel', v-model='user.phone')
      label.mdl-textfield__label(for='edit_phone') Telefone
    a(@click='goToPasswordChange').
      Trocar Senha
</template>

<script>
import gravatar from 'vue-gravatar'
import imageApi from '@/api/image'
import utilHelper from '../../../helpers/util'

export default {
  name: 'user-info',
  components: {
    'vue-gravatar': gravatar
  },
  async beforeRouteEnter (to, from, next) {
    try {
      // await Do something before router PUSH
      // next(vm => vm.foo = bar)
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
    user: {
      type: Object
    }
  },
  data () {
    return {
      emailErrorMessage: 'Email inválido.'
    }
  },
  computed: {
    isUserLoaded () {
      if (this.user.email) {
        return true
      } else {
        return false
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
    sendEmailToVerify () {
      this.$emit('emailChanged')
    },
    goToPasswordChange () {
      this.$router.push({
        name: 'ChangePassword',
        params: {
          user: this.user
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.pic {
  display: flex;
  flex-direction: column;
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
.catch-phrase {
  margin: 12px;
  color: #6f7e82;
}
.mdl-button {
  margin: 2%;
}
.mdl-button--primary.mdl-button--primary {
  color: #02d4b1;
  border: solid 1px #a0b2d8;
  margin: 8px;
}
.profile-pic {
  width: 100px;
  height: 100px;
  border-radius: 50%;
}
span {
  font-size: 20px;
}
.edit-profile {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: -24px;
}
// name
#edit_name {
  font-weight: 400;
  font-size: 34px;
}
#name label {
  font-size: 20px;
}
// country
#edit_name {
  font-size: 20px;
}
#country label {
  font-size: 18px;
}
// email
#edit_email {
  font-size: 18px;
}
#email label {
  font-size: 16px;
}
.mdl-textfield__error {
  font-size: 15px;
}
a {
  cursor: pointer;
}
</style>
