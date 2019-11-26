import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import { AuthServices } from 'src/app/service/CommenService';

@Component({
  selector: 'app-notfound-room',
  templateUrl: './notfound-room.component.html',
  styleUrls: ['./notfound-room.component.scss']
})
export class NotfoundRoomComponent implements OnInit {

  constructor(private Route: Router, private route: ActivatedRoute,  public service: AuthServices) { }
  Roomname: string;
  params: string;
  currentowner: any;
  ngOnInit() {
    this.getOwnerroom();
    setTimeout(() => {
      this.Changelayout();
    }, 2000);

  }

  public Changelayout() {
    this.route.paramMap.subscribe(params => {
      // tslint:disable-next-line: no-string-literal
      this.params = params['params'].roomname;
      if ( this.Roomname === this.params) {
          this.Route.navigate(['/meeting']);
          }
      });
    }

    public getOwnerroom() {
      const user =  JSON.parse(localStorage.getItem('currentUser'));
      this.currentowner = user != null ? user : null;
      if (user != null) {
        this.service.GetownerRoom(user.email).subscribe(Response => {
          // tslint:disable-next-line: no-string-literal
          if (Response['Email'] != null) {
            // tslint:disable-next-line: no-string-literal
            this.Roomname = Response['Roomname'];
          }
        });
      }
    }

}
