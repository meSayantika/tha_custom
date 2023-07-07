import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DirectoryModule } from './Pages/directory/directory.module';
import { UserModule } from './Pages/user/user.module';
import { Book_resModule } from './Pages/book_res/book_res.module';


const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./Pages/Auth/Auth.module').then((m) => m.AuthModule)
  },
  {
    path: 'main',
    loadChildren: () => import('./Pages/Main/Main.module').then((m) => m.MainModule)
  },
  {
    path: 'hotel',
    loadChildren: () => import('./Pages/hotel/hotel.module').then((m) => m.HotelModule)
  },
  {
    path:'directory',
    loadChildren:()=>import('./Pages/directory/directory.module').then((m)=>DirectoryModule)
  },
  {
    path:'user',
    loadChildren:()=>import('./Pages/user/user.module').then((m)=>UserModule)
  },
  {
    path:'landing',
    loadChildren:()=>import('./Pages/Auth/landing/landing.module').then((m)=>m.LandingModule)
  },
  {
    path:'forgot-password',
    loadChildren:()=>import('./Pages/Auth/forgotpass/forgotpass.module').then((m)=>m.ForgotpassModule)
  },
  {
    path:'book_res',
    loadChildren:()=>import('./Pages/book_res/book_res.module').then((m)=>Book_resModule)
    },
  
  { path: '', redirectTo: 'landing', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes),
    ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
