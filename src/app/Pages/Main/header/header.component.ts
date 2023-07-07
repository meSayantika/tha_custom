import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router } from '@angular/router';
import { DataService } from 'src/app/Services/data.service';

@Component({
  selector: 'main-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  val=.32;
  divOpenClose:any
  progress=0
  anim:any
  progClass:any
  hotel_id:any
  count=0
  totLength=0
  quant:any
  showInfo:any
  heading:any
  info:any
  menuSecInfo:any
  loading=false
  constructor(private router:Router, private activatedRoute:ActivatedRoute,private dataServe:DataService, private dialog:MatDialog) { 
    this.router.events.subscribe((event: any) => {
      switch (true) {
        case event instanceof NavigationStart: {
          this.loading = true;
          break;
        }

        case event instanceof NavigationEnd:
        case event instanceof NavigationCancel:
        case event instanceof NavigationError: {
        setTimeout(()=>{
          this.loading = false;

        },1000)

         
          break;
        }
        default: {
          break;
        }
      }
    });
    this.dataServe.showInfo.subscribe((show:any)=>{
      this.showInfo=show
      
      console.log(this.showInfo)
      if(this.showInfo.flag)
       { this.openNav();}
      else
        this.closeNav()
    })
  }

  ngOnInit() {
    this.dataServe.global_service(0,'/menu_sec_info','').subscribe(data=>{
      console.log(data)
      this.menuSecInfo=data;
      this.menuSecInfo=this.menuSecInfo.msg
    })
  }
  openNav(){
    this.heading=this.menuSecInfo.filter((e:any)=>e.route==this.showInfo.data && e.flag==this.showInfo.type)[0].name
    this.info=this.menuSecInfo.filter((e:any)=>e.route==this.showInfo.data && e.flag==this.showInfo.type)[0].info
    
    this.divOpenClose=document.getElementById("mySidenav")
      
    this.divOpenClose.style.width = "50%"

    
    
   
  }
  closeNav(){
      this.divOpenClose=document.getElementById("mySidenav")
      this.divOpenClose.style.width = "0"
      // this.dataServe.showInfo.next(false)
  }
}
