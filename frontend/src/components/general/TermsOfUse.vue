<template>
    <div id="terms-of-use">
    <div class="mdl-layout__content generalSection"> 
          <div class="logo-font slogan">{{ title }}</div>
          <div class="logo-font sub-slogan">{{ subTitle }}</div>

          <center><div class="texts">{{ completeTextPartOne }}</div></center>
          <center><div class="texts">{{ completeTextPartTwo}}</div></center>
          <center><div class="texts">{{ completeTextPartThree }}</div></center>
          <center><div class="texts">{{ completeTextPartFour }}</div></center>
          <center><div class="texts">{{ completeTextPartFive }}</div></center>

          <div class="logo-font sub-slogan">Erros e Falhas</div>

          <center><div class="texts">{{ completeTextPartSix }}</div></center>

          <div class="logo-font sub-slogan">Limitação da responsabilidade</div>

          <center><div class="texts">{{ completeTextPartSeven }}</div></center>
          <center><div class="texts">{{ completeTextPartEight }}</div></center>
          <center><div class="texts">{{ completeTextPartNine }}</div></center>

          <div class="logo-font sub-slogan">Informações enviadas pelos usuários e colaboradores</div>
          <center><div class="texts">{{ completeTextPartTen }}</div></center>
          <center><div class="texts">{{ completeTextPartEleven }}</div></center>

          <div class="logo-font sub-slogan">Links para sites de terceiros</div>
          <center><div class="texts">{{ completeTextPartTwelve }}</div></center>


          <div class="logo-font sub-slogan">Direitos autorais e propriedade intelectual</div>
          <center><div class="texts">{{ completeTextPartThirteen }}</div></center>
          <center><div class="texts">{{ completeTextPartFourteen }}</div></center>


          <div class="logo-font sub-slogan">Reclamações sobre violação de direitos autorais</div>
                    <center><div class="texts">{{ completeTextPartFitheen }}</div></center>

            <div class="logo-font sub-slogan">Sobre a utilização de menores de 18</div>
             <center><div class="texts">{{ completeTextUnderAge }}</div></center>

          <div class="logo-font sub-slogan">Leis aplicáveis</div>
             <center><div class="texts">{{ completeTextPartSixteen }}</div></center>

          <center><div class="texts">{{ completeTextFinalPart }}</div></center>



   </div>  
    <footer-trwip></footer-trwip>

  </div>
</template>

<script>
import FooterTrwip from '../FooterTrwip'

export default {
  name: 'sobre',
  data () {
    return {
      title: 'Termos de Uso Trwip',
      subTitle: 'Trwip - Traveling With people',
      completeTextPartOne: 'O website www.trwip.com é um serviço interativo oferecido por meio de página eletrônica na internet que oferece serviços para conexão de usuários interessados em realizar e compartilhar viagens a partir da integração de diversas fontes de informação. O acesso ao site www.trwip.com representa a aceitação expressa e irrestrita dos termos de uso abaixo descritos. Se você não concorda com os termos, por favor, não acesse nem utilize este website.',
      completeTextPartTwo: 'O visitante poderá usar este site apenas para finalidades lícitas. Este espaço não poderá ser utilizado para publicar, enviar, distribuir ou divulgar conteúdos ou informação de caráter difamatório, obsceno ou ilícito, inclusive informações de propriedade exclusiva pertencentes a outras pessoas ou empresas, bem como marcas registradas ou informações protegidas por direitos autorais, sem a expressa autorização do detentor desses direitos. Ainda, o visitante não poderá usar o site www.triwp.com para obter ou divulgar informações pessoais, inclusive endereços na Internet, sobre os usuários do site.',
      completeTextPartThree: 'A Trwip empenha-se em manter a qualidade, atualidade e autenticidade das informações do site, mas seus criadores e colaboradores não se responsabilizam por eventuais falhas nos serviços ou inexatidão das informações oferecidas. O usuário não deve ter como pressuposto que tais serviços e informações são isentos de erros ou serão adequados aos seus objetivos particulares. Os criadores e colaboradores tampouco assumem o compromisso de atualizar as informações, e reservam-se o direito de alterar as condições de uso ou preços dos serviços e produtos oferecidos no site a qualquer momento. ',
      completeTextPartFour: 'O acesso ao site www.trip.com gratuito. A empresa Trwip poderá criar áreas de acesso exclusivo aos seus clientes ou para terceiros especialmente autorizados. ',
      completeTextPartFive: 'Os criadores e colaboradores da Trwip poderão a seu exclusivo critério e em qualquer tempo, modificar ou desativar o site, bem como limitar, cancelar ou suspender seu uso ou o acesso. Também estes Termos de Uso poderão ser alterados a qualquer tempo. Visite regularmente esta página e consulte  os Termos então vigentes. Algumas disposições destes Termos podem ser substituídas por termos ou avisos legais expressos localizados em determinadas páginas deste site. ',
      completeTextPartSix: 'Os documentos, informações, imagens e gráficos publicados neste site podem conter imprecisões técnicas ou erros tipográficos. Em nenhuma hipótese a Trwip e/ou seus respectivos fornecedores serão responsáveis por qualquer dano direto ou indireto decorrente da impossibilidade de uso, perda de dados ou lucros, resultante do acesso e desempenho do site, dos serviços oferecidos ou de informações disponíveis neste site. O acesso aos serviços, materiais, informações e facilidades contidas neste website não garante a sua qualidade.',
      completeTextPartSeven: 'Os materiais são fornecidos neste website sem nenhuma garantia explícita ou implícita de comercialização ou adequação a qualquer objetivo específico. Em nenhum caso a Trwip ou os seus colaboradores serão responsabilizados por quaisquer danos, incluindo lucros cessantes, interrupção de negócio, ou perda de informação que resultem do uso ou da incapacidade de usar os materiais.',
      completeTextPartEight: 'A Trwip não garante a precisão ou integridade das informações, textos, gráficos, links e outros itens dos materiais. A Trwip não se responsabiliza pelo conteúdo dos artigos e informações aqui publicadas, uma vez que os textos são de autoria de terceiros e não traduzem, necessariamente, a opinião do website.',
      completeTextPartNine: ' A Trwip tampouco é responsável pela violação de direitos autorais decorrente de informações, documentos e materiais publicados neste website, compromentendo-se a retirá-los do ar assim que notificado da infração. A Trwip não se responsabiliza por viagens que eventualmente não tenham sido realizadas ou não realizadas a contendo de seus criadores ou participantes.',
      completeTextPartTen: 'Qualquer material, informação, artigos ou outras comunicações que forem transmitidas, enviadas ou publicadas neste site serão considerados informação não confidencial, e qualquer violação aos direitos dos seus criadores não será de responsabilidade da Trwip. É terminantemente proibido transmitir, trocar ou pulbicar, através deste website, qualquer material de cunho comercial, obsceno, difamatório ou ilegal, bem como textos ou criações de terceiros sem a autorização do autor. A Trwip reserva-se o direito de restringir o acesso às informações enviadas por terceiros aos seus usuários.',
      completeTextPartEleven: 'A Trwip poderá, mas não é obrigado, a monitorar, revistar e restringir o acesso a qualquer área no site onde usuários transmitem e trocam informações entre si, incluindo, mas não limitado a, salas de chat, centro de mensagens ou outros fóruns de debates, podendo retirar do ar ou retirar o acesso a qualquer destas informações ou comunicações.  Porém, a Trwip não é responsável pelo conteúdo de qualquer uma das informações trocadas entre os usuários, sejam elas lícitas ou ilícitas.',
      completeTextPartTwelve: 'Os sites apontados não estão sob o controle da Trwip que não é responsável pelo conteúdo de qualquer outro website indicado ou acessado por meio do www.trwip.com reserva-se o direito de eliminar qualquer link ou direcionamento a outros sites ou serviços a qualquer momento. A Trwip não endossa firmas ou produtos indicados, acessados ou divulgados através deste website, tampouco pelos anúncios aqui publicados, reservando-se o direito de publicar este alerta em suas páginas eletrônicas sempre que considerar necessário.',
      completeTextPartThirteen: 'Os documentos, conteúdos e criações contidos neste website pertencem aos seus criadores e colaboradores. A autoria dos conteúdo, material e imagens exibidos no site www.trwip.com é protegida por leis nacionais e internacionais. Não podem ser copiados, reproduzidos, modificados, publicados, atualizados, postados, transmitidos ou distribuídos de qualquer maneira sem autorização prévia e por escrito da empresa Trwip. As imagens contidas neste website são aqui incorporadas apenas para fins de visualização, e, salvo autorização expressa por escrito, não podem ser gravadas ou baixadas via download. A reprodução ou armazenamento de materiais recuperados a partir deste serviço sujeitará os infratores às penas da lei.',
      completeTextPartFourteen: 'O nome do site (www.trwip.com), seu logotipo, o nome de domínio para acesso na Internet, bem como todos os elementos característicos da tecnologia desenvolvida e aqui apresentada, sob a forma da articulação de bases de dados, constituem marcas registradas e propriedades intelectuais privadas e todos os direitos decorrentes de seu registro são assegurados por lei. Alguns direitos de uso podem ser cedidos por Trwip em contrato ou licença especial, que pode ser cancelada a qualquer momento se não cumpridos os seus termos. As marcas registradas da Trwip só podem ser usadas publicamente com autorização expressa. O uso destas marcas registradas em publicidade e promoção de produtos deve ser adequadamente informado.',
      completeTextPartFitheen: 'A Trwip respeita a propriedade intelectual de outras pessoas ou empresas e solicitamos aos nossos membros que façam o mesmo. Toda e qualquer violação de direitos autorais deverá ser notificada a Trwip e acompanhada dos documentos e informações que confirmam a autoria. A notificação poderá ser enviada pelos e-mails constantes do site ou via postal para o seguinte endereço www.trwip.com',
      completeTextPartSixteen: 'Este site é controlado e operado pela Trwip a partir de seu escritório na cidade de Brasília, Distrito Federal, e não garante que o conteúdo ou materiais estejam disponíveis para uso em outras localidades. Seu acesso é proibido em territórios onde o conteúdo seja considerado ilegal. Aqueles que optarem por acessar este site a partir de outras localidades o farão por iniciativa própria e serão responsáveis pelo cumprimento das leis locais aplicáveis. Os materiais não deverão ser usados ou exportados em descumprimento das leis brasileiras sobre exportação. Qualquer pendência com relação aos materiais será dirimida pelas leis brasileiras.',
      completeTextFinalPart: 'O acesso ao site www.trwip.com representa a aceitação expressa e irrestrita dos termos de uso acima descritos.',
      completeTextUnderAge: 'É vedada a participação em qualquer trwip, bem como a criação desta, por menores de 18 anos sem a autorização dos pais.'
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
