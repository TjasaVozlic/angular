import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { ForgotPasswordComponent } from './auth/forgot-password/forgot-password.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { FileuploadComponent } from './components/fileupload/fileupload.component';
import { HomeComponent } from './pages/home/home.component';
import { FrontPageComponent } from './pages/front-page/front-page.component';
import { authGuardGuard } from './guards/auth.guard';
import { BookingComponent } from './pages/booking/booking.component';

const routes: Routes = [ 
  {path: 'login', component: LoginComponent }, 
  {path : 'register', component: RegisterComponent},
  {path : 'forgot-password', component: ForgotPasswordComponent},
  {path : 'dashboard', component: DashboardComponent, canActivate: [authGuardGuard]},
  {path : 'file-upload', component: FileuploadComponent, canActivate: [authGuardGuard]},
  {path: 'home', component: HomeComponent},
  {path: 'front-page', component :FrontPageComponent},
  {path: 'booking', component: BookingComponent}


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
