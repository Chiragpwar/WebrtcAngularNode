import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {Chatroom} from '../../modals/modal';
import { AuthServices } from 'src/app/service/CommenService';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private Route: Router, private route: ActivatedRoute,  public service: AuthServices) { }
  userImage = false;
  pic: any;
  name: string;
  chat = new Chatroom();
  Room: string;
  params: string;

  ngOnInit() {
    this.getOwnerroom();
  }

 public Changelayout() {
  this.route.paramMap.subscribe(params => {
    // tslint:disable-next-line: no-string-literal
    this.params = params['params'].roomname;
    const data = JSON.parse(localStorage.getItem('currentUser'));
    if (data != null ) {
          this.userImage = true;
          this.pic = data.photoUrl;
          this.name = data.name;
          if (this.params === this.Room) {
            this.Route.navigate(['/meeting']);
       }
    }
    });
  }

  public getOwnerroom() {
    const user =  JSON.parse(localStorage.getItem('currentUser'));
    if (user != null) {
      this.service.GetownerRoom(user.email).subscribe(Response => {
        // tslint:disable-next-line: no-string-literal
        if (Response['Email'] != null) {
          // tslint:disable-next-line: no-string-literal
          this.Room = Response['Roomname'];
        }
        this.Changelayout();
      });
    }
  }

}
