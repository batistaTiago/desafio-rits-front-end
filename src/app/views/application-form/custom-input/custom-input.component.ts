import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { FormValidator } from '../../../shared/form-validator';

@Component({
  selector: 'app-custom-input',
  templateUrl: './custom-input.component.html',
  styleUrls: ['./custom-input.component.scss']
})
export class CustomInputComponent implements OnInit {

  private inputValue: string = ''

  @Input() inputType: InputTypes = null
  @Input() placeholderText: string = null
  @Input() shouldValidate: boolean = false
  @Input() selectOptions: string[] = null
  @Input() errorText: string = 'Campo inválido'

  @ViewChild('rootElement') rootElement: ElementRef

  public pristine: boolean = true
  public validated: boolean = false
  public isShaking: boolean = false

  constructor() { }

  ngOnInit() { }

  public isValid(): boolean {
    if (this.inputType === InputTypes.Text) {
      return FormValidator.validateFullName(this.inputValue)
    }

    if (this.inputType === InputTypes.Number) {
      return FormValidator.validateSalary(this.inputValue)
    }

    if (this.inputType === InputTypes.Email) {
      return FormValidator.validateEmail(this.inputValue)
    }

    if (this.inputType === InputTypes.Phone) {
      return FormValidator.validatePhoneNumber(this.inputValue)
    }

    if (this.inputType === InputTypes.Area) {
      return FormValidator.validateText(this.inputValue)
    }

    if (this.inputType === InputTypes.URL) {
      return FormValidator.validateURL(this.inputValue)
    }

    if (this.inputType === InputTypes.Select) {
      return FormValidator.validateEnglishLevel(this.inputValue)
    }

    return false
  }

  public onUserInput(event: Event) {
    this.inputValue = (<HTMLInputElement>event.target).value
    this.pristine = false
  }

  public onSelectChange(event: Event) {
    console.log('firing')
    this.inputValue = (<HTMLSelectElement>event.target).value
    console.log(this.inputValue)
    this.pristine = false
  }

  public setValidated() {
    this.validated = true
  }

  public wasValidated(): boolean {
    return this.validated
  }

  public triggerShakeAnimation() {
    this.rootElement.nativeElement.scrollIntoView()
    window.scrollBy(0, -100)
    this.isShaking = true
  }

  public resetAnimationTrigger() {
    this.isShaking = false
  }

}


enum InputTypes {
  Text = 'text',
  Number = 'number',
  Email = 'email',
  Phone = 'tel',
  Area = 'textarea',
  URL = 'url',
  Select = 'select'
}