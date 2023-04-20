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
import { HttpClientModule, HTTP_INTERCEPTORS  } from '@angular/common/http';
import { SignUpComponent } from './auth/sign-up/sign-up.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { LoginComponent } from './auth/login/login.component';
import { CcSystemComponent } from './main/cc-system/cc-system.component';
import { FiltersComponent } from './shop/componants/filters/filters.component';
import { ProductBoxComponent } from './shop/componants/product-box/product-box.component';
import { ProductsHeaderComponent } from './shop/componants/products-header/products-header.component';
import { HeaderComponent } from './shop/componants/header/header.component';
import { CartComponent } from './shop/componants/cart/cart.component';
import { HomeComponent } from './shop/componants/home.component';
import { NgChartsModule } from 'ng2-charts';
import { ChartsMajorElemsComponent } from './graphs/charts-major-elems/charts-major-elems.component';
import { ChartsMinorElemsOneComponent } from './graphs/charts-minor-elems-one/charts-minor-elems-one.component';
import { ChartsMinorElemsTwoComponent } from './graphs/charts-minor-elems-two/charts-minor-elems-two.component';
import { ChartsMinorElemsThreeComponent } from './graphs/charts-minor-elems-three/charts-minor-elems-three.component';
import { ChartsBigFourComponent } from './graphs/charts-big-four/charts-big-four.component';
import { ApiTesterComponent } from './api-tester/api-tester.component';
import { AuthInterceptor } from './shared/auth.interceptor';
import { CalculatorDialogComponent } from './elements/calculator-dialog/calculator-dialog.component';
import { ElementMeasurementsCrudComponent } from './graphs/element-measurement-rud/element-measurement-rud.component';
import { UpdateMeasurementDialogComponent } from './graphs/update-measurement-dialog/update-measurement-dialog.component';
import { UserPageComponent } from './auth/user-page/user-page.component';
import { UpdateDialogComponent } from './auth/update-dialog/update-dialog.component';
import { TestComponent } from './graphs/test/test.component';



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
    SignUpComponent,
    LoginComponent,
    CcSystemComponent,
    FiltersComponent,
    ProductBoxComponent,
    ProductsHeaderComponent,
    HeaderComponent,
    CartComponent,
    HomeComponent,

    ChartsMajorElemsComponent,
    ChartsMinorElemsOneComponent,
    ChartsMinorElemsTwoComponent,
    ChartsMinorElemsThreeComponent,
    ChartsBigFourComponent,
    ApiTesterComponent,
    CalculatorDialogComponent,
    ElementMeasurementsCrudComponent,
    UpdateMeasurementDialogComponent,
    UserPageComponent,
    UpdateDialogComponent,
    TestComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    MatDialogModule,
    FlexLayoutModule,
    HttpClientModule,
    NgChartsModule,
    HttpClientModule,
  ],
  providers: [

    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
  entryComponents: [
    UpdateMeasurementDialogComponent,
  ],
})
export class AppModule { }

