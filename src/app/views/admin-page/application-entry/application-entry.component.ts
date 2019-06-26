import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { IApplication } from '../../../shared/application.interface';

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

  @Output() statusButtonClick: EventEmitter<[string, number]> = new EventEmitter<[string, number]>()

  public setStatus(status: string) {
    if (this.applicationData.id) {
      this.statusButtonClick.emit([status, this.applicationData.id])  
    } else {
      alert('houve um erro de sincronização - isto não deveria acontecer.')
    }
  }

}
