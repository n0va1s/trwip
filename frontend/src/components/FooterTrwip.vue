<template lang="pug">
  div#footer-component
    footer.android-footer.mdl-mega-footer
      div.mdl-mega-footer--top-section
        div.mdl-mega-footer--left-section
          a(target='_blank', href='http://www.instagram.com/trwip_oficial')
            button.mdl-mini-footer--social-btn.social-btn.social-btn__insta.mdl-mega-footer--social-btn
              span.visuallyhidden Instagram
          a(target='_blank', href='https://www.facebook.com/trwip')
            button.mdl-mini-footer--social-btn.social-btn.social-btn__face.mdl-mega-footer--social-btn
              span.visuallyhidden Facebook
          a(target='_blank', href='https://www.linkedin.com/in/trwip-oficial-7bb307143/')
            button.mdl-mini-footer--social-btn.social-btn.social-btn__linked.mdl-mega-footer--social-btn
              span.visuallyhidden LinkedIn
      div.mdl-mega-footer--middle-section
        p.mdl-typography--font-light Trwip - Traveling With People © 2018 Todos os direitos Reservados
        p.mdl-typography--font-light Viajando em boa companhia
        p.mdl-typography--font-light Fale Conosco através do
          a(href='mailto:trwipdados@gmail.com').link trwipdados@gmail.com
      div.mdl-mega-footer--bottom-section
        a.android-link.mdl-typography--font-light(@click='goToAbout', href='') Sobre nós
        a.android-link.mdl-typography--font-light(@click='goToFaq', href='') FAQ
        a.android-link.mdl-typography--font-light(@click='goToTerms', href='') Termos de Uso
</template>

<script>
export default {
  name: 'footer-component',
  components: {
  },
  data () {
    return { }
  },
  methods: {
    goToTerms () {
      this.$router.push('/terms_of_use')
    },
    goToFaq () {
      this.$router.push('/faq')
    },
    goToAbout () {
      this.$router.push('/about')
    }
  }
}
</script>

<style scoped>
.link {
  padding-left: 5px;
}
.social-btn {
  background-position: center;
  background-size: contain;
  background-repeat: no-repeat;
  background-color: transparent;
  margin: 0 16px;
  width: 24px;
  height: 24px;
  cursor: pointer;
  opacity: 0.46;
  border-radius: 2px;
}

.social-btn__insta {
  background-image: url('https://www.gstatic.com/images/icons/material/system/2x/post_instagram_black_24dp.png');
}
.social-btn__linked {
  background-image: url('https://www.gstatic.com/images/icons/material/system/2x/post_linkedin_black_24dp.png');
}

.social-btn__face {
  background-image: url('https://www.gstatic.com/images/icons/material/system/2x/post_facebook_black_24dp.png');
}
/*  Footer */
.android-link {
  font-size: 1.2rem;
  text-decoration: none;
  color: #2A3B8F !important;
}
  .android-link:hover {
    color: #89D5EB !important;
  }
.android-card-container {
}
  .android-card-container .mdl-card__media {
    overflow: hidden;
    background: transparent;
  }
   .android-card-container .mdl-card__media img {
      width: 100%;
    }

  .android-card-container .mdl-card__title {
    background: transparent;
    height: auto;
  }

  .android-card-container .mdl-card__title-text {
    color: black;
    height: auto;
  }

  .android-card-container .mdl-card__supporting-text {
    height: auto;
    color: black;
    padding-bottom: 56px;
  }

  .android-card-container .mdl-card__actions {
    position: absolute;
    bottom: 0;
  }

  .android-card-container .mdl-card__actions a {
    border-top: none;
    font-size: 16px;
  }

.android-footer {
  background-color: #fafafa;
  position: relative;
}

  .android-footer a:hover {
    color: #2A3B8F;
  }

  .android-footer .mdl-mega-footer--top-section::after {
    border-bottom: none;
  }

  .android-footer .mdl-mega-footer--middle-section::after {
    border-bottom: none;
  }

  .android-footer .mdl-mega-footer--bottom-section {
    position: relative;
  }

  .android-footer .mdl-mega-footer--bottom-section a {
    margin-right: 2em;
  }

  .android-footer .mdl-mega-footer--right-section a .material-icons {
    position: relative;
    top: 6px;
  }

.android-link-menu:hover {
  cursor: pointer;
}
@media (max-width: 900px) {
  .android-navigation-container {
    display: none;
  }
  .android-title {
    display: none !important;
  }
  .android-mobile-title {
    display: block !important;
    position: absolute;
    left: calc(50% - 70px);
    top: 12px;
    transition: opacity 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  }
  .android.android-search-box.is-focused ~ .android-mobile-title,
  .android-search-box.is-focused + .android-navigation-container + .android-mobile-title {
    opacity: 0;
  }

  .android-more-button {
    display: none;
  }

  .android-search-box.is-focused {
    width: calc(100% - 48px);
  }

  .android-search-box .mdl-textfield__expandable-holder {
    width: 100%;
  }

  .android-footer .mdl-mega-footer--bottom-section {
  }
}
</style>
