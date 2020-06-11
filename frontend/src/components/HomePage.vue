<template lang="pug">
div#top.HomePage
  div.mdl-layout__content.homePageMainSection(v-bind:style="{ backgroundImage: 'url(' + headerName + ')' }")
    a(name='top')
    div.logo-font-header.slogan-header Viajando em boa companhia
    div.logo-font-header.sub-slogan-header Escolha para onde, quando e com quem deseja viajar
    search-row(:visualStyle='searchVisualStyle', :searchPassedName='rowSpecificationsName', @search='didSearch')
  div.topTrwips
    div.trwipsHomePage
      carousel-trwip(:carouselTitle="'Em destaque'" :query="'?orderBy=startDate&field=members'")
    div.trwipsHomePage
      carousel-trwip(:carouselTitle="'Dentro de alguns dias'" :query="'?orderBy=startDate&field=startDateHome'")
    div.trwipsHomePage
      carousel-trwip(:carouselTitle="'Criadas recentemente'" :query="'?orderBy=createdAt&field=createdAt'")
    div.trwipsHomePage
      carousel-trwip(:carouselTitle="'Aventura'" :query="'?orderBy=createdAt&field=style&value=Aventura'")
    div.trwipsHomePage
      carousel-trwip(:carouselTitle="'Cultural'" :query="'?orderBy=createdAt&field=style&value=Cultural'")
    div.android-wear-section
      iframe(width='560', height='415', src='https://www.youtube.com/embed/lENOpKkz5Z8', frameborder='0', allowfullscreen='')
      div.android-wear-band
        div.android-wear-band-text
          div.mdl-typography--display-2 Trwip
          p.mdl-typography--headline.mdl-typography--font-thin
            | Somos uma comunidade de turismo compartilhado, baseada na confiabilidade de nossos membros.
          p
            a.mdl-typography--font-regular.mdl-typography--text-uppercase.android-alt-link.iconRight(:href='getLink')
              | Crie sua Trwip
              i.material-icons chevron_right

  footer-trwip.footer
</template>

<script>
import FooterTrwip from './FooterTrwip'
import SearchRow from './SearchRow'
import CarouselTrwip from './CarouselTrwip'
import moment from 'moment'

export default {
  name: 'HomePage',
  async beforeRouteEnter (to, from, next) {
    try {
      next()
    } catch (err) {
      console.log(err)
    }
  },
  data () {
    return {
      imagePath: '/uploads/trwipMainHeader',
      header: 1,
      headerName: '',
      searchVisualStyle: 'light',
      rowSpecificationsName: '',
      chips: ['thiago', 'henrique', 'danilo']
    }
  },
  components: {
    SearchRow,
    FooterTrwip,
    CarouselTrwip
  },
  computed: {
    getLink () {
      if (window.localStorage.getItem('id')) {
        return '/create_trwip'
      } else {
        return '/login'
      }
    }
  },
  methods: {
    changeImage () {
      this.headerName = this.imagePath + this.header.toString() + '.jpg'
      this.header = this.header + 1
      if (this.header === 6) {
        this.header = 1
      }
    },
    didSearch (trwipSearch, type) {
      let search = trwipSearch
      if (type.value === 'startDate') {
        search = moment(search)
        search = `${search.month() + 1}-${search.year()}`
      }
      if (type.value === 'maxValue') {
        search = `${trwipSearch.max}&minValue=${trwipSearch.min}`
      }
      this.$router.push({ path: '/search', query: { searchFor: search, type: type.value } })
    }
  },
  mounted: function () {
    this.changeImage()

    setInterval(function () {
      this.changeImage()
    }.bind(this), 3000)
  }
}
</script>

<style scoped>

/*  Header */
.homePageMainSection {
  position: relative;
  height: 490px;
  width: 100%;
  overflow: visible;
  background-color: #f3f3f3;
  background: url('/uploads/trwipMainHeader1.jpg') center 30% no-repeat;
  background-size: cover;
  -webkit-transition: background-image 1s ease-in-out;
  transition: background-image 1s ease-in-out;
}
.logo-font-header {
  font-family: 'Roboto', 'Helvetica', 'Arial', sans-serif;
  line-height: 1;
  color: #ffffff;
}
.slogan-header {
  font-size: 75px;
  padding-top: 12%;
  font-weight: 100;
}
@media only screen and (max-width: 640px) {
  .slogan-header {
    font-size: 60px !important;
  }
}
@media only screen and (max-width: 640px) {
  .sub-slogan-header {
    font-size: 18px !important;
  }
}
.sub-slogan-header {
  font-size: 21px;
  padding-top: 24px;
  padding-bottom: 84px;
  font-weight: 500;
}
.iconRight{
  color: #89D5EB;
  text-decoration: none;
  font-size: 16px;
  vertical-align: middle;
}
.material-icons{
  vertical-align: middle;
}

/*  Trwips */
.top-trwip-section {
  position: relative;
  height: 890px;
  width: 100%;
  background-color: #FFFFFF;
  background-size: cover;
  z-index: -1000;
}

.trwipsHomePage{
  width: 100%;
  background-color: #FFFFFF;
  z-index: -1000;

}
/*  Video */

/*  Works */

.text_h2 {
    font-weight: 100;margin-bottom: 4%; line-height: 4.5rem;
}
#works {
  padding-top: 4rem;
}
.title_row{
    width: 75%;
}
.span_h2 {
    font-weight: 300;
    color: #2196F3;
}
.android-wear-section {
  margin-top: 5em;
  position: relative;
  background-size: cover;
  /*height: 800px;*/
}

.android-wear-band {
  bottom: 0;
  width: 100%;
  text-align: center;
  background-color: #37474f;
}

.rowmax{
  width: 100%;
}

.android-wear-band-text {
  max-width: 800px;
  margin-left: 25%;
  padding: 24px;
  text-align: left;
  color: white;
}
  .android-wear-band-text p {
    padding-top: 8px;
  }
.android-link {
  text-decoration: none;
  color: #2A3B8F !important;
}
  .android-link:hover {
    color: #89D5EB !important;
  }
.mdl-layout__content {
  display: flex;
  flex-direction: column;
}
</style>
