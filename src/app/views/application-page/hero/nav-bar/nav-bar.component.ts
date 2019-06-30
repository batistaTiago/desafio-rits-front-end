import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {

  public showMenu: boolean = false

  constructor() { }

  ngOnInit() {
  }

  public toggleMenu() {
    this.showMenu = !this.showMenu
  }

}
