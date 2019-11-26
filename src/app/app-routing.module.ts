import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {AppComponent} from '../app/app.component';
import {LayoutComponent} from '../app/Components/user/layout/layout.component';
import {HomeComponent} from './Components/home/home.component';
import {LoginComponent} from '../app/Components/user/login/login.component';
import {SignupComponent} from '../app/Components/user/signup/signup.component';
import {MeetingComponent} from '../app/Components/user/meeting/meeting.component';
import {CamComponent} from '../app/Components/user/cam/cam.component';
import {NotfoundRoomComponent} from '../app/Components/error/notfound-room/notfound-room.component';
import {PricingComponent} from './Components/information/pricing/pricing.component';
import {ContactsaleComponent} from '../app/Components/information/contactsale/contactsale.component';
import {SupportComponent} from '../app/Components/support/support/support.component';
import {SupportHomeComponent} from '../app/Components/support/support-home/support-home.component';
import {SupportCenterComponent} from '../app/Components/support/support-center/support-center.component';
import {AppearinComponent} from '../app/Components/support/appearin/appearin.component';
import {ProfileComponent} from '../app/Components/user/profile/profile.component';
import {SubscriptionComponent} from '../app/Components/user/subscription/subscription.component';
import {AccountComponent} from '../app/Components/user/account/account.component';
import {PrivacyComponent} from '../app/Components/user/privacy/privacy.component';
import {FeedbackComponent} from '../app/Components/user/feedback/feedback.component';
import {LeaveFeedbackComponent} from '../app/Components/user/leave-feedback/leave-feedback.component';
import {TeamComponent} from '../app/Components/information/team/team.component';
import {PressComponent} from '../app/Components/information/press/press.component';
import {TeamHomeComponent} from '../app/Components/information/team-home/team-home.component';
import {PolicyComponent} from '../app/Components/information/policy/policy.component';
import {CookiePolicyComponent} from '../app/Components/information/cookie-policy/cookie-policy.component';
import {ProductsComponent} from '../app/Components/information/products/products.component';
import {OrderDetailComponent} from '../app/Components/user/order-detail/order-detail.component';
import {PackageComponent} from '../app/Components/user/package/package.component';
import {BussinessAccountComponent} from '../app/Components/user/bussiness-account/bussiness-account.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      {
        path: '',
        component: LayoutComponent,
        pathMatch: 'full'
      }, {
        path: 'user/login',
        component: LoginComponent,
        pathMatch: 'full'
      }, {
        path: 'user/signup',
        component: SignupComponent,
        pathMatch: 'full'
      }, {
        path: 'meeting',
        component: MeetingComponent,
        pathMatch: 'full'
      }, {
        path: 'information/pricing',
        component: PricingComponent,
        pathMatch: 'full'
      }, {
        path: 'information/contact-us-appearin-business',
        component: ContactsaleComponent,
        pathMatch: 'full'
      }, {
        path: 'error/Room-not-found/:roomname',
        component: NotfoundRoomComponent,
        pathMatch: 'full'
      },
      {
        path: 'org/signup',
        component: BussinessAccountComponent,
        pathMatch: 'full'
      }
    ]
  }, {
    path: 'whereby-support',
    component: SupportComponent,
    children: [
      {
        path: 'home',
        component: SupportHomeComponent,
        pathMatch: 'full'
      },
      {
        path: 'support-center',
        component: SupportCenterComponent,
        pathMatch: 'full'
      },
      {
        path: 'support-appearin',
        component: AppearinComponent,
        pathMatch: 'full'
      }
    ]
  }, {
    path: 'profile',
    component: ProfileComponent,
    children: [
      {
        path: 'subscription',
        component: SubscriptionComponent,
        pathMatch: 'full'
      },
      {
        path: 'account',
        component: AccountComponent,
        pathMatch: 'full'
      },
      {
        path: 'privacy',
        component: PrivacyComponent,
        pathMatch: 'full'
      },
    ]
  },
  {
    path: 'ourteam',
    component: TeamHomeComponent,
    children: [
      {
        path: 'team',
        component: TeamComponent,
        pathMatch: 'full'
      },
      {
        path: 'press',
        component: PressComponent,
        pathMatch: 'full'
      },
      {
        path: 'tos',
        component: PolicyComponent,
        pathMatch: 'full'
      },
      {
        path: 'cookie-policy',
        component: CookiePolicyComponent,
        pathMatch: 'full'
      },
    ]
  }, {
    path : 'order',
    component: OrderDetailComponent,
    children: [
      {
        path: 'detail',
        component: PackageComponent ,
        pathMatch: 'full'
  }
    ]
  },
  {
    path: ':RoomName',
    component: CamComponent,
    pathMatch: 'full'
  },
  {
    path: 'user/feedback',
    component: FeedbackComponent,
    pathMatch: 'full'
  },
  {
    path: 'user/leave-room',
    component: LeaveFeedbackComponent,
    pathMatch: 'full'
  },
  {
    path: 'information/products',
    component: ProductsComponent,
    pathMatch: 'full'
  }
];
@NgModule({
  imports: [RouterModule.forRoot(routes),
  RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
