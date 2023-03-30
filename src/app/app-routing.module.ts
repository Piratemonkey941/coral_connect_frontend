import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignInComponent } from './auth/sign-in/sign-in.component';
import { SignUpComponent } from './auth/sign-up/sign-up.component';
import { GraphsComponent } from './graphs/graphs.component';

const routes: Routes = [

  { path: 'signin', component: SignUpComponent },
  { path: 'signup', component: SignInComponent },
  { path: 'graphs', component: GraphsComponent },
  { path: '', redirectTo: '/signup', pathMatch: 'full' },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
