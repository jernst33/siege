import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatButtonModule, MatFormFieldModule, MatInputModule, MatRadioModule, MatSelectModule, MatToolbarModule} from '@angular/material';
import {RegisterComponent} from './register/register.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AuthService} from './auth.service';
import {AngularFireAuth} from '@angular/fire/auth';
import {AngularFireModule} from '@angular/fire';
import {environment} from '../environments/environment.prod';
import {AngularFirestore} from '@angular/fire/firestore';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AddMatchComponent } from './add-match/add-match.component';
import {AttackerService} from './attacker.service';
import {DefenderService} from './defender.service';
import { AddRoundFormComponent } from './add-round-form/add-round-form.component';
import { SampleComponent } from './sample/sample.component';
import {FlexLayoutModule} from '@angular/flex-layout';
import { HomeComponent } from './home/home.component';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import { HeaderComponent } from './header/header.component';

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    DashboardComponent,
    AddMatchComponent,
    AddRoundFormComponent,
    SampleComponent,
    HomeComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatButtonModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    MatFormFieldModule,
    MatSelectModule,
    MatRadioModule,
    FormsModule,
    MatInputModule,
    FlexLayoutModule,
    HttpClientModule
  ],
  providers: [AuthService, AngularFireAuth, AngularFirestore, AttackerService, DefenderService],
  bootstrap: [AppComponent]
})
export class AppModule { }
