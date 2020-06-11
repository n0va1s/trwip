<template lang="pug">
  div(v-mdl="")#trwip-content
    h4.odd Destino:
      p {{ trwip.destination }}
    h4.even País:
      p {{ trwip.country }}
    h4.odd Descrição:
      p {{ trwip.description }}
    h4.even Roteiro:
      p {{ trwip.script }}
    h4.odd Data estimada da viagem:
      p {{ getDateFormated(trwip.startDate) }} a {{ getDateFormated(trwip.endDate) }} ({{getDays()}})
    h4.even(v-if='trwip.style') Estilo:
      p {{ trwip.style.join(', ') }}
    h4.odd Perfis:
      div.profiles(v-if='trwip.profiles && trwip.profiles.length > 0')
        p(
          v-for='(profile, index) in trwip.profiles'
        ) {{ getProfile(profile, index) }}
      p(v-else) Não definido
    h4.even Quantidade ideal de trwipers:
      p(v-if='trwip.numberOfMembers') {{ trwip.numberOfMembers }}
      p(v-else) Não definido
    h4.odd Link relacionado:
      div(v-if='trwip.link')
        a(:href='trwip.link' target='_blank') {{ trwip.link }}
      p(v-else) Não definido
    div(v-if="trwip.videoUrl")
      youtube(:videoId="getVideoId()")
</template>

<script>
import moment from 'moment'
import { getIdFromURL } from 'vue-youtube-embed'

export default {
  name: 'trwip-content',
  components: {

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
    trwip: {
      type: Object
    }
  },
  data () {
    return {}
  },
  computed: {
  },
  methods: {
    getDateFormated (date) {
      return moment(date).format('L')
    },
    getProfile (profile, index) {
      if (index > 0) {
        return ', ' + profile
      } else {
        return profile
      }
    },
    getDays () {
      let a = moment(this.trwip.endDate)
      let b = moment(this.trwip.startDate)

      return a.diff(b, 'days') + 1 + ' dia(s) de duração'
    },
    getVideoId () {
      let url = 'https://www.youtube.com/watch?v=lENOpKkz5Z8'
      if (this.trwip.videoUrl) {
        url = this.trwip.videoUrl
      }
      return getIdFromURL(url)
    }
  }
}
</script>

<style lang="scss" scoped>
h4, p {
  text-align: left;
}
.odd {
  background-color: white;
}
.even {
  background-color: #fcfcfc;
}
p, a {
  font-size: 0.65em;
  color: #7e7e7e;
  padding-top: 15px;
  line-height: 27px;
}
h4 {
  font-weight: 400;
  font-size: 2.3em;
  color: #3b3b3b;
  padding: 20px 35px;
}
.profiles {
  display: flex;
}
</style>
