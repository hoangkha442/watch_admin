/** Icons are imported separatly to reduce build time */
import DocumentTextIcon from '@heroicons/react/24/outline/DocumentTextIcon'
import Squares2X2Icon from '@heroicons/react/24/outline/Squares2X2Icon'
import TableCellsIcon from '@heroicons/react/24/outline/TableCellsIcon'
import WalletIcon from '@heroicons/react/24/outline/WalletIcon'
import CodeBracketSquareIcon from '@heroicons/react/24/outline/CodeBracketSquareIcon'
import DocumentIcon from '@heroicons/react/24/outline/DocumentIcon'
import ExclamationTriangleIcon from '@heroicons/react/24/outline/ExclamationTriangleIcon'
import CalendarDaysIcon from '@heroicons/react/24/outline/CalendarDaysIcon'
import ArrowRightOnRectangleIcon from '@heroicons/react/24/outline/ArrowRightOnRectangleIcon'
import UserIcon from '@heroicons/react/24/outline/UserIcon'
import Cog6ToothIcon from '@heroicons/react/24/outline/Cog6ToothIcon'
import BoltIcon from '@heroicons/react/24/outline/BoltIcon'
import ChartBarIcon from '@heroicons/react/24/outline/ChartBarIcon'
import CurrencyDollarIcon from '@heroicons/react/24/outline/CurrencyDollarIcon'
import UsersIcon from '@heroicons/react/24/outline/UsersIcon'
import KeyIcon from '@heroicons/react/24/outline/KeyIcon'
import DocumentDuplicateIcon from '@heroicons/react/24/outline/DocumentDuplicateIcon'
import ShoppingBagIcon from '@heroicons/react/24/outline/ShoppingBagIcon'
import { XCircleIcon, TruckIcon, CheckCircleIcon, ClockIcon, CubeIcon, UserGroupIcon, FolderIcon } from '@heroicons/react/24/outline';


const iconClasses = `h-6 w-6`
const submenuIconClasses = `h-5 w-5`  

const routes = [

  {
    path: '/app/dashboard',
    icon: <Squares2X2Icon className={iconClasses}/>, 
    name: 'Dashboard',
  },
  {
    path: '/app/users', 
    icon: <UsersIcon className={iconClasses}/>, 
    name: 'Người dùng',
  },
  {
    path: '', //no url needed as this has submenu
    icon: <CubeIcon className={`${iconClasses} inline` }/>, 
    name: 'Sản phẩm',
    submenu : [
      {
        path: '/app/categories',
        icon: <FolderIcon  className={submenuIconClasses}/>,
        name: 'Danh mục sản phẩm',
      },
      {
        path: '/app/suppliers',
        icon: <TruckIcon className={submenuIconClasses}/>,
        name: 'Nhà cung cấp',
      },
      {
        path: '/app/products',
        icon: <UserGroupIcon  className={submenuIconClasses}/>,
        name: 'Quản lý sản phẩm',
      },
      
    ]
  },
  {
    path: '/app/transactions', 
    icon: <CurrencyDollarIcon className={iconClasses}/>, 
    name: 'Giao dịch',
  },
  {
    path: '', 
    icon: <ShoppingBagIcon className={`${iconClasses} inline` }/>, 
    name: 'Quản lí đơn hàng', 
    submenu : [
      // order-shipped
      {
        path: '/app/orders', 
        icon: <CheckCircleIcon  className={iconClasses}/>, 
        name: 'Đơn hàng đã giao', 
      },
      {
        path: '/app/order-shipped', 
        icon: <TruckIcon  className={iconClasses}/>, 
        name: 'Đơn hàng đã vận chuyển', 
      },
      {
        path: '/app/order-canceled', 
        icon: <XCircleIcon  className={iconClasses}/>, 
        name: 'Đơn hàng đã hủy', 
      },
      {
        path: '/app/orders-not-yet-precessed', 
        icon: <ClockIcon  className={iconClasses}/>, 
        name: 'Đơn hàng chưa xử lí', 
      }
    ]
  },
  // {
  //   path: '/app/charts', 
  //   icon: <ChartBarIcon className={iconClasses}/>, 
  //   name: 'Analytics', 
  // },
  // {
  //   path: '/app/integration', 
  //   icon: <BoltIcon className={iconClasses}/>, 
  //   name: 'Integration',
  // },
  // {
  //   path: '/app/calendar', 
  //   icon: <CalendarDaysIcon className={iconClasses}/>, 
  //   name: 'Calendar',
  // },

  {
    path: '', //no url needed as this has submenu
    icon: <DocumentDuplicateIcon className={`${iconClasses} inline` }/>, 
    name: 'Giao diện người dùng',
    submenu : [
      {
        path: '/app/header-ui',
        icon: <ArrowRightOnRectangleIcon className={submenuIconClasses}/>,
        name: 'Header',
      },
      // {
      //   path: '/register', //url
      //   icon: <UserIcon className={submenuIconClasses}/>, 
      //   name: 'Register',
      // },
      // {
      //   path: '/forgot-password',
      //   icon: <KeyIcon className={submenuIconClasses}/>,
      //   name: 'Forgot Password',
      // },
      // {
      //   path: '/app/blank',
      //   icon: <DocumentIcon className={submenuIconClasses}/>,
      //   name: 'Blank Page',
      // },
      // {
      //   path: '/app/404',
      //   icon: <ExclamationTriangleIcon className={submenuIconClasses}/>,
      //   name: '404',
      // },
    ]
  },
  {
    path: '', //no url needed as this has submenu
    icon: <Cog6ToothIcon className={`${iconClasses} inline` }/>, 
    name: 'Cài đặt',
    submenu : [
      {
        path: '/app/settings-profile', //url
        icon: <UserIcon className={submenuIconClasses}/>, 
        name: 'Hồ sơ',
      },
      // {
      //   path: '/app/settings-billing',
      //   icon: <WalletIcon className={submenuIconClasses}/>,
      //   name: 'Billing',
      // },
      {
        path: '/app/settings-team', 
        icon: <UsersIcon className={submenuIconClasses}/>, 
        name: 'Quản trị viên',
      },
    ]
  },
  // {
  //   path: '', //no url needed as this has submenu
  //   icon: <DocumentTextIcon className={`${iconClasses} inline` }/>, 
  //   name: 'Documentation',
  //   submenu : [
  //     {
  //       path: '/app/getting-started', 
  //       icon: <DocumentTextIcon className={submenuIconClasses}/>, 
  //       name: 'Getting Started',
  //     },
  //     {
  //       path: '/app/features',
  //       icon: <TableCellsIcon className={submenuIconClasses}/>, 
  //       name: 'Features',
  //     },
  //     {
  //       path: '/app/components',
  //       icon: <CodeBracketSquareIcon className={submenuIconClasses}/>, 
  //       name: 'Components',
  //     }
  //   ]
  // },
  
]

export default routes


