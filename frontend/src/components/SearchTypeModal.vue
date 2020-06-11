<template lang='pug'>
div#search-type-modal(v-mdl='')
  // modal(:show='show', :columns='4', :onclose='close')
    div.confirm-modal
      div.mdl-card__title
        h2.mdl-card__title-text Escolha o tipo de busca de viagem
      div.item(v-for='(someType, index) in possibleTypes')
        button.mdl-button.mdl-js-button.mdl-button--raised.mdl-js-r
        ipple-effect.mdl-button--accent(type='button',
        @click='didClickNewType(index)',
        :style='{ backgroundColor: someType.color}')
          i.material-icons.iconButton  {{ someType.name }} 
          | {{ someType.label }}
  q-modal(v-model='open' minimized)
    div.search-modal-content
      span.search-modal-title Escolha o tipo de busca de viagem
      q-btn(
        v-for='(type, index) in possibleTypes'
        :key='index'
        :style='{ backgroundColor: type.color}'
        :icon='type.name'
        @click='didClickNewType(index)'
        ).search-modal-button
        span.search-modal-button-label {{ type.label }}
</template>

<script>
import {
  QModal,
  QModalLayout,
  QToolbar,
  QBtn
} from 'quasar-framework'

export default {
  name: 'search-type-modal',
  props: {
    show: {
      type: Boolean,
      default: false
    },
    possibleTypes: {
      type: Array,
      default () {
        return []
      }
    }
  },
  components: {
    QModal,
    QModalLayout,
    QToolbar,
    QBtn
  },
  data () {
    return {
      name: ''
    }
  },
  computed: {
    open: {
      get () {
        if (this.show) {
          return true
        } else {
          return false
        }
      },
      set (newValue) {
        this.$emit('closed')
      }
    }
  },
  methods: {
    close () {
      this.$emit('closed')
    },
    didClickNewType (index) {
      this.$emit('selected', index)
      this.close()
    }
  }
}
</script>

<style>
.search-modal-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: column;
  padding: 25px;
}
.search-modal-title {
  font-size: 2em;
  text-align: center;
  padding-bottom: 15px;
  opacity: 0.8;
}
.search-modal-button {
  width: 130px;
  margin: 5px 0;
}
.search-modal-button {
  color: white !important;
}
.q-btn-inner {
  display: flex;
  justify-content: space-between !important;
}
.search-modal-button-label {
  color: white !important;
}
</style>

<style scoped>
.modal__actions {
  display: flex;
  justify-content: space-between;
}
.type-list{
    list-style: none;
    padding: 10px;
}
.item{
  padding: 7px;
}
.mdl-button--accent.mdl-button--accent.mdl-button--raised, .mdl-button--accent.mdl-button--accent.mdl-button--fab{
  background-color: #2A3B8F;
  vertical-align: middle;
  width: 90%;
}
.iconButton{
    padding-right: 12px;
}
.confirm-modal{
  padding-bottom: 20px;
}
</style>
