import Vue from 'vue'
import Router from 'vue-router'
import Main from '@/components/Main'
import Login from '@/components/user/Login'
import ForgotPassword from '@/components/user/ForgotPassword'
import RecoverPassword from '@/components/user/RecoverPassword'
import MyTrwips from '@/components/user/MyTrwips'
import TrwipPage from '@/components/TrwipPage'
import CreateTrwip from '@/components/CreateTrwip'
import HomePage from '@/components/HomePage'
import About from '@/components/About'
import Profile from '@/components/user/Profile'
import TermosOfUse from '@/components/general/TermsOfUse'
import Faq from '@/components/general/FAQ'
import SearchView from '@/components/SearchView'
import SignUp from '@/components/user/SignUp'
import UserProfile from '@/components/user/UserProfile'
import ChangePassword from '@/components/user/ChangePassword'
import NotificationPage from '@/components/NotificationPage'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      component: Main,
      children: [
        {
          path: '',
          redirect: to => {
            return '/trwip'
          }
        },
        { path: '/trwip', name: 'HomePage', component: HomePage },
        { path: '/trwip/:id', name: 'TrwipPage', component: TrwipPage, props: route => ({id: route.params.id}) },
        { path: '/trwip/:id/join', name: 'TrwipPage Joins', component: TrwipPage, props: route => ({id: route.params.id}) },
        { path: '/create_trwip', component: CreateTrwip },
        { path: '/me/trwips', component: MyTrwips },
        { path: '/profile', name: 'Profile', component: Profile },
        { path: '/profile/invite', name: 'Profile Invite', component: Profile },
        { path: '/profile/:id', name: 'User Profile', component: UserProfile, props: route => ({id: route.params.id}) },
        { path: '/sign_up', name: 'Sign Up', component: SignUp },
        { path: '/terms_of_use', component: TermosOfUse },
        { path: '/notifications', component: NotificationPage },
        { path: '/about', component: About },
        { path: '/faq', component: Faq },
        { path: '/search', component: SearchView, params: (route) => ({ searchFor: route.query.searchFor, type: route.query.type }) },
        { path: '/change_password', name: 'ChangePassword', component: ChangePassword }
      ]
    },
    { path: '/login', name: 'Login', component: Login },
    { path: '/forgot_password', name: 'ForgotPassword', component: ForgotPassword },
    { path: '/recover_password/:id', name: 'RecoverPassword', component: RecoverPassword, props: route => ({id: route.params.id}) }
  ]
})

router.beforeEach(function (to, from, next) {
  setTimeout(() => {
    window.document.querySelector('.mdl-layout__content').scrollTop = 0
  }, 2)
  next()
})

export default router
