import { Routes } from '@angular/router';
import { BlankLayoutComponent } from './layouts/blank-layout/blank-layout.component';
import { HomeComponent } from './Components/home/home.component';
import { CartComponent } from './Components/cart/cart.component';
import { ProductsComponent } from './Components/products/products.component';
import { BrandsComponent } from './Components/brands/brands.component';
import { CategoriesComponent } from './Components/categories/categories.component';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { LoginComponent } from './Components/login/login.component';
import { RegisterComponent } from './Components/register/register.component';
import { AuthGuard } from '../core/guard/auth.guard';
import { NotfoundComponent } from './Components/notfound/notfound.component';
import { DetalisComponent } from './Components/detalis/detalis.component';
// import { ProfailComponent } from './Components/profail/profail.component';
export const routes: Routes = [
  {// home
    path: '',
    component:  BlankLayoutComponent,
    canActivate: [AuthGuard],
    children: [
     
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'home', component: HomeComponent },
      // { path: 'profile', component: ProfailComponent },
      { path: 'cart', component: CartComponent },
      { path: 'products', component: ProductsComponent },
      {path:'products/:id',component:DetalisComponent},
      { path: 'brands', component: BrandsComponent },
      { path: 'category/:category', component: CategoriesComponent },

     
    ]
  },
  { // auth
    path: '',
    component: AuthLayoutComponent,
    children: [
      { path: 'login', component: LoginComponent },
      { path: 'register', component: RegisterComponent },
      
    ]
  },
  //not found
  { path: '**', component:NotfoundComponent}
];