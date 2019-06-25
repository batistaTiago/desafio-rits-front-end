import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ApplicationFormComponent } from './views/application-form/application-form.component';
import { CustomInputComponent } from './views/application-form/custom-input/custom-input.component';
import { FooterComponent } from './views/footer/footer.component';
import { HeroComponent } from './views/hero/hero.component';
import { NavBarComponent } from './views/hero/nav-bar/nav-bar.component';

@NgModule({
  declarations: [
    AppComponent,
    ApplicationFormComponent,
    CustomInputComponent,
    FooterComponent,
    HeroComponent,
    NavBarComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
