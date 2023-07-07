import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'src/app/Services/message.service';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms'
import { DataService } from 'src/app/Services/data.service';

@Component({
  selector: 'app-platform-faq',
  templateUrl: './platform-faq.component.html',
  styleUrls: ['./platform-faq.component.css']
})
export class PlatformFaqComponent implements OnInit {
  faqForm!:FormGroup
  tipForm!:FormGroup
  faqGetData:any
  tipGetData:any
  faqSavedData:any
  tipSavedData:any
  constructor(private router:Router,private msg:MessageService,private formBuilder: FormBuilder,private dataServe:DataService) { }
 hotel_id:any
 faqType=''
 arr:any=[]
 arrTip:any=[]
 menuShow:any
 hot_faq:any
 saf_faq:any
 con_faq:any
 answer=''
 question=''
 skillsForm!: FormGroup;
 newSkill(qust:any, ans:any, id:any): FormGroup {
  return this.formBuilder.group({
    qsn:[qust,[Validators.required]],
    ans:[ans,[Validators.required]],
    id:[id]
  })
}
  ngOnInit() {
    this.hotel_id=localStorage.getItem('hotel_id')
    console.log(this.hotel_id);
    
    this.faqForm=this.formBuilder.group({
      // qsn:['',[Validators.required]],
      // ans:['',[Validators.required]],
      faqStruct:this.formBuilder.array([])
    })
    this.tipForm=this.formBuilder.group({
      tipStruct:this.formBuilder.array([])
    })

    this.skillsForm = this.formBuilder.group({
      skills: this.formBuilder.array([]) ,
    });
    // this.addVipForm=this.formBuilder.group({
     
    //   vipStruct:this.formBuilder.array([]),
    // })
    this.addFaq(0, '', '')
    this.addTip(0)
    this.getEditableData()
  }
  get skills() : FormArray {
    return this.skillsForm.get("skills") as FormArray
  }
  getEditableData(){
    this.dataServe.global_service(0,'/dir_live',`hotel_id=${this.hotel_id}`).subscribe(data=>{
      console.log(data)
      this.menuShow=data
      this.menuShow=this.menuShow.msg

      this.con_faq=this.menuShow[0]?.con_faq?this.menuShow[0]?.con_faq:'N'
      this.saf_faq=this.menuShow[0]?.saf_faq?this.menuShow[0]?.saf_faq:'N'
      this.hot_faq=this.menuShow[0]?.hot_faq?this.menuShow[0]?.hot_faq:'N'
      console.log(this.con_faq,this.saf_faq,this.hot_faq)
      // console.log(this.menuShow[0].ent_cal)
    })
  }
  go_home(){
    this.router.navigate(['hotel/home',btoa(this.hotel_id)]).catch(e=>this.msg.globalError(e))
  
  }
  get faqget() {
    return this.faqForm?.controls.faqStruct as FormArray;
  }
  get tipget() {
    return this.tipForm?.controls.tipStruct as FormArray;
  }
  get_qsn(){
    this.arr=[]
   this.arrTip=[]

    this.faqForm.reset()
    this.dataServe.global_service(0,'/faq',`hotel_id=${this.hotel_id}&flag=${this.faqType}`).subscribe(data=>{
      console.log(data)
      this.arr.length = 0
      this.faqSavedData=data;
      this.faqSavedData=this.faqSavedData.msg
      for(let i=0;i<this.faqSavedData.length;i++){
        
        this.arr.push({
          qsn:this.faqSavedData[i].quest,
          ans:this.faqSavedData[i].ans,
          id:this.faqSavedData[i].id
        })
        // console.log(this.arr)
        this.faqget.patchValue(this.arr)
        if(i<this.faqSavedData.length-1){
          this.addFaq(this.faqSavedData[i].id, this.faqSavedData[i].quest, this.faqSavedData[i].ans)
          this.newSkill(this.faqSavedData[i].quest, this.faqSavedData[i].ans, this.faqSavedData[i].id)
          // this.addFaq(this.faqSavedData[i].id)

        }

      }
      this.skills.patchValue(this.arr)
    
      for(let i=0;i<this.faqSavedData.length-1;i++){
      }
    },error=>{this.msg.globalError(error.status+' '+error.statusText+' in '+error.url)})
    if(this.faqType=='C'){
      this.arrTip.length=0
    this.dataServe.global_service(0,'/tip',`hotel_id=${this.hotel_id}`).subscribe(data=>{
      console.log(data)
      this.tipSavedData=data;
      this.tipSavedData=this.tipSavedData.msg
      this.tipget.reset()
      for(let i=0;i<this.tipSavedData.length;i++){
        debugger
        this.arrTip.push({
          tip_title:this.tipSavedData[i].tip_title,
          tip_desc:this.tipSavedData[i].tip_desc,
          id:this.tipSavedData[i].id
        })
        console.log(this.arrTip)
        if(this.tipSavedData[i].tip_title){
        this.tipget.patchValue(this.arrTip)
        if(i<this.tipSavedData.length-1 ){
          this.addTip(this.tipSavedData[i].id)
          console.log(this.tipSavedData[i].id,this.tipSavedData[i].tip_title)
          debugger

        }
      }
        console.log(this.tipget,this.arrTip)

      }
    
      
    },error=>{this.msg.globalError(error.status+' '+error.statusText+' in '+error.url)})
    }
  }
  addFaq(i:any, qns:any, ans:any){
    const faqControls = this.formBuilder.group({
       qsn:[qns,[Validators.required]],
       ans:[ans,[Validators.required]],
       id:[i]
  });
  this.faqget.push(faqControls);

}
  addTip(i:any){
    const tipControls = this.formBuilder.group({
      tip_title:['',[Validators.required]],
      tip_desc:['',[Validators.required]],
      id:[i]
  })
  this.tipget.push(tipControls);
  // console.log(this.rest_dtls)
  }
  removeTip(i:any){
    this.tipget.removeAt(i)
  }
  removeFaq(i:any){
  
    this.faqget.removeAt(i)
    // if(id>0){
    //   this.dataServe.global_service(0,'/proposal_dtls_del',`id=${id}`).subscribe(data=>{
    //     console.log(data)
    //   },error=>{this.msg.globalError(error.status+' '+error.statusText+' in '+error.url)})

    // }
  }
  submitFaq(){
    console.log(this.faqForm.value)
    debugger;
    var dt={
      hotel_id:this.hotel_id,
      faq_type:this.faqType,
      faq_dt:this.faqForm.value.faqStruct,
      user:localStorage.getItem('Email'),
      id:0
    }
    this.dataServe.global_service(1,'/faq',dt).subscribe(data=>{
      console.log(data)
      this.faqGetData=data
      if(this.faqGetData.suc>0){
        this.msg.successMsg('SS')
      }
      else{
        this.msg.successMsg('ES')

      }
    },error=>{this.msg.globalError(error.status+' '+error.statusText+' in '+error.url)})
  }

  submitTip(){
    console.log(this.tipForm.value)
    debugger;
    var dt={
      hotel_id:this.hotel_id,
      tip_dt:this.tipForm.value.tipStruct,
      user:localStorage.getItem('Email'),
      id:0
    }
    this.dataServe.global_service(1,'/tip',dt).subscribe(data=>{
      console.log(data)
      this.tipGetData=data
      if(this.tipGetData.suc>0){
        this.msg.successMsg('SS')
      }
      else{
        this.msg.successMsg('ES')

      }
    },error=>{this.msg.globalError(error.status+' '+error.statusText+' in '+error.url)})
  }
  viewInfo(){
    this.dataServe.showInfo.next({data:'platform_faq',flag:true,heading:'FAQ'})
  }


}
