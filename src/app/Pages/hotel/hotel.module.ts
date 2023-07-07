import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HotelComponent } from './hotel.component';
import { HotelSidebarComponent } from './hotel-sidebar/hotel-sidebar.component';
import { HotelHeaderComponent } from './hotel-header/hotel-header.component';
import { RouterModule, Routes } from '@angular/router';
import { MatToolbarModule} from '@angular/material/toolbar';
import {MatDividerModule} from '@angular/material/divider'
import {MatDialogModule} from '@angular/material/dialog';
import {MatExpansionModule} from '@angular/material/expansion'
import { MatIconModule } from '@angular/material/icon';
import {MatTreeModule} from '@angular/material/tree'
import { MatButtonModule } from '@angular/material/button';
import { BreadcrumbModule } from 'src/app/Common/breadcrumb/breadcrumb.module';
import {MatTooltipModule} from '@angular/material/tooltip'
import {MatListModule} from '@angular/material/list';
import { NgCircleProgressModule } from 'ng-circle-progress';
import {MatProgressBarModule} from '@angular/material/progress-bar';
// import { FlipBookModule } from '@labsforge/flipbook';
//import { ThankYouPageComponent } from './thankYouPage/thankYouPage.component';
const routes: Routes = [
  {
    path: '',
    component: HotelComponent,
    children: [

      { path: 'home/:id', loadChildren: () => import('./hotel-home/hotel-home.module').then(m => m.HotelHomeModule),data:{breadcrumb:'Home'} },
      { path: 'dashboard', loadChildren: () => import('./hotel-dashboard/hotel-dashboard.module').then(m => m.HotelDashboardModule),data:{breadcrumb:'Dashboard'} },
      { path: 'setup/:id', loadChildren: () => import('./setup/setup.module').then(m => m.SetupModule),data:{breadcrumb:'Setup'} },
      { path: 'menu_setup', loadChildren: () => import('./menu-setup/menu-setup.module').then(m => m.MenuSetupModule),data:{breadcrumb:'Menu Setup'}  },
      { path: 'logo_setup', loadChildren: () => import('./logo_setup/logo_setup.module').then(m => m.Logo_setupModule),data:{breadcrumb:'Logo Setup'}  },
      { path: 'menu_data', loadChildren: () => import('./menu-data/menu-data.module').then(m => m.MenuDataModule),data:{breadcrumb:'Menu Data'}  },
      { path: 'managers/:id', loadChildren: () => import('./managers/managers.module').then(m => m.ManagersModule),data:{breadcrumb:'Managers'}  },
      { path: 'add-managers/:id', loadChildren: () => import('./add-managers/add-managers.module').then(m => m.AddManagersModule),data:{breadcrumb:'Add Managers'}  },
      { path: 'add-department/:id', loadChildren: () => import('./add-departments/add-departments.module').then(m => m.AddDepartmentsModule),data:{breadcrumb:'Add Departments'}  },
      { path: 'add-pca/:hotel_id', loadChildren: () => import('./hotel-pca/hotel-pca.module').then(m => m.HotelPcaModule),data:{breadcrumb:'Add Avatar'}  },
      { path: 'add-voice/:id', loadChildren: () => import('./add-voice/add-voice.module').then(m => m.AddVoiceModule),data:{breadcrumb:'Add Voice'}  },
      { path: 'hotel_communications/:id', loadChildren: () => import('./hotel-communications/hotel-communications.module').then(m => m.HotelCommunicationsModule),data:{breadcrumb:'Communications'}  },
      { path: 'submit_ticket/:hotel_id', loadChildren: () => import('./submit_ticket/submit_ticket.module').then(m => m.Submit_ticketModule)},
      { path: 'schedule/:hotel_id/:id', loadChildren: () => import('./change-schedule/change-module.module').then(m => m.ChangeModuleModule) },
      { path: 'hotel_progress/:id', loadChildren: () => import('./hotel-progress/hotel-progress.module').then(m => m.HotelProgressModule),data:{breadcrumb:'Hotel Progress'}  },
      { path: 'hotel_emergency_report/:id', loadChildren: () => import('./hotel-emergency-rep/hotel-emergency-rep.module').then(m => m.HotelEmergencyRepModule),data:{breadcrumb:'Report Emergency'}  },
      { path: 'hotel_emp_msg/:id', loadChildren: () => import('./emp-msg/emp-msg.module').then(m => m.EmpMsgModule),data:{breadcrumb:'Employee Messages'}  },
      { path: 'hotel_guest_msg/:id', loadChildren: () => import('./guest-msg/guest-msg.module').then(m => m.GuestMsgModule),data:{breadcrumb:'Guest Messages'}  },
      { path: 'hotel_create_voice/:hotel_id/:id', loadChildren: () => import('./hotel-create-voice/hotel-create-voice.module').then(m => m.HotelCreateVoiceModule),data:{breadcrumb:'Create Voice'}  },
      { path: 'hotel_create_comm/:hotel_id/:id/:routeFlag', loadChildren: () => import('./hotel-create-comm/hotel-create-comm.module').then(m => m.HotelCreateCommModule),data:{breadcrumb:'Create Messages'}  },
      { path: 'hotel_create_emergency/:hotel_id/:id', loadChildren: () => import('./hotel-create-emergency/hotel-create-emergency.module').then(m => m.HotelCreateEmergencyModule),data:{breadcrumb:'Emergency Report'}  },
      { path: 'emp_msg_create/:hotel_id/:id', loadChildren: () => import('./emp-msg-create/emp-msg-create.module').then(m => m.EmpMsgCreateModule),data:{breadcrumb:'Create Messages'}  },
      { path: 'guest_msg_create/:hotel_id/:id', loadChildren: () => import('./guest-msg-create/guest-msg-create.module').then(m=>m.GuestMsgCreateModule),data:{breadcrumb:'Create Messages'} },
      { path: 'hotel_qsn/:hotel_id', loadChildren: () => import('./hotel-questionnaire/hotel-questionnaire.module').then(m=>m.HotelQuestionnaireModule),data:{breadcrumb:'Questionnaire'} },
      { path: 'hotel_proposal/:hotel_id', loadChildren: () => import('./hotel-proposal/hotel-proposal.module').then(m=>m.HotelProposalModule),data:{breadcrumb:'Proposal'} },
      { path: 'add_ticket/:id', loadChildren: () => import('./add_ticket/add_ticket.module').then(m=>m.Add_ticketModule) },
      { path: 'hotel_create_qsn/:id/:hotel_id/:flag/:editFlag', loadChildren: () => import('./hotel-create-qsn/hotel-create-qsn.module').then(m=>m.HotelCreateQsnModule),data:{breadcrumb:'Create Questionnaire'} },
      { path: 'hotel_create_prop/:id/:hotel_id/:flag/:editFlag', loadChildren: () => import('./hotel-create-prop/hotel-create-prop.module').then(m=>m.HotelCreatePropModule),data:{breadcrumb:'Create Proposal'} },
      { path: 'hotel_add_group_leader/:hotel_id', loadChildren: () => import('./add-group-leader/add-group-leader.module').then(m=>m.AddGroupLeaderModule),data:{breadcrumb:'Add group leader'} },
      { path: 'menu/:rid/:serve_id', loadChildren: () => import('./menu/menu.module').then(m => m.MenuModule) },
      { path: 'hotel_promo/:hotel_id', loadChildren: () => import('./hotel-promotions/hotel-promotions.module').then(m => m.HotelPromotionsModule) },
      { path: 'hotel_promo_dash/:hotel_id', loadChildren: () => import('./hotel-promo-onclick/hotel-promo-onclick.module').then(m => m.HotelPromoOnclickModule) },
      { path: 'hotel_photo/:hotel_id', loadChildren: () => import('./hotel-photo/hotel-photo.module').then(m => m.HotelPhotoModule) },
      { path: 'hotel_flip/:hotel_id', loadChildren: () => import('./hotel-flip/hotel-flip.module').then(m => m.HotelFlipModule) },
      { path: 'no_sale/:hotel_id', loadChildren: () => import('./no_sale/no_sale.module').then(m => m.No_saleModule) },
      { path: 'hotel_flip_approve/:hotel_id/:id', loadChildren: () => import('./hotel_flip_approve/hotel_flip_approve.module').then(m => m.Hotel_flip_approveModule) },
      { path: 'suggestion/:hotel_id', loadChildren: () => import('./suggestion-box/suggestion-box.module').then(m => m.SuggestionBoxModule) },
      { path: 'platform_faq/:hotel_id', loadChildren: () => import('./platform-faq/platform-faq.module').then(m => m.PlatformFaqModule) },
      { path: 'lost_found/:hotel_id/:id', loadChildren: () => import('./lost-found/lost-found.module').then(m => m.LostFoundModule) },
      { path: 'lost_found_home/:hotel_id', loadChildren: () => import('./lost-found-dashboard/lost-found-dashboard.module').then(m => m.LostFoundDashboardModule) },
      { path: 'lost_found_guest/:hotel_id/:id', loadChildren: () => import('./lost-found-guest-create/lost-found-guest-create.module').then(m => m.LostFoundGuestCreateModule) },
      { path: 'lost_found_guest/:hotel_id', loadChildren: () => import('./lost-found-guest/lost-found-guest.module').then(m => m.LostFoundGuestModule) },
      { path: 'your_directory/:hotel_id', loadChildren: () => import('./directory-placeholder/directory-placeholder.module').then(m => m.DirectoryPlaceholderModule) },
      { path: 'qr_code_signage/:hotel_id', loadChildren: () => import('./qrcode_signage/qrcode_signage.module').then(m => m.Qrcode_signageModule) },
      { path: 'hotel_data/:hotel_id', loadChildren: () => import('./hotel_data/hotel_data.module').then(m => m.Hotel_dataModule) },
      { path: 'hotel_calendar/:hotel_id', loadChildren: () => import('./hotel_calendar/hotel_calendar.module').then(m => m.Hotel_calendarModule) },
      { path: 'hotel_create_calendar/:hotel_id/:id', loadChildren: () => import('./hotel_calendar_create/hotel_calendar_create.module').then(m => m.Hotel_calendar_createModule) },
      { path: 'training/:hotel_id', loadChildren: () => import('./training/training.module').then(m => m.TrainingModule) },
      { path: 'flipbook', loadChildren: () => import('./flip-book/flip-book.module').then(m => m.FlipBookModule) },
      { path: 'payment_page/:id/:hotel_id/:flag/:editFlag', loadChildren: () => import('./payment_page/payment_page.module').then(m => m.Payment_pageModule)},
      { path: 'directory_design/:hotel_id', loadChildren: () => import('./directory-design/directory-design.module').then(m => m.DirectoryDesignModule)},
      { path: 'pre_reg_url/:hotel_id', loadChildren: () => import('./pre_reg_url/pre_reg_url.module').then(m => m.Pre_reg_urlModule)},
      // { path: 'menu', loadChildren: () => import('./menu/menu.module').then(m => m.MenuModule) },
      { path: '', redirectTo: 'home', pathMatch: 'full' }
   
    ],
    data:{breadcrumb:'home'}
  }
]
@NgModule({
  imports: [
    CommonModule,
    MatToolbarModule,
    MatDividerModule,
    MatDialogModule,
    MatExpansionModule,
    MatIconModule,
    MatTreeModule,
    MatButtonModule,
    BreadcrumbModule,
    MatTooltipModule,
    MatListModule,
    MatProgressBarModule,
    // FlipBookModule,
    NgCircleProgressModule.forRoot({
      "backgroundColor": "#FDB900",
      "radius": 20,
      "maxPercent": 200,
      "units": " Point",
      "unitsColor": "#483500",
      "outerStrokeWidth": 5,
      "outerStrokeColor": "#FFFFFF",
      "innerStrokeColor": "#FFFFFF",
      "titleColor": "#483500",
      "subtitleColor": "#483500",
      "showSubtitle": false,
      "showInnerStroke": false,
      "startFromZero": false}),
    
    
    RouterModule.forChild(routes)
  ],
  declarations: [HotelComponent,HotelSidebarComponent,HotelHeaderComponent]
})
export class HotelModule { 
  constructor(){
    console.log("hotel module is loaded")
  }
}
