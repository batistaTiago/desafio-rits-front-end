import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { CustomInputComponent } from '../application-page/application-form/custom-input/custom-input.component';
import { IAuthToken } from '../../shared/auth-token';
import { Router } from '@angular/router';

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
  }

  private rememberUser: boolean = false

  public async submitLogin(event: Event) {
    event.preventDefault()

    this.sendingData = true
    this.showInvalidCredentialsFeedback = false
    
    const result: IAuthToken = await this.authService.authenticate(this.emailInput.getValue(), this.passwordInput.getValue())
    if (result) {
      if (this.rememberUser) {
        localStorage.setItem('token', result.token)
        localStorage.setItem('tokenType', result.tokenType)
        localStorage.setItem('tokenDuration', String(result.tokenDuration))
      } else {
        sessionStorage.setItem('token', result.token)
        sessionStorage.setItem('tokenType', result.tokenType)
        sessionStorage.setItem('tokenDuration', String(result.tokenDuration))
      }
      this.router.navigate(['/admin'])
    } else {
      localStorage.clear()
      sessionStorage.clear()
      this.showInvalidCredentialsFeedback = true
    }

    this.sendingData = false

  }

}
