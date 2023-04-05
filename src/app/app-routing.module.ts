import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { SignUpComponent } from './auth/sign-up/sign-up.component';
import { GraphsComponent } from './graphs/graphs.component';
import { LandingComponent } from './Elements/landing/landing.component';
import { CcSystemComponent } from './main/cc-system/cc-system.component';
import { HomeComponent } from './shop/componants/home.component';
import { CartComponent } from './shop/componants/cart/cart.component';

const routes: Routes = [

  { path: 'landing', component: LandingComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignUpComponent },
  { path: 'graphs', component: GraphsComponent },
  { path: 'system', component: CcSystemComponent },


  { path: 'store', component: HomeComponent },
  { path: 'cart', component: CartComponent },

  { path: '', redirectTo: '/landing', pathMatch: 'full' },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
