import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from 'src/app/Services/data.service';
import { MessageService } from 'src/app/Services/message.service';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-flip_book_create',
  templateUrl: './flip_book_create.component.html',
  styleUrls: ['./flip_book_create.component.css']
})
export class Flip_book_createComponent implements OnInit {
  coverImg: any;
  img1: any;
  img2: any;
  img3: any;
  img4: any;
  img5: any;
  img6: any;
  img7: any;
  img8: any;
  cap1: any;
  cap2: any;
  cap3: any;
  cap4: any;
  cap5: any;
  cap6: any;
  cap7: any;
  cap8: any;
  cov:any;
  constructor( private activatedRoute:ActivatedRoute, private router:Router,private msg:MessageService, private dataServe:DataService) { }
  hotel_id:any
  url=environment.api_url
  getFlipData:any
  getFlipImg:any
  approval_flag:any
  id:any
  preview_url:any
  coverFile:any
  emailData:any
  userEmail:any
  inner_grad:any
  mid_grad:any
  outer_edge:any
  audio=new Audio()
  divBlock:any
  divBlockBack:any
  divInp:any
  divLab:any
  divBtn:any
  ngOnInit() {
    this.hotel_id=atob(this.activatedRoute.snapshot.params['hotel_id'])
    this.id=atob(this.activatedRoute.snapshot.params['id'])
    this.userEmail=localStorage.getItem('Email')

    this.getFlip()
  }
  go_to_previous(){
    this.router.navigate(['hotel/hotel_flip',btoa(this.hotel_id)]).catch(e=>this.msg.globalError(e))

  }

  go_home(){
    this.router.navigate(['hotel/home',btoa(this.hotel_id)]).catch(e=>this.msg.globalError(e))
  
  }
  getFlip(){
    this.dataServe.global_service(0,'/flip_book',`id=${this.id}`).subscribe(data=>{
      console.log(data)
      this.getFlipData=data
      
      this.getFlipImg=this.getFlipData.msg[0].img
      this.cov="https://customapi.shoplocal-lagunabeach.com/"+this.getFlipData.msg[0].flip_back_img

      this.getFlipData=this.getFlipData.msg[0]
      this.preview_url=this.getFlipData.flip_url
      this.coverImg=this.getFlipImg[0].img_path
      this.img1=this.getFlipImg[1].img_path
      this.img2=this.getFlipImg[2].img_path
      this.img3=this.getFlipImg[3].img_path
      this.img4=this.getFlipImg[4].img_path
      this.img5=this.getFlipImg[5].img_path
      this.img6=this.getFlipImg[6].img_path
      this.img7=this.getFlipImg[7].img_path
      this.img8=this.getFlipImg[8].img_path

      this.cap1=this.getFlipImg[1].img_title
      this.cap2=this.getFlipImg[2].img_title
      this.cap3=this.getFlipImg[3].img_title
      this.cap4=this.getFlipImg[4].img_title
      this.cap5=this.getFlipImg[5].img_title
      this.cap6=this.getFlipImg[6].img_title
      this.cap7=this.getFlipImg[7].img_title
      this.cap8=this.getFlipImg[8].img_title
       console.log(this.cov)
    },error=>{this.msg.globalError(error.status+' '+error.statusText+' in '+error.url)})
  }
  checkFlag(){
   
    this.audio = new Audio();
this.audio.src = "../assets/page.mp3";
this.audio.load();
this.audio.play();
  }
  preview(){
    window.open(environment.flipUrl+'/'+this.preview_url,'_blank')
  }
  approve(v:any){
    var dt={
      id:this.id,
      flag:v,
      user:localStorage.getItem('Email')

    }
    const formData=new FormData();
    formData.append("id",this.id)
    formData.append("flag",v)
    formData.append("user",this.userEmail)
    formData.append("bg_img",this.coverFile)
    formData.append("hotel_id",this.hotel_id)
    this.dataServe.global_service(1,'/flip_approve',formData).subscribe(data=>{
      console.log(data)
      this.approval_flag=data;
      if(this.approval_flag.suc>0)
     {  this.msg.globalSuccess('Action successful!')
       this.getFlip()
     }
     else{
      this.msg.globalError('Action failed!')

     }
    },error=>{this.msg.globalError(error.status+' '+error.statusText+' in '+error.url)})
  }
  send_email(){
    var dt={
      id:this.id,
      user:localStorage.getItem('Email')
    }
    this.dataServe.global_service(1,'/flip_send',dt).subscribe(data=>{
      console.log(data)
      this.emailData=data
      if(this.emailData.suc>0){
        this.msg.successMsg('Flip book URL sent successfully!')
        this.getFlip()
      }
      else{
        this.msg.errorMsg('Error sending the URL!')
      }
    },error=>{this.msg.globalError(error.status+' '+error.statusText+' in '+error.url)})

  }
  input_cover(e:any){
    // this.coverFile=e.target.files[0]
    // console.log(this.coverFile)
  }

  setGradient(){
    console.log(this.inner_grad,this.mid_grad)
    this.divBlock=document.getElementById('front_cov')
    this.divBlockBack=document.getElementById('back_cov')
    this.divBlock.style.background = "linear-gradient(to right, " + this.inner_grad + ", " + this.mid_grad + ","+ this.outer_edge+ ","+ this.outer_edge+")"
    this.divBlockBack.style.background = "linear-gradient(to left, " + this.inner_grad + ", " + this.mid_grad + ","+ this.outer_edge+ ","+ this.outer_edge+")"
    // css.textContent = body.style.background + ";"
  };
  show(){
    console.log(this.getFlipImg)
  }
  showInp(i:any,flag:any){
    if(flag=='P'){
      console.log(i)
      this.divInp=document.getElementById('inp_'+i);
      console.log(this.divInp)
      this.divInp.style.display='block'
      this.divLab=document.getElementById('lab_'+i);
      this.divLab.style.display='none'
      this.divBtn=document.getElementById('btn_'+i);
      this.divBtn.style.display='block'
    }
    
  }
  hideInp(i:any){
    this.divInp=document.getElementById('inp_'+i);
    console.log(this.divInp)
    this.divInp.style.display='none'
    this.divLab=document.getElementById('lab_'+i);
    this.divLab.style.display='block'
    this.divBtn=document.getElementById('btn_'+i);
    this.divBtn.style.display='none'

    this.cap1=this.getFlipImg[1].img_title
    this.cap2=this.getFlipImg[2].img_title
    this.cap3=this.getFlipImg[3].img_title
    this.cap4=this.getFlipImg[4].img_title
    this.cap5=this.getFlipImg[5].img_title
    this.cap6=this.getFlipImg[6].img_title
    this.cap7=this.getFlipImg[7].img_title
    this.cap8=this.getFlipImg[8].img_title
  }
  changeCaption(){
    this.cap1=this.getFlipImg[1].img_title
    this.cap2=this.getFlipImg[2].img_title
    this.cap3=this.getFlipImg[3].img_title
    this.cap4=this.getFlipImg[4].img_title
    this.cap5=this.getFlipImg[5].img_title
    this.cap6=this.getFlipImg[6].img_title
    this.cap7=this.getFlipImg[7].img_title
    this.cap8=this.getFlipImg[8].img_title
  }
}
