import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { MatTooltipModule } from '@angular/material/tooltip';
import { LoginComponent } from './pages/login/login.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { GeneralHomepageComponent } from './pages/homepages/general-homepage/general-homepage.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { AttDashboardComponent } from './pages/dashboards/att-dashboard/att-dashboard.component';
import { FuelsalesComponent } from './pages/fuelsales/fuelsales.component';
import { ShopSalesComponent } from './pages/shopsales/shopsales.component';
import { AuthInterceptorService } from './services/auth-interceptor.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { BaseChartDirective } from 'ng2-charts';
import { WeeklyevaluationComponent } from './pages/weeklyevaluation/weeklyevaluation.component';
import { DailyregisterComponent } from './pages/dailyregister/dailyregister.component';
import { NgCircleProgressModule } from 'ng-circle-progress';
import { CapDashboardComponent } from './pages/dashboards/cap-dashboard/cap-dashboard.component';
import { LandingpageComponent } from './components/landingpage/landingpage.component';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NavbarComponent,
    GeneralHomepageComponent,
    SidebarComponent,
    AttDashboardComponent,
    FuelsalesComponent,
    ShopSalesComponent,
    WeeklyevaluationComponent,
    DailyregisterComponent,
    CapDashboardComponent,
    LandingpageComponent,
    
  
    
   
  ],
  imports: [
   BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,  // Required for forms
    CommonModule,
    FormsModule,
    MatTooltipModule,
    BaseChartDirective,
    NgCircleProgressModule.forRoot({
      // Default configuration options
      radius: 60,
      outerStrokeWidth: 2,
      innerStrokeWidth: 4,
      outerStrokeColor: '#78C000',
      innerStrokeColor: '#C7E596',
      animationDuration: 300,
      showSubtitle: false,
      showUnits: true,
      units: '%',
      startFromZero: false
    }),
    
   
  ],
  providers: [ { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorService, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }
