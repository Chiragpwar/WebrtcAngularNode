import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';
import { map } from 'rxjs/operators';
import {User, Room} from '../modals/modal';

@Injectable({providedIn: 'root'})

export class AuthServices {

APIURL =  environment.ApiUrl;

constructor(public Http: HttpClient) {}

public AddUser(user) {
        const URL = this.APIURL + 'UserRegistration';
        const body = {
         firstName: user.firstName,
         lastName: user.lastName,
         name : user.name,
         email: user.email,
         photoUrl: user.photoUrl,
         provider: user.provider
        };
        const headers = new HttpHeaders().set('content-type', 'application/json');
        return this.Http.post(URL, body, {headers}).pipe(
          // tslint:disable-next-line: no-shadowed-variable
          map(user => {
            // login successful if there's a jwt token in the response
            // tslint:disable-next-line: no-string-literal
            if (user['user'].email != null ) {
              localStorage.setItem(
                'currentUser',
                JSON.stringify((user as any).user)
              );
              return user;
            }
            // tslint:disable-next-line: no-string-literal
            if (user['user'].indexOf('register') < 0  && user['user'].indexOf('code') < 0) {
              // store user details and jwt token in local storage to keep user logged in between page refreshes
            }
            return user;
          })
        );
}

public login(user, url) {
      const URL = this.APIURL + url;
      const body = {
         email: user.email
        };
      const headers = new HttpHeaders().set('content-type', 'application/json');
      headers.set('Set-Cookie', 'HttpOnly;Secure;SameSite=Strict');
      return this.Http.post(URL, body, {headers}).pipe(
          // tslint:disable-next-line: no-shadowed-variable
          map(user => {
            // login successful if there's a jwt token in the response
            // tslint:disable-next-line: no-string-literal
            if (user['user'].email != null ) {
              localStorage.setItem(
                'currentUser',
                JSON.stringify((user as any).user)
              );
              return user;
            }
            // tslint:disable-next-line: no-string-literal
            if (user['user'].indexOf('Confirmation') <  0 || user['user'].indexOf('user') < 0 ) {
            }
            return user;
          })
        );
}

public VerifyCode(code) {
  const URL = this.APIURL + 'verification/' + code;
  const headers = new HttpHeaders().set('content-type', 'application/json');
  return this.Http.get(URL, {headers}).pipe(
    // tslint:disable-next-line: no-shadowed-variable
    map(user => {
      if (user === 'failure') {
      } else {
      // login successful if there's a jwt token in the response
      // tslint:disable-next-line: no-string-literal
      if (user['user'].email != null ) {
        localStorage.setItem(
          'currentUser',
          JSON.stringify((user as any).user)
        );
        return user;
      }
      }
      return user;
    })
  );
}

public Contactusmail(Contact) {
  const URL = this.APIURL + 'Contsctusmail';
  const body = {
    WorkEmail: Contact.WorkEmail,
    CompanyName: Contact.CompanyName,
    FirstName:  Contact.FirstName,
    LastName: Contact.LastName,
    Communication: Contact.Communication,
    Country: Contact.Country,
    NumberofEmployee: Contact.NumberofEmployee
   };
  const headers = new HttpHeaders().set('content-type', 'application/json');
  return this.Http.post(URL, body, {headers});
}

public AddRoom(room, user) {
  const URL = this.APIURL + 'RoomAdd';
  const body = {
    Roomname: room,
    Email: user.email,
    name: user.name,
    photoUrl: user.photoUrl
   };
  const headers = new HttpHeaders().set('content-type', 'application/json');
  return this.Http.post(URL, body, {headers});
}

public GetownerRoom(Email): Observable<Room[]> {
  const URL = this.APIURL + 'getRoom/' + Email;
  const headers = new HttpHeaders().set('content-type', 'application/json');
  return this.Http.get<Room[]>(URL, {headers});
}

public GetRoom(room): Observable<Room[]> {
  const URL = this.APIURL + 'getRooms/' + room;
  const headers = new HttpHeaders().set('content-type', 'application/json');
  return this.Http.get<Room[]>(URL, {headers});
}

public deleteroom(room) {
  const URL = this.APIURL + 'Deleteownerroom/' + room;
  const headers = new HttpHeaders().set('content-type', 'application/json');
  return this.Http.post(URL, {headers});
}

public GetIp() {
  return this.Http.get<{ip}>('https://jsonip.com');
}

public updateuserprofile(user) {
  const URL = this.APIURL + 'manageuserprofile';
  const body = {
    email : user.email,
    name : user.name,
    photoUrl: user.photoUrl
   };
  const headers = new HttpHeaders().set('content-type', 'application/json');
  return this.Http.post(URL, body, {headers}).pipe(
    // tslint:disable-next-line: no-shadowed-variable
    map(user => {
      // login successful if there's a jwt token in the response
      // tslint:disable-next-line: no-string-literal
      if (user['user'].email != null ) {
        localStorage.setItem(
          'currentUser',
          JSON.stringify((user as any).user)
        );
        return user;
      }
      return user;
    })
  );
}

public Billing(Authuser, BillingDetail) {
  const URL = this.APIURL + 'Customerbilling';
  const body = {
    billingEmail: BillingDetail.billingEmail,
    vatIdentifier: BillingDetail.vatIdentifier,
    billingName: BillingDetail.billingName,
    billingAddress: BillingDetail.billingAddress,
    billingPostcode: BillingDetail.billingPostcode,
    billingCity: BillingDetail.billingCity,
    Country: BillingDetail.Country,
    AuthEmail: Authuser
  };
  const headers = new HttpHeaders().set('content-type', 'application/json');
  return this.Http.post(URL, body, {headers});
}

public StripePayment(Token, price) {
  const customer = JSON.parse(localStorage.getItem('currentUser'));
  const URL = this.APIURL + 'stripePayment';
  const body = {
    token : Token,
    Email : customer.email,
    Price : price
  };
  const headers = new HttpHeaders().set('content-type', 'application/json');
  return this.Http.post(URL, body, {headers});
}

}
