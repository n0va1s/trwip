<template>
<div id='search-row'>
  <search-type-modal :show="chooseSearchTypeState > 0" :possibleTypes="possibleTypes" @selected="onSelectedSearchTypeModal" @closed="onCloseSearchTypeModal"></search-type-modal>
    <div class="light" v-if="visualStyle === 'light'">
    <button type="button" @click="didClickSearchType" class="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent" :style="{ backgroundColor: colorButton}">  <i class="material-icons">{{ trwipType.name }}</i>
      <q-tooltip anchor='bottom middle' self='top middle' :offset="[10, 10]" v-model='showingTooltip'>Clique aqui para escolher <br/> outros critérios de busca</q-tooltip>
    </button>
        <div v-if="selectedType === 4" class="range-slider">
          <vue-slider :value.sync="value" :max="max" :sliderStyle="sliderStyle" :bgStyle="bgStyle" :processStyle="processStyle" :formatter="formatter"  v-model="value"></vue-slider>
        </div>
        <div v-else-if="selectedType === 1" class="date-row mdl-textfield mdl-js-textfield  mdl-textfield__phaseOne">
            <q-datetime v-model="dateSelected" no-clear
              format="DD/MM/YY" ok-label="Selecionar" dark
              cancel-label="Cancelar" :month-names="monthNames"
              :day-names="dayNames" :min="new Date()"
              placeholder='Procurar trwip por data...'/>
        </div>
        <div v-else-if="selectedType === 2" class="mdl-textfield mdl-js-textfield  mdl-textfield__phaseOne">
          <v-select v-model="trwipSearch" :clearSearchOnSelect='false' :options="styleOptions" id='v-select' />
        </div>
        <div v-else class="mdl-textfield mdl-js-textfield  mdl-textfield__phaseOne">
            <q-input
              @keydown.enter="didClickSearchButton"
              v-if="trwipType.value !== 'maxValue'"
              dark :placeholder='trwipPlaceholder'
              class="mdl-textfield__input" color='white'
              v-model="trwipSearch" type="text"
              @focus="showingTooltip = true"
              @blur="showingTooltip = false"
            />
            <q-input v-else class="mdl-textfield__input" dark :placeholder='trwipPlaceholder' color='white' v-model="trwipSearch" type="number" />
        </div>
        <button type="button" @click="didClickSearchButton" class="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent spe">  <i class="material-icons">search</i></button>
    </div>
</div>
</template>

<script>
import SearchTypeModal from './SearchTypeModal'
import vueSlider from 'vue-slider-component'
import utilHelper from '../helpers/util'

export default {
  name: 'search-row',
  props: {
    visualStyle: {
      type: String
    },
    searchPassedName: {
      type: String
    },
    searchPassedText: {
      type: String
    }
  },
  data () {
    return {
      dateSelected: null,
      monthNames: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
      dayNames: ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'],
      chooseSearchTypeState: 0,
      trwipSearch: '',
      value: [0, 15000],
      min: 0,
      max: 15000,
      bgStyle: {'backgroundColor': '#fff', 'boxShadow': 'inset 0.5px 0.5px 3px 1px rgba(0,0,0,.36)'},
      sliderStyle: [{'backgroundColor': 'white'}, {'backgroundColor': 'white'}],
      processStyle: {'backgroundImage': '-webkit-linear-gradient(left, #89D5EB, #2A3B8F)'},
      formatter: 'R$ {value}',
      texfieldInputType: 'number',
      possibleTypes: [
        {number: 1, name: 'flight_land', value: 'destination', label: 'Destino', color: '#FFC35F'},
        {number: 2, name: 'date_range', value: 'startDate', label: 'Data', color: '#e3625f'},
        {number: 3, name: 'dns', value: 'style', label: 'Estilo', color: '#65A4ED'},
        {number: 4, name: 'perm_identity', value: 'memberName', label: 'Pessoa', color: '#B969FF'}
      ],
      selectedType: 0,
      showingTooltip: false,
      styles: ['Aventura', 'Ecoturismo', 'Sol e Praia', 'Compras', 'Família', 'Cultural ', 'Gastronômica', 'Negócios e Eventos', 'LGBT', 'Terceira idade', 'Estudos e Intercâmbios', 'Romântica', 'Observação de vida silvestre', 'Esportes', 'Outro']
    }
  },
  methods: {
    onCloseSearchTypeModal () {
      this.chooseSearchTypeState = 0
    },
    onSelectedSearchTypeModal (index) {
      this.selectedType = index
      this.trwipSearch = ''
      this.chooseSearchTypeState = 0
      this.$emit('type', this.trwipType.value)
    },
    didClickSearchType () {
      this.chooseSearchTypeState = 1
    },
    didClickSearchButton () {
      if (this.selectedType === 1) {
        if (!this.dateSelected) {
          this.showMissingDate()
        } else {
          this.$emit('search', this.dateSelected, this.trwipType)
        }
      } else if (this.selectedType === 2) {
        this.$emit('search', this.trwipSearch.value, this.trwipType)
      } else if (this.selectedType === 4) {
        this.$emit('search', { min: this.value[0], max: this.value[1] }, this.trwipType)
      } else if (this.trwipSearch === '') {
        utilHelper.showSnackbar('Campo vazio')
      } else {
        this.$emit('search', this.trwipSearch, this.trwipType)
      }
    },
    showMissingDate () {
      utilHelper.showSnackbar('Data não escolhida')
    }
  },
  components: {
    SearchTypeModal,
    vueSlider
  },
  computed: {
    trwipType () {
      return this.possibleTypes[this.selectedType]
    },
    colorButton () {
      return this.possibleTypes[this.selectedType].color
    },
    trwipPlaceholder () {
      return 'Procurar por ' + this.trwipType.label + '...'
    },
    styleOptions () {
      return this.styles.map(style => { return { label: style, value: style } })
    }
  }
}
</script>

<style>
#v-select .selected-tag {
  color: #fff;
}

#v-select button {
  display: none;
}

#v-select .selected-tag {
  background: rgba(50,50,50,0.8);
}

#v-select.dropdown.open .dropdown-toggle,
#v-select.dropdown.open .dropdown-menu ,
#v-select .dropdown-toggle,
#v-select .open-indicator::before {
  border-color: white;
}

#v-select .active a {
  background: rgba(50,50,50,.1);
  color: #333;
}

#v-select.dropdown .highlight a,
#v-select.dropdown li:hover a {
  background: #65A4ED;
  color: #fff;
}
</style>


<style scoped>

#search-row{
  vertical-align: middle;
  padding-bottom: 20px;
  padding-right: 10px;
  padding-left: 5px;
}
.datepicker{
  width:95%;
}
.container{
 display: flex;
 flex-direction: row;
}
.mdl-button--accent.mdl-button--accent.mdl-button--raised, .mdl-button--accent.mdl-button--accent.mdl-button--fab{
  background-color: transparent;
  vertical-align: middle;
}

.mdl-textfield__label {
  color: white !important;
}
.mdl-textfield__input{
  color: white;
  border-bottom: 1px solid white;
}
.mdl-textfield{
  width: 55%;
  color: white;
}
.date-row {
    position: relative;
    font-size: 16px;
    display: inline-block;
    box-sizing: border-box;
    width: 55%;
    max-width: 100%;
    /* margin: 0; */
}
.range-slider {
    position: relative;
    font-size: 16px;
    display: inline-block;
    box-sizing: border-box;
    width: 55%;
    max-width: 100%;
    margin: 0;
}
div{
    vertical-align: middle;
}
</style>
