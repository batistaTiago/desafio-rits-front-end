import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ApplicationPage } from "./views/application-page/application-page.component"
import { AdminPage } from "./views/admin-page/admin-page.component"
import { AuthService } from './services/auth.service'
import { LoginPage } from './views/login-page/login-page.component';


const routes: Routes = [];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
  public static routes: Routes = [
    { path: '', component: ApplicationPage },
    { path: 'login', component: LoginPage },
    { path: 'admin', component: AdminPage, canActivate: [ AuthService ] }
  ]
 }
