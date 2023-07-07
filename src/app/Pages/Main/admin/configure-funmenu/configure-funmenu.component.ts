import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { DataService } from 'src/app/Services/data.service';
import { MessageService } from 'src/app/Services/message.service';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-configure-funmenu',
  templateUrl: './configure-funmenu.component.html',
  styleUrls: ['./configure-funmenu.component.css']
})
export class ConfigureFunmenuComponent implements OnInit {

  constructor(private san:DomSanitizer, private msg:MessageService, private router: Router,private dataServe:DataService,private formBuilder: FormBuilder) { }
  configForm!:FormGroup
  url:any
  configData:any
  getConfigData:any
  imgName:any
  id:any
  ngOnInit() {
    this.configForm=this.formBuilder.group({
      sideImg:[''],
      sideCol:[''],
      sideBgCol:['']
    })
    this.getConfig()
  }
  getConfig(){
    this.dataServe.global_service(0,'/fun_directory',null).subscribe(data=>{
      console.log(data)
      this.getConfigData=data;
      this.id=this.getConfigData.msg[0].id
      this.url=environment.api_url+'/'+this.getConfigData.msg[0].top_img
      this.configForm.patchValue({
        sideCol:this.getConfigData.msg[0].txt_color,
        sideBgCol:this.getConfigData.msg[0].bg_color
      })
    })
  }
  getImg(e:any){
    this.imgName=e.target.files[0]
    this.url=this.san.bypassSecurityTrustResourceUrl(URL.createObjectURL(this.imgName))
  }
  saveConfig(){
   const formData=new FormData()
   formData.append('id',this.id)
   formData.append('img',this.imgName)
   formData.append('bg_color',this.configForm.controls.sideBgCol.value)
   formData.append('txt_color',this.configForm.controls.sideCol.value)
   this.dataServe.global_service(1,'/fun_directory',formData).subscribe(data=>{
    console.log(data)
    this.configData=data;
    if(this.configData.suc>0)
        this.msg.successMsg('SS')
    else
        this.msg.errorMsg('ES')

      },error=>{this.msg.globalError(error.status+' '+error.statusText+' in '+error.url)})
  }
  viewInfo(){
    // console.log('hello')
    this.dataServe.showInfo.next({data:'fundirectory',flag:true,heading:'Fun Directory-Add Menus',type:'C'})
  }
 
}
