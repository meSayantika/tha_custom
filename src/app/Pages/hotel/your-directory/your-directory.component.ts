import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig  } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { DialogBoxComponent } from 'src/app/Core/dialogBox/dialogBox.component';
import { DataService } from 'src/app/Services/data.service';
import { MessageService } from 'src/app/Services/message.service';
import { environment } from 'src/environments/environment';
import { CalendarComponent } from 'src/app/Core/calendar/calendar.component';


@Component({
  selector: 'app-your-directory',
  templateUrl: './your-directory.component.html',
  styleUrls: ['./your-directory.component.css']
})
export class YourDirectoryComponent implements OnInit {
  getVenues:any
  calData:any

  getVenuesRest:any;
 getVenuesServe:any;
 msgData:any
 getEmData:any
 getvoiceData:any
 getvoiceDataNew:any=[]
 audFilePlay:any;
  audPath=new Audio();
  hotel_id: any;
  getAvatarData: any;
  id: any;
  spstockImg: any;
  pcaForm: any;
  guestRoomService:any
  getVIPFlag:any
  vipMsgData:any
  count=0
  messages:any
  getSafetyFaqData:any
  getConciergeFaqData:any
  getHotelFaqData:any
  getLostData:any
  divExp:any
  ent_cal:any
  fd:any
  wifi:any
  photo_ops:any
  con_faq:any
  fun_dir:any
  promo:any
  saf_faq:any
  hot_faq:any
  lost_found:any
  sug_box1:any
  menuShow:any
  flip_book:any
  row_id:any;
  styleData: any;
  bgCol: any;
  txtCol: any;
  bordCol: any;
  thick: any;
  cover: any;
  imgSrc: any;
  headerSize: any;
  subHeaderSize: any;
  expCol: any;
  fd_img: any;
  wifi_pass: any;
  rs_img: any;
  entertainment_img: any;
  photo_ops_img: any;
  con_faq_img: any;
  fun_directory_img: any;
  promotions_img: any;
  safety_img: any;
  hotelf_img: any;
  suggestion_img: any;
  lost_found_img: any;
  vacation_img: any;
  banner1_url: any;
  banner2_url: any;
  othStyle: any;
  dirRow: any;
  innerCol:any
  url=environment.api_url+'/'
  showText:boolean=false;
  buttonCol: any;
  
  constructor(private router:Router, public dialog: MatDialog,private msg:MessageService,private dataServe:DataService, private activatedRoute:ActivatedRoute) { }

  ngOnInit() {
   
    this.hotel_id=atob(this.activatedRoute.snapshot.params['hotel_id'])
    this.getCat()
    this.getAvatar()
    this.getStyleData()
    console.log(this.hotel_id)
    setTimeout(()=>{
      this.dirRow=document.querySelectorAll('.setCol span')
      this.dirRow.forEach((e:any)=>e.style.fontFamily=this.styleData.font_family)
      this.dirRow=document.querySelectorAll('.setCol div')
      this.dirRow.forEach((e:any)=>e.style.fontFamily=this.styleData.font_family)
    },2000)
    this.activatedRoute.fragment.subscribe(data=>{
      console.log(data)
      this.jumpTo(data)
    })
    this.dataServe.global_service(0,'/dir_msg_center',`hotel_id=${this.hotel_id}&flag=V`).subscribe(data=>{
      console.log(data)
      this.vipMsgData=data
      this.count=this.vipMsgData.tot_msg
    
    })
    var dt={
      msg_type:'V',
      hotel_id:this.hotel_id
    }
    // this.messages=Object.keys(this.data.content)
    // console.log(this.messages)
    var date = new Date();
    
    this.dataServe.emit('hotel_msg',dt)
    this.dataServe.listen('hotel_msg').subscribe(data=>{
      console.log(data)
      this.getvoiceDataNew=data
      this.count=this.getvoiceDataNew?.msg[0]?.tot_msg
      // this.vipMsgData.msg[`${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`].push()
      // this.vipMsgData.msg[`${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`].push(this.getvoiceDataNew.msg[`${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`])
    })
    this.getEditableData()
  }
  getEditableData(){
    console.log(this.hotel_id)
    this.dataServe.global_service(0,'/dir_live',`hotel_id=${this.hotel_id}`).subscribe(data=>{
      console.log(data)
      this.menuShow=data
      this.menuShow=this.menuShow.msg
      // this.fd=this.menuShow[0].fd
      this.ent_cal=this.menuShow[0].ent_cal
      this.photo_ops=this.menuShow[0].photo_ops
      this.con_faq=this.menuShow[0].con_faq
      this.fun_dir=this.menuShow[0].fun_dir
      this.promo=this.menuShow[0].promo
      this.saf_faq=this.menuShow[0].saf_faq
      this.hot_faq=this.menuShow[0].hot_faq
      this.lost_found=this.menuShow[0].lost_found
      this.sug_box1=this.menuShow[0].sug_box
      this.flip_book=this.menuShow[0].flip_book
      this.row_id=this.menuShow[0].id
      // console.log(this.menuShow[0].ent_cal)
    })
  }
  jumpTo(section:any){
    document.getElementById(section)?.scrollIntoView({behavior:'smooth'})

  }
  getCat(){
    // localStorage.setItem('VIPFlag','Y')
    // this.getVIPFlag=localStorage.getItem('VIPFlag')
    this.getVIPFlag=localStorage.getItem('type')
    console.log(this.hotel_id)
    this.dataServe.global_service(0,'/cust_menu_list',`hotel_id=${this.hotel_id}`).subscribe((data:any)=>{
      // console.log(data,this.category);
      console.log(data)
      this.getVenues=data;
      // if(this.category=='R'){
        this.getVenuesRest=this.getVenues.msg.restaurant
        this.guestRoomService=this.getVenues.msg.restaurant.filter((e:any)=>e.hotel_type=='S')[0]
      // }
      // else{
        this.getVenuesServe=this.getVenues.msg.service

      // }
      // this.mncdata=this.getVenues.msg[0].id; //to be changed
  
      // this.putdata(this.getVenues.msg);
    }
  ,error=>{this.msg.globalError(error.status+' '+error.statusText+' in '+error.url)}
    
    )
  

}
open_popup_window(v:any){
  
      // console.log(this.mncdata,this.r_id)
      // window.open('https://custom.shoplocal-lagunabeach.com/#/'+'user/user_menu'+'/'+encodeURIComponent(btoa('1'))+'/'+encodeURIComponent(btoa(v)),'popup','width=400,height=500')
      window.open(environment.routeUrl+'user/user_menu'+'/'+encodeURIComponent(btoa('1'))+'/'+encodeURIComponent(btoa(v)),'popup','width=400,height=500')
      // window.open('http://localhost:4200/#/main/admin/adminlogin','popup','width=400,height=500')
      
    }
openMessageCenter(){
  this.dataServe.global_service(0,'/dir_msg_center',`hotel_id=${this.hotel_id}&flag=H`).subscribe(data=>{
    console.log(data)
    this.msgData=data
    const dialogRef = this.dialog.open(DialogBoxComponent, {
      // width: '250px',
      height: this.msgData.tot_msg>1?'600px':'auto',

      width: '100%',
        autoFocus: false,
      data: { flag: 'msgCenter', content:this.msgData.msg}
    });
    dialogRef.afterClosed().subscribe(result => {
    })
  // }

  },error=>{this.msg.globalError(error.status+' '+error.statusText+' in '+error.url)})
}
openEmergencyMessages(){
  this.dataServe.global_service(0,'/emergency_repo','').subscribe(data=>{
    console.log(data)
    this.getEmData=data;
    const dialogRef = this.dialog.open(DialogBoxComponent, {
      // width: '250px',
      height: this.getEmData.msg.length>1?'600px':'auto',

      width: '100%',
        autoFocus: false,
      data: { flag: 'emergencyMessage', content:this.getEmData.msg}
    });
    dialogRef.afterClosed().subscribe(result => {})
  })
}
openAbout(){
  this.dataServe.global_service(0,'/pc_avatar',`hotel_id=${this.hotel_id}`).subscribe(data=>{
    console.log(data)
    this.getAvatarData=data;
    // this.id=this.getAvatarData.msg[0]?.id
    this.spstockImg=environment.api_url+'/'+this.getAvatarData.msg[0]?.img_path
  this.dataServe.global_service(0,'/pc_voice',`hotel_id=${this.hotel_id}&srv_res_id=0`).subscribe(data=>{
    console.log(data)
    this.getvoiceData=data;
    const dialogRef = this.dialog.open(DialogBoxComponent, {
      // width: '250px',
      height: '600px',
      width: '100%',
        autoFocus: false,
      data: { flag: 'aboutPCA', content:{data:this.getvoiceData.msg[0],image:this.spstockImg}}
    });
    dialogRef.afterClosed().subscribe(result => {})
  })
})

}
getAvatar(){
  
  this.dataServe.global_service(0,'/pc_avatar',`hotel_id=${this.hotel_id}`).subscribe(data=>{
    console.log(data)
    this.getAvatarData=data;
    // this.id=this.getAvatarData.msg[0]?.id
    this.spstockImg=environment.api_url+'/'+this.getAvatarData.msg[0]?.img_path
  
  },error=>{this.msg.globalError(error.status+' '+error.statusText+' in '+error.url)}
  
    )
}
 getVIPMessages(){
  this.dataServe.global_service(0,'/dir_msg_center',`hotel_id=${this.hotel_id}&flag=V`).subscribe(data=>{
    console.log(data)
    this.msgData=data
    const dialogRef = this.dialog.open(DialogBoxComponent, {
      // width: '250px',
      // height: '600px',
        height: this.msgData.tot_msg>1?'600px':'auto',
     
        width: '100%',
        autoFocus: false,
      data: { flag: 'msgCenter', content:this.msgData.msg}
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result==1){
        console.log(result)
        this.jumpTo('r_3')
      }
    })
  // }

  },error=>{this.msg.globalError(error.status+' '+error.statusText+' in '+error.url)})
 }
 getGroupMessages(){
  this.dataServe.global_service(0,'/dir_msg_center',`hotel_id=${this.hotel_id}&flag=G`).subscribe(data=>{
    console.log(data)
    this.msgData=data
    const dialogRef = this.dialog.open(DialogBoxComponent, {
      // width: '250px',
      // height: '600px',
        height: this.msgData.tot_msg>1?'600px':'auto',
     
        width: '100%',
        autoFocus: false,
      data: { flag: 'msgCenter', content:this.msgData.msg}
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result==1){
        console.log(result)
        this.jumpTo('r_3')
      }
    })
  // }

  },error=>{this.msg.globalError(error.status+' '+error.statusText+' in '+error.url)})
 }
 sug_box(){
  const dialogRef = this.dialog.open(DialogBoxComponent, {
    // width: '250px',
    // height: '600px',
      height: '600px',
   
      width: '100%',
      autoFocus: false,
    data: { flag: 'sug_box', content:null}
  });
  dialogRef.afterClosed().subscribe(result => {
    if(result==1){
      console.log(result)
      this.jumpTo('r_3')
    }
  })
 }
 itemLost(){
  const dialogRef = this.dialog.open(DialogBoxComponent, {
    // width: '250px',
    // height: '600px',
      height: 'auto',
   
      width: '100%',
      autoFocus: false,
    data: { flag: 'lost', content:null}
  });
  dialogRef.afterClosed().subscribe(result => {
    if(result==1){
      // console.log(result)
      // this.jumpTo('r_3')
    }
  })
 }
 openPromotions(){
  this.dataServe.global_service(0,'/dir_msg_center',`hotel_id=${this.hotel_id}&flag=R`).subscribe(data=>{
    console.log(data)
    this.msgData=data
    const dialogRef = this.dialog.open(DialogBoxComponent, {
      // width: '250px',
      height: this.msgData.tot_msg>1?'600px':'auto',

      width: '100%',
        autoFocus: false,
      data: { flag: 'msgCenter', content:this.msgData.msg}
    });
    dialogRef.afterClosed().subscribe(result => {
    })
  // }

  },error=>{this.msg.globalError(error.status+' '+error.statusText+' in '+error.url)})
}
openPhotoOps(){
  this.dataServe.global_service(0,'/dir_msg_center',`hotel_id=${this.hotel_id}&flag=O`).subscribe(data=>{
    console.log(data)
    this.msgData=data
    const dialogRef = this.dialog.open(DialogBoxComponent, {
      // width: '250px',
      height: this.msgData.tot_msg>1?'600px':'auto',

      width: '100%',
        autoFocus: false,
      data: { flag: 'msgCenter', content:this.msgData.msg}
    });
    dialogRef.afterClosed().subscribe(result => {
    })
  // }

  },error=>{this.msg.globalError(error.status+' '+error.statusText+' in '+error.url)})
}
preview_fun(){
  window.open(environment.funURl,'popup','width=400,height=700')
}
getSafetyFaq(){
  this.dataServe.global_service(0,'/faq',`hotel_id=${this.hotel_id}&flag=S`).subscribe(data=>{
    console.log(data)
    this.getSafetyFaqData=data
    this.getSafetyFaqData=this.getSafetyFaqData.msg
    // this.faqSavedData=data;
    // this.faqSavedData=this.faqSavedData.msg
    const dialogRef = this.dialog.open(DialogBoxComponent, {
      // width: '250px',
      height: this.getSafetyFaqData.length>4?'400px':'auto',

      width: '100%',
        autoFocus: false,
      data: { flag: 'faqFlag', content:this.getSafetyFaqData}
    });
    dialogRef.afterClosed().subscribe(result => {
    })
  
   
  },error=>{this.msg.globalError(error.status+' '+error.statusText+' in '+error.url)})
}
getConciergeFaq(){
  this.dataServe.global_service(0,'/faq',`hotel_id=${this.hotel_id}&flag=C`).subscribe(data=>{
    console.log(data)
    // this.faqSavedData=data;
    // this.faqSavedData=this.faqSavedData.msg
   this.getConciergeFaqData=data
   this.getConciergeFaqData=this.getConciergeFaqData.msg
   const dialogRef = this.dialog.open(DialogBoxComponent, {
    // width: '250px',
    height: this.getConciergeFaqData.length>4?'400px':'auto',

    width: '100%',
      autoFocus: false,
    data: { flag: 'faqFlag', content:this.getConciergeFaqData}
  });
  dialogRef.afterClosed().subscribe(result => {
  })
   
  },error=>{this.msg.globalError(error.status+' '+error.statusText+' in '+error.url)})
}
getHotelFaq(){
  this.dataServe.global_service(0,'/faq',`hotel_id=${this.hotel_id}&flag=H`).subscribe(data=>{
    console.log(data)
    this.getHotelFaqData=data
    this.getHotelFaqData=this.getHotelFaqData.msg
    // this.faqSavedData=data;
    // this.faqSavedData=this.faqSavedData.msg
    const dialogRef = this.dialog.open(DialogBoxComponent, {
      // width: '250px',
      height: this.getHotelFaqData.length>4?'400px':'auto',

  
      width: '100%',
        autoFocus: false,
      data: { flag: 'faqFlag', content:this.getHotelFaqData}
    });
    dialogRef.afterClosed().subscribe(result => {
    })
  
   
  },error=>{this.msg.globalError(error.status+' '+error.statusText+' in '+error.url)})
}
viewLost(){
  this.dataServe.global_service(0,'/lost_found',`hotel_id=${this.hotel_id}`).subscribe(data=>{
    console.log(data)
    this.getLostData=data
    this.getLostData=this.getLostData.msg
    const dialogRef = this.dialog.open(DialogBoxComponent, {
      // width: '250px',
      // height: '600px',
        height: 'auto',
     
        width: '100%',
        autoFocus: false,
      data: { flag: 'lostDash', content:this.getLostData}
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result==1){
        // console.log(result)
        // this.jumpTo('r_3')
      }
    })
  },error=>{this.msg.globalError(error.status+' '+error.statusText+' in '+error.url)})
  
}
move_to(e:any){
  console.log(localStorage.getItem('hotel_id'))
  console.log(e)
  
  this.hotel_id=localStorage.getItem('hotel_id')
  
  if(e=='dept'){
    this.router.navigate(['hotel/add-department',btoa(this.hotel_id)]).catch(e=>this.msg.globalError(e))
  }
  else if (e=='home')
  {
    this.router.navigate(['hotel/home',btoa(this.hotel_id)]).catch(e=>this.msg.globalError(e))

  }
  else if (e=='managers')
  {
    this.router.navigate(['hotel/add-managers',btoa(this.hotel_id)]).catch(e=>this.msg.globalError(e))

 }
 else if(e=='Avatar'){
  this.router.navigate(['hotel/add-pca',btoa(this.hotel_id)]).catch(e=>this.msg.globalError(e))

 }
 else if(e=='Voice'){
  this.router.navigate(['hotel/add-voice',btoa(this.hotel_id)]).catch(e=>this.msg.globalError(e))

 }
 else if(e=='progress'){
  this.router.navigate(['hotel/hotel_progress',btoa(this.hotel_id)]).catch(e=>this.msg.globalError(e))

 }
 else if(e=='comm'){
  this.router.navigate(['hotel/hotel_communications',btoa(this.hotel_id)]).catch(e=>this.msg.globalError(e))

 }
 else if(e=='emergency'){
  this.router.navigate(['hotel/hotel_emergency_report',btoa(this.hotel_id)]).catch(e=>this.msg.globalError(e))

 }
 else if(e=='Employee'){
  this.router.navigate(['hotel/hotel_emp_msg',btoa(this.hotel_id)]).catch(e=>this.msg.globalError(e))

 }
 else if(e=='Guest'){
  this.router.navigate(['hotel/hotel_guest_msg',btoa(this.hotel_id)]).catch(e=>this.msg.globalError(e))

 }
 else if(e=='qsn'){
  this.router.navigate(['hotel/hotel_qsn',btoa(this.hotel_id)]).catch(e=>this.msg.globalError(e))

 }
 else if(e=='proposal'){
  this.router.navigate(['hotel/hotel_proposal',btoa(this.hotel_id)]).catch(e=>this.msg.globalError(e))

 }
 else if(e=='group'){
  this.router.navigate(['hotel/hotel_add_group_leader',btoa(this.hotel_id)]).catch(e=>this.msg.globalError(e))

 }
 else if(e=='Promotions'){
  this.router.navigate(['hotel/hotel_promo_dash',btoa(this.hotel_id)]).catch(e=>this.msg.globalError(e))

 }
 else if(e=='Photo OPS'){
  this.router.navigate(['hotel/hotel_photo',btoa(this.hotel_id)]).catch(e=>this.msg.globalError(e))

 }
 else if(e=='Flip Book'){
  this.router.navigate(['hotel/hotel_flip',btoa(this.hotel_id)]).catch(e=>this.msg.globalError(e))

 }
 else if(e=='suggest'){
  this.router.navigate(['hotel/suggestion',btoa(this.hotel_id)]).catch(e=>this.msg.globalError(e))

 }
 else if(e=='platformfaq'){
  this.router.navigate(['hotel/platform_faq',btoa(this.hotel_id)]).catch(e=>this.msg.globalError(e))

 }
 else if(e=='By Admin'){
  this.router.navigate(['hotel/lost_found_home',btoa(this.hotel_id)]).catch(e=>this.msg.globalError(e))

 }
 else if(e=='By Guest'){
  this.router.navigate(['hotel/lost_found_guest',btoa(this.hotel_id)]).catch(e=>this.msg.globalError(e))

 }
 else if(e=='your_directory'){
  this.router.navigate(['hotel/your_directory',btoa(this.hotel_id)]).catch(e=>this.msg.globalError(e))

 }
}
setup_mode(e:any,id:any,div_flag:any){
  console.log(e,id)
  this.divExp=document.getElementById(id);
  console.log(this.divExp)
  if(e.checked){
    this.divExp.style.display='none'
    this.divExp.setAttribute('hidden',true)
  }
  else{
    this.divExp.style.display='block'
    this.divExp.removeAttribute('hidden')
    
  }
  //dir_live id,hotel_id,flag=Y/N div_flag
  var dt={
    hotel_id:this.hotel_id,
    flag:e.checked?'Y':'N',
    div_flag:id,
    id:this.row_id
  }
  this.dataServe.global_service(1,'/dir_live',dt).subscribe(data=>{
    console.log(data)
  })
}

getStyleData(){
  console.log(this.hotel_id)
  this.dataServe.global_service(0,'/dir_setup',`hotel_id=${this.hotel_id}`).subscribe(data=>{console.log(data)
  this.styleData=data
  this.styleData=this.styleData.msg[0]
  console.log(this.styleData)
  this.bgCol=this.styleData.bg_col
  this.txtCol=this.styleData.txt_col
  this.bordCol=this.styleData.bord_col
  this.thick=this.styleData.bord_thickness
  this.cover=this.styleData.cover
  this.imgSrc=this.styleData.div_img
  this.headerSize=this.styleData.header_size
  this.subHeaderSize=this.styleData.subheader_size
  this.expCol=this.styleData.expansion_col
  this.fd_img=this.styleData.fd_img
  this.wifi_pass=this.styleData.wifi_pass
  // this.wifi_img=this.url+this.styleData.wifi_img
  this.rs_img=this.styleData.rs_img
  this.entertainment_img=this.styleData.entertainment_img
  this.photo_ops_img=this.styleData.photo_ops_img
  this.con_faq_img=this.styleData.con_faq_img
  this.fun_directory_img=this.styleData.fun_directory_img
  this.promotions_img=this.styleData.promotions_img
  this.safety_img=this.styleData.safety_img
  this.hotelf_img=this.styleData.hotelf_img
  this.suggestion_img=this.styleData.suggestion_img
  this.lost_found_img=this.styleData.lost_found_img
  this.vacation_img=this.styleData.vacation_img
  this.banner1_url=this.styleData.banner1_img
  this.banner2_url=this.styleData.banner2_img
  this.othStyle=this.styleData.other_font
  this.innerCol=this.styleData.inner_border_col
  this.buttonCol=this.styleData.msg_btn_col
  console.log(this.styleData.fdCall)
  console.log(this.wifi_pass)
//  this.dirRow=document.getElementById('dirRow')
//   this.dirRow.style.fontFamily=this.styleData.font_family
//   this.dirRow=document.getElementById('perCon')
//   this.dirRow.style.fontFamily=this.styleData.font_family
//   this.dirRow=document.getElementById('divAv')
//   this.dirRow.style.fontFamily=this.styleData.font_family
//   this.dirRow=document.getElementById('divCom')
//   this.dirRow.style.fontFamily=this.styleData.font_family

  this.dirRow=document.querySelectorAll('.setCol span')
  this.dirRow.forEach((e:any)=>e.style.fontFamily=this.styleData.font_family)

  this.dirRow=document.querySelectorAll('.setCol div')
  this.dirRow.forEach((e:any)=>e.style.fontFamily=this.styleData.font_family)
})
}
openCalendar(flag:any,id:any){
  this.dataServe.global_service(0,'/calendar',`hotel_id=${this.hotel_id}`).subscribe(data=>{
    console.log(data)
    this.calData=data
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = false;
    dialogConfig.closeOnNavigation = false;
    dialogConfig.disableClose = true;
    dialogConfig.hasBackdrop = false;
    dialogConfig.width = '100%';
    dialogConfig.height = '100%';
    dialogConfig.panelClass = "fullscreen-dialog"
    dialogConfig.data = {flag: 'calendar', content:this.calData}
    const dialogref = this.dialog.open(
      CalendarComponent,
      dialogConfig,
     

    );
  // const dialogRef = this.dialog.open(DialogBoxComponent, {
   
  //     height: '500px',
   
  //     width: '100vh',
      
  //     autoFocus: false,
  //   data: { flag: 'calendar', content:this.getLostData}
  // });
  dialogref.afterClosed().subscribe(result => {
   
  })
  },error=>{this.msg.globalError(error.status+' '+error.statusText+' in '+error.url)})
 
}
}




