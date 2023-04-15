import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ConnexionComponent } from './connexion/connexion.component';
import { NavbarComponent } from './navbar/navbar.component';
import { MedecinsComponent } from './medecins/medecins.component';
import { VisitesComponent } from './visites/visites.component';
import { RouterModule, Routes } from '@angular/router';
import { DataService } from './services/app.services.data';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


@NgModule({
  declarations: [
    AppComponent,
    ConnexionComponent,
    NavbarComponent,
    MedecinsComponent,
    VisitesComponent,
    
 
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    RouterModule,
    HttpClientModule,
    NgbModule

  ],
  providers: [DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }




