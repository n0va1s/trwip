<template lang="pug">
div#about-us
  div.mdl-layout__content.generalSection
    div.logo-font.slogan {{ title }}
    div.logo-font.sub-slogan {{ subTitle }}
    center
      div.texts {{ completeTextPartOne }}
    center
      div.texts {{ completeTextPartTwo}}
    center
      div.texts {{ completeTextPartThree }}
    center
      div.texts {{ completeTextPartFour }}
    center
      div.texts
        | Saiba um pouco mais sobre nosso site por meio do FAQ , 
        a(href='http://trwip.com/faq') clicando aqui
  footer-trwip
</template>

<script>
import FooterTrwip from './FooterTrwip'

export default {
  name: 'about',
  data () {
    return {
      title: 'Sobre a Trwip',
      subTitle: 'Trwip - Traveling With people',
      completeTextPartOne: 'Somos uma comunidade de turismo compartilhado, baseado na confiabilidade de seus membros.',
      completeTextPartTwo: 'Por meio da plataforma é possível conectar pessoas com objetivos similares e complementares para realizar atividades turísticas em conjunto, dispondo de mecanismos de interação entre os usuários que gerem relações de confiança a partir de avaliações dos próprios participantes.',
      completeTextPartThree: 'Na plataforma a Comunidade Trwip tem acesso às informações organizadas das atividades turísticas oferecidas pelos seus próprios membros, sendo possível criar ou buscar viagens/passeios de maneira simples e rápida, com a possibilidade de filtrar interesses específicos, como data, local, estilo de viagens e pessoas.',
      completeTextPartFour: 'Faça parte dessa comunidade e venha viajar com a gente!'
    }
  },
  components: {
    FooterTrwip
  }
}
</script>


<style scoped>
.generalSection{
  display: flex;
  flex-direction: column;
}
.texts{
    width: 70%;
    padding-bottom: 30px;
    font-size: 16px;
    text-align: left;
}
.logo-font {
  font-family: 'Roboto', 'Helvetica', 'Arial', sans-serif;
  line-height: 1;
  color: #767777;
  font-weight: 500;
}
.slogan {
  font-size: 60px;
  padding-top: 60px;
  color: #4990E2;
}
.slogan:hover {
  color: #89D5EB;
}
.sub-slogan {
  font-size: 21px;
  padding-top: 14px;
  padding-bottom: 34px;
}
.termsSection {
  position: relative;
  height: auto;
  min-height: 400px;
  width: 100%;
  background-color: #f3f3f3;
}

</style>
