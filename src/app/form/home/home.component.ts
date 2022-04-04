import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  localStorage: any;
  data: any;
  FORM_CONSTANT = 'form_data';


  constructor() { }

  ngOnInit(): void {
    this.data = JSON.parse(localStorage.getItem(this.FORM_CONSTANT)!);
    console.log(this.data);
  }

}
