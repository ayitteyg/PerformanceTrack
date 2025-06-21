import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { GeneralHomepageComponent } from './pages/homepages/general-homepage/general-homepage.component';
import { AttDashboardComponent } from './pages/dashboards/att-dashboard/att-dashboard.component';
import { FuelsalesComponent } from './pages/fuelsales/fuelsales.component';
import { ShopSalesComponent } from './pages/shopsales/shopsales.component';
import { WeeklyevaluationComponent } from './pages/weeklyevaluation/weeklyevaluation.component';
import { DailyregisterComponent } from './pages/dailyregister/dailyregister.component';
import { CapDashboardComponent } from './pages/dashboards/cap-dashboard/cap-dashboard.component';
import { LandingpageComponent } from './components/landingpage/landingpage.component';


const routes: Routes = [
   { path:'', component:LoginComponent },
   { path:'login', component:LoginComponent },
   { path:'general-homepage', component:GeneralHomepageComponent},
   { path:'att-dashboard', component:AttDashboardComponent},
   { path:'fuelsales', component:FuelsalesComponent},
   { path:'shopsales', component:ShopSalesComponent},
   { path:'weekly-evaluation', component:WeeklyevaluationComponent},
   { path:'daily-register', component:DailyregisterComponent},
   { path:'cap-dashboard', component:CapDashboardComponent},
   { path:'coverpage', component:LandingpageComponent},

   
  
  {path: '**',   component:GeneralHomepageComponent },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
