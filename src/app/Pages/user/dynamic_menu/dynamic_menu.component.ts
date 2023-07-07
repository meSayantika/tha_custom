import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { DialogBoxComponent } from 'src/app/Core/dialogBox/dialogBox.component';
import { DataService } from 'src/app/Services/data.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-dynamic_menu',
  templateUrl: './dynamic_menu.component.html',
  styleUrls: ['./dynamic_menu.component.css']
})
export class Dynamic_menuComponent implements OnInit {
  menus:any
  menuData:any
  urlSet=environment.api_url+'/'
  cover_img:any
  top_img:any
  hotel_id:any
  srv_res_flag:any
  srv_res_id:any
  spdescData:any
  constructor(private router:Router, public dialog: MatDialog,private dataServe:DataService,private activatedRoute:ActivatedRoute) { }
  ngOnInit() {
    // console.log(atob(this.activatedRoute.snapshot.params['hotel_id']),atob(this.activatedRoute.snapshot.params['srv_res_flag']),atob(this.activatedRoute.snapshot.params['srv_res_id']))
    this.hotel_id=atob(this.activatedRoute.snapshot.params['hotel_id'])
    this.srv_res_flag=atob(this.activatedRoute.snapshot.params['srv_res_flag'])
    this.srv_res_id=atob(this.activatedRoute.snapshot.params['srv_res_id'])
    this.getDynamicData()
  }
  go_to_directory(){
    this.router.navigate(['/directory/directory_home/Z/0/0/'+btoa(this.hotel_id)])
  }
  getDynamicData(){
    this.dataServe.global_service(0,'/dynamic_menu',`hotel_id=${this.hotel_id}&srv_res_flag=${this.srv_res_flag}&srv_res_id=${this.srv_res_id}`).subscribe(data=>{
      console.log(data)
      this.menuData=data
     
  

      this.menus = Object.keys( this.menuData.msg);
      for(let menu of this.menus){
      this.cover_img=this.urlSet+this.menuData.msg[menu].cov_img
      this.top_img=this.urlSet+this.menuData.msg[menu].top_img
      }
    })
  }
  view_menu(menu:any){
    console.log(menu)
    var section;
  
    // for(let menu of this.menuData){
      console.log(menu);
      section = Object.keys( this.menuData.msg[menu].sec)
      console.log(section);
      for(let sec of section){
  
          // for(let m of  this.menuData.msg[menu][sec]){
        // console.log(this.menuData.msg[menu][sec].cover_img,this.menuData.msg[menu][sec].top_img);
          // }
      }
      this.cover_img=this.urlSet+this.menuData.msg[menu].cov_img
       this.top_img=this.urlSet+this.menuData.msg[menu].top_img
  
      const dialogRef = this.dialog.open(DialogBoxComponent, {
        // width: '250px',
        height: '600px',
        width: '350px',
          autoFocus: false,
        data: { flag: 'dynamicMenuPrev', content:{arr:this.menuData.msg[menu].sec,key:menu}}
      });
      dialogRef.afterClosed().subscribe(result => {})
    // }
  }

  readSpecial(){
    const dialogRef = this.dialog.open(DialogBoxComponent, {
      // width: '250px',
      // height: '600px',
      // width: '350px',
      //   autoFocus: false,
      data: { flag: 'specialMenuPrev', content:this.spdescData}
    });
    dialogRef.afterClosed().subscribe(result => {})
  }
}
