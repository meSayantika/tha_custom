import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin.component';
import { RouterModule, Routes } from '@angular/router';
const routes:Routes=[
  {
  path:'',
  component:AdminComponent, 
  children: [
    { path: 'adminlogin', loadChildren: () => import('./adminlogin/adminlogin.module').then(m => m.AdminloginModule) },
    { path: 'deptlogin', loadChildren: () => import('./dept_login/dept_login.module').then(m => m.Dept_loginModule) },
    { path: 'adminlanding', loadChildren: () => import('./admin-landing/admin-landing.module').then(m => m.AdminLandingModule) },
    { path: 'adminsetup', loadChildren: () => import('./master-setup/master-setup.module').then(m => m.MasterSetupModule) },
    { path: 'questionnaire/:id/:hotel_id/:flag/:editFlag', loadChildren: () => import('./questionnaire/questionnaire.module').then(m => m.QuestionnaireModule) },
    { path: 'proposal_draft/:id/:hotel_id/:flag/:editFlag', loadChildren: () => import('./proposal-draft/proposal-draft.module').then(m => m.ProposalDraftModule) },
    { path: 'view_proposal/:id/:hotel_id/:flag/:editFlag', loadChildren: () => import('./proposal-draft/proposal-draft.module').then(m => m.ProposalDraftModule) },
    { path: 'hotelForm/:id/:hotel_id/:flag/:editFlag', loadChildren: () => import('./questionnaire/questionnaire.module').then(m => m.QuestionnaireModule) },
    { path: 'hotel_account', loadChildren: () => import('./hotel-account/hotel-account.module').then(m => m.HotelAccountModule) },
    { path: 'proposal/:id', loadChildren: () => import('./create-proposal/create-proposal.module').then(m => m.CreateProposalModule) },
    { path: 'send_proposal/:id/:flag', loadChildren: () => import('./send-proposal/send-proposal.module').then(m => m.SendProposalModule) },
    { path: 'confirm_pay/:id', loadChildren: () => import('./confirmed-payment/confirmed-payment.module').then(m => m.ConfirmedPaymentModule) },
    { path: 'hotelDB', loadChildren: () => import('./hotelDB-menusetup/hotelDB-menusetup.module').then(m => m.HotelDBMenusetupModule) },
    { path: 'restaurant_setup/:id', loadChildren: () => import('./hotel-menu-setup/hotel-menu-setup.module').then(m => m.HotelMenuSetupModule) },
    { path: 'add_hotel', loadChildren: () => import('./add-hotel/add-hotel.module').then(m => m.AddHotelModule) },
    { path: 'view_hotel', loadChildren: () => import('./view-hotel/view-hotel.module').then(m => m.ViewHotelModule) },
    { path: 'house_account', loadChildren: () => import('./house-account/house-account.module').then(m => m.HouseAccountModule) },
    { path: 'sales_account', loadChildren: () => import('./sales-account/sales-account.module').then(m => m.SalesAccountModule) },
    { path: 'sales_account_form/:id', loadChildren: () => import('./sales-account-form/sales-account-form.module').then(m => m.SalesAccountFormModule) },
    { path: 'all_account', loadChildren: () => import('./all-hotels/all-hotels.module').then(m => m.AllHotelsModule) },
    { path: 'manage_ticket', loadChildren: () => import('./manage_ticket/manage_ticket.module').then(m => m.Manage_ticketModule)},
    { path: 'admin_add_ticket/:id', loadChildren: () => import('./admin_add_ticket/admin_add_ticket.module').then(m => m.Admin_add_ticketModule)},
    { path: 'manage_hotel_account/:id', loadChildren: () => import('./manage-hotel-account/manage-hotel-account.module').then(m => m.ManageHotelAccountModule) },
    // { path: 'manage_hotel_account/:id', loadChildren: () => import('./manage-hotel-placeholder/manage-hotel-placeholder.module').then(m => m.ManageHotelPlaceholderModule) },
    { path: 'create_notification/:hotel_id/:id', loadChildren: () => import('./create-notification/create-notification.module').then(m => m.CreateNotificationModule) },
    { path: 'create_group_notif/:hotel_id/:id', loadChildren: () => import('./create-group-notif/create-group-notif.module').then(m => m.CreateGroupNotifModule) },
    { path: 'dept_notification/:hotel_id/:id', loadChildren: () => import('./dept_notification/dept_notification.module').then(m => m.Dept_notificationModule) },
    { path: 'notif_placeholder/:hotel_id/:id/:flag', loadChildren: () => import('./notif_placeholder/notif_placeholder.module').then(m => m.Notif_placeholderModule) },
    { path: 'add_dept_mng_frm/:hotel_id/:id', loadChildren: () => import('./add-dept-mng-form/add-dept-mng-form.module').then(m => m.AddDeptMngFormModule) },
    { path: 'guest_msg_frm/:hotel_id/:id', loadChildren: () => import('./guest-msg-form/guest-msg-form.module').then(m => m.GuestMsgFormModule) },
    { path: 'create_emergency/:hotel_id/:id', loadChildren: () => import('./create-emergency/create-emergency.module').then(m => m.CreateEmergencyModule) },
    { path: 'pca_voice_create/:hotel_id/:id', loadChildren: () => import('./pca-voice-create/pca-voice-create.module').then(m => m.PcaVoiceCreateModule) },
    { path: 'dept_home/:id', loadChildren: () => import('./dep-mng-dashboard/dep-mng-dashboard.module').then(m => m.DepMngDashboardModule) },
    { path: 'group_home/:id', loadChildren: () => import('./group-home/group-home.module').then(m => m.GroupHomeModule) },
    { path: 'flip_book_home', loadChildren: () => import('./flip-book-hotel/flip-book-hotel.module').then(m => m.FlipBookHotelModule) },
    { path: 'hotel_db', loadChildren: () => import('./hotel-db/hotel-db.module').then(m => m.HotelDbModule) },
    { path: 'hotel_db_data/:hotel_name/:hotel_id', loadChildren: () => import('./hotel_db_data/hotel_db_data.module').then(m => m.Hotel_db_dataModule) },
    { path: 'flip_book_dash/:hotel_id', loadChildren: () => import('./flipbook_dash/flipboook_dash.module').then(m => m.Flipboook_dashModule) },
    { path: 'flip_book_create/:hotel_id/:id', loadChildren: () => import('./flip_book_create/flip_book_create.module').then(m => m.Flip_book_createModule) },
    { path: 'fundirectory', loadChildren: () => import('./fundirectory/fundirectory.module').then(m => m.FundirectoryModule) },
    { path: 'funmenu', loadChildren: () => import('./fun-menu/fun-menu.module').then(m => m.FunMenuModule) },
    { path: 'entertainment_create_calendar/:hotel_id/:id', loadChildren: () => import('./entertainment-fun-create/entertainment-fun-create.module').then(m => m.EntertainmentFunCreateModule) },
    { path:'',redirectTo:'adminlogin',pathMatch:'full'}
  ]
}
]
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
  ],
  declarations: [AdminComponent]
})
export class AdminModule {
  constructor(){
    console.log('admin module loaded')
  }
 }
