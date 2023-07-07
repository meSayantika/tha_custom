import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from 'src/app/Services/data.service';
import { MessageService } from 'src/app/Services/message.service';

import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { DialogBoxComponent } from 'src/app/Core/dialogBox/dialogBox.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { filter, map, pairwise } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { DomSanitizer } from '@angular/platform-browser';
import { DatePipe } from '@angular/common';
import { Dimensions, ImageCroppedEvent, ImageTransform } from 'ngx-image-cropper';
import { element } from 'protractor';


@Component({
  selector: 'app-fun-menu',
  templateUrl: './fun-menu.component.html',
  styleUrls: ['./fun-menu.component.css']
})
export class FunMenuComponent implements OnInit {
  displayedColumns: string[] = ['position','name'];
  displayedColumns1: string[] = ['position','name'];
  displayedColumns2: string[] = ['position','item','price','description'];
  dataSource = new MatTableDataSource();
  dataSource1 = new MatTableDataSource();
  dataSource2 = new MatTableDataSource();
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private router:Router, private san:DomSanitizer, private formBuilder:FormBuilder, private dataServe:DataService,private msg:MessageService) { }
  getFun:any
  imgName:any
  getFunSec:any
  menuForm!:FormGroup
  secForm!:FormGroup
  itemForm!:FormGroup
  sectionID=''
  restID=''
  getMenus:any
  getMenusMsg:any
  getMenusById:any
  getMenusItemById:any
  menuID=''
  id=0
  sec_id='0'
  item_id='0'
  postMenuData:any
  postSecData:any
  postItemData:any
  getSectionItem:any
  getSectionItemSec:any
  getDescriptionitem:any
  url:any
  ngOnInit() {
    // this.getFunDirectory()
    // this.getMenuDataForTable()
    this.getMenu()
    this.menuForm=this.formBuilder.group({
      menuName:['',Validators.required]
    })
    this.secForm=this.formBuilder.group({
      menuName:['',Validators.required],
      secName:['',Validators.required],
      secImg:['',Validators.required]
    })
    this.itemForm=this.formBuilder.group({
      menuName:['',Validators.required],
      secName:['',Validators.required],
      itemName:['',Validators.required],
      itemPrice:['',Validators.required],
      itemDesc:['',Validators.required]
    })
    this.menuForm.disable()
    this.secForm.disable()
    this.itemForm.disable()
  }
  getFunDirectory(){
    this.dataServe.global_service(0,'/fun_directory_section',`menu_id=${this.menuID}`).subscribe(data=>{console.log(data)
      this.getFun=data
      console.log(this.getFun.msg)
      },error=>{this.msg.globalError(error.status+' '+error.statusText+' in '+error.url)})
  }

  getMenu(){
    this.dataServe.global_service(0,'/fun_directory_menu',null).subscribe(data=>{console.log(data)
      this.getMenus=data
      console.log(this.getMenus.msg)
     
      }) 
    }
    getMenuById(){
      this.dataServe.global_service(0,'/fun_dir_res_menu',`menu_id=${this.menuID}&sec_id=${this.sectionID}&res_id=${this.restID}`).subscribe(data=>{console.log(data)
        this.getMenusById=data
        this.getMenusItemById=data
        console.log(this.getMenusById.msg)
        
        }) 
    }
  getFunSecMenu(){
    this.dataServe.global_service(0,'/fun_directory_sec_menu',`id=${this.sectionID}`).subscribe(data=>{console.log(data)
      this.getFunSec=data
      console.log(this.getFunSec.msg)
      },error=>{this.msg.globalError(error.status+' '+error.statusText+' in '+error.url)})
  }
  getMenuData(){
    console.log(this.sectionID)
    if(this.restID!='')
   {this.getMenuDataForTable(); this.menuForm.enable(); this.secForm.enable();this.itemForm.enable()}
    else
    { this.menuForm.disable();this.refreshMenu();this.secForm.disable();this.refreshSec();this.itemForm.disable();this.refreshItem()}
  }
  refreshMenu(){
    this.menuForm.reset()
    
  }
  refreshSec(){
    this.secForm.reset()
    
  }
  refreshItem(){
    this.itemForm.reset()
  }
  addMenu(){
    var dt={
      sec_id:this.sectionID,
      menu_id:this.menuID,
      res_id:this.restID,
      catg_name:this.menuForm.controls.menuName.value,
      id:this.id,
      user:'admin@gmail.com'
    }
    this.dataServe.global_service(1,'/fun_dir_res_menu',dt).subscribe(data=>{
      console.log(data)
      this.postMenuData=data
      if(this.postMenuData.suc>0)
      {  this.msg.successMsg('SS'); this.refreshMenu();this.getMenuDataForTable();this.id=0 }
      else
        this.msg.errorMsg('ES')
      
    },error=>{this.msg.globalError(error.status+' '+error.statusText+' in '+error.url)})
  }

  getImg(e:any){
    this.imgName=e.target.files[0]
    this.url=this.san.bypassSecurityTrustResourceUrl( URL.createObjectURL(e.target.files[0]))
  }

  addSection(){
    const formData=new FormData()
    formData.append('sec_id',this.sectionID),
    formData.append('menu_id',this.menuID),
    formData.append('res_id',this.restID),
    formData.append('id',this.sec_id),
    formData.append('catg_id',this.secForm.controls.menuName.value),
    formData.append('sec_name',this.secForm.controls.secName.value),
    formData.append('img',this.imgName)
    formData.append('user','admin@gmail.com')
    this.dataServe.global_service(1,'/fun_dir_res_menu_sec',formData).subscribe(data=>{
     this.postSecData=data
     if(this.postSecData.suc>0)
     {  this.msg.successMsg('SS'); this.refreshSec(); this.imgName=null }
     else
       this.msg.errorMsg('ES')
     
   },error=>{this.msg.globalError(error.status+' '+error.statusText+' in '+error.url)})
  }

  getSectionForItem(){
    this.dataServe.global_service(0,'/fun_dir_res_menu_sec',`menu_id=${this.menuID}&sec_id=${this.sectionID}&res_id=${this.restID}&catg_id=${this.itemForm.controls.menuName.value}`).subscribe(data=>{
      console.log(data)
      this.getSectionItem=data
    })
  }
  getSectionForItem1(){
    this.dataServe.global_service(0,'/fun_dir_res_menu_sec',`menu_id=${this.menuID}&sec_id=${this.sectionID}&res_id=${this.restID}`).subscribe(data=>{
      console.log(data)
      this.getSectionItemSec=data
      this.putdata1(this.getSectionItemSec.msg)
    })
  }
  go_to_home(){
    this.router.navigate(['main/admin/adminlanding'])
   }
  postItem(){
    var dt={
      sec_id:this.sectionID,
      menu_id:this.menuID,
      res_id:this.restID,
      menu_catg_id:this.itemForm.controls.menuName.value,
      res_sec_id:this.itemForm.controls.secName.value,
      item_name:this.itemForm.controls.itemName.value,
      item_price:this.itemForm.controls.itemPrice.value,
      item_desc:this.itemForm.controls.itemDesc.value,
      id:this.item_id,
      user:'admin@gmail.com'
    }
    this.dataServe.global_service(1,'/fun_dir_res_menu_sec_item',dt).subscribe(data=>{
      this.postItemData=data
      if(this.postItemData.suc>0)
      {  this.msg.successMsg('SS'); this.refreshItem();  }
      else
        this.msg.errorMsg('ES')
      
    },error=>{this.msg.globalError(error.status+' '+error.statusText+' in '+error.url)})
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
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
  putdata2(v:any){
    console.log(v)
    this.dataSource2 = new MatTableDataSource(v);
    this.dataSource2.paginator = this.paginator;
  }
  getMenuDataForTable(){
    this.dataServe.global_service(0,'/fun_dir_res_menu',`menu_id=${this.menuID}&sec_id=${this.sectionID}&res_id=${this.restID}`).subscribe(data=>{console.log(data)
      this.getMenusMsg=data
      console.log(this.getMenusMsg.msg)
     
      this.putdata(this.getMenusMsg.msg)
      },error=>{this.msg.globalError(error.status+' '+error.statusText+' in '+error.url)})
  }
  preview(){
    window.open(environment.funURl,'popup','width=400,height=700')
  }

  edit(element:any){
   console.log(element);
   this.menuForm.patchValue({
    menuName:element.catg_name,
   })
   this.id=element.id
  }

  section(element:any){
   console.log(element);
   this.secForm.patchValue({
    secName:element.sec_name,
   })
   this.id=element.id

  }

  description(element:any){
    console.log(element);
    this.itemForm.patchValue({
      itemName:element.item_name,
      itemPrice:element.item_price,
      itemDesc:element.item_desc,
    })
    this.id=element.id

  }

  get_res_sec_item(){
    this.dataServe.global_service(0,'/fun_dir_res_menu_sec_item',`menu_id=${this.menuID}&sec_id=${this.sectionID}&res_id=${this.restID}&catg_id=${this.itemForm.controls.menuName.value}&res_sec_id=${this.itemForm.controls.secName.value}`).subscribe(data=>{
    console.log(data);
    this.getDescriptionitem=data
    console.log(this.getDescriptionitem.msg)
      this.putdata2(this.getDescriptionitem.msg)
    })
  }

}


