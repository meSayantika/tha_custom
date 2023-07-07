import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthComponent } from './Auth.component';
import { RouterModule, Routes } from '@angular/router';
import { MatProgressBarModule } from '@angular/material/progress-bar';
const routes: Routes = [
  {
    path: '',
    component:AuthComponent,
    children:[
      {path:'',loadChildren:()=>import('./login/login.module').then((m) => m.LoginModule)},
      {path:'signup',loadChildren:()=>import('./signup/signup.module').then((m) => m.SignupModule)},
      {path:'forgotpassword',loadChildren:()=>import('./forgotpass/forgotpass.module').then((m) => m.ForgotpassModule)},
      {path:'pre_reg/:hotel_id/:user_type',loadChildren:()=>import('./pre-reg/pre-reg.module').then((m) => m.PreRegModule)},
      {path:'print_menu/:hotel_id/:menu_id',loadChildren:()=>import('./print_menu/print_menu.module').then((m) => m.Print_menuModule)},
      {path:'confirmation_mail/:id',loadChildren:()=>import('./confirmation_mail/confirmation_mail.module').then((m) => m.Confirmation_mailModule)}
     
      // {path:'forgotpassword',loadChildren:()=>import('./forgotpass/forgotpass.module').then((m) => m.ForgotpassModule)}
    ]
  }
]
@NgModule({
  imports: [
    CommonModule,
    MatProgressBarModule,
    RouterModule.forChild(routes)
  ],
  declarations: [AuthComponent]
})
export class AuthModule { 
    /**
   *
   */
    constructor() {
      console.log('AuthModule Loaded');
    }
}
