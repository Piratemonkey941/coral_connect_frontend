import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { SignUpComponent } from './auth/sign-up/sign-up.component';
import { GraphsComponent } from './graphs/graphs.component';
import { LandingComponent } from './Elements/landing/landing.component';
import { CcSystemComponent } from './main/cc-system/cc-system.component';
import { ElementMeasurementsCrudComponent } from './graphs/element-measurement-rud/element-measurement-rud.component';
import { HomeComponent } from './shop/componants/home.component';
import { CartComponent } from './shop/componants/cart/cart.component';
import { UserPageComponent } from './auth/user-page/user-page.component';
import { AuthGuardService } from './shared/auth.guard';

const routes: Routes = [

  { path: 'landing', component: LandingComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignUpComponent },
  { path: 'system', component: CcSystemComponent },
  {    path: 'graphs',
    component: GraphsComponent,
    // canActivate: [AuthGuard]
  },
  { path: 'user', component: UserPageComponent, canActivate: [AuthGuardService] },
  { path: 'measurements', component: ElementMeasurementsCrudComponent },

  { path: 'store', component: HomeComponent },
  { path: 'cart', component: CartComponent },

  { path: '', redirectTo: '/landing', pathMatch: 'full' },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
