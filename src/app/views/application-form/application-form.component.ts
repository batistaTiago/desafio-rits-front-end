import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { CustomInputComponent } from './custom-input/custom-input.component'
import { FormValidator } from '../../shared/form-validator';

@Component({
  selector: 'app-application-form',
  templateUrl: './application-form.component.html',
  styleUrls: ['./application-form.component.scss']
})
export class ApplicationFormComponent implements OnInit {
  
  public inputs: CustomInputComponent[] = []

  public resumeFile: File = null

  constructor() { }

  ngOnInit() {
    this.inputs = [
      this.nameInput,
      this.emailInput,
      this.phoneInput,
      this.linedinInput,
      this.githubInput,
      this.nivelInglesInput,
      this.salarioInput
    ]
  }

  @ViewChild('applicationForm') applicationForm: ElementRef

  @ViewChild('nameInput') nameInput: CustomInputComponent;
  @ViewChild('emailInput') emailInput: CustomInputComponent;
  @ViewChild('phoneInput') phoneInput: CustomInputComponent;
  @ViewChild('linedinInput') linedinInput: CustomInputComponent;
  @ViewChild('githubInput') githubInput: CustomInputComponent;
  @ViewChild('nivelInglesInput') nivelInglesInput: CustomInputComponent;
  @ViewChild('salarioInput') salarioInput: CustomInputComponent;

  public validateAndSubmit(event: Event) {
    const target = <HTMLFormElement>event.target
    
    event.preventDefault()
    
    let shaken: boolean = false

    const validInputs = this.inputs.filter(
      (input) => {

        const valid = input.isValid()
        
        if (input.wasValidated() && !valid && !shaken) {          
          input.triggerShakeAnimation()
          shaken = true
        } else {
          input.setValidated()
        }

        return valid
      }
    )

    if ((this.inputs.length === validInputs.length) && (this.fileIsValid())) {
      
    } else {
      // alert('corriga os erros do form')
    }

  }

  public fileIsValid(): boolean {
    return FormValidator.validateFile(this.resumeFile)
  }

  public resumeSubmitted(event: Event) {
    const target = (<HTMLInputElement> event.target)
    this.resumeFile = target.files[0]
  }

}
