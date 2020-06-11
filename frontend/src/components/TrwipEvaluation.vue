<template lang="pug">
  div(v-mdl="").trwip-evaluation.column.items-center
    div(v-if='!isEvaluating')
      div.results-section
        div.results-title
          div.results-font-header Nota geral da Trwip
        div(v-if='trwip.rate').results-count-header {{ trwip.rate.toFixed(2) }}
      div(v-if='!evaluated').didntevaluate
        div.message
          b Você ainda não avaliou a Trwip! Avalie para todo mundo saber o quanto você gostou :)
        button(@click='toggleEdition').mdl-button.mdl-js-button.mdl-button--primary Avaliar
      div(v-else).didevaluate
        div.message
          b Sua avaliação:
          p.value Nota da Trwip: {{ evaluation.rate }}
          p.value Nota do destino: {{ evaluation.destinationRate }}
          p(v-if="showOpinion").value Opinião: {{ evaluation.opinion }}
          p(v-if="showRecomendation").value Recomendações: {{ evaluation.recommend }}

    div(v-if='isEvaluating').evaluation-form
      h4 Nota da Trwip
      Rate(show-text, allow-half,v-model='evaluation.rate')
      div.is-member-evaluation
        span.is-member-msg Como foi viajar para
        span.is-member-msg : {{ trwip.destination }}
        Rate(show-text, allow-half,v-model='evaluation.destinationRate').rate-user
      div(v-if='isMember')
        div.is-member-evaluation
          span.is-member-msg Como foi viajar com:
          vue-gravatar(v-if='!this.trwip.creator.pathToProfilePic', :email='this.trwip.creator.email', :size='30', default-img='identicon').grav
          img(v-else='', :src='creatorImage', alt='user').profileimage
          span.is-member-msg {{ trwip.creator.name }}
          Rate(show-text, allow-half,v-model='rate').rate-user
      div#text-field-opinion.mdl-textfield.mdl-js-textfield.mdl-textfield--floating-label
        textarea#opinion.mdl-textfield__input(type='text', v-model='evaluation.opinion')
        label.mdl-textfield__label(for='opinion', type='text') Opinião
      div#text-field-recomended.mdl-textfield.mdl-js-textfield.mdl-textfield--floating-label
        input#recomended.mdl-textfield__input(type='text', v-model='evaluation.recommend')
        label.mdl-textfield__label(for='recomended', type='text') Recomendações
      button(@click='sendEvaluation', :disabled='!isValid').mdl-button.mdl-js-button.mdl-button--primary Enviar

    div(v-if='trwip.evaluations')
      user-evaluation(v-for='(evaluation, index) in trwip.evaluations' :key='index'
        :evaluation='evaluation')
</template>

<script>
import Vue from 'vue'
import { mapActions, mapGetters } from 'vuex'
import * as actionTypes from '@/store/actionTypes'
import * as getterNames from '@/store/getterNames'
import gravatar from 'vue-gravatar'
import util from '@/helpers/util'
import UserEvaluation from './UserEvaluation'

export default {
  name: 'trwip-evaluation',
  components: {
    'vue-gravatar': gravatar,
    UserEvaluation
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
    },
    isMember: {
      type: Boolean,
      default: false
    },
    creator: {
      type: Object
    }
  },
  data () {
    return {
      isEvaluating: false,
      evaluation: {
        rate: undefined,
        destinationRate: undefined,
        opinion: '',
        recommend: ''
      },
      rate: undefined
    }
  },
  computed: {
    ...mapGetters([
      getterNames.USER
    ]),
    showOpinion () {
      return this.evaluation.opinion !== ''
    },
    showRecomendation () {
      return this.evaluation.recommend !== ''
    },
    evaluated () {
      let madeIt = false
      this.trwip.evaluations.forEach((evaluation) => {
        if (evaluation.userId === window.localStorage.getItem('id')) {
          madeIt = true
          this.evaluation = evaluation
        }
      })
      return madeIt
    },
    isValid () {
      let valid = true
      if (this.isMember) {
        valid = this.evaluation.rate !== undefined &&
                this.evaluation.destinationRate !== undefined &&
                this.rate !== undefined
      } else {
        valid = this.evaluation.rate !== undefined &&
                this.evaluation.destinationRate !== undefined
      }
      return valid
    },
    isUserLoaded () {
      if (this.creator) {
        if (this.creator.email) {
          return true
        } else {
          return false
        }
      }
    },
    creatorImage () {
      if (this.trwip.creator) {
        // return 'http://localhost:3000/' + this.trwip.creator.pathToProfilePic
        return '/' + this.trwip.creator.pathToProfilePic
      }
      return ''
    }
  },
  methods: {
    ...mapActions([
      actionTypes.EVALUATE,
      actionTypes.EVALUATE_USER
    ]),
    toggleEdition () {
      this.isEvaluating = true
      Vue.nextTick(() => {
        window.componentHandler.upgradeAllRegistered()
      })
    },
    sendEvaluation () {
      this.$Modal.confirm({
        title: 'Essa ação não pode ser desfeita',
        content: 'Você tem certeza que terminou de avaliar essa Trwip?',
        onOk: async () => {
          let {data} = await this.evaluate({
            userId: window.localStorage.getItem('id'),
            trwipId: this.trwip.id,
            evaluation: this.evaluation
          })
          if (this.rate >= 0) {
            this.sendUserEvaluation()
          }
          if (data.id) {
            util.showSnackbar('Avaliação enviada com sucesso!')
            this.isEvaluating = false
            this.$emit('evaluated', this.trwip)
          } else {
            util.showSnackbar('Ops! Alguma coisa deu errado. Por favor, tente novamente.')
          }
        },
        onCancel: () => {
        }
      })
    },
    sendUserEvaluation () {
      this.evaluateUser({id: this.trwip.creatorId, rate: this.rate})
    }
  },
  mounted () {
  }
}
</script>

<style lang="scss" scoped>
.results-count-header{
  font-size: 85px;
  color: #A0B2B8;
  align-items: center;
  width: 80%;
}
.results-count-header{
  align-items: center;
  width: 80%;
}
.results-font-header {
  color: #A0B2B8;
  font-size: 3em;
}
.results-section{
  z-index: -1000;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}
.mdl-button--primary.mdl-button--primary {
  color: #02d4b1;
  border: solid 1px #a0b2d8;
  margin: 8px;
  .disabled {
    color: #7a878c;
  }
}
.message {
  color: #7a878c;
  font-size: 2em;
}
.evaluation-form {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.value {
  font-size: 1em;
  padding: .5% 0;
}
.is-member-evaluation {
  display: flex;
  align-items: center;
  flex-flow: wrap;
  justify-content: center;
  padding: 10px 0;
}
.profileimage, .grav {
  border-radius: 50%;
  padding: 0 10px;
}
.is-member-msg {
  font-size: 1.3em;
}
.rate-user {
  padding-left: 10px;
}
.profileimage {
  width: 30px;
  height: 30px;
}
</style>
