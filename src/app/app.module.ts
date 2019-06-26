import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ApplicationFormComponent } from './views/application-page/application-form/application-form.component';
import { CustomInputComponent } from './views/application-page/application-form/custom-input/custom-input.component';
import { FooterComponent } from './views/footer/footer.component';
import { HeroComponent } from './views/application-page/hero/hero.component';
import { NavBarComponent } from './views/application-page/hero/nav-bar/nav-bar.component';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { RouterModule } from '@angular/router';
import { ApplicationPage } from './views/application-page/application-page.component';
import { AdminPage } from './views/admin-page/admin-page.component';
import { HeaderLogoComponent } from './views/header-logo/header-logo.component';
import { ApplicationEntryComponent } from './views/admin-page/application-entry/application-entry.component';

@NgModule({
  declarations: [
    AppComponent,
    ApplicationFormComponent,
    CustomInputComponent,
    FooterComponent,
    HeroComponent,
    NavBarComponent,
    ApplicationPage,
    AdminPage,
    HeaderLogoComponent,
    ApplicationEntryComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(AppRoutingModule.routes)
  ],
  providers: [ HttpClientModule ],
  bootstrap: [AppComponent]
})
export class AppModule { }
