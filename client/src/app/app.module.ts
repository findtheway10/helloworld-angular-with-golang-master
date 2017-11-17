import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';

import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireAuthModule } from 'angularfire2/auth';

import { AuthService } from './providers/auth/auth.service';
import { LoginService } from './providers/login/login.service';

import { AppComponent } from './app.component';
import { environment } from '../environments/environment';
import { NavComponent } from './nav/nav.component';
import { FooterComponent } from './footer/footer.component';
import { LoginComponent } from './login/login.component';
import { HomePageComponent } from './home-page/home-page.component';

const routes: Routes = [
  { path: 'home', component: HomePageComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    FooterComponent,
    LoginComponent,
    HomePageComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule, // imports firebase/firestore, only needed for database features
    AngularFireAuthModule, // imports firebase/auth, only needed for auth features
  ],
  providers: [
    AuthService,
    LoginService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
