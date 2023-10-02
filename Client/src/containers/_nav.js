const _nav = [
  {
    _tag: 'CSidebarNavItem',
    name: 'Dashboard',
    to: '/admin/dashboard',
    icon: "cil-speedometer"
  },
  {
    _tag: 'CSidebarNavTitle',
    _children: ['Master Data']
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Category',
    to: '/admin/category',
    icon: "cil-tags"
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Item',
    to: '/admin/item',
    icon: "cil-tags"
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Bank',
    to: '/admin/bank',
    icon: "cib-cc-mastercard"
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Customer',
    to: '/admin/customer',
    icon: "cil-user"
  },
  {
    _tag: 'CSidebarNavTitle',
    _children: ['Booking']
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Booking Order',
    to: '/admin/booking',
    icon: "cil-bookmark"
  },
  {
    _tag: 'CSidebarNavTitle',
    _children: ['Setting']
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'User',
    to: '/admin/user',
    icon: "cil-user"
  }
]

export default _nav
