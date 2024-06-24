// All components mapping with path for internal routes

import { lazy } from 'react'

const Dashboard = lazy(() => import('../pages/protected/Dashboard'))
const Welcome = lazy(() => import('../pages/protected/Welcome'))
const Page404 = lazy(() => import('../pages/protected/404'))
const Blank = lazy(() => import('../pages/protected/Blank'))
const Charts = lazy(() => import('../pages/protected/Charts'))
const Leads = lazy(() => import('../pages/protected/Leads'))
const Users = lazy(() => import('../pages/protected/Users'))
const Integration = lazy(() => import('../pages/protected/Integration'))
const Calendar = lazy(() => import('../pages/protected/Calendar'))
const Team = lazy(() => import('../pages/protected/Team'))
const Transactions = lazy(() => import('../pages/protected/Transactions'))
const Bills = lazy(() => import('../pages/protected/Bills'))
const ProfileSettings = lazy(() => import('../pages/protected/ProfileSettings'))
const GettingStarted = lazy(() => import('../pages/GettingStarted'))
const DocFeatures = lazy(() => import('../pages/DocFeatures'))
const DocComponents = lazy(() => import('../pages/DocComponents'))
const Products = lazy(() => import('../pages/protected/Products'))
const Categories = lazy(() => import('../pages/protected/Categories'))
const Suppliers = lazy(() => import('../pages/protected/Suppliers'))
const Orders = lazy(() => import('../pages/protected/Orders'))
const OrderShipped = lazy(() => import('../pages/protected/OrderShipped'))
const OrderCanceled = lazy(() => import('../pages/protected/OrderCanceled'))
const HeaderUI = lazy(() => import('../pages/protected/HeaderUI'))
// OrderCanceled
// OrderShipped
const OrdersNotYetProcessed = lazy(() => import('../pages/protected/OrdersNotYetProcessed'))
const routes = [
  {
    path: '/dashboard', // the url
    component: Dashboard, // view rendered
  },
  {
    path: '/welcome', // the url
    component: Welcome, // view rendered
  },
  {
    path: '/users',
    component: Users,
  },
  {
    path: '/products',
    component: Products,
  },
  {
    path: '/categories',
    component: Categories,
  },
  {
    path: '/suppliers',
    component: Suppliers
  },
  {
    path: '/settings-team',
    component: Team,
  },
  {
    path: '/calendar',
    component: Calendar,
  },
  {
    path: '/transactions',
    component: Transactions,
  },
  {
    path: '/orders',
    component: Orders,
  },
  {
    path: '/order-shipped',
    component: OrderShipped,
  },
  {
    path: '/order-canceled',
    component: OrderCanceled,
  },
  {
    path: '/orders-not-yet-precessed',
    component: OrdersNotYetProcessed,
  },
  {
    path: '/settings-profile',
    component: ProfileSettings,
  },
  {
    path: '/settings-billing',
    component: Bills,
  },
  {
    path: '/getting-started',
    component: GettingStarted,
  },
  {
    path: '/features',
    component: DocFeatures,
  },
  {
    path: '/components',
    component: DocComponents,
  },
  {
    path: '/integration',
    component: Integration,
  },
  {
    path: '/charts',
    component: Charts,
  },
  {
    path: '/404',
    component: Page404,
  },
  {
    path: '/blank',
    component: Blank,
  },
  {
    path: '/header-ui',
    component: HeaderUI,
  },
]

export default routes
