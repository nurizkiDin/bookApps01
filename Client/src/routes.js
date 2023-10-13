import React from 'react';

const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'));
const Bank = React.lazy(() => import('./views/bank/Bank'));
const Booking = React.lazy(() => import('./views/booking/Booking'));
const Category = React.lazy(() => import('./views/category/Category'));
const Item = React.lazy(() => import('./views/item/Index'));
const User = React.lazy(() => import('./views/user/User'));
const Customer = React.lazy(() => import('./views/customer/Customer'));
const ImageGallery = React.lazy(() => import('./views/item/ImageGallery'));

const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/admin/dashboard', name: 'Dashboard', component: Dashboard },
  { path: '/admin/bank', name: 'Bank', component: Bank },
  { path: '/admin/booking', name: 'Booking Order', component: Booking },
  { path: '/admin/category', name: 'Category', component: Category },
  { path: '/admin/item', name: 'Item', component: Item },
  { path: '/admin/user', name: 'User', component: User },
  { path: '/admin/customer', name: 'Customer', component: Customer },
  { path: '/admin/image/:id', name: 'Image Gallery', component: ImageGallery }
];

export default routes;
