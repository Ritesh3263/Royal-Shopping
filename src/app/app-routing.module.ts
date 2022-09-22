import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginRedirect, EnsureAuthenticated } from './service/_guards';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },

  {
    path: 'login',
    loadChildren: () => import('./auth/login/login.module').then(m => m.LoginModule),
    canActivate: [LoginRedirect],
    data: { title: 'login' },
  },
  {
    path: 'forgot-password',
    loadChildren: () => import('./auth/forgot-password/forgot-password.module').then(m => m.ForgotPasswordModule),
    canActivate: [LoginRedirect],
    data: { title: 'forgot_password' },
  },
  {
    path: 'reset-password',
    loadChildren: () => import('./auth/reset-password/reset-password.module').then(m => m.ResetPasswordModule),
    canActivate: [LoginRedirect],
    data: { title: 'reset_password' },
  },
  {
    path: 'link-expired',
    loadChildren: () => import('./auth/message/message.module').then(m => m.MessageModule),
    canActivate: [LoginRedirect],
    data: { title: 'link_expired' },
  },
  {
    path: 'profile',
    loadChildren: () => import('./profile/profile.module').then(m => m.ProfileModule),
    data: { title: 'profile' },
    canActivate: [EnsureAuthenticated],
  },
  {
    path: 'change-password',
    loadChildren: () => import('./auth/change-password/change-password.module').then(m => m.ChangePasswordModule),
    data: { title: 'change_password' },
    canActivate: [EnsureAuthenticated],
  },
  {
    path: 'cart',
    loadChildren: () => import('./cart/cart.module').then(m => m.CartModule),
    canActivate: [EnsureAuthenticated],
    data: { title: 'cart' },
  },
  {
    path: 'wishlist',
    loadChildren: () => import('./wishlist/wishlist.module').then(m => m.WishlistModule),
    canActivate: [EnsureAuthenticated],
    data: { title: 'wishlist' },
  },
  {
    path: 'order',
    loadChildren: () => import('./order/order.module').then(m => m.OrderModule),
    canActivate: [EnsureAuthenticated],
    data: { title: 'order' },
  },
  {
    path: 'checkout',
    loadChildren: () => import('./checkout/checkout.module').then(m => m.CheckoutModule),
    canActivate: [EnsureAuthenticated],
    data: { title: 'checkout' },
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then(m => m.HomeModule),
    data: { title: 'Home', isShowSingleCarolus: true }
  },
  {
    path: 'shop-grid',
    loadChildren: () => import('./shop-grid/shop-grid.module').then(m => m.ShopGridModule),
    data: { title: 'Shop Grid', },
  },
  {
    path: 'offer',
    loadChildren: () => import('./blog/blog.module').then(m => m.BlogModule),
    data: { title: 'Blog' },
  },
  {
    path: 'brand',
    loadChildren: () => import('./portfolio/portfolio.module').then(m => m.PortfolioModule),
    data: { title: 'Brand', isShowMultiCarolus: true },
  },
  {
    path: 'contact',
    loadChildren: () => import('./contact/contact.module').then(m => m.ContactModule),
    data: { title: 'Contact' },
  },
  {
    path: 'about',
    loadChildren: () => import('./about/about.module').then(m => m.AboutModule),
    data: { title: 'About' },
  },
  {
    path: 'faq',
    loadChildren: () => import('./faq/faq.module').then(m => m.FaqModule),
    data: { title: 'Faq' },
  },
  {
    path: 'portfolio-details',
    loadChildren: () => import('./portfolio-details/portfolio-details.module').then(m => m.PortfolioDetailsModule),
  },
  {
    path: 'team',
    loadChildren: () => import('./team/team.module').then(m => m.TeamModule),
  },
  {
    path: 'blog-details',
    loadChildren: () => import('./blog-details/blog-details.module').then(m => m.BlogDetailsModule),
  },
  {
    path: 'error404',
    loadChildren: () => import('./error404/error404.module').then(m => m.Error404Module),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
