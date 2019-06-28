import { Component, OnInit, ViewChild, ElementRef, Output, EventEmitter } from '@angular/core';
import { CustomInputComponent } from './custom-input/custom-input.component'
import { FormValidator } from '../../../shared/form-validator';
import { ApplicationService } from '../../../services/application.service';

@Component({
  selector: 'app-application-form',
  templateUrl: './application-form.component.html',
  styleUrls: ['./application-form.component.scss'],
  providers: [ApplicationService]
})
export class ApplicationFormComponent implements OnInit {

  public inputs: CustomInputComponent[] = []

  public resumeFile: File = null

  constructor(private applicationService: ApplicationService) { }

  @Output() formSubmitted: EventEmitter<any> = new EventEmitter()

  @Output() postResult: EventEmitter<any> = new EventEmitter()
  

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

  private isValid(): boolean {
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

    return (this.inputs.length === validInputs.length) && (this.fileIsValid())
  }

  private buildFormRequest(): FormData {

    const formData = new FormData()
    formData.set('nomeCompleto', this.nameInput.getValue())
    formData.set('curriculo', this.resumeFile)
    formData.set('email', this.emailInput.getValue())
    formData.set('githubURL', this.githubInput.getValue())
    formData.set('linkedinURL', this.linedinInput.getValue())
    formData.set('english_level_id', this.nivelInglesInput.getValue())
    formData.set('pretensaoSalarial', this.salarioInput.getValue())
    formData.set('telefone', this.phoneInput.getValue())

    return formData
  }

  public async validateAndSubmit(event: Event) {

    event.preventDefault()

    if (this.isValid()) {
      try {

        const formData = this.buildFormRequest()
        this.formSubmitted.emit()
        const result = await this.applicationService.postApplication(formData)
        if (result) {
          this.postResult.emit(true)
        } else {
          this.postResult.emit(false)
        }
      } catch (error) {
        console.log(error)
      }
    } 
    // else if (this.inputs.some(input => input.wasValidated())) {
    //   alert('corriga os erros do form')
    // }

  }

  public fileIsValid(): boolean {
    return FormValidator.validateFile(this.resumeFile)
  }

  public resumeSubmitted(event: Event) {
    const target = (<HTMLInputElement>event.target)
    this.resumeFile = target.files[0]
  }

}
