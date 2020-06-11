<template lang="pug">
q-card#user-evaluation.text-left
  q-card-title
    | {{ evaluation.user.name }}
    Rate(allow-half disabled show-text
      slot='subtitle' v-model='evaluation.rate')
  q-card-separator
  q-card-main
    div.row.items-center
      span.padding-right Avaliação do destino:
      Rate(allow-half disabled show-text
        v-model='evaluation.destinationRate')
    div(v-if='evaluation.opinion').row.items-start
      span.padding-right Opinião:
      span.text-faded {{ evaluation.opinion }}
    div(v-if='evaluation.recommend').row.items-start
      span.padding-right Recomendação:
      span.text-faded {{ evaluation.recommend }}
</template>

<script>
export default {
  name: 'user-evaluation',
  components: {
  },
  props: {
    evaluation: {
      type: Object,
      required: true
    }
  },
  data () {
    return {}
  },
  computed: {
  },
  methods: {
  }
}
</script>

<style scoped>
.padding-right {
  padding-right: 15px;
}
</style>
