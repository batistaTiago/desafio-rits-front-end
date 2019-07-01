import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { CustomInputComponent } from '../application-page/application-form/custom-input/custom-input.component';
import { AuthCredentials } from '../../shared/auth-credentials';
import { Router } from '@angular/router';
import { IUser } from '../../shared/user.interface';
import { IAuthToken } from '../../shared/auth-token.interface';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPage implements OnInit {
  
  @ViewChild('emailInput') emailInput: CustomInputComponent
  @ViewChild('passwordInput') passwordInput: CustomInputComponent
  
  public sendingData: boolean = false
  public showInvalidCredentialsFeedback: boolean = false
  
  constructor(private authService: AuthService, private router: Router) { }
  
  ngOnInit() {
    AuthCredentials.forgetData()
  }
  
  public async submitLogin(event: Event) {
    event.preventDefault()
    
    this.sendingData = true
    this.showInvalidCredentialsFeedback = false
    
    const result: IAuthToken = await this.authService.authenticate(this.emailInput.getValue(), this.passwordInput.getValue())
    if (result) {
      const userData = await this.authService.me()
      if (userData) {
        AuthCredentials.setUser(<IUser><unknown>userData)
      }
    }

    this.sendingData = false

    if (AuthCredentials.getUser()) {
      this.router.navigate(['/admin'])
    } else { 
      AuthCredentials.forgetData()
      this.showInvalidCredentialsFeedback = true
    }

  }
  
}
