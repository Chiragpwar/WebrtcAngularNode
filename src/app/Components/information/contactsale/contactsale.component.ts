import { Component, OnInit } from '@angular/core';
import {ContactUs} from '../../../modals/modal';
import {AuthServices} from '../../../service/CommenService';
@Component({
  selector: 'app-contactsale',
  templateUrl: './contactsale.component.html',
  styleUrls: ['./contactsale.component.scss']
})
export class ContactsaleComponent implements OnInit {


 // Contactus: ContactUs[] = [] ;
  Contactus = new ContactUs();
  comunication = [];
  constructor(private service: AuthServices) { }

  ngOnInit() {
  }

  SendMail() {
    this.service.Contactusmail(this.Contactus).subscribe(response => {
    });
  }

  onChange(val) {
    if (val.target.checked ===  true) {
      this.comunication.push(val.target.value);
      JSON.stringify(this.comunication);
    } else {
      const index = this.comunication.indexOf(val.target.value);
      this.comunication.splice(index, 1);
    }
    this.Contactus.Communication = this.comunication.toString();
  }

}
