import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { Router } from '@angular/router';
import { DataService } from 'src/app/Services/data.service';
import { MessageService } from 'src/app/Services/message.service';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { DomSanitizer } from '@angular/platform-browser';
import { environment } from 'src/environments/environment';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
@Component({
  selector: 'app-fundirectory',
  templateUrl: './fundirectory.component.html',
  styleUrls: ['./fundirectory.component.css']
})
export class FundirectoryComponent implements OnInit {
  displayedColumns: string[] = ['position',  'name'];
  displayedColumns1: string[] = ['position',  'title'];
  dataSource = new MatTableDataSource();
  dataSource1 = new MatTableDataSource();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  imgName: any;
  imgName1: any;
  url: any;
  url2: any;
  id='0'
  getMenus:any
  getSections:any
  getFun:any
  getHomeData:any
  menuID=''
  selectID=''
  sectionID=''
  id_sec='0';
  urlList:any=[]
  getSectionDataSubmit:any
  constructor(private san:DomSanitizer, private msg:MessageService, private router: Router,private dataServe:DataService,private formBuilder: FormBuilder) { }
   homedirectoryForm!:FormGroup
   secDetailsForm!:FormGroup
   configSubtitle: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    height: '15rem',
    minHeight: '5rem',
    placeholder: 'Enter home page subtitle...',
    translate: 'no',
    defaultParagraphSeparator: 'p',
    defaultFontName: 'Arial',
    toolbarHiddenButtons: [
      ['bold']
    ],
    customClasses: [
      {
        name: "quote",
        class: "quote",
      },
      {
        name: 'redText',
        class: 'redText'
      },
      {
        name: "titleText",
        class: "titleText",
        tag: "h1",
      },
    ]
  };
  configDesc: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    height: '15rem',
    minHeight: '5rem',
    placeholder: 'Enter home page description...',
    translate: 'no',
    defaultParagraphSeparator: 'p',
    defaultFontName: 'Arial',
    toolbarHiddenButtons: [
      ['bold']
    ],
    customClasses: [
      {
        name: "quote",
        class: "quote",
      },
      {
        name: 'redText',
        class: 'redText'
      },
      {
        name: "titleText",
        class: "titleText",
        tag: "h1",
      },
    ]
  };
  configTitle: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    height: '15rem',
    minHeight: '5rem',
    placeholder: 'Enter home page title...',
    translate: 'no',
    defaultParagraphSeparator: 'p',
    defaultFontName: 'Arial',
    toolbarHiddenButtons: [
      ['bold']
    ],
    customClasses: [
      {
        name: "quote",
        class: "quote",
      },
      {
        name: 'redText',
        class: 'redText'
      },
      {
        name: "titleText",
        class: "titleText",
        tag: "h1",
      },
    ]
  };
  editorTextDesc=''
  editorTextTitle=''
  editorTextSubtitle=''
  ngOnInit() {
    this.homedirectoryForm=this.formBuilder.group({
      menu_id:[''],
      img:[''],
     
    })
    this.secDetailsForm=this.formBuilder.group({
      menu_id:[''],
      img:[''],
      section_name:[''],
      sec_title:[''],
      sec_sub_title:[''],
      sec_about:[''],
      sec_special:[''],
      sec_website:[''],
      sec_phone:[''],
      
      maps:['']
    })
    // this.getData()
    this.getMenuData()
    this.getFunDirectory()
  }
 go_to_home(){
  this.router.navigate(['main/admin/adminlanding'])
 }
 getImg(e:any){
  if(this.menuID=='1'){
  this.imgName=e.target.files[0]
  this.url=this.san.bypassSecurityTrustResourceUrl(URL.createObjectURL(this.imgName))
  console.log(this.imgName)
  }
  else{
  //  this.urlList=e.target.files
   console.log(e.target.files)
   for(let i=0;i<e.target.files.length;i++){
    console.log(this.urlList[i])
    this.urlList[i]=this.san.bypassSecurityTrustResourceUrl(URL.createObjectURL(e.target.files[i]))
   }
  }
}
getSectionImg(e:any){
  
  this.imgName1=e.target.files[0]
  this.url2=this.san.bypassSecurityTrustResourceUrl(URL.createObjectURL(this.imgName1))
  console.log(this.imgName1)
  
}
 viewInfo(v:any){
  // console.log('hello')
  this.dataServe.showInfo.next({data:'fundirectory',flag:true,heading:'Fun Directory-Add Menus',type:v})
}
getData(){
  this.editorTextTitle=''
  this.editorTextSubtitle=''
  this.editorTextDesc=''
  this.url=''
   this.dataServe.global_service(0,'/fun_directory_menu_info',`menu_id=${this.menuID}`).subscribe(data=>{
    console.log(data)
    this.getHomeData=data;
    // this.urlList=this.getHomeData.img
    for(let i=0;i<this.getHomeData.img.length;i++){
      this.urlList[i]=environment.api_url+'/'+ this.getHomeData.img[i].img_path
    }
    this.url=environment.api_url+'/'+this.getHomeData.img[0]?.img_path

    this.getHomeData=this.getHomeData?.msg
    this.id=this.getHomeData[0]?.id
    this.editorTextTitle=this.getHomeData[0]?.menu_title
    this.editorTextSubtitle=this.getHomeData[0]?.menu_sub_title
    this.editorTextDesc=this.getHomeData[0]?.menu_desc
   })
}
submit(){
  const formData=new FormData()
  formData.append('id',this.id)
  formData.append('menu_id',this.menuID)
  if(this.menuID=='1')
  formData.append('img',this.imgName)
  else{
    for(let i of this.urlList)
  formData.append('img',i)

  }
  formData.append('title',this.editorTextTitle)
  formData.append('sub_title',this.editorTextSubtitle)
  formData.append('desc',this.editorTextDesc)
  this.dataServe.global_service(1,'/fun_directory_menu_info',formData).subscribe(data=>{
    console.log(data)
    this.getData()
  })
  console.log(this.homedirectoryForm.controls.img,this.editorTextDesc,this.editorTextSubtitle,this.editorTextTitle)
}

getMenuData(){
  this.dataServe.global_service(0,'/fun_directory_menu',null).subscribe(data=>{console.log(data)
    this.getMenus=data
    console.log(this.getMenus.msg)
   
    },error=>{this.msg.globalError(error.status+' '+error.statusText+' in '+error.url)})
}
submitSection(){
  const formData=new FormData()
  formData.append('menu_id',this.menuID)
  formData.append('menu_id',this.selectID)
  formData.append('sec_id',this.sectionID)
  formData.append('img',this.imgName1)
  formData.append('title',this.secDetailsForm.controls.sec_title.value)
  formData.append('sub_title',this.secDetailsForm.controls.sec_sub_title.value)
  formData.append('about',this.secDetailsForm.controls.sec_about.value)
  formData.append('special_offer',this.secDetailsForm.controls.sec_special.value)
  formData.append('website',this.secDetailsForm.controls.sec_website.value)
  formData.append('map_url',this.secDetailsForm.controls.maps.value)
  formData.append('phone_no',this.secDetailsForm.controls.sec_phone.value)
  formData.append('id',this.id_sec)
  formData.append('user','admin@gmail.com')
  this.dataServe.global_service(1,'/fun_directory_sec_menu',formData).subscribe(data=>{
    console.log(data)
    this.getSectionDataSubmit=data;
    if(this.getSectionDataSubmit.suc>0){
       if(this.id!='0')
         this.msg.successMsg('SU')
       else
         this.msg.errorMsg('SS')
         this.secDetailsForm.reset()

         this.id='0'
         this.getFunDirectory()
    }
    else{
      if(this.id!='0')
      this.msg.successMsg('EU')
      else
        this.msg.errorMsg('ES')
    }
  })
}
getSectionData(){
  console.log(this.selectID)
  this.dataServe.global_service(0,'/fun_directory_section',`menu_id=${this.selectID}`).subscribe(data=>{console.log(data)
    this.getSections=data
    console.log(this.getSections.msg)
   
    this.putdata(this.getSections.msg)
    },error=>{this.msg.globalError(error.status+' '+error.statusText+' in '+error.url)})
}
putdata(v: any) { //assign pagination and sort header to datatable
  console.log(v)
  this.dataSource = new MatTableDataSource(v);
  this.dataSource.paginator = this.paginator;
 
}
putdata1(v: any) { //assign pagination and sort header to datatable
  console.log(v)
  this.dataSource1 = new MatTableDataSource(v);
  this.dataSource1.paginator = this.paginator;
 
}
edit(element:any){
  this.menuID=element.menu_id
  this.selectID=element.menu_id
  this.sectionID=element.sec_id
  console.log(element)
  debugger;
  window.scroll(0,0)
  this.id_sec=element.id;
  this.url2=environment.api_url+'/'+element.img
  this.imgName1=element.img
  this.menuID=element.menu_id
  this.selectID=element.menu_id
  this.getSectionData()
  this.sectionID=element.id

  this.secDetailsForm=this.formBuilder.group({
    menu_id:element.menu_id,
    // section_name:element.sec_id,
    sec_title:element.title,
    sec_sub_title:element.sub_title,
    sec_about:element.about,
    sec_special:element.special_offer,
    sec_website:element.website,
    sec_phone:element.phone_no,
 
    maps:element.map_url
  })
}
applyFilter(event: Event) {
  const filterValue = (event.target as HTMLInputElement).value;
  this.dataSource.filter = filterValue.trim().toLowerCase();
}
getFunDirectory(){
  this.dataServe.global_service(0,'/fun_directory_sec_menu',null).subscribe(data=>{console.log(data)
    this.getFun=data
    console.log(this.getFun.msg)
   
    this.putdata1(this.getFun.msg)
    },error=>{this.msg.globalError(error.status+' '+error.statusText+' in '+error.url)})
}
preview(){
  window.open(environment.funURl,'popup','width=400,height=700')
}
}
