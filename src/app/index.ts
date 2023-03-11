import '@/styles/global.scss'
import '@/styles/vars.scss'
import '@/styles/reset.css'

import Router from './router'
import Nagivation from '@/pages/Navigation'
import Messanger from '@/pages/Messenger'
import ProfilePage from '@/pages/ProfilePage'
import SingInPage from '@/pages/SingInPage'
import SingUpPage from '@/pages/SingUpPage'
import NoFound from '@/pages/NoFound'
import ServerError from '@/pages/ServerError'

Router.use('/', Nagivation)
  .use('/messenger', Messanger)
  .use('/setting', ProfilePage)
  .use('/sing-in', SingInPage)
  .use('/sing-up', SingUpPage)
  .use('/no-found', NoFound)
  .use('/server-error', ServerError)
  .start()
