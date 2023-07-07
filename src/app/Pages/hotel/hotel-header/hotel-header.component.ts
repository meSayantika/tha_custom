import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router } from '@angular/router';
// import { NgbPopoverModule } from '@ng-bootstrap/ng-bootstrap';
import { DataService } from 'src/app/Services/data.service';
import { MatDialog } from '@angular/material/dialog';
import { MessageService } from 'src/app/Services/message.service';
import { DialogBoxComponent } from 'src/app/Core/dialogBox/dialogBox.component';
export interface prog{
  count_dt: number;
  title:string;
}
@Component({
  selector: 'app-hotel-header',
	
  templateUrl: './hotel-header.component.html',
  styleUrls: ['./hotel-header.component.css']
})

export class HotelHeaderComponent implements OnInit {
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
  arr1=[
    {
      count_dt:0,
      title:"Hotel Information"
    },{
      count_dt:0,
      title:"Questionnaire"
    },{
      count_dt:0,
      title:"Proposal"
    }
    ,{
      count_dt:0,
      title:"Departments"
    }
    ,{
      count_dt:0,
      title:"Managers"
    }
    ,{
      count_dt:0,
      title:"Managers"
    }
  ]
  loading=false;
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
  this.dataServe.showInfo.subscribe(show=>{
    this.showInfo=show
    
    console.log(this.showInfo)
    if(this.showInfo.flag)
     { this.openNav();}
    else
      this.closeNav()
  })
}
  progressList:any
  ngOnInit() {
    this.dataServe.global_service(0,'/menu_sec_info','').subscribe(data=>{
      console.log(data)
      this.menuSecInfo=data;
      this.menuSecInfo=this.menuSecInfo.msg
    })
    this.hotel_id=localStorage.getItem('hotel_id')
    console.log(this.hotel_id)
    this.dataServe.global_service(0,'/dashboard_prog',`hotel_id=${this.hotel_id}`).subscribe(data=>{
      console.log(data)
      this.progressList=data
      this.progressList=this.progressList.msg
      // console.log(this.progressList.msg)
      for(let i=0;i<this.progressList.length;i++){
        // this.arr.push(this.progressList[i])
        if(this.progressList[i].count_dt>0)
        this.count++
        // this.progressBar()
      }
     for(let i=0;i<this.progressList.length;i++){
      if(this.progressList[i].title=='Menu Setup'){
        for(let j=0;j<this.progressList[i].menu_list.length;j++){
          if(this.progressList[i].menu_list[j].count_dt>0){
            this.count++
          }
          this.totLength=this.progressList[i].menu_list.length
        }
      }
     }
        this.totLength+=this.progressList.length
        this.quant=this.count/this.totLength
        this.quant=this.quant*100
        // this.quant=74
  
    })
   

  }
  progressBar():any {
    // console.log('hello')
    this.progress = (this.val * 100 > 600) ? 600 : this.val * 100; /* 50 is 1/8th of height, 400 is height */
    this.val += .27;
  
    this.progClass=document.getElementsByClassName('progress-now')
  
    if (this.val > 8) 
    {this.val = 0;
    }
  }
  viewProg(){
   
      const dialogRef = this.dialog.open(DialogBoxComponent, {
        height:'400px',
        width: '65%',
          autoFocus: false,
        data: { flag: 'progress', content:this.progressList  }
      });
      dialogRef.afterClosed().subscribe(result => {
       
      })
    
  }
  openNav(){
    this.heading=this.menuSecInfo.filter((e:any)=>e.route==this.showInfo.data)[0].name
    this.info=this.menuSecInfo.filter((e:any)=>e.route==this.showInfo.data)[0].info
    
    this.divOpenClose=document.getElementById("mySidenav")
      
    this.divOpenClose.style.width = "50%"

    
    
   
  }
  closeNav(){
      this.divOpenClose=document.getElementById("mySidenav")
      this.divOpenClose.style.width = "0"
      // this.dataServe.showInfo.next(false)
  }
}
