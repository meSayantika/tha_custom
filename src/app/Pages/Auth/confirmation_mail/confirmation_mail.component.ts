import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from 'src/app/Services/data.service';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-confirmation_mail',
  templateUrl: './confirmation_mail.component.html',
  styleUrls: ['./confirmation_mail.component.css']
})
export class Confirmation_mailComponent implements OnInit {

  name:any;
  comma:any;
  unapprove:any=[];
  approve:any=[];
  com:any=[];
  restaurant_name:any;
  store_data:any=[];
   resid:any;
   textarea='';
   breakfast:any;
   Approv:any='';
   unapprov:any='';
   launch:any;
   radio1:any;
   radio2:any;
   dinner:any;
   con:any;
   enable=true;
   enable1=true;
   enable2=true;
   enable3=true;
   enable4=true;
   check1:any='';
   check2:any='';
   check3:any='';
   check4:any='';
   bind:boolean=true;
   get_url:any=[]; 
   img_path=environment.api_url
   img_url:any=[];
   brunch:any;
   sos:any;
   x:any;
   menuchoiceData:any
   check_activity:boolean=false;
   check:any=[];
   chk_val:any;
  menu_chk_val:any=[];
  menu_chk:any=[];
  constructor(private dataServe:DataService,private route:ActivatedRoute) { }

  ngOnInit(): void {
     
    this.resid=this.route.snapshot.params['id'];
    // console.log();
  // fetching qrcode
    this.dataServe.global_service(0, '/get_url', `id=${this.resid}&venue_id=`).subscribe((data:any)=>{
      console.log(data);
      this.get_url=data;
       this.img_url=this.get_url.suc > 0 ? this.get_url.msg : [];

    })
    // fetching restaurant's basic info
    this.dataServe.global_service(0, '/check_menu_setup', `id=${this.resid}`).subscribe((data:any)=>{
      console.log(data);
      this.store_data=data;
      this.name=this.store_data.msg[0].contact_name;
      this.restaurant_name=this.store_data.msg[0].restaurant_name;
      // this.comma=this.store_data.msg[0].menu;
      //   this.com=this.comma.split(',');
      //   console.log(this.com.length);
      //   console.log(this.com);
      

       
        // for(let i=0;i<this.com.length;i++){
        //   if(this.com[i]=='1'){
        //     this.check1=1;
        //   }
        //   else if(this.com[i]=='2'){
           
        //     this.check2=2;
        //   }
        //   else if(this.com[i]=='3'){
        //     this.check3=3;
        //   }
        //   else if(this.com[i]=='4'){
         
        //    this.check4=4;
        //   }
        // }
    
     })

  // to check if there is active flag
     this.dataServe.global_service(0, '/check_active_status', `id=${this.resid}`).subscribe(data=>{
      this.check=data;
      if(this.check.msg[0].approval_flag=='A'){
            this.bind=true;
            this.check_activity=true;
      }
      else{
        // this.bind=false;
        // this.check_activity=false;

      }
    })
    // the menus that require a prospective change
    this.dataServe.global_service(0, '/res_menu', `id=${this.resid}`).subscribe(data=>{console.log(data)

      this.menuchoiceData=data;
     
      this.menuchoiceData=this.menuchoiceData.msg;
     
      // this.mncdata=this.menuchoiceData[0].menu_id;
      console.log(this.menuchoiceData)
      // this.get_menu(this.mncdata);
      // console.log('bkmenu'+this.menuchoiceData[0].menu_id)
      // this.bkmenuid=document.getElementById('bkmenu'+this.menuchoiceData[0].menu_id);
      // console.log(this.bkmenuid)
     // this.bkmenuid.checked=true;
      })
  }
  // check which menu needs change
  enableonlyapprovefield(event:any){
    console.log(event.target.value);
    console.log(this.sos);
    
    if(event.target.checked==true){
      this.Approv='A';
      this.enable1=true;
      this.enable2=true;
       this.enable3=true;
      this.enable4=true;
      this.enable=true
      this.bind=false;


      this.breakfast=document.getElementById('breakfast');
       this.breakfast.checked=false;
      this.brunch=document.getElementById('brunch')
      this.brunch.checked=false;

       this.launch=document.getElementById('launch');
       this.launch.checked=false;
      
      this.dinner=document.getElementById('dinner');
       this.dinner.checked=false;
       this.sos=document.getElementById('text');
      this.sos.value='';
    }
    else {
      
      this.enable1=false;
      this.enable2=false;
       this.enable3=false;
      this.enable4=false;
      this.enable=false;
     this.Approv='';
 
      
    }
  }
  // check all the menus
  enableallfield(event:any){
    
   if(event.target.id=='css'){
    
    if(event.target.checked==true){
      this.enable=false;
      this.dataServe.global_service(0, '/check_menu_setup', `id=${this.resid}`).subscribe(data=>{
        console.log(data);
        this.store_data=data;
        this.name=this.store_data.msg[0].contact_name;
        this.restaurant_name=this.store_data.msg[0].restaurant_name;
        // this.comma=this.store_data.msg[0].menu;
        // this.com=this.comma.split(',');
        // console.log(this.com.length);
        // console.log(this.com);
        this.enable4=false;
        this.enable1=false;
        this.enable2=false;
        this.enable3=false;
        // for(let i=0;i<this.com.length;i++){
        //   if(this.com[i]=='1'){
        //     this.breakfast=document.getElementById('breakfast');
        //     this.breakfast.checked=true;
        //        this.enable1=false;
        //   }
        //   else if(this.com[i]=='2'){
        //     this.launch=document.getElementById('launch');
        //     this.launch.checked=true;
        //     this.enable2=false;
        //   }
        //   else if(this.com[i]=='3'){
            
        //     this.dinner=document.getElementById('dinner');
        //     this.dinner.checked=true;
        //     this.enable3=false;
        //   }
        //   else if(this.com[i]=='4'){
         
        //     this.enable4=false;
        //     this.brunch=document.getElementById('brunch')
        //     this.brunch.checked=false;
        //   }
        // }
      })
    
     this.bind=true;
     this.unapprov='U';
    }
    else {
      this.unapprov='';
     this.enable1=true;
    this.enable2=true;
     this.enable3=true;
    this.enable4=true;
    this.enable=true;
    this.bind=true
    this.breakfast=document.getElementById('breakfast');
    this.breakfast.checked=false;
      this.brunch=document.getElementById('brunch')
      this.brunch.checked=false;

      this.launch=document.getElementById('launch');
       this.launch.checked=false;
      
      this.dinner=document.getElementById('dinner');
       this.dinner.checked=false;
      
    }
  }
  else if(event.target.id=='breakfast'){
    if(event.target.checked==true){
      this.check1=1;
      // this.bind=false;

    }
    else{
      this.check1='';
      // this.bind=true;
    }
  }
  else if(event.target.id=='launch'){
    if(event.target.checked==true){
      this.check2=2;
      // this.bind=false;

    }
    else{
      this.check2='';
      // this.bind=true;

    }
  }
  else if(event.target.id=='dinner'){
    if(event.target.checked==true){
      this.check3=3;
      // this.bind=false;

    }
    else{
      this.check3='';
      // this.bind=true;

    }
  }
  else if(event.target.id=='brunch'){
    if(event.target.checked==true){
      this.check4=4;
      // this.bind=false;

    }
    else{
      this.check4='';
      // this.bind=true;

    }
  }
  
  
  }
  prevent_null(event:any){
    console.log(this.textarea)
    if(this.textarea!=''){
         this.bind=false;
    }
    else {
         this.bind=true;
          
    }
  }
//Final Submit
  getvalue(){
    this.unapprove.length=0
    this.menu_chk_val.length = 0
      this.radio1=document.getElementById('css');
      this.radio2=document.getElementById('html')
      if(this.radio1.checked){
        if(this.textarea != ''){
          this.chk_val = document.getElementsByName('menu_chk_dt[]');
          var len = this.chk_val.length;
          for(let i = 0; i<len; i++){
            if(this.chk_val[i].checked){
              this.menu_chk_val.push({dt: this.chk_val[i].value})
              this.menu_chk.push(this.chk_val[i].value)
            }else{
              this.menu_chk_val.push({dt: 0})
            }
          }
          console.log({len: this.menu_chk.length});
          
          // if(this.menu_chk.length > 0){
          //   console.log({menu_chk_dt: this.menu_chk_val});
            
          //   console.log("Unapprove:"+this.unapprov);
          //   console.log("approve:"+this.textarea);
            this.unapprove.push({
            "apr_flag":this.unapprov,
              "res_id":this.resid,
              "menu_id": this.menu_chk_val,
              "desc":this.textarea
            });
             this.dataServe.global_service(1, '/approve_menu', this.unapprove).subscribe(data=>{
               console.log(data);
             })
             this.myFunction('Submitted Successfully');

             console.log( this.unapprove);
          // }else{
          //   this.myFunction("You Need To Select One Menu!")
          // }
            
          }else{
            this.myFunction("You Need To Provide An Issue!")
          }
        }
        else if(this.radio2.checked){
        
          console.log("Approve:"+this.Approv);
          this.unapprove.push({"apr_flag":this.Approv,
          "res_id":this.resid});
          console.log(this.unapprove);
          
          this.dataServe.global_service(1, '/approve_menu', this.unapprove).subscribe(data=>{
            console.log(data);
          })
          this.myFunction('Submitted Successfully');
        }
    
   
  }


   // For success snackbar
   myFunction(v:any) {
    // Get the snackbar DIV
   
    this.x = document.getElementById("snackbar1");
    this.x.innerHTML = v;
    // Add the "show" class to DIV
    this.x.className = "show";
  
    // After 3 seconds, remove the show class from DIV
    setTimeout(()=>{  this.x.className =  this.x.className.replace("show", ""); }, 3000);
  } 
// changing status on approval
  changestatus(v:any){
    if(v > 0){
      this.enable1 = false;
      this.bind=false;
      this.unapprov='U';
    }else{
      this.enable1 = true;
      this.bind=false;
      this.Approv='A';
      this.chk_val = document.getElementsByName('menu_chk_dt[]');
        var len = this.chk_val.length;
        for(let i = 0; i<len; i++){
          this.chk_val[i].checked = false;
        }
    }
  }

}
