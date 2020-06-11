<template lang="pug">
  div(v-mdl="")
    vue-gravatar.profile-pic(v-if='!user.pathToProfilePic && isUserLoaded', :size='150', :email='user.email', default-img='identicon')
    img.profile-pic(v-else='', :style="{ background: 'url(' + userImage + ') center / cover' }")
    h3.user-name {{ user.name }}
    span.user-country {{ user.country }}
    h5.rate(v-if='user.isEvaluated', :class='rate')
      | Nota: {{ user.rate.toFixed(2) }}
    h6(v-if="user.bios")
      | {{ user.bios }}
</template>

<script>
import gravatar from 'vue-gravatar'

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
      genderNecessary: false
      // isUserLoaded: false
    }
  },
  computed: {
    gender () {
      if (this.genderNecessary === true) {
        if (this.user.gender === 'male') {
          return 'Homem, '
        } else if (this.user.gender === 'female') {
          return 'Mulher, '
        } else {
          return ''
        }
      } else {
        return ''
      }
    },
    userUrl () {
      if (this.user.link.includes('http')) {
        return this.user.link
      } else {
        return 'http://' + this.user.link
      }
    },
    userImage () {
      if (this.user) {
        if (this.user.pathToProfilePic) {
          // return 'http://localhost:3000/' + this.user.pathToProfilePic
          return '/' + this.user.pathToProfilePic
        } else {
          return ''
        }
      } else {
        return ''
      }
    },
    isUserLoaded () {
      if (this.user.email) {
        return true
      } else {
        return false
      }
    },
    rate () {
      if (this.user.rate >= 4.5) {
        return ['more-than-four']
      } else if (this.user.rate >= 3) {
        return ['more-than-three']
      } else if (this.user.rate >= 1) {
        return ['more-than-one']
      } else {
        return ['shitty-user']
      }
    }
  },
  methods: {
  }
}
</script>

<style lang="scss" scoped>
.user-name {
  font-size: 2em;
}
.user-country {
  font-size: 1.3em;
}
.rate {
  font-size: 1.3em;
}
.user-link {
  font-size: 1.3em;
  padding: 0 20px;
}
.link {
  word-wrap: break-word;
}
.catch-phrase {
  margin: 12px;
  color: #6f7e82;
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
.more-than-four {
  color: #7ED321;
}
.more-than-three {
  color: #4990E2;
}
.more-than-one {
  color: #F6A623;
}
.shitty-user {
  color: #D0011B;
}
</style>
