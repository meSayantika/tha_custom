import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { DialogBoxComponent } from 'src/app/Core/dialogBox/dialogBox.component';
import { DataService } from 'src/app/Services/data.service';
import { MessageService } from 'src/app/Services/message.service';
import { environment } from 'src/environments/environment';
interface icon_type{
  type:string;
  name:string;
}
@Component({
  selector: 'app-directory-design',
  templateUrl: './directory-design.component.html',
  styleUrls: ['./directory-design.component.css']
})

export class DirectoryDesignComponent implements OnInit {
  cover: any=[];
fd:any=[]
rs:any=[]
conf:any=[]
ent:any=[]
fun:any=[]
wifi:any=[]
lostfound:any=[]
promoArr:any=[]
restArr:any=[]
photo:any=[]
banner1:any=[]
banner2:any=[]
safety:any=[]
hotel:any=[]
sugg:any=[]
vac:any=[]
bgCol:any
txtCol:any
bordCol:any
buttonCol:any
innerCol:any
expCol:any
  getVenues:any
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
  bordDiv:any
  textDiv:any
  backDiv:any
  thick=' 2px'
  icon='home'
  dt:any={}
 index:any
  coverURL:any
  fdURL:any
  wifiURL:any
rsURL:any
entURL:any
photoURL:any
confURL:any
funURL:any
promoURL:any
banner1_url:any
banner2_url:any
safetyURL:any
hotelURL:any
suggURL:any
lostfoundURL:any
vacURL:any
imageData:any
imgSrc:any
headerSize:any
subHeaderSize:any
othSize:any
fontFam:any
url1 = environment.api_url + '/stock/'
dirRow:any 
restURL:any=[]
restNames:any=[]
styleData:any
imageIcons:any
showText:boolean=false;
wifi_pass:any
url=environment.api_url+'/'
fd_img:any
rs_img:any
showBrouseImage:boolean = false
showRestImage:boolean =false
openstockimages: any;
entertainment_img:any
  photo_ops_img:any
  con_faq_img:any
  fun_directory_img:any
  promotions_img:any
  safety_img:any
  hotelf_img:any
  suggestion_img:any
  lost_found_img:any
  vacation_img:any
  othStyle:any
  stockImageName: any;
  common_for_special_menu:any;
  imgcat:any;
  st_img: any;
  previous_id:any;
  stockImg1:any;
  image_getelement:any
  apiurlset=environment.api_url+'/';
  category_name:any
  clicked_stock_btn:any = ''
  clicked_stock_rest_btn:any = ''
  clicked_stock_rest_index:any = ''
iconList=[{
  label:'fdCall',
  name:''
},
{
  label:'rsMenu',
  name:''
},
{
  label:'rsCall',
  name:''
},
{
  label:'rsOrder',
  name:''
},
{
  label:'entView',
  name:''
},
{
  label:'photoOps',
  name:''
},
{
  label:'conFaqIcon',
  name:''
},
{
  label:'funDirIcon',
  name:''
},
{
  label:'promoIcon',
  name:''
}
,
{
  label:'safetyIcon',
  name:''
}
,
{
  label:'hotelFaqIcon',
  name:''
}
,
{
  label:'lostFoundCall',
  name:''
}
,
{
  label:'lostFoundView',
  name:''
}
,
{
  label:'SuggBoxIcon',
  name:''
}
,
{
  label:'VacBookIcon',
  name:''
},
{
  label:'wifiCall',
  name:''
}
]
iconArr:any={}
restIconArr:any=[]
servIconArr:any=[]
  see_photo: any;
  
  constructor(private domSan:DomSanitizer, private router:Router, public dialog: MatDialog,private msg:MessageService,private dataServe:DataService, private activatedRoute:ActivatedRoute) { }

  ngOnInit() {
    this.hotel_id=atob(this.activatedRoute.snapshot.params['hotel_id'])
    this.getCat()
    this.getAvatar()
    this.getImages('')
    // this.getStyleData()
    this.getCategoryList()
    this.getStockimageonselectcategory('')

    for(let i=28; i<=30; i++){
      this.getIcons(i)
      console.log(this.iconArr);
    }

    

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
    })
    this.getEditableData()
  }
  getEditableData(){
    this.dataServe.global_service(0,'/dir_live',`hotel_id=${this.hotel_id}`).subscribe(data=>{
      console.log(data)
      this.menuShow=data
      this.menuShow=this.menuShow.msg

      this.ent_cal=this.menuShow[0]?.ent_cal
      this.photo_ops=this.menuShow[0]?.photo_ops
      this.con_faq=this.menuShow[0]?.con_faq
      this.fun_dir=this.menuShow[0]?.fun_dir
      this.promo=this.menuShow[0]?.promo
      this.saf_faq=this.menuShow[0]?.saf_faq
      this.hot_faq=this.menuShow[0]?.hot_faq
      this.lost_found=this.menuShow[0]?.lost_found
      this.sug_box1=this.menuShow[0]?.sug_box
      this.flip_book=this.menuShow[0]?.flip_book
      this.row_id=this.menuShow[0]?.id
      // console.log(this.menuShow[0]?.ent_cal)
    })
  }
  jumpTo(section:any){
    document.getElementById(section)?.scrollIntoView({behavior:'smooth'})

  }
  getCat(){
    // localStorage.setItem('VIPFlag','Y')
    // this.getVIPFlag=localStorage.getItem('VIPFlag')
    this.getVIPFlag=localStorage.getItem('type')
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

      this.getStyleData();
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
setPath(v:any){
  this.imgSrc=v
}
setHeaderSize(v:any){
 this.headerSize=v
 console.log(this.headerSize)
}
setSubheaderSize(v:any){
  this.subHeaderSize=v
}
setOthSize(v:any){
  this.othSize=v
}
setFont(v:any){
 this.fontFam=v
 console.log(this.fontFam)

 this.dirRow=document.getElementById('dirRow')
//  this.dirRow.style.fontFamily="Times New Roman,serif"
 this.dirRow.style.fontFamily=this.fontFam
 this.dirRow=document.getElementById('perCon')
 //  this.dirRow.style.fontFamily="Times New Roman,serif"
  this.dirRow.style.fontFamily=this.fontFam
 

  this.dirRow=document.querySelectorAll('.setCol span')
  this.dirRow.forEach((e:any)=>e.style.fontFamily=this.fontFam)

  this.dirRow=document.querySelectorAll('.setCol div')
  this.dirRow.forEach((e:any)=>e.style.fontFamily=this.fontFam)

 console.log(this.dirRow.style)
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
  go_home(){
    history.back()
  }
  changeBordCol(){
    this.bordDiv=document.getElementById('borderCol')
    this.bordDiv.click()
  }
  changeTextCol(){
    this.textDiv=document.getElementById('textCol')
    this.textDiv.click()
  }
  changeBackCol(){
    this.backDiv=document.getElementById('backCol')
    this.backDiv.click()
  }
  changeExpCol(){
    this.backDiv=document.getElementById('expCol')
    this.backDiv.click()
  }
  getImages(id: any) {
    this.dataServe.global_service(0, '/stock_img', `cat_id=${id}`).subscribe(data => {
      console.log(data);
      this.imageData = data;
      this.imageData = this.imageData.msg
    },error=>{this.msg.globalError(error.status+' '+error.statusText+' in '+error.url)})
  }
  getIcons(id:any){
    this.dataServe.global_service(0, '/stock_img', `cat_id=${id}`).subscribe(data => {
      console.log(data);
      this.imageIcons= data;
      if(this.imageIcons.suc > 0) {
        this.imageIcons = this.imageIcons.msg
        if(this.iconArr.length > 0) {
          this.iconArr.push(...this.imageIcons)
        }else{
          this.iconArr = this.imageIcons
        }
      }
      
      // this.iconArr[id] = this.imageIcons
      console.log(this.iconArr);
    },error=>{this.msg.globalError(error.status+' '+error.statusText+' in '+error.url)})
  }
  getType(pt:any){
    this.thick=pt
    
    // this.thick=' 4px '
    console.log(this.thick)
    this.backDiv=document.getElementById('dirRow')
    // console.log(this.backDiv.style)
    this.backDiv.style.border='solid '+this.thick+' '+this.bordCol
    console.log(this.backDiv.style)

  }
  onIconSelect(icon: string,key:any) {
    console.log('on icon select called')
    if(icon!='home'){
    this.icon = icon;
      this.dt[key] = icon
    console.log(this.dt)
    console.log(this.dt['fd_call'])
    console.log(this.dt['rs_menu'])
    console.log(this.dt['rs_call'])
  }
}
onSelectCover(event:any) {
  console.log(event);
  this.cover.push(...event.addedFiles);
 this.coverURL=this.domSan.bypassSecurityTrustUrl(window.URL.createObjectURL(this.cover[0]))

 
}

onRemoveCover() {
  this.cover.splice(0, 1);
  this.coverURL=null
}
onSelectFD(event:any) {
  console.log(event);
  this.fd.push(...event.addedFiles);
 this.fdURL=this.domSan.bypassSecurityTrustUrl(window.URL.createObjectURL(this.fd[0]))
 console.log(this.fd)
}
onRemoveFD() {
  this.fd.splice(0, 1);
  this.fdURL=null
  console.log(this.fd)
}
onRemoveFD_img() {
  this.fd.splice(0, 1);
  this.fd_img=null
}
onSelectWIFI(event:any){
console.log(event);
this.wifi.push(...event.addedFiles);
this.wifiURL=this.domSan.bypassSecurityTrustUrl(window.URL.createObjectURL(this.wifi[0]))
}
onRemoveWIFI(){
  this.wifi.splice(0,1);
  this.wifiURL=null
}
onSelectRS(event:any) {
  console.log(event);
  this.rs.push(...event.addedFiles);
 this.rsURL=this.domSan.bypassSecurityTrustUrl(window.URL.createObjectURL(this.rs[0]))
}
onRemoveRS() {
  this.rs.splice(0, 1);
  this.rsURL=null
}
onSelectENT(event:any) {
  console.log(event);
  this.ent.push(...event.addedFiles);
 this.entURL=this.domSan.bypassSecurityTrustUrl(window.URL.createObjectURL(this.ent[0]))
}
onRemoveENT() {
  this.ent.splice(0, 1);
  this.entURL=null
}
onSelectPhoto(event:any) {
  console.log(event);
  this.photo.push(...event.addedFiles);
 this.photoURL=this.domSan.bypassSecurityTrustUrl(window.URL.createObjectURL(this.photo[0]))
}
onRemovePhoto() {
  this.photo.splice(0, 1);
  this.photoURL=null
}
onSelectConf(event:any) {
  console.log(event);
  this.conf.push(...event.addedFiles);
 this.confURL=this.domSan.bypassSecurityTrustUrl(window.URL.createObjectURL(this.conf[0]))
}
onRemoveConf() {
  this.conf.splice(0, 1);
  this.confURL=null
}

onSelectFun(event:any) {
  console.log(event);
  this.fun.push(...event.addedFiles);
 this.funURL=this.domSan.bypassSecurityTrustUrl(window.URL.createObjectURL(this.fun[0]))
}
onRemoveFun() {
  this.fun.splice(0, 1);
  this.funURL=null
}
onSelectPromo(event:any) {
  console.log(event);
  this.promoArr.push(...event.addedFiles);
 this.promoURL=this.domSan.bypassSecurityTrustUrl(window.URL.createObjectURL(this.promoArr[0]))
}
onRemovePromo() {
  this.promoArr.splice(0, 1);
  this.promoURL=null
}
onSelectBanner1(event:any) {
  console.log(event);
  this.banner1.push(...event.addedFiles);
 this.banner1_url=this.domSan.bypassSecurityTrustUrl(window.URL.createObjectURL(this.banner1[0]))
}
onRemoveBanner1() {
  this.banner1.splice(0, 1);
  this.banner1_url=null
}
onSelectBanner2(event:any) {
  console.log(event);
  this.banner2.push(...event.addedFiles);
 this.banner2_url=this.domSan.bypassSecurityTrustUrl(window.URL.createObjectURL(this.banner2[0]))
}
onRemoveBanner2() {
  this.banner2.splice(0, 1);
  this.banner2_url=null
}
onSelectsafety(event:any) {
  console.log(event);
  this.safety.push(...event.addedFiles);
 this.safetyURL=this.domSan.bypassSecurityTrustUrl(window.URL.createObjectURL(this.safety[0]))
}
onRemovesafety() {
  this.safety.splice(0, 1);
  this.safetyURL=null
}
onSelectHotel(event:any) {
  console.log(event);
  this.hotel.push(...event.addedFiles);
 this.hotelURL=this.domSan.bypassSecurityTrustUrl(window.URL.createObjectURL(this.hotel[0]))
}
onRemoveHotel() {
  this.hotel.splice(0, 1);
  this.hotelURL=null
}
onSelectLostFound(event:any) {
  console.log(event);
  this.lostfound.push(...event.addedFiles);
 this.lostfoundURL=this.domSan.bypassSecurityTrustUrl(window.URL.createObjectURL(this.lostfound[0]))
}
onRemoveLostFound() {
  this.lostfound.splice(0, 1);
  this.lostfoundURL=null
}
onSelectSugg(event:any) {
  console.log(event);
  this.sugg.push(...event.addedFiles);
 this.suggURL=this.domSan.bypassSecurityTrustUrl(window.URL.createObjectURL(this.sugg[0]))
}
onRemoveSugg() {
  this.sugg.splice(0, 1);
  this.suggURL=null
}
onSelectVac(event:any) {
  console.log(event);
  this.vac.push(...event.addedFiles);
 this.vacURL=this.domSan.bypassSecurityTrustUrl(window.URL.createObjectURL(this.vac[0]))
}
onRemoveVac() {
  this.vac.splice(0, 1);
  this.vacURL=null
}
onSelectRest(event:any,index:any,name:any) {
  console.log('Index='+index)
  console.log(event);
  this.restArr.push(...event.addedFiles);
  this.restNames.push(name)
  console.log(this.restArr)
  this.restURL.push(this.domSan.bypassSecurityTrustUrl(window.URL.createObjectURL(this.restArr[index])))
}
onRemoveRest(i:any) {
  this.restArr.splice(i, 1);
  this.restURL[i]=null
  console.log(this.restURL);
  
}
submitControls(){
  const formData=new FormData()
    for(let i of this.restArr)
    formData.append('restaurant_img',i)
    for(let i of this.restNames)
    formData.append('restaurant_name',i)
    // for(let i of this.servIconArr)
    // formData.append('service_img',i)
    formData.append('hotel_id',this.hotel_id)
    formData.append('cover',this.cover[0]),
    formData.append('bg_col',this.bgCol),
    formData.append('txt_col',this.txtCol),
    formData.append('bord_col',this.bordCol),
    formData.append('wifi_pass',this.wifi_pass),
    formData.append('expansion_col',this.expCol),
    formData.append('msg_btn_col',this.buttonCol),
    formData.append('inner_border_col',this.innerCol),
    formData.append('font_family',this.fontFam),
    formData.append('header_size',this.headerSize),
    formData.append('subheader_size',this.subHeaderSize),
    formData.append('bord_thickness',this.thick),
    formData.append('other_size',this.othSize),
    formData.append('div_img',this.imgSrc),
    formData.append('fd_img',this.fd[0]),
    formData.append('rs_img',this.rs[0]),
    // formData.append('wifi_img',this.wifi[0]),
    formData.append('con_faq_img',this.conf[0]),
    formData.append('entertainment_img',this.ent[0]),
    formData.append('fun_directory_img',this.fun[0]),
    formData.append('lost_found_img',this.lostfound[0]),
    formData.append('promotions_img',this.promoArr[0]),
    // formData.append('restaurant_img',this.restArr),
    formData.append('iconList',JSON.stringify(this.iconList))
    formData.append('restIcon',JSON.stringify({...this.restIconArr}))
    formData.append('srvIcon',JSON.stringify({...this.servIconArr}))

    // formData.append('restIcon',JSON.parse(this.restIconArr))
    // formData.append('srvIcon',JSON.parse(this.servIconArr))
    formData.append('photo_ops_img',this.photo[0]),
    formData.append('banner1_img',this.banner1[0]),
    formData.append('banner2_img',this.banner2[0]),
    formData.append('safety_img',this.safety[0]),
    formData.append('hotelf_img',this.hotel[0]),
    formData.append('suggestion_img',this.sugg[0]),
    formData.append('vacation_img',this.vac[0])
  // formData.append('',)
  console.log(this.bgCol)
  console.log(JSON.stringify({...this.restIconArr}));
  console.log(JSON.stringify({...this.servIconArr}));
  // debugger;
  this.dataServe.global_service(1,'/dir_setup',formData).subscribe(data=>{
    console.log(data)
    this.styleData=data
    if(this.styleData.suc>0){
      this.msg.successMsg('SS')
    }
    else{
      this.msg.errorMsg('ES')
    }
  })
}
setIcon(label:any,name:any){
  console.log(label,name,this.iconList.findIndex((e:any)=>e.label==label))
  this.iconList[this.iconList.findIndex((e:any)=>e.label==label)].name=name
  console.log(this.iconList)
}
setRestIcon(label:any,name:any){
 this.restIconArr[label] = {label:label,name:name}
 console.log(this.restIconArr)
//  console.log(this.restIconArr[0])
}
setServeIcon(label:any,name:any){
  this.servIconArr[label] = {label:label,name:name}
  console.log(this.servIconArr)
 //  console.log(this.restIconArr[0])
 }
showDirectory(){
window.open(environment.routeUrl+'directory/directory_home/Z/0/0/'+btoa(this.hotel_id),'popup','width=400,height=700')    
}
    
changeButtonCol(){
  this.backDiv=document.getElementById('buttonCol')
  this.backDiv.click()
}

changeInnerCol(){
  this.bordDiv=document.getElementById('innerCol')
  this.bordDiv.click()
}
visible(){
  this.showText = !this.showText; 
}

getStyleData(){
  this.dataServe.global_service(0,'/dir_setup',`hotel_id=${this.hotel_id}`).subscribe(data=>{console.log(data)
  this.styleData=data
  this.styleData=this.styleData?.msg[0]
  this.bgCol=this.styleData?.bg_col
  this.txtCol=this.styleData?.txt_col
  this.bordCol=this.styleData?.bord_col
  this.buttonCol=this.styleData?.msg_btn_col
  this.innerCol=this.styleData?.inner_border_col
  this.wifi_pass=this.styleData?.wifi_pass
  this.thick=this.styleData?.bord_thickness
  this.coverURL=this.styleData?.cover
  this.cover.length=1
  this.imgSrc=this.styleData?.div_img
  this.headerSize=this.styleData?.header_size
  this.subHeaderSize=this.styleData?.subheader_size
  this.expCol=this.styleData?.expansion_col
  this.fontFam=this.styleData?.font_family
  this.fd_img=this.styleData?.fd_img
  this.fdURL=this.styleData?.fd_img
  this.fd.length=1

  this.othSize=this.styleData?.other_size


  // this.fd_img=this.styleData || this.styleData?.fd_img ?this.url+this.styleData?.fd_img:''
  // this.fdURL=this.styleData || this.styleData?.fd_img ?this.url+this.styleData?.fd_img:''
  // this.othSize=this.styleData?.other_size
  // this.fd.length=this.styleData || this.styleData?.fd_img?1:0

  // this.rs_img==this.styleData || this.styleData.rs_img? this.url+this.styleData?.rs_img:''
  // this.rsURL=this.url+this.styleData?.rs_img
  // this.rs.length=1

  this.rs_img=this.styleData?.rs_img
  this.rsURL=this.styleData?.rs_img
  this.rs.length=1

  this.entertainment_img=this.styleData?.entertainment_img
  this.entURL=this.styleData?.entertainment_img
  this.ent.length=1

  this.photo_ops_img=this.styleData?.photo_ops_img
  this.photoURL=this.styleData?.photo_ops_img
  this.photo.length=1

  this.con_faq_img=this.styleData?.con_faq_img
  this.confURL=this.styleData?.con_faq_img
  this.conf.length=1

  this.fun_directory_img=this.styleData?.fun_directory_img
  this.funURL=this.styleData?.fun_directory_img
  this.fun.length=1

  this.promotions_img=this.styleData?.promotions_img
  this.promoURL=this.styleData?.promotions_img
  this.promoArr.length=1

  this.safety_img=this.styleData?.safety_img
  this.safetyURL=this.styleData?.safety_img
  this.safety.length=1

  this.hotelf_img=this.styleData?.hotelf_img
  this.hotelURL=this.styleData?.hotelf_img
  this.hotel.length=1

  this.suggestion_img=this.styleData?.suggestion_img
  this.suggURL=this.styleData?.suggestion_img
  this.sugg.length=1

  this.lost_found_img=this.styleData?.lost_found_img
  this.lostfoundURL=this.styleData?.lost_found_img
  this.lostfound.length=1

  this.vacation_img=this.styleData?.vacation_img
  this.vacURL=this.styleData?.vacation_img
  this.vac.length=1

  // this.vacation_img=this.url+this.styleData?.vacation_img
  // this.vacURL=this.url+this.styleData?.vacation_img
  // this.vac.length=1
  
  // this.getCat()
  console.log(this.getVenuesRest);
  // console.log(this.getVenuesServe);
var j = 0;
 for(let i of this.getVenuesRest){
  if(i.name){
  // console.log(i.name, i.name?.split(' ').join('')+'_menu_icon');
  if(i.hotel_type!='S'){
    this.styleData[i.name?.split(' ').join('')+'_menu_icon'] ? this.restIconArr[i.name?.split(' ').join('')+'_menu_icon'] = {label:i.name?.split(' ').join('')+'_menu_icon',name:this.styleData[i.name?.split(' ').join('')+'_menu_icon']} : ''
    this.styleData[i.name?.split(' ').join('')+'_reserve_icon'] ? this.restIconArr[i.name?.split(' ').join('')+'_reserve_icon'] = {label:i.name?.split(' ').join('')+'_reserve_icon',name:this.styleData[i.name?.split(' ').join('')+'_reserve_icon']} : ''
    this.styleData[i.name?.split(' ').join('')+'_ent_icon'] ? this.restIconArr[i.name?.split(' ').join('')+'_ent_icon'] = {label:i.name?.split(' ').join('')+'_ent_icon',name:this.styleData[i.name?.split(' ').join('')+'_ent_icon']} : ''
    
    if(this.styleData['restaurant_img_'+j]){
      this.restArr.push(this.url+this.styleData['restaurant_img_'+j])
      this.restURL.push(this.url+this.styleData['restaurant_img_'+j])
    }
    j++;
  }
}
 } 
 for(let i of this.getVenuesServe){
  this.styleData[i.name.split(' ').join('')+'_menu_icon'] ? this.servIconArr[i.name?.split(' ').join('')+'_menu_icon'] = {label:i.name?.split(' ').join('')+'_menu_icon',name:this.styleData[i.name?.split(' ').join('')+'_menu_icon']} : ''
  this.styleData[i.name?.split(' ').join('')+'_services_icon'] ? this.servIconArr[i.name?.split(' ').join('')+'_services_icon'] = {label:i.name?.split(' ').join('')+'_services_icon',name:this.styleData[i.name?.split(' ').join('')+'_services_icon']} : ''
  this.styleData[i.name?.split(' ').join('')+'_cal_icon'] ? this.servIconArr[i.name?.split(' ').join('')+'_cal_icon'] = {label:i.name?.split(' ').join('')+'_cal_icon',name:this.styleData[i.name?.split(' ').join('')+'_cal_icon']} : ''
 }

 console.log(this.restArr, this.restURL);
 

  this.banner1_url=this.styleData?.banner1_img
  this.banner2_url=this.styleData?.banner2_img
  this.banner1.length=1
  this.banner2.length=1
  this.othStyle=this.styleData?.other_font
  for(let i of this.iconList){
    if(this.styleData)
    i.name=this.styleData[i.label]
  }
  this.dirRow=document.querySelectorAll('.setCol span')
  this.dirRow.forEach((e:any)=>e.style.fontFamily=this.styleData?.font_family)

  this.dirRow=document.querySelectorAll('.setCol div')
  this.dirRow.forEach((e:any)=>e.style.fontFamily=this.styleData?.font_family)
})
}
openstockmodal(tag:any){
  this.showBrouseImage = false
  this.clicked_stock_btn = tag
  this.openstockimages=document.getElementById('id02');
  this.openstockimages.style.display='block'
  // this.getImages(tag)
}
openstockmodalRest(index:any, tag:any){
this.showRestImage = false
this.clicked_stock_rest_btn = tag
this.clicked_stock_rest_index = index
this.openstockimages=document.getElementById('id03');
  this.openstockimages.style.display='block'
}
event_image_change(e: any, tag:any) {
  if(e.target.files){
    switch(tag){   
      case 'cover':
        this.showBrouseImage = false
        this.cover.length = 0
        this.cover.push(e.target.files[0]); 
        this.coverURL=this.domSan.bypassSecurityTrustUrl(window.URL.createObjectURL(this.cover[0]))
        break;
      case 'fd' :
      this.showBrouseImage = false
      this.fd.length =0
      this.fd.push(e.target.files[0]);
      this.fdURL=this.domSan.bypassSecurityTrustUrl(window.URL.createObjectURL(this.fd[0]))
      console.log(this.fd)
        break;
      case 'rs' :
       this.showBrouseImage = false
       this.rs.length = 0
       this.rs.push(e.target.files[0]);
       this.rsURL=this.domSan.bypassSecurityTrustUrl(window.URL.createObjectURL(this.rs[0]))
        break;
      case 'ent':
        this.showBrouseImage = false
        this.ent.length = 0
        this.ent.push(e.target.files[0]);
        this.entURL=this.domSan.bypassSecurityTrustUrl(window.URL.createObjectURL(this.ent[0]))
        break;
      case 'photo':
        this.showBrouseImage = false
        this.photo.length = 0
        this.photo.push(e.target.files[0]);
        this.photoURL=this.domSan.bypassSecurityTrustUrl(window.URL.createObjectURL(this.photo[0]))
        break;
      case 'conf':
        this.showBrouseImage = false
        this.conf.length = 0
        this.conf.push(e.target.files[0]);
        this.confURL=this.domSan.bypassSecurityTrustUrl(window.URL.createObjectURL(this.conf[0]))
        break;
      case 'fun':
        this.showBrouseImage = false
        this.fun.length = 0
        this.fun.push(e.target.files[0]);
        this.funURL=this.domSan.bypassSecurityTrustUrl(window.URL.createObjectURL(this.fun[0]))
        break;
      case 'promoArr':
        this.showBrouseImage = false
        this.promoArr.length = 0
        this.promoArr.push(e.target.files[0]);
        this.promoURL=this.domSan.bypassSecurityTrustUrl(window.URL.createObjectURL(this.promoArr[0]))
        break;
      case 'safety':
        this.showBrouseImage = false
        this.safety.length = 0
        this.safety.push(e.target.files[0]);
        this.safetyURL=this.domSan.bypassSecurityTrustUrl(window.URL.createObjectURL(this.safety[0]))
        break; 
      case 'hotel':
        this.showBrouseImage = false
        this.hotel.length = 0
        this.hotel.push(e.target.files[0]);
        this.hotelURL=this.domSan.bypassSecurityTrustUrl(window.URL.createObjectURL(this.hotel[0]))
        break; 
      case 'sugg':
        this.showBrouseImage = false
        this.sugg.length = 0
        this.sugg.push(e.target.files[0]);
        this.suggURL=this.domSan.bypassSecurityTrustUrl(window.URL.createObjectURL(this.sugg[0]))
        break; 
      case 'lostfound':
        this.showBrouseImage = false
        this.lostfound.length = 0
        this.lostfound.push(e.target.files[0]);
        this.lostfoundURL=this.domSan.bypassSecurityTrustUrl(window.URL.createObjectURL(this.lostfound[0]))
        break;  
      case 'vac':
        this.showBrouseImage = false
        this.vac.length = 0
        this.vac.push(e.target.files[0]);
        this.vacURL=this.domSan.bypassSecurityTrustUrl(window.URL.createObjectURL(this.vac[0]))
        break;  
      case 'banner1' :
        this.showBrouseImage = false
        this.banner1.length = 0
        this.banner1.push(e.target.files[0]);
        this.banner1_url=this.domSan.bypassSecurityTrustUrl(window.URL.createObjectURL(this.banner1[0]))
        break;
      case 'banner2' :
        this.showBrouseImage = false
        this.banner2.length = 0
        this.banner2.push(e.target.files[0]);
        this.banner2_url=this.domSan.bypassSecurityTrustUrl(window.URL.createObjectURL(this.banner2[0]))
        break;    
      default:
        break;
       
    }
  }
}
save_it(e:any, tag:any=null){
  if(e=='close'){
    this.see_photo=true;
    this.common_for_special_menu='';
    // this.previous_id='';
    this.imgcat=''
 }
  else{
    this.see_photo=false;
    switch(tag){
     
      case 'cover':
        this.cover.length = 0
        this.cover.push(environment.api_url+'/stock/'+this.common_for_special_menu);
        this.coverURL=environment.api_url+'/stock/'+this.common_for_special_menu;         
        break;
      case 'fd' :
        this.fd.length =0
      this.fd.push(environment.api_url+'/stock/'+this.common_for_special_menu);
      this.fdURL=environment.api_url+'/stock/'+this.common_for_special_menu
      console.log(this.fd)
        break;
      case 'rs' :
       this.rs.length = 0
       this.rs.push(environment.api_url+'/stock/'+this.common_for_special_menu);
       this.rsURL=environment.api_url+'/stock/'+this.common_for_special_menu
        break;
      case 'ent':
        this.ent.length = 0
        this.ent.push(environment.api_url+'/stock/'+this.common_for_special_menu);
        this.entURL=environment.api_url+'/stock/'+this.common_for_special_menu
        break;
      case 'photo':
        this.photo.length = 0
        this.photo.push(environment.api_url+'/stock/'+this.common_for_special_menu);
        this.photoURL=environment.api_url+'/stock/'+this.common_for_special_menu
        break;
      case 'conf':
        this.conf.length = 0
        this.conf.push(environment.api_url+'/stock/'+this.common_for_special_menu);
        this.confURL=environment.api_url+'/stock/'+this.common_for_special_menu
        break;
      case 'fun':
        this.fun.length = 0
        this.fun.push(environment.api_url+'/stock/'+this.common_for_special_menu);
        this.funURL=environment.api_url+'/stock/'+this.common_for_special_menu
        break;
      case 'promoArr':
        this.promoArr.length = 0
        this.promoArr.push(environment.api_url+'/stock/'+this.common_for_special_menu);
        this.promoURL=environment.api_url+'/stock/'+this.common_for_special_menu
        break;
      case 'safety':
        this.safety.length = 0
        this.safety.push(environment.api_url+'/stock/'+this.common_for_special_menu);
        this.safetyURL=environment.api_url+'/stock/'+this.common_for_special_menu
        break; 
      case 'hotel':
        this.hotel.length = 0
        this.hotel.push(environment.api_url+'/stock/'+this.common_for_special_menu);
        this.hotelURL=environment.api_url+'/stock/'+this.common_for_special_menu
        break; 
      case 'sugg':
        this.sugg.length = 0
        this.sugg.push(environment.api_url+'/stock/'+this.common_for_special_menu);
        this.suggURL=environment.api_url+'/stock/'+this.common_for_special_menu
        break; 
      case 'lostfound':
        this.lostfound.length = 0
        this.lostfound.push(environment.api_url+'/stock/'+this.common_for_special_menu);
        this.lostfoundURL=environment.api_url+'/stock/'+this.common_for_special_menu
        break;  
      case 'vac':
        this.vac.length = 0
        this.vac.push(environment.api_url+'/stock/'+this.common_for_special_menu);
        this.vacURL=environment.api_url+'/stock/'+this.common_for_special_menu
        break;   
      case 'banner1' :
          this.banner1.length = 0
          this.banner1.push(environment.api_url+'/stock/'+this.common_for_special_menu);
          this.banner1_url=environment.api_url+'/stock/'+this.common_for_special_menu
          break;
      case 'banner2' :
          this.banner2.length = 0
          this.banner2.push(environment.api_url+'/stock/'+this.common_for_special_menu);
          this.banner2_url=environment.api_url+'/stock/'+this.common_for_special_menu
          break;       
      default:
        break;
       
    }
    
    // this.msgForm.controls.msg_img.setValue(this.stockImg1)
  }
  this.openstockimages=document.getElementById('id02');
  this.openstockimages.style.display='none'
}
selectedimage(index:any,image_path:any,catg:any,length:any){

  this.previous_id=catg;
  this.imgcat=catg;
  this.stockImg1=image_path;
    // this.spstockImg=environment.api_url+'/stock/'+ image_path;
  this.common_for_special_menu=image_path;
  for(let i=0;i<length;i++){
    this.image_getelement=document.getElementById('image_'+i);
    this.image_getelement.style.border='';
  }
  this.image_getelement=document.getElementById('image_'+index);
 this.image_getelement.style.border='3px solid #00477e';
}
selectedimage_rest(index:any,image_path:any,catg:any,length:any){

  this.previous_id=catg;
  this.imgcat=catg;
  this.stockImg1=image_path;
    // this.spstockImg=environment.api_url+'/stock/'+ image_path;
  this.common_for_special_menu=image_path;
  for(let i=0;i<length;i++){
    this.image_getelement=document.getElementById('rest_image_'+i);
    this.image_getelement.style.border='';
  }
  this.image_getelement=document.getElementById('rest_image_'+index);
 this.image_getelement.style.border='3px solid #00477e';
}
getStockimageonselectcategory(cat_id:any){
  //  For getting Image on load
  this.dataServe.global_service(0,'/stock_img',`cat_id=${cat_id}`).subscribe(data=>{
    console.log(data);
    this.st_img=data;
    this.st_img=this.st_img.msg;
   } ,error=>{this.msg.globalError(error.status+' '+error.statusText+' in '+error.url)}
  )
}
click_it(e:any,index:any=null,name:any=null){
  if(e=='close'){
    this.see_photo=true;
    this.common_for_special_menu='';
    // this.previous_id='';
    this.imgcat=''
 }
 else{
  this.see_photo=false;
  console.log('Index='+index)
  console.log(e);
  this.restArr[index] = environment.api_url+'/stock/'+this.common_for_special_menu;
  this.restNames.push(name)
  console.log(this.restArr)
  this.restURL[index] = environment.api_url+'/stock/'+this.common_for_special_menu
  }
  this.openstockimages=document.getElementById('id03');
 this.openstockimages.style.display='none'
 }

 event_rest_img_change(e:any, index:any,name:any){
  if(e.target.files){
    this.restArr[index] = e.target.files[0]
    this.restNames.push(name)
    console.log(this.restNames)
    console.log(this.restArr)
    this.restURL[index] = this.domSan.bypassSecurityTrustUrl(window.URL.createObjectURL(this.restArr[index]))
  }
 }

 getCategoryList() {
  this.dataServe.global_service(0, '/category_list', '').subscribe(data => {
    this.category_name = data;
    this.category_name = this.category_name.msg
  },error=>{this.msg.globalError(error.status+' '+error.statusText+' in '+error.url)})
}
preview_fun(){
  window.open(environment.funURl,'popup','width=400,height=700')
}
 
}

