<template lang='pug'>
div#trwip-card.wrapper
  div.card.radius.shadowDepth1
    div(:style="{ background: 'url(' + trwipImage + ') center / cover'}").card__image.border-tlr-radius
      //- img.border-tlr-radius(:src='trwipImage', alt='image')
    div.card__content.card__padding
      know-more(:trwipId='trwip.id').know-more
      //- div.card__share
      //-   //- know-more(v-if='shouldShow && !isFromProfile', @click='onClick', :trwipId='trwip.id')
      //- div.card__meta
      article.card__article
        h5
          a(@click='goTrwip')
            b {{trwip.title}}
          div.dateField
            p.date {{ getDateFormated(trwip.startDate) }}
            p.date {{ ' ' + 'a' + ' ' }}
            p.date {{ getDateFormated(trwip.endDate) }}
          p.no-margin País: {{ trwip.country }}
        p.trwip-description {{ trwipDescription }}
    div.card__action
      div.card__author
        vue-gravatar(v-if='!user.pathToProfilePic && isUserLoaded', :email='user.email', :size='30', default-img='identicon')
        img(v-else='', :src='userImage', alt='user').profileimage
        div.card__author-content
          h6
            | Por
            a.card__user(:href='profileUrl' v-if='user.name') {{' ' + user.name.split(' ')[0]}}
</template>

<script>
import gravatar from 'vue-gravatar'
import KnowMore from './KnowMore'
import * as actionTypes from '@/store/actionTypes'
import util from '@/helpers/util'
import moment from 'moment'

export default {
  name: 'trwip-card',
  props: {
    trwip: {
      type: Object
    },
    isFromProfile: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    trwipDescription () {
      if (this.trwip.description.length <= 240) {
        return this.trwip.description
      } else {
        return this.trwip.description.substring(0, 240) + '...'
      }
    },
    shouldShow () {
      let isMember = false
      if (this.trwip.members) {
        this.trwip.members.forEach((member) => {
          if (member.id === window.localStorage.getItem('id')) {
            isMember = true
          }
        })
      }
      let isJoin = false
      if (this.trwip.joiners) {
        this.trwip.joiners.forEach((joiner) => {
          if (joiner.id === window.localStorage.getItem('id')) {
            isJoin = true
          }
        })
      }
      let isCreator = this.trwip.creatorId === window.localStorage.getItem('id')
      return !(isCreator || isJoin || isMember)
    },
    userImage () {
      if (this.user) {
        if (this.user.pathToProfilePic) {
          // return 'http://localhost:3000/' + this.user.pathToProfilePic
          return '/' + this.user.pathToProfilePic
        } else {
          return ''
        }
      } else {
        return ''
      }
    },
    trwipImage () {
      // return 'http://localhost:3000/' + this.trwip.image
      return '/' + this.trwip.image
    },
    profileUrl () {
      return '/profile/' + this.user.id
    },
    trwipUrl () {
      return '/trwip/' + this.trwip.id
    }
  },
  data () {
    return {
      user: {},
      isUserLoaded: false
    }
  },
  components: {
    KnowMore,
    'vue-gravatar': gravatar
  },
  methods: {
    getDateFormated (date) {
      return moment(date).format('L')
    },
    goTrwip () {
      this.$router.push(this.trwipUrl)
    },
    onClick () {
      if (this.$store.getters.authenticated) {
        if (this.$store.getters.user.id === this.user.id) {
          util.showSnackbar('Você não pode entrar na própria trwip')
        } else {
          if (this.$store.getters.user.join_trwips.indexOf(this.trwip) > -1) {
            util.showSnackbar('Você já solicitou o join nessa trwip')
          } else {
            console.log(2)
            this.joinTrwip()
          }
        }
      } else {
        util.showSnackbar('Você precisa estar logado para entrar em uma trwip')
        this.$router.push('/login')
      }
    },
    async joinTrwip () {
      try {
        let {data} = await this.$store.dispatch(actionTypes.JOIN_TRWIP, {userId: this.$store.getters.user.id, trwipId: this.trwip.id})
        await this.$store.dispatch(actionTypes.CHECK_IF_LOGGED)
        await util.showSnackbar('Join trwip enviado com sucesso')
        this.$router.push('/trwip/' + this.trwip.id)
        return data
      } catch (err) {
        console.log(err)
      }
    }
  },
  async mounted () {
    try {
      let {data} = await this.$store.dispatch(actionTypes.RETRIEVE_USER, this.trwip.creatorId)
      this.user = data
      this.isUserLoaded = true
    } catch (err) {
      console.log(err)
    }
  }
}
</script>

<style>
.card__user{
  color: #313E47;
	text-decoration: none;
}

	.card__author img,
	.card__author-content {
		display: inline-block;
		vertical-align: middle;
	}

	.card__author img{
		border-radius: 50%;
		margin-right: 0.6em;
	}

</style>

<style scoped>
.date {
  color: #2B3B8F;
  font-weight: bold;
  padding: 0 3px;
}

.card__article h5 {
}

.card__article {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  height: 100%;
  padding: 20px 0;
}

.trwip-description {
  word-break: break-all;
}

.wrapper {

	color: #666;
  line-height: 0.8;
	margin-bottom: 1.6rem;
	max-width: 370px;
	margin: 30px auto;
	padding-left: 1em;
	padding-right: 1em;
}

@media (max-width: 380px) {
  .wrapper {
    max-width: 300px;
  }
}

.border-tlr-radius {
	border-top-left-radius: 2px;
	border-top-right-radius: 2px;
}

.text-center { text-align: center; }

.radius { border-radius: 2px; }

.padding-tb { padding-top: 0; padding-bottom: 1.6rem;}

.shadowDepth0 { box-shadow: 0 1px 3px rgba(0,0,0, 0.12); }

.shadowDepth1 {
   box-shadow:
  		0 1px 3px rgba(0,0,0, 0.12),
    	0 1px 2px rgba(0,0,0, 0.24);
}

.card {
  height: 550px;
	background-color: #fff;
	margin-bottom: 1.6rem;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
}

.card__padding {
	padding: 1.6rem;
}

.card__image {
  display: flex;
  align-items: flex-end;
  justify-content: flex-end;
	min-height: 130px;
	background-color: #eee;
}
	.card__image img {
		width: 100%;
		max-width: 100%;
		display: block;
	}

.card__content {
	position: relative;
  overflow: hidden;
  height: 100%;
}

/* card meta */
.card__meta {
	padding-top: 30px;
}
.card__meta time {
	font-size: 1.3rem;
	color: #bbb;
	margin-left: 0.8rem;
	vertical-align: middle;
}
.card__style {
   	color: #2E3091;
}
/* card article */
a {
	text-decoration: none;
	color: #444;
	transition: all 0.5s ease;
	text-align: left;
}
a:hover {
  cursor: pointer;
	color: #2980b9;
}

/* card action */
.card__action {
	background-color: #f4f4f4;
  height: auto;
}

.card__author {
  padding: 10px;
}

	/* .card__author img,
	.card__author-content {
		display: inline-block;
		vertical-align: middle;
	} */

	.card__author img{
		border-radius: 50%;
		margin-right: 0.6em;
	}

.profileimage {
  width: 30px;
  height: 30px;
}

.card__share {
  display: flex;
  align-items: flex-end;
  justify-content: flex-end;
	/*float: right;*/
	/*margin-top: auto;*/
  /*position: absolute;
  top: -40px;
  right: 20px;*/
}

.card__social {
	position: absolute;
	top: 0;
	right: 0;
	visibility: hidden;
	width: 160px;
	transform: translateZ(0);
  	transform: translateX(0px);
  	transition: transform 0.35s ease;
}
	.card__social--active {
		visibility: visible;
		/*z-index: 3;*/
		transform: translateZ(0);
 		transform: translateX(-48px);
  		transition: transform 0.35s ease;
	}

.share-toggle {
	z-index: 2;
}
.share-toggle:before {
	content: "\f1e0";
	font-family: 'FontAwesome';
	color: #3498db;
}
	.share-toggle.share-expanded:before {
		content: "\f00d";
	}

.share-icon {
	display: inline-block;
	width: 48px;
	height: 48px;
	line-height: 48px;
	text-align: center;
	border-radius: 50%;
	background-color: #fff;
	transition: all 0.3s ease;
	outline: 0;

	box-shadow:
	  		0 2px 4px rgba(0,0,0, 0.12),
	    	0 2px 4px rgba(0,0,0, 0.24);
}
	.share-icon:hover,
	.share-icon:focus {
		box-shadow:
	  		0 3px 6px rgba(0,0,0, 0.12),
	    	0 3px 6px rgba(0,0,0, 0.24);

	    -webkit-transform: scale(1.2);
	    -moz-transform: scale(1.2);
	    -ms-transform: scale(1.2);
	    -o-transform: scale(1.2);
	    transform: scale(1.2);
	}

.facebook {
	background-color: #3b5998;
}
.twitter {
	background-color: #00abe3;
}
.googleplus {
	background-color: #d3492c;
}
.dateField {
  padding: 12px 0;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
}
</style>
