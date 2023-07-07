import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { Router } from '@angular/router';
import { DataService } from 'src/app/Services/data.service';
import { MessageService } from 'src/app/Services/message.service';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
@Component({
  selector: 'app-add-side-menu',
  templateUrl: './add-side-menu.component.html',
  styleUrls: ['./add-side-menu.component.css']
})
export class AddSideMenuComponent implements OnInit {
  displayedColumns: string[] = ['position','name','on_off'];
  dataSource = new MatTableDataSource();
  getAddMenu:any
  constructor(private msg:MessageService, private router: Router,private dataServe:DataService,private formBuilder: FormBuilder) { }
  addMenuForm!:FormGroup
  getMenus:any;
  id:any
  setupID:any
  count=0
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngOnInit() {
    this.addMenuForm=this.formBuilder.group({
      menu_name:['',Validators.required]
    })
    this.getMenuData()
  }
  refresh(){
    this.addMenuForm.reset()
  }
  add_menu(){
    var dt={
      menu_name:this.addMenuForm.controls.menu_name.value,
      id:this.id?this.id:0,
      menu_url:this.addMenuForm.controls.menu_name.value.toString().split(' ').join(''),
      user:'admin@gmail.com'
    }
    this.dataServe.global_service(1,'/fun_directory_menu',dt).subscribe(data=>{console.log(data)
    this.getAddMenu=data;
    if(this.getAddMenu.suc>0){
      if(this.id>0)
       this.msg.successMsg('SU')
      else
       this.msg.errorMsg('SS')

    this.getMenuData()
    this.addMenuForm.reset()
    this.id=0
    }
    else{
      if(this.id>0)
      this.msg.successMsg('EU')
     else
      this.msg.errorMsg('ES')
    }
  },error=>{this.msg.globalError(error.status+' '+error.statusText+' in '+error.url)})
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  getMenuData(){
    this.dataServe.global_service(0,'/fun_directory_menu',null).subscribe(data=>{console.log(data)
      this.getMenus=data
      console.log(this.getMenus.msg)
     
      this.putdata(this.getMenus.msg)
      },error=>{this.msg.globalError(error.status+' '+error.statusText+' in '+error.url)})
  }
  putdata(v: any) { //assign pagination and sort header to datatable
    console.log(v)
    this.dataSource = new MatTableDataSource(v);
    this.dataSource.paginator = this.paginator;
   
  }
  edit(element:any){
    console.log(element)
    this.addMenuForm.patchValue({
      menu_name:element.menu_name,
       
    })
    this.id=element.id
  }

  click_setup(e:any,id:any){
    this.count=0
    console.log(e.checked,this.id)
    if(e.checked==true){
        this.getMenus.msg.forEach((element:any) => {
          if(element.active_flag=='Y')
          this.count++
          
        });
        console.log(this.count)
        if(this.count>=12)
        {
          this.setupID=document.getElementById('setupmodeid'+id)
          this.setupID.checked=false
          e.checked=false
          this.msg.globalError('You can\'t have more than 12 active menus')
        }
    }
   this.addMenuForm.reset()
    var dt={
      id: this.id,
      flag:e.checked?'Y':'N',
      user:'admin@gmail.com'
    }
    this.dataServe.global_service(1,'/fun_directory_menu_active',dt).subscribe(data=>{
      console.log(data)
      this.getMenuData()
  this.id=0;

    },error=>{this.msg.globalError(error.status+' '+error.statusText+' in '+error.url)})
  }
  viewInfo(){
    // console.log('hello')
    this.dataServe.showInfo.next({data:'fundirectory',flag:true,heading:'Fun Directory-Add Menus',type:'M'})
  }
}
