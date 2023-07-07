import { Component, OnInit } from '@angular/core';
import { NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router } from '@angular/router';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent implements OnInit {
  loading=false
  constructor(private router:Router) {
    this.router.events.subscribe((event: any) => {
      switch (true) {
        case event instanceof NavigationStart: {
          this.loading = true;
          break;
        }

        case event instanceof NavigationEnd:
        case event instanceof NavigationCancel:
        case event instanceof NavigationError: {
        
            this.loading = false;

         
          break;
        }
        default: {
          break;
        }
      }
    });
   }
  longText = `The Shiba Inu is the smallest of the six original and distinct spitz breeds of dog
  from Japan. A small, agile dog that copes very well with mountainous terrain, the Shiba Inu was
  originally bred for hunting.`;
  ngOnInit() {
    
  }
   move(v:any){
     if(v==1){
      this.router.navigate(['main/admin/adminlogin'])
     }
     if(v==2){
      this.router.navigate(['auth'])
     }
     if(v==3){
      this.router.navigate(['main/sales/saleslogin'])
     }
     if(v==4){
      this.router.navigate(['main/admin/deptlogin'])
     }
   }
}
