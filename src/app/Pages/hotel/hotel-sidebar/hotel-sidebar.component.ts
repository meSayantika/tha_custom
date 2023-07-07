import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/Services/data.service';
import { DialogBoxComponent } from 'src/app/Core/dialogBox/dialogBox.component';
import { environment } from 'src/environments/environment';
import { MessageService } from 'src/app/Services/message.service';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import {MatTreeFlatDataSource, MatTreeFlattener} from '@angular/material/tree';
import {FlatTreeControl} from '@angular/cdk/tree'
interface FoodNode {
  name: string;
  icon:string;
  route:string;
  id:number;
  children?: FoodNode[];
}

const TREE_DATA: FoodNode[] = [
  {
    name: 'Personal Concierge',
    children: [
      {name: 'Avatar',icon:'face',route:'avatar', id:1},
      {name: 'Voice',icon:'mic',route:'voice', id:2},
      // {name: 'FAQ',icon:'help',route:'faq', id:3 },
     
    ],
    icon:'',
    route:'',
    id:0
  // }, {
  //   name: 'Vegetables',
  //   children: [
  //     {
  //       name: 'Green',
  //       children: [
  //         {name: 'Broccoli'},
  //         {name: 'Brussels sprouts'},
  //       ]
  //     }, {
  //       name: 'Orange',
  //       children: [
  //         {name: 'Pumpkins'},
  //         {name: 'Carrots'},
  //       ]
  //     },
  //   ]
  },
];
const assign_msg: FoodNode[] =[
  {
    name:'Assign Message',
    children:[
      {name:'Employee',icon:'', route:'emp', id:1},
      {name:'Guest',icon:'', route:'guest', id:2}
    ],
    icon:'',
    route:'', id:0
  }
]
const promotions:FoodNode[]=[{
  name:'Promotions',
  children:[
    {
      name:'Promotions',icon:'',route:'promotions', id:1
    },
    {
      name:'Photo OPS',icon:'',route:'photo', id:2
    },
    {
      name:'Flip Book',icon:'',route:'flip', id:3
    }
  
  ],
    icon:'',
    route:'', id:0
  }
  ]
  const lost_found:FoodNode[]=[{
    name:'Lost & Found',
    children:[
      {
        name:'By Admin',icon:'',route:'lost_found', id:1,
      },
      {
        name:'By Guest',icon:'',route:'lost_found_guest', id:2
      }
    
    ],
      icon:'',
      route:'',id:0
    }
    ]


/** Flat node with expandable and level information */
interface ExampleFlatNode {
  expandable: boolean;
  name: string;
  level: number;
}

@Component({
  selector: 'app-hotel-sidebar',
  templateUrl: './hotel-sidebar.component.html',
  styleUrls: ['./hotel-sidebar.component.css']
})
export class HotelSidebarComponent implements OnInit {
  final_pay:any
  initial_pay:any
  check_activity:any
  status:any
  hotel_id:any
  privilege:any
  setup_mode:any
  url:any
  routeId:any;
  urls:any;
  activePath:any;
  activeMenu:any = true
constructor(private activatedRoute:ActivatedRoute, private dataServe:DataService ,private dialog:MatDialog,private msg:MessageService,private router:Router) {
    this.dataSource.data = TREE_DATA;
    this.dataSource1.data = assign_msg;
    this.dataSource2.data = promotions;
    this.dataSource3.data = lost_found;
   }
  menuData:any
  private _transformer = (node: FoodNode, level: number) => {
    return {
      expandable: !!node.children && node.children.length > 0,
      name: node.name,
      level: level,
    };
  }
  treeControl = new FlatTreeControl<ExampleFlatNode>(
    node => node.level, node => node.expandable);

treeFlattener = new MatTreeFlattener(
    this._transformer, node => node.level, node => node.expandable, node => node.children);

dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);
dataSource1 = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);
dataSource2 = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);
dataSource3 = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);
hasChild = (_: number, node: ExampleFlatNode) => node.expandable;
  ngOnInit() {
    this.privilege=localStorage.getItem('privilege')
    console.log(this.privilege);
    this.setup_mode=localStorage.getItem('setup_mode')
    console.log(this.setup_mode);
    
    this.hotel_id=localStorage.getItem('hotel_id')
   this.status=localStorage.getItem('hotel_flag')
  this.initial_pay=localStorage.getItem('initial_pay')
  this.final_pay=localStorage.getItem('final_pay')
  console.log(this.initial_pay,this.final_pay)
   this.router.events.subscribe((event:any)=>{
    if(event instanceof NavigationEnd)
    this.url=event.url
    console.log(this.url)
   })
   this.url=this.router.url
   this.urls = this.url.split('/')
   this.activePath = this.urls.length >= 3 ? this.url.split('/')[2] : null
  //  console.log(this.activePath);
   
   if(this.activePath){
    if(this.activePath == 'hotel_create_prop' || this.activePath == 'payment_page'){
      if(atob(decodeURIComponent(this.urls[6])) == 'S', atob(decodeURIComponent(this.urls[5])) == 'U'){
        this.activeMenu = false
      }
      // console.log('lalala', atob(decodeURIComponent(this.urls[6])), atob(decodeURIComponent(this.urls[5])));
      
    }
   }
  //  console.log(this.url.split('/')[2])

   console.log(this.status)
   console.log(localStorage.getItem('Restaurant_id'));
   
      this.dataServe.global_service(0,'/check_active_status',`id=${localStorage.getItem('Restaurant_id')}`).subscribe(data=>{
        console.log(data);
        this.check_activity=data;
    // this.privilege=this.check_activity.suc>0 ?this.check_activity.msg[0].account_type : localStorage.getItem('privilege')
    this.setup_mode=this.check_activity.suc>0 ?this.check_activity.msg[0].setup_mode : localStorage.getItem('setup_mode')
        console.log(this.privilege);
        console.log(this.setup_mode)
        

        if(this.check_activity.msg[0].approval_flag=='A'){  
          this.dataServe.local_service(environment.approvedMenu).subscribe(
            data=>{
              console.log(data)
              this.menuData=data
            },error=>{this.msg.globalError(error.status+' '+error.statusText+' in '+error.url)})
         
           }
        else{
          this.dataServe.local_service(environment.menuSetup).subscribe(
            data=>{
              console.log(data)
              this.menuData=data
            },error=>{this.msg.globalError(error.status+' '+error.statusText+' in '+error.url)})
         
           }
          },error=>{this.msg.globalError(error.status+' '+error.statusText+' in '+error.url)})

         
         
  
    }
  openDialog(v:any) {
    const dialogRef = this.dialog.open(DialogBoxComponent, {
      // width: '250px',
      data: {flag:'signout',content:v}
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      if(result==1)
       {
        localStorage.clear();
        this.router.navigate(['auth'])
       }

    });
  }
 go_to_managers(){
  this.hotel_id=this.activatedRoute.snapshot.params['hotel_id']
  this.hotel_id=atob(this.hotel_id)
  // console.log()
  this.router.navigate(['managers',this.hotel_id])
 }
 move_to(e:any, arr:any=null){
  console.log(e)
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
  this.addRemoveActiveClass(e, arr);
  this.router.navigate(['hotel/add-pca',btoa(this.hotel_id)]).catch(e=>this.msg.globalError(e))

 }
 else if(e=='Voice'){
  this.addRemoveActiveClass(e, arr);
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
  this.addRemoveActiveClass(e, arr);
  this.router.navigate(['hotel/hotel_emp_msg',btoa(this.hotel_id)]).catch(e=>this.msg.globalError(e))

 }
 else if(e=='Guest'){
  this.addRemoveActiveClass(e, arr);
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
  this.router.navigate(['hotel/hotel_promo',btoa(this.hotel_id)]).catch(e=>this.msg.globalError(e))

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
  // this.addRemoveActiveClass(e, arr);
  this.router.navigate(['hotel/platform_faq',btoa(this.hotel_id)]).catch(e=>this.msg.globalError(e))

 }
 else if(e=='By Admin'){
  this.addRemoveActiveClass(e, arr);
  this.router.navigate(['hotel/lost_found_home',btoa(this.hotel_id)]).catch(e=>this.msg.globalError(e))

 }
 else if(e=='By Guest'){
  this.addRemoveActiveClass(e, arr);
  this.router.navigate(['hotel/lost_found_guest',btoa(this.hotel_id)]).catch(e=>this.msg.globalError(e))

 }
 else if(e=='your_directory'){
  this.router.navigate(['hotel/your_directory',btoa(this.hotel_id)]).catch(e=>this.msg.globalError(e))

 }
 else if(e=='qr_code_signage'){
  this.router.navigate(['hotel/qr_code_signage',btoa(this.hotel_id)]).catch(e=>this.msg.globalError(e))

 }
 else if(e=='hotel_data'){
  this.router.navigate(['hotel/hotel_data',btoa(this.hotel_id)]).catch(e=>this.msg.globalError(e))

 }
 else if(e=='hotel_calendar'){
  this.router.navigate(['hotel/hotel_calendar',btoa(this.hotel_id)]).catch(e=>this.msg.globalError(e))

 }
 else if(e=='training'){
  this.router.navigate(['hotel/training',btoa(this.hotel_id)]).catch(e=>this.msg.globalError(e))

 }
 else if(e=='no_sale'){
  this.router.navigate(['hotel/no_sale',btoa(this.hotel_id)]).catch(e=>this.msg.globalError(e))
 }
 else if(e=='directory_design'){
  this.router.navigate(['hotel/directory_design',btoa(this.hotel_id)]).catch(e=>this.msg.globalError(e))

 }
 else if(e=='pre_reg_url'){
  this.router.navigate(['hotel/pre_reg_url',btoa(this.hotel_id)]).catch(e=>this.msg.globalError(e))

 }
 else if(e=='submit_ticket'){
  this.router.navigate(['hotel/submit_ticket',btoa(this.hotel_id)]).catch(e=>this.msg.globalError(e))
 }
}

addRemoveActiveClass(e:any, arr: any){
  for(let dt of arr['_data']['_value'][0].children){
    this.routeId = document.querySelector(`#${dt.name.split(' ').join('')}`)
    // console.log(this.routeId);
    
    if(this.routeId.classList.value != '')
      {this.routeId.classList.remove("active");}
  }

  this.routeId = document.getElementById(`${e.split(' ').join('')}`)
  this.routeId.classList.add("active");
}
}