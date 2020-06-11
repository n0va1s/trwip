<template lang="pug">
  div(v-mdl="").trwip-member-list
    div.card__author
      vue-gravatar(v-if='!creator.pathToProfilePic && creator.email', :email='creator.email', :size='30', default-img='identicon')
      img(v-else='', :src='getUserImg(creator.pathToProfilePic)', alt='user').profileimage
      div.card__author-content
        h6
          a.card__user(:href='currentUserReference(creator)') {{creator.name}} (Criador)
    div(v-for='member in members').card__author
      vue-gravatar(v-if='!member.pathToProfilePic && member.email', :email='member.email', :size='30', default-img='identicon')
      img(v-else='', :src='getUserImg(member.pathToProfilePic)', alt='user').profileimage
      div.card__author-content
        h6
          a.card__user(:href='currentUserReference(member)') {{member.name}}
</template>

<script>
import gravatar from 'vue-gravatar'

export default {
  name: 'trwip-member-list',
  components: {
    'vue-gravatar': gravatar
  },
  async beforeRouteEnter (to, from, next) {
    try {
      // await Do something before router PUSH
      // next(vm => vm.foo = bar)
      next()
    } catch (err) {
      console.log(err)
    }
  },
  props: {
    members: {
      type: Array,
      default () {
        return []
      }
    },
    creator: {
      type: Object,
      default () {
        return {}
      }
    }
  },
  data () {
    return {}
  },
  computed: {
  },
  methods: {
    currentUserReference (member) {
      return '/profile/' + member.id
    },
    getUserImg (imagePath) {
      // return 'http://localhost:3000/' + imagePath
      return '/' + imagePath
    }
  }
}
</script>

<style lang="scss" scoped>
a:hover {
  cursor: pointer;
	color: #2980b9;
}

.card__user{
  color: #313E47;
	text-decoration: none;
}

.card__author {
  margin: 15px 0px;
}

.card__author img,
.card__author-content {
	display: inline-block;
	vertical-align: middle;
}

.card__author img{
	border-radius: 50%;
	margin-right: 0.6em;
}

.profileimage {
  width: 30px;
  height: 30px;
}
</style>
