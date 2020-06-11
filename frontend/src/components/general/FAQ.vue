<template>
    <div id="faq">
    <div class="mdl-layout__content generalSection"> 
          <div class="logo-font slogan">{{ title }}</div>

          <div class="logo-font sub-slogan">{{ questionOne }}</div>
          <center><div class="texts">{{ answerOne }}</div></center>
          
          <div class="logo-font sub-slogan">{{ questionTwo }}</div>
          <center><div class="texts">{{ answerTwo }}</div></center>

          <div class="logo-font sub-slogan">{{ questionThree }}</div>
          <center><div class="texts">{{ answerThree }}</div></center>

          <div class="logo-font sub-slogan">{{ questionFour }}</div>
          <center><div class="texts">{{ answerFour }}</div></center>

          <div class="logo-font sub-slogan">{{ questionFive }}</div>
          <center><div class="texts">{{ answerFive }}</div></center>

                 <div class="logo-font sub-slogan">{{ questionSix }}</div>
          <center><div class="texts">{{ answerSix }}</div></center>

                 <div class="logo-font sub-slogan">{{ questionSeven }}</div>
          <center><div class="texts">{{ answerSeven }}</div></center>

                 <div class="logo-font sub-slogan">{{ questionEight }}</div>
          <center><div class="texts">{{ answerEight }}</div></center>

                 <div class="logo-font sub-slogan">{{ questionNine }}</div>
          <center><div class="texts">{{ answerNine }}</div></center>

                 <div class="logo-font sub-slogan">{{ questionTen }}</div>
          <center><div class="texts">{{ answerTen }}</div></center>

   </div>  
    <footer-Trwip></footer-Trwip>

  </div>
</template>

<script>
import FooterTrwip from '../FooterTrwip'

export default {
  name: 'faq',
  data () {
    return {
      title: 'FAQ Trwip',
      subTitle: 'Trwip - Traveling With people',
      questionOne: '1) O que é a Trwip?',
      questionTwo: '2) Como funciona a Trwip?',
      questionThree: '3) Preciso criar uma conta para visualizar as Trwips?',
      questionFour: '4) Como posso criar uma Trwip?',
      questionFive: '5) Como posso localizar uma Trwip?',
      questionSix: '6) Como faço para participar de uma Trwip?',
      questionSeven: '7) Após clicar em “Join trwip” eu já estou automaticamente participando desta Trwip?',
      questionEight: '8) Posso ter meu pedido de “Join trwip” negado?',
      questionNine: '9) Como posso conversar com o organizador de uma Trwip?',
      questionTen: '10) Tenho uma dúvida que não encontrei solução, como proceder?',
      answerOne: 'A Trwip é uma comunidade, baseada na confiabilidade de seus membros, visando propiciar a troca de experiências turísticas.',
      answerTwo: 'A Trwip funciona como um canal de interação onde as pessoas poderão criar, organizar e buscar experiências turísticas coletivas.',
      answerThree: 'Não é necessário criar uma conta para isso.',
      answerFour: 'Para criar uma Trwip, primeiramente, você precisa criar uma conta. Após efetuar entrar com seus dados, no canto superior direito, clique em “Criar Trwip” e siga os passos.',
      answerFive: 'Você poderá localizar uma Trwip por destino, data, estilo, pessoa que criou, faixa de preço ou pelos cards das Trwips criadas.',
      answerSix: 'Após entrar com seus dados na Trwip, localize a experiência que quer compartilhar e clique em “Join trwip”.',
      answerSeven: 'Não. Para que você possa participar da Trwip criada é necessário que o organizador aprove sua solicitação.',
      answerEight: 'Sim. Caso a Trwip criada tenha um perfil específico ou alguma outra observação, o organizador pode negar sua participação.',
      answerNine: 'No menu superior, clique em “perfil” e depois em “minhas conversas”.',
      answerTen: 'Envie um email para trwipdados@gmail.com e responderemos o mais breve possível.'
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
  padding-bottom: 20px;
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
