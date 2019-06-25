import { Component, OnInit, Input } from '@angular/core';
import { FormValidator } from '../../../shared/form-validator';

@Component({
  selector: 'app-custom-input',
  templateUrl: './custom-input.component.html',
  styleUrls: ['./custom-input.component.scss']
})
export class CustomInputComponent implements OnInit {

  private inputValue: string = null

  @Input() inputType: InputTypes = null
  @Input() placeholderText: string = null
  @Input() shouldValidate: boolean = false
  @Input() selectOptions: string[] = null

  public pristine: boolean = true

  constructor() { }

  ngOnInit() {
  }

  public isValid() {
    if (this.inputType === InputTypes.Text) {
      return FormValidator.validateFullName(this.inputValue)
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
  }

  public onUserInput(event: Event) {
    this.inputValue = (<HTMLInputElement>event.target).value
    this.pristine = false
  }

}


enum InputTypes {
  Text = 'text',
  Email = 'email',
  Phone = 'tel',
  Area = 'textarea',
  URL = 'url',
  Select = 'select'
}