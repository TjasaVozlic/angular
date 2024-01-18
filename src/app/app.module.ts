import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CreateServiceComponent } from './serviceProviders/create-service/create-service.component';
import { ServiceCardComponent } from './serviceProviders/service-card/service-card.component';
import { LoginComponent } from './auth/login/login.component';
import { FormsModule } from '@angular/forms';


import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { RegisterComponent } from './auth/register/register.component';
import { ForgotPasswordComponent } from './auth/forgot-password/forgot-password.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { HomeComponent } from './pages/home/home.component';
import { FileuploadComponent } from './components/fileupload/fileupload.component';
import { AuthService } from './services/auth.service';
import { Auth } from '@angular/fire/auth';
import { UserDataService } from './services/user-data.service';
import { ServiceDataService } from './services/service-data.service';
import { FrontPageComponent } from './pages/front-page/front-page.component';
import { authGuardGuard } from './guards/auth.guard';

import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule } from '@angular/material/core';
import { BookingComponent } from './pages/booking/booking.component';




@NgModule({
  declarations: [
    AppComponent,
    CreateServiceComponent,
    ServiceCardComponent,
    LoginComponent,
    RegisterComponent,
    ForgotPasswordComponent,
    DashboardComponent,
    HomeComponent,
    FileuploadComponent,
    FrontPageComponent,
    BookingComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    AngularFireModule.initializeApp({
      apiKey: "AIzaSyDm48Y3wtLVQFlQ_zwEU5t6a98mxVn2L4s",
      authDomain: "wookbook-94ab2.firebaseapp.com",
      projectId: "wookbook-94ab2",
      storageBucket: "wookbook-94ab2.appspot.com",
      messagingSenderId: "414139426737",
      appId: "1:414139426737:web:92fa82ad3a08f6a3bdff90",
      measurementId: "G-T1HX0FHYH9"
    }),
    AngularFireAuthModule,
    BrowserAnimationsModule,
    MatDatepickerModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatNativeDateModule,

  ],
  providers: [
    provideClientHydration(), AuthService, UserDataService, ServiceDataService,
    authGuardGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { 
 
}
