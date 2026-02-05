import { Routes } from '@angular/router';
import { Home } from './home/home';

export const routes: Routes = [
    { path: '', component: Home },
    {
        path: 'jewellery',
        loadComponent: () => import('./jewellery/jewellery.component').then(m => m.JewelleryComponent)
    },
    {
        path: 'dresses',
        loadComponent: () => import('./launching-soon/launching-soon.component').then(m => m.LaunchingSoonComponent)
    },
    {
        path: 'crafts',
        loadComponent: () => import('./launching-soon/launching-soon.component').then(m => m.LaunchingSoonComponent)
    },
    {
        path: 'cart',
        loadComponent: () => import('./cart/cart.component').then(m => m.CartComponent)
    },
    {
        path: 'checkout',
        loadComponent: () => import('./checkout/checkout.component').then(m => m.CheckoutComponent)
    },
    {
        path: 'admin',
        loadComponent: () => import('./admin/admin.component').then(m => m.AdminComponent)
    }
];
