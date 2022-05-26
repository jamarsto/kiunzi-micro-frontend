import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'header-component',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.sass']
})
export class HeaderComponent implements OnInit {
  isCollapsed: boolean = true;

  constructor() {}

  ngOnInit(): void {}

  collapse(): void {
    this.isCollapsed = true;
  }

  toggle(): void {
    this.isCollapsed = !this.isCollapsed;
  }
}
