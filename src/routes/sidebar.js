/** Icons are imported separatly to reduce build time */
import BellIcon from '@heroicons/react/24/outline/BellIcon'
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
import InboxArrowDownIcon from '@heroicons/react/24/outline/InboxArrowDownIcon'
import UsersIcon from '@heroicons/react/24/outline/UsersIcon'
import KeyIcon from '@heroicons/react/24/outline/KeyIcon'
import DocumentDuplicateIcon from '@heroicons/react/24/outline/DocumentDuplicateIcon'
import ShoppingBagIcon from '@heroicons/react/24/outline/ShoppingBagIcon'

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
    icon: <ShoppingBagIcon className={`${iconClasses} inline` }/>, 
    name: 'Sản phẩm',
    submenu : [
      {
        path: '/app/categories',
        icon: <ArrowRightOnRectangleIcon className={submenuIconClasses}/>,
        name: 'Danh mục sản phẩm',
      },
      {
        path: '/app/suppliers',
        icon: <ArrowRightOnRectangleIcon className={submenuIconClasses}/>,
        name: 'Nhà cung cấp',
      },
      {
        path: '/app/products',
        icon: <ArrowRightOnRectangleIcon className={submenuIconClasses}/>,
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
      {
        path: '/app/orders', 
        icon: <CurrencyDollarIcon className={iconClasses}/>, 
        name: 'Đơn hàng đã xử lí', 
      },
      {
        path: '/app/orders-not-yet-precessed', 
        icon: <CurrencyDollarIcon className={iconClasses}/>, 
        name: 'Đơn hàng chưa xử lí', 
      }
    ]
  },
  {
    path: '/app/charts', 
    icon: <ChartBarIcon className={iconClasses}/>, 
    name: 'Analytics', 
  },
  {
    path: '/app/integration', 
    icon: <BoltIcon className={iconClasses}/>, 
    name: 'Integration',
  },
  {
    path: '/app/calendar', 
    icon: <CalendarDaysIcon className={iconClasses}/>, 
    name: 'Calendar',
  },

  {
    path: '', //no url needed as this has submenu
    icon: <DocumentDuplicateIcon className={`${iconClasses} inline` }/>, 
    name: 'Pages',
    submenu : [
      {
        path: '/login',
        icon: <ArrowRightOnRectangleIcon className={submenuIconClasses}/>,
        name: 'Login',
      },
      {
        path: '/register', //url
        icon: <UserIcon className={submenuIconClasses}/>, 
        name: 'Register',
      },
      {
        path: '/forgot-password',
        icon: <KeyIcon className={submenuIconClasses}/>,
        name: 'Forgot Password',
      },
      {
        path: '/app/blank',
        icon: <DocumentIcon className={submenuIconClasses}/>,
        name: 'Blank Page',
      },
      {
        path: '/app/404',
        icon: <ExclamationTriangleIcon className={submenuIconClasses}/>,
        name: '404',
      },
    ]
  },
  {
    path: '', //no url needed as this has submenu
    icon: <Cog6ToothIcon className={`${iconClasses} inline` }/>, 
    name: 'Settings',
    submenu : [
      {
        path: '/app/settings-profile', //url
        icon: <UserIcon className={submenuIconClasses}/>, 
        name: 'Profile',
      },
      {
        path: '/app/settings-billing',
        icon: <WalletIcon className={submenuIconClasses}/>,
        name: 'Billing',
      },
      {
        path: '/app/settings-team', 
        icon: <UsersIcon className={submenuIconClasses}/>, 
        name: 'Team Members',
      },
    ]
  },
  {
    path: '', //no url needed as this has submenu
    icon: <DocumentTextIcon className={`${iconClasses} inline` }/>, 
    name: 'Documentation',
    submenu : [
      {
        path: '/app/getting-started', 
        icon: <DocumentTextIcon className={submenuIconClasses}/>, 
        name: 'Getting Started',
      },
      {
        path: '/app/features',
        icon: <TableCellsIcon className={submenuIconClasses}/>, 
        name: 'Features',
      },
      {
        path: '/app/components',
        icon: <CodeBracketSquareIcon className={submenuIconClasses}/>, 
        name: 'Components',
      }
    ]
  },
  
]

export default routes


