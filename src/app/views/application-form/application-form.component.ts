import { Component, OnInit, ViewChild } from '@angular/core';
import { CustomInputComponent } from './custom-input/custom-input.component'

@Component({
  selector: 'app-application-form',
  templateUrl: './application-form.component.html',
  styleUrls: ['./application-form.component.scss']
})
export class ApplicationFormComponent implements OnInit {
  
  public inputs: CustomInputComponent[] = []

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
    
    const validInputs = this.inputs.filter(
      (input) => {
        return input.isValid()
      }
    )

    if (this.inputs.length === validInputs.length) {
      target.submit()
    } else {
      alert('corriga os erros do form')
    }

  }

}
