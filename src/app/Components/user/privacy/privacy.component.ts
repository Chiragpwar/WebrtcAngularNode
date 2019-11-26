import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-privacy',
  templateUrl: './privacy.component.html',
  styleUrls: ['./privacy.component.scss']
})
export class PrivacyComponent implements OnInit {
  prev = 0;
  Next = 0;
  Policies = false;
  Consents = false;
  data = false;
  constructor() { }

  ngOnInit() {
    this.selectedItem(0, 'Policies');
  }


  public selectedItem(item, menu) {
    this.Next = item;
    const data = document.getElementsByClassName('menu');
    data[0].children[this.Next].classList.add('selectedItem--2pm8y');
    if (menu === 'Policies') {
      this.Policies = true;
      this.Consents = false;
      this.data = false;
    } else if (menu === 'Consents') {
      this.Policies = false;
      this.Consents = true;
      this.data = false;
    } else if (menu === 'data') {
      this.Policies = false;
      this.Consents = false;
      this.data = true;
    }
    if (this.prev !== this.Next) {
      data[0].children[this.prev].classList.remove('selectedItem--2pm8y');
      this.prev = item;
    }
  }

}
