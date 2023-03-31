import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MaterialModule } from './materials/materials.module'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BigFourComponent } from './elements/big-four/big-four.component';
import { MajorElemsComponent } from './Elements/major-elems/major-elems.component';
import { MinorElemsOneComponent } from './Elements/minor-elems-one/minor-elems-one.component';
import { MinorElemsTwoComponent } from './Elements/minor-elems-two/minor-elems-two.component';
import { MinorElemsThreeComponent } from './Elements/minor-elems-three/minor-elems-three.component';
import { LandingComponent } from './Elements/landing/landing.component';
import { NavbarComponent } from './navbar/navbar.component';
import { MatDialogModule } from '@angular/material/dialog';
import { GraphsComponent } from './graphs/graphs.component';
import { SignInComponent } from './auth/sign-in/sign-in.component';
import { SignUpComponent } from './auth/sign-up/sign-up.component';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  declarations: [
    AppComponent,
    BigFourComponent,
    MajorElemsComponent,
    MinorElemsOneComponent,
    MinorElemsTwoComponent,
    MinorElemsThreeComponent,
    LandingComponent,
    NavbarComponent,
    GraphsComponent,
    SignInComponent,
    SignUpComponent,
    // FlexLayoutModule
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    MatDialogModule,
    FlexLayoutModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
// export class MinorElemsOneModule { }
