import { Component, OnInit } from '@angular/core';
import { AuthService } from 'angularx-social-login';
import { GoogleLoginProvider } from 'angularx-social-login';
import {AuthServices} from '../../../service/CommenService';
import { ToastrService } from 'ngx-toastr';
import {Router} from '@angular/router';
import {User} from '../../../modals/modal';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  verification = true;
  GoogleAuth = [];
  user = new User();

  constructor(public authService: AuthService, public route: Router, public service: AuthServices, public toastr: ToastrService) { }

  ngOnInit() {

  }

  async  signInWithGoogle() {
   await this.authService.signIn(GoogleLoginProvider.PROVIDER_ID).then(x =>
    this.service.AddUser(x).subscribe(Response => {
     // tslint:disable-next-line: no-string-literal
        if (Response['user'] === 'user already register') {
          this.toastr.warning('This email is already registered. Try logging in');
        } else {
          this.toastr.info('you need to login For next step');
        }
      }));
    }

  public SignUp(name, Email) {
     this.user.name = name;
     this.user.email = Email.toLowerCase();
     this.service.AddUser(this.user).subscribe(Response => {
      // tslint:disable-next-line: no-string-literal
      if (Response['user'] === 'user already register') {
        this.toastr.warning('This email is already registered. Try logging in');
      }
       // tslint:disable-next-line: no-string-literal
      if (Response['user'].indexOf('code') > 0) {
        this.verification = false;
      // tslint:disable-next-line: no-string-literal
        this.toastr.info(Response['user']);
      }
     });
  }

  public Verify(code) {
    this.service.VerifyCode(code).subscribe(Response => {
     // tslint:disable-next-line: no-string-literal
     if (Response !== 'failure') {
       this.route.navigate(['/']);
     } else {
      this.toastr.warning('Not a valid code. Sure you typed it correctly?');
     }
    });
    }
}
