import { Component, OnInit } from '@angular/core';
import { IApplication } from '../../shared/application.interface';
import { ApplicationService } from '../../services/application.service';
import { AuthService } from '../../services/auth.service';
import { AuthCredentials } from '../../shared/auth-credentials';
import { IUser } from '../../shared/user.interface';

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

  public user: IUser = AuthCredentials.getUser()

  constructor(private applicationService: ApplicationService, private authService: AuthService) { }

  ngOnInit() {
    this.updateApplications()
  }

  public filterChanged(event: Event) {
    this.fetchingApplications = true
    const target = <HTMLSelectElement>event.target
    this.statusFilter = target.value
    this.updateApplications()
  }

  public async updateApplications(applications: IApplication[] = null) {
    if (applications) {
      this.applications = applications
    } else {
      this.applications = await this.applicationService.getApplications(this.statusFilter)
    }
    this.fetchingApplications = false
  }


  public updateApplicationStatus(eventData: { id: number, status: string }) {
    this.applicationService.updateApplicationStatus(eventData)
  }

  public logoutButtonClick() {
    this.authService.logout()
  }
   

}
