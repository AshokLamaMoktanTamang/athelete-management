import { ChildrenRouteElement, RouteType } from './type'

const type = RouteType.PUBLIC

export const authLayoutRoutes: ChildrenRouteElement[] = [
  {
    path: 'login',
    type,
    component: async () => {
      const { LoginPage } = await import('@pages/authPages/index')
      return LoginPage
    },
  },
  {
    path: 'signup',
    type,
    component: async () => {
      const { SignUpPage } = await import('@pages/authPages/index')
      return SignUpPage
    },
  },
]
