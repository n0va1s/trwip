<template lang="pug">
  div(v-mdl="")#edit-trwip
    div.even
      div.mdl-textfield.mdl-js-textfield.mdl-textfield--floating-label
        input.mdl-textfield__input(v-model='trwipData.destination', type='text')
        label.mdl-textfield__label  Escolha o destino de sua viagem *
    div.odd
      div.mdl-textfield.mdl-js-textfield.mdl-textfield--floating-label
        input.mdl-textfield__input(v-model='trwipData.country', type='text')
        label.mdl-textfield__label  Escolha o país de destino de sua viagem *
    div.even
      div.mdl-textfield.mdl-js-textfield.mdl-textfield--floating-label
        textarea#trwipTitle.mdl-textfield__input(v-model='trwipData.description', type='text', rows='4')
        label.mdl-textfield__label Descrição detalhada *
      div.description-count__label {{ descriptionCharCount }} caracteres
    div.odd
      div.mdl-textfield.mdl-js-textfield.mdl-textfield--floating-label
        textarea#trwipTitle.mdl-textfield__input(v-model='trwipData.script', type='text', rows='4')
        label.mdl-textfield__label Roteiro da viagem *
      div.description-count__label {{ descriptionCharCount }} caracteres
    div.odd
      div.estilo
        div.estilo__labels
          b(v-if='trwipData.startDate && trwipData.endDate')
            span {{ getDateFormated(daterange.from) }} a {{ getDateFormated(daterange.to) }}
        q-datetime-range(
            v-model="daterange" no-clear
            format='DD/MM/YY'
            ok-label='Selecionar'
            cancel-label='Cancelar'
            :month-names='monthNames'
            :day-names='dayNames'
            :min="new Date()")
      div {{ daysQuantity() }} dias
    div.even
      div.estilo
        div.estilo__labels
          b.estilo_label
          span Estilo de sua viagem *
        Select(v-model='trwipData.style', style='width:200px' multiple)
          Option(v-for='item in styles', :value='item', :key='item') {{ item }}
    div.odd
      div.numberOfMembers
        div.mdl-textfield.mdl-js-textfield.mdl-textfield--floating-label
          input#trwipTitle.mdl-textfield__input(v-model='trwipData.numberOfMembers', type='number')
          label.mdl-textfield__label Quantidade ideal de Participantes
    div.even
      div.profiles
        span.label Perfis *
        Select.profileSelect(v-model='trwipData.profiles', multiple='')
          Option(v-for='item in possibleProfiles', :value='item', :key='item') {{ item }}
    div.odd
      div.mdl-textfield.mdl-js-textfield.mdl-textfield--floating-label.mdl-textfield__phaseOne
        input.mdl-textfield__input(v-model='trwipData.link', type='text')
        label.mdl-textfield__label  Link relacionado
    div.even
      div.mdl-textfield.mdl-js-textfield.mdl-textfield--floating-label.mdl-textfield__phaseOne
        input.mdl-textfield__input(v-model='trwipData.videoUrl', type='text')
        label.mdl-textfield__label  Link de um video sobre sua Trwip
    div.actions
      button(@click='finished').mdl-button.mdl-js-button.mdl-button--primary Salvar
      button(@click='cancel').mdl-button.mdl-js-button.mdl-button--primary Cancelar
</template>

<script>
import moment from 'moment'
import VueSlider from 'vue-slider-component'

export default {
  name: 'edit-trwip',
  components: {
    VueSlider
  },
  async beforeRouteEnter (to, from, next) {
    try {
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
    return {
      trwipData: Object.assign({}, this.trwip),
      styles: [
        'Aventura',
        'Ecoturismo',
        'Sol e Praia',
        'Compras',
        'Família',
        'Cultural',
        'Gastronômica',
        'Negócios e Eventos',
        'LGBT',
        'Terceira idade',
        'Estudos e Intercâmbios',
        'Romântica',
        'Turismo Real',
        'Outro'
      ],
      possibleProfiles: [
        'Mochileiro',
        'Baladeiro',
        'Natureza',
        'Esportes de aventura',
        'Cultura',
        'Estudos ',
        'Gastronomia',
        'Negócios ',
        'Observador de vida silvestre',
        'Outro'
      ],
      dateOptions: {
        disabledDate (date) {
          return date && date.valueOf() < Date.now() - 86400000
        }
      },
      daterange: {
        to: '',
        from: ''
      },
      monthNames: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
      dayNames: ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'],
      value: [0, 15000],
      date: [],
      min: 0,
      max: 15000,
      bgStyle: {'backgroundColor': '#fff', 'boxShadow': 'inset 0.5px 0.5px 3px 1px rgba(0,0,0,.36)'},
      sliderStyle: [{'backgroundColor': 'white'}, {'backgroundColor': 'white'}],
      processStyle: {'backgroundImage': '-webkit-linear-gradient(left, #89D5EB, #2A3B8F)'},
      formatter: 'R$ {value}'
    }
  },
  computed: {
    descriptionCharCount () {
      return this.trwipData.description.length
    }
  },
  methods: {
    daysQuantity () {
      let duration = 0
      if (this.daterange.from && this.daterange.to) {
        const start = moment(this.daterange.from)
        const end = moment(this.daterange.to)
        duration = end.diff(start, 'days') + 1
      }
      return duration
    },
    getDateFormated (date) {
      return moment(date).format('DD/MM/YYYY')
    },
    finished () {
      this.trwipData.startDate = this.daterange.from
      this.trwipData.endDate = this.daterange.to
      this.trwipData.minValue = this.value[0]
      this.trwipData.maxValue = this.value[1]
      this.trwipData.daysQuantity = this.daysQuantity
      this.$emit('saved', this.trwipData)
    },
    cancel () {
      this.$emit('cancel')
    }
  },
  mounted () {
    this.value[0] = this.trwip.minValue
    this.value[1] = this.trwip.maxValue
    this.daterange.from = this.trwip.startDate
    this.daterange.to = this.trwip.endDate
  }
}
</script>

<style lang="scss" scoped>
#edit-trwip {
  width: 100%;
}
.odd {
  background-color: white;
}
.even {
  background-color: #fcfcfc;
}
.odd, .even {
  width: 100%;
  padding: 0 5%;
}
.mdl-textfield {
  width: 100%;
  .mdl-textfield__label {
    font-size: 1.1em;
    font-weight: 700;
    color: #3b3b3b;
  }
  .mdl-textfield__input {
    font-size: 1.2em;
    color: #888888;
  }
}
.estilo{
  padding: 22px;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  height: 30%;
}
.estilo__labels{
  display: flex;
  flex-direction: column;
}
.estilo_label{
  font-size: 1.2em;
}
@media (max-width: 420px) {
  .datepicker, .profileSelect {
    width: 100%;
  }
}
@media (min-width: 421px) and (max-width: 800px) {
  .datepicker, .profileSelect {
    width: 50%;
  }
}
@media (min-width: 801px) {
  .datepicker, .profileSelect {
    width: 30%;
  }
}
.profiles {
  padding: 2% 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.label {
  font-size: 1.2em;
  font-weight: 700;
}
.numberOfMembers {
  padding: 5px 0;
}
.range-slider {
  padding: 10px 0;
}
.mdl-textfield--floating-label {
  .mdl-textfield__input {
    margin-top: 25px;
  }
}
.description-count__label {
  margin: -17px 0px 10px 0px;
  text-align: start;
}

</style>

<style> 
.ivu-select-dropdown {
  top: unset !important;
  left: unset !important;
}
</style>
