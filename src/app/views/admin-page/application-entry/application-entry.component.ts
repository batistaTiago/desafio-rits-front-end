import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { IApplication } from '../../../shared/application.interface';
import { EnvironmentConfig } from '../../../shared/environment.config';

@Component({
  selector: 'app-application-entry',
  templateUrl: './application-entry.component.html',
  styleUrls: ['./application-entry.component.scss']
})
export class ApplicationEntryComponent implements OnInit {

  @Input() applicationData: IApplication = null

  constructor() { }

  ngOnInit() {
  }

  public apiURL = EnvironmentConfig.getSettings().url

  @Output() statusButtonClick: EventEmitter<{ id: number, status: string }> = new EventEmitter()

  public setStatus(status: string) {
    if (this.applicationData.id) {
      const id = this.applicationData.id
      const data = { id, status}
      this.statusButtonClick.emit(data)
    } else {
      alert('houve um erro de sincronização - isto não deveria acontecer.')
    }
  }

}
