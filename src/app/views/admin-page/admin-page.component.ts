import { Component, OnInit } from '@angular/core';
import { IApplication } from '../../shared/application.interface';
import { ApplicationService } from '../../services/application.service';

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.scss'],
  providers: [ ApplicationService ]
})
export class AdminPage implements OnInit {

  public applications: IApplication[]
  public statusFilter: string

  public fetchingApplications: boolean = true

  constructor(private applicationService: ApplicationService) { }

  ngOnInit() {
    this.updateApplications()
  }

  public filterChanged(event: Event) {
    this.fetchingApplications = true
    const target = <HTMLSelectElement>event.target
    this.statusFilter = target.value
    this.updateApplications()
  }

  public async updateApplications() {
    this.applications = await this.applicationService.getApplications(this.statusFilter)
    console.log(this.applications)
    this.fetchingApplications = false
  }


  public updateApplicationStatus(event: [number, string]) {
    this.applicationService.updateApplicationStatus(event)
  }
  

   

}
