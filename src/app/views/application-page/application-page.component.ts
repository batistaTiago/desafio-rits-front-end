import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-application-page',
  templateUrl: './application-page.component.html',
  styleUrls: ['./application-page.component.scss']
})
export class ApplicationPage implements OnInit {

  public showFeedback: boolean
  public postingApplication: boolean = false

  constructor() { }

  ngOnInit() {
  }

  public formSubmitted(event: Event) {
    this.postingApplication = true
  }

  public parsePostResult(result: boolean) {
    if (result === true) {
      this.showFeedback = true
    } else {
      this.showFeedback = false
    }

    this.postingApplication = false
  }

}
