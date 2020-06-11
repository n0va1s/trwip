<template lang="pug">
div(v-mdl='')#create-trwip
  div.mdl-layout__content.mainSection(:style="{ background: 'url(' + trwipImg + ') center / cover ' }")
    div.header
      span.logo-font.slogan Monte sua viagem
      button.mdl-button.mdl-js-button.mdl-button--fab.photoupload
        i.material-icons add_a_photo
        input#upimage.upload(type='file', @change='setTrwipImg', name='pic')
  div.phase-section.section-one.phase_One
    a(name='phase_One')
    div.phase-band
      div.phase_one-text
        p.mdl-typography--headline.mdl-typography--font-thin
          | Dê um nome legal para sua viagem, escolha o estilo principal, e o destino que você deseja.
        div.mdl-textfield.mdl-js-textfield.mdl-textfield--floating-label.mdl-textfield__phaseOne
          input.mdl-textfield__input(v-model='trwip.title', type='text')
          label.mdl-textfield__label Titulo da sua viagem *
        div.mdl-textfield.mdl-js-textfield.mdl-textfield--floating-label.mdl-textfield__phaseOne
          input.mdl-textfield__input(v-model='trwip.destination', type='text')
          label.mdl-textfield__label  Escolha o destino de sua viagem *
        div.mdl-textfield.mdl-js-textfield.mdl-textfield--floating-label.mdl-textfield__phaseOne
          input.mdl-textfield__input(v-model='trwip.country', type='text')
          label.mdl-textfield__label  Escolha o país de destino de sua viagem *
        div.estilo
          div.estilo__labels
            b.estilo_label
              span Selecione o estilo de sua viagem *
            Select(v-model='trwip.style', style='width:200px' multiple)
              Option(v-for='item in styles', :value='item', :key='item') {{ item }}
        div.estilo
          div.estilo__labels
            b.estilo_label
              span Selecione a data de sua viagem caso esteja definido
            b.estilo_label(v-if='trwip.startDate && trwip.endDate')
              span {{ getDateFormated(trwip.startDate) }} a {{ getDateFormated(trwip.endDate) }}
          q-datetime-range(
            v-model="daterange" no-clear
            format='DD/MM/YY'
            ok-label='Selecionar'
            cancel-label='Cancelar'
            :month-names='monthNames'
            :day-names='dayNames'
            :min="new Date()")
          //- div {{ daysQuantity }} dias
    a(href='#phase_Two')
      button.expandMore.mdl-button.mdl-button--colored.mdl-js-button.mdl-button--fab.mdl-js-ripple-effect
        i.material-icons expand_more
  div.phase-section.section-two.phase_Two
    a(name='phase_Two')
    div.phase-band
      div.phase_two-text
        p.mdl-typography--headline.mdl-typography--font-thin
          | Estime quantas pessoas você acha que seja o ideal para realizar a viagem, escolha perfis de participantes que deseja te acompanhar, e defina se sua viagem é privado, apenas para convidados
        div.numberOfParticipants
          div.mdl-textfield.mdl-js-textfield.mdl-textfield--floating-label.mdl-textfield__phaseOne
            input#trwipTitle.mdl-textfield__input(v-model='trwip.numberOfMembers', type='number')
            label.mdl-textfield__label Quantidade ideal de Participantes
        span Escolha o perfil de viajantes desejados
        Select.profileSelect(v-model='trwip.profiles', multiple='')
          Option(v-for='item in possibleProfiles', :value='item', :key='item') {{ item }}
        div.accessDiv
          p.mdl-typography--headline.mdl-typography--font-thin
            | Escolha se sua viagem é aberta ao publico ou só para quem você convidar
          div.accessDivButtons
            button.mdl-button.mdl-js-button.mdl-button--raised.mdl-js-ripple-effect.access-button(v-bind:style='{ backgroundColor: colorPublic }', @click='didClickPublic') Público
            button.mdl-button.mdl-js-button.mdl-button--raised.mdl-js-ripple-effect.access-button(v-bind:style='{ backgroundColor: colorPrivate }', @click='didClickPrivate') Privado
    a(href='#phase_Three')
      button.expandMore.mdl-button.mdl-button--colored.mdl-js-button.mdl-button--fab.mdl-js-ripple-effect
        i.material-icons expand_more
  div.phase-section.section-three.phase_three
    a(name='phase_Three')
    div.phase-band
      div.phase_three-text
        p.mdl-typography--headline.mdl-typography--font-thin
          | Aqui você pode descrever detalhadamente sua viagem, além de inserir uma estimativa de preço, escolher indicadores dessa estimativa, e inserir suas considerações finais
        div.mdl-textfield.mdl-js-textfield.mdl-textfield--floating-label.mdl-textfield__phaseThree
          textarea#trwipTitle.mdl-textfield__input(v-model='trwip.description', type='text', rows='4')
          label.mdl-textfield__label Descrição detalhada *
        div.description-count__label {{ descriptionCharCount }} caracteres
        div.mdl-textfield.mdl-js-textfield.mdl-textfield--floating-label.mdl-textfield__phaseThree
          textarea#trwipTitle.mdl-textfield__input(v-model='trwip.script', type='text', rows='4')
          label.mdl-textfield__label Roteiro da viagem *
        div.description-count__label {{ scriptCharCount }} caracteres
        div.mdl-textfield.mdl-js-textfield.mdl-textfield--floating-label.mdl-textfield__phaseThree
          textarea.mdl-textfield__input(v-model='trwip.observations', type='text', rows='2')
          label.mdl-textfield__label Outras observações
        div.mdl-textfield.mdl-js-textfield.mdl-textfield--floating-label.mdl-textfield__phaseOne
          input.mdl-textfield__input(v-model='trwip.link', type='text')
          label.mdl-textfield__label Link relacionado:
        div.mdl-textfield.mdl-js-textfield.mdl-textfield--floating-label.mdl-textfield__phaseOne
          input.mdl-textfield__input(v-model='trwip.videoUrl', type='text')
          label.mdl-textfield__label Link de algum video sobre a Trwip:
        center.buttonCreateCentered
          button.mdl-button.mdl-js-button.mdl-button--raised.mdl-js-ripple-effect.create_button.mdl-color-text--black(@click='didClickCreateTrwip')
            | Criar Trwip
  div#trwip-errors-modal
    Modal(v-model='errorsState', title='Erro nos seguintes campos')
      div(v-for='error in trwipErrors', :key='error')
        span - {{ error }}
      div(slot='footer')
        Button(type='error', size='large', long='long', @click='errorsState = false') Fechar
  div#trwip-confirm-modal
    Modal(v-model='confirmState', title='Confirmar criação da viagem')
      ul
        li(v-for='(item, index) in trwipConfirmItems', :key='item + index')
          span {{ item }}
      div(slot='footer')
        Button(@click='confirmState = false') Cancelar
        Button(type='success', @click='confirmTrwip') Confirmar
  footer-trwip
</template>

<script>
import TrwipCard from './TrwipCard'
import vueSlider from 'vue-slider-component'
import FooterTrwip from './FooterTrwip'
import * as actions from '@/store/actionTypes'
import util from '@/helpers/util'
import moment from 'moment'
import imageApi from '@/api/image'

export default {
  name: 'CreateTrwip',
  components: {
    TrwipCard,
    vueSlider,
    FooterTrwip
  },
  data () {
    return {
      name: '',
      value: [0, 15000],
      min: 0,
      max: 15000,
      date: [],
      daterange: {
        to: '',
        from: ''
      },
      monthNames: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
      dayNames: ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'],
      bgStyle: {'backgroundColor': '#fff', 'boxShadow': 'inset 0.5px 0.5px 3px 1px rgba(0,0,0,.36)'},
      sliderStyle: [{'backgroundColor': 'white'}, {'backgroundColor': 'white'}],
      processStyle: {'backgroundImage': '-webkit-linear-gradient(left, #89D5EB, #2A3B8F)'},
      dateOptions: {
        disabledDate (date) {
          return date && date.valueOf() < Date.now() - 86400000
        }
      },
      formatter: 'R$ {value}',
      trwip: {
        title: '',
        destination: '',
        country: '',
        script: '',
        style: [],
        numberOfMembers: null,
        public: true,
        description: '',
        videoUrl: '',
        link: '',
        minValue: 0,
        maxValue: 0,
        observations: '',
        profiles: [],
        startDate: null,
        endDate: null,
        daysQuantity: 0,
        image: 'uploads/trwipMainHeader4.jpg'
      },
      errorsState: false,
      confirmState: false,
      iconStyle: 'add',
      colorPublic: '#3EAB93',
      colorPrivate: '',
      trwipErrors: [],
      trwipConfirmItems: [],
      styles: ['Aventura', 'Ecoturismo', 'Sol e Praia', 'Compras', 'Família', 'Cultural ', 'Gastronômica', 'Negócios e Eventos', 'LGBT', 'Terceira idade', 'Estudos e Intercâmbios', 'Romântica', 'Observação de vida silvestre', 'Esportes', 'Outro'],
      possibleProfiles: ['Mochileiro', 'Baladeiro', 'Natureza', 'Esportes de aventura', 'Cultura', 'Estudos ', 'Gastronomia ', 'Negócios ', 'Observador de vida silvestre', 'Outro']
    }
  },
  computed: {
    trwipImg () {
      if (this.trwip.image) {
        return this.trwip.image
      } else {
        return 'uploads/trwipMainHeader4.jpg'
      }
    },
    descriptionCharCount () {
      return this.trwip.description.length
    },
    scriptCharCount () {
      return this.trwip.script.length
    },
    daysQuantity () {
      let duration = 0
      if (this.date[0] && this.date[1]) {
        const start = moment(this.date[0])
        const end = moment(this.date[1])
        duration = end.diff(start, 'days') + 1
      }
      return duration
    }
  },
  methods: {
    setTrwipImg (e) {
      if (e.target.files) {
        let image = e.target.files[0]
        imageApi.uploadDisposable(image)
        .then((res) => {
          this.trwip.image = res.data.path
        })
      }
    },
    getDateFormated (date) {
      return moment(date).format('L')
    },
    didClickPrivate () {
      this.colorPrivate = '#3EAB93'
      this.colorPublic = ''
      this.trwip.public = false
    },
    didClickPublic () {
      this.colorPrivate = ''
      this.colorPublic = '#3EAB93'
      this.trwip.public = true
    },
    didClickCreateTrwip () {
      this.trwip.minValue = this.value[0]
      this.trwip.maxValue = this.value[1]
      this.trwip.startDate = this.daterange.from
      this.trwip.endDate = this.daterange.to
      this.trwip.daysQuantity = this.daysQuantity
      this.checkAllFields()
      if (this.trwipErrors.length === 0) {
        this.createConfirmItems()
        this.confirmState = true
      } else {
        this.errorsState = true
      }
    },
    createConfirmItems () {
      this.trwipConfirmItems = []
      this.trwipConfirmItems.push('Titulo da viagem: ' + this.trwip.title)
      this.trwipConfirmItems.push('Destino: ' + this.trwip.destination)
      this.trwipConfirmItems.push('Estilo: ' + this.trwip.style.join(', '))
    },
    checkAllFields () {
      this.trwipErrors = []
      if (this.trwip.country === '') {
        this.trwipErrors.push('País não pode ser vazio')
      }
      if (this.trwip.title === '') {
        this.trwipErrors.push('Titulo não pode ser vazio')
      }
      if (this.trwip.destination === '') {
        this.trwipErrors.push('Destino não pode ser vazio')
      }
      if (this.trwip.style === '') {
        this.trwipErrors.push('Escolha um estilo de sua viagem')
      }
      if (this.trwip.description.length < 140) {
        this.trwipErrors.push('Detalhe sua viagem em pelo menos 140 caracteres')
      }
      if (this.trwip.title.length > 40) {
        this.trwipErrors.push('O titulo da sua viagem deve ser no máximo 40 caracteres')
      }
      if (!(this.trwip.startDate && this.trwip.endDate)) {
        this.trwipErrors.push('Selecione uma data estimada de sua viagem')
      }
      if (this.trwip.script === '') {
        this.trwipErrors.push('O roteiro não pode ficar em branco')
      }
    },
    confirmTrwip () {
      this.confirmState = false

      let userId = this.$store.state.user.user.id
      this.$store.dispatch(actions.CREATE_TRWIP, {userId: userId, trwip: this.trwip})
      .then(({data}) => {
        util.showSnackbar('Sua Trwip foi criada com sucesso.')
        this.$router.push('/trwip/' + data.id)
      })
      .catch((err) => {
        console.log(err)
        util.showSnackbar('Ocorreu um erro inesperado. Por favor, tente novamente.')
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.photoupload {
  background-color: white;
}

.upload {
  opacity: 0;
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

.datepicker {
  margin: 5px 0px;
  transition: opacity 1s;
}

.section-one, .section-two, .section-three {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

 /*  Header */
 .logo-font {
  font-family: 'Roboto', 'Helvetica', 'Arial', sans-serif;
  line-height: 1;
  color: white;
  font-weight: 500;
}
.slogan {
  font-size: 3.2em;
  padding-top: 8%;
}
.slogan:hover {
  color: #89D5EB;
}
.sub-slogan {
  font-size: 21px;
  padding-top: 14px;
  padding-bottom: 34px;
}
.mainSection {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  height: 35vh;
  width: 100%;
  background-color: white;
  background-size: cover;
}
 /* Botão de descer*/
.expandMore {
  position: absolute;
  right: 20%;
  bottom: -26px;
  z-index: 3;
  background: #89D5EB !important;
  color: #2A3B8F !important;
}
 /* Fase 1 */
.phase-section {
  position: relative;
  background-size: cover;
  height: 480px;
}
.section-one{
    height: 80%;
    background-color: white;
}

.phase-band {
  position: relative;
  bottom: 0;
  width: 100%;
  text-align: center;
}

@media (min-width: 820px) {
  .phase_one-text, .phase_two-text, .phase_three-text {
    margin-left: 15%;
  }
}

@media(max-width: 819px) {

  .phase_one-text, .phase_two-text, .phase_three-text {
    margin: 0px 30px;
  }
}

.phase_one-text {
  max-width: 800px;
  /*margin-left: 15%;*/
  padding: 24px;
  padding-top: 60px;
  text-align: left;
  color: #27314F;
  display: flex;
  flex-direction: column;
}
  .phase_one-text p {
    padding-top: 8px;
  }

  .section-one .mdl-textfield__label {
    color:#27314F !important;
  }

  .section-one .mdl-textfield__input{
    border-bottom: 1px solid #27314F;
  }

  .estilo{
      padding-top: 22px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      width: 100%;
      height: 30%;
  }
  .estilo__labels{
      display: flex;
      flex-direction: column;
  }
  .estilo_button{
    color: black;
  }
  .estilo_label{
    padding-bottom: 8px;
  }
  .styleLabel{
      font-weight: 500;
      padding-top: 8px;
      font-size: 25px;
  }
  .mdl-chip{
    width: 170px;
  }
   /* Fase 2 */

.section-two{
    background-color: #f4f4f4;
    height: 35%;
}
.clipboardSectionTwo{
   position: absolute;
   left: 65%;
   top: 55%;
}
 .section-two .mdl-textfield__label {
    color:#27314F !important;
  }

  .section-two .mdl-textfield__input{
    border-bottom: 1px solid #27314F;
  }

.phase_two-text {
  max-width: 800px;
  /*margin-left: 15%;*/
  padding: 24px;
  padding-top: 60px;
  text-align: left;
  color: #27314F;
  display: flex;
  flex-direction: column;
}
  .phase_two-text p {
    padding-top: 8px;
  }

  .numberOfParticipants{
    display: flex;
    flex-direction: column;
    padding-bottom: 20px;
  }
  .perfil-button {
    width: 280px;
    height: 40px;
    color: #27314F;
  }
  .accessDiv{
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding-top: 50px;
  }
  .accessDivButtons {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    width: 200px;
    padding: 20px 0;
  }
  .access-button{
    border: 1px solid #27314F;
    color: #27314F;
  }
   .access-button:hover{
    color: #89D5EB;
  }
   /* Fase 3 */
   .section-three .mdl-textfield__label {
    color:#27314F !important;
  }

  .section-three .mdl-textfield__input{
    border-bottom: 1px solid #27314F;
  }

.range-slider {
  padding-top: 30px;
}
.price-label {
    padding-bottom: 10px;
}
.section-three{
    background-color: white;
    height: 40%;
}
.phase_three-text {
  max-width: 800px;
  /*margin-left: 15%;*/
  padding: 24px;
  padding-top: 60px;
  text-align: left;
  color: #333;
  display: flex;
  flex-direction: column;
}
  .phase_three-text p {
    padding-top: 8px;
  }

.vue-slider-wrap {
  padding-top: 50px;
}
  .mdl-textfield__phaseThree{
    width: 100%;
  }
  .pricesDiv {
    padding-top: 20px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    width: 100%;
  }
  .pricesDivOne{
    padding-right: 15px;
  }
  .create_button{
    width: 40%;
    background: rgba(158,158,158,0.15);
  }

  .buttonCreateCentered{
    padding-top: 30px;
  }
.sow-submit-wrapper {
  padding-top: 12px;
}
.popup {
    color: white !important;
	  padding-left: 25px;
    font-size:15px;
    font-weight: 500;
	  text-transform: none;
    text-decoration: none;
}

.popup:hover {
	color: white !important;
}
.cerrar {
	font-size: 20px;
  position: absolute;
  top: 0px;
  right: 7px;
  color: white !important;
  text-decoration: none;
}
.cerrar:hover {
	color: white !important;
}
.tips-importance {
  color: white;
}
#prueba {
	position: fixed;
	right:0;
	bottom:0;
	width:23%;
  background-color: rgba(255,255,255,0.2);
	-webkit-box-shadow: 0 2px 15px 0 rgba(0,0,0,0.6);
	box-shadow: 0 2px 15px 0 rgba(0,0,0,0.6);
	-moz-box-shadow: 0 2px 15px 0 rgba(0,0,0,0.6);
	z-index: 9996;
	margin: 0;
	padding: 0;
}
#animar {
  padding:0 25px;
  display:none;
}
#animar:target {
  padding:0 50px;
  display:inline;
}
#alto {
  max-height:50px;
  width: 100%;
  background-color: blue;
}

.description-count__label {
  margin: -17px 0px 10px 0px;
}

.button_launch {
  background-color: #89D5EB;
}
.header {
  height: 20vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
}
</style>
