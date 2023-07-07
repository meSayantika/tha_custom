import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { log } from 'console';
import { DataService } from 'src/app/Services/data.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-print_menu',
  templateUrl: './print_menu.component.html',
  styleUrls: ['./print_menu.component.css']
})
export class Print_menuComponent implements OnInit {

printContent:any
originalContent:any

hotel_id:any
menu_id:any
url=environment.api_url+'/'
public masterData: any = {};
public inProgress: boolean = false;
public activeTab: string = '';
public menuNames:any = {
  B:'Breakfast',
  L:'Lunch',
  A:'Dinner'
}

  constructor(private activatedRoute:ActivatedRoute, private dataService:DataService) { }


  private loadServerData() {
    this.hotel_id=atob(this.activatedRoute.snapshot.params['hotel_id'])
    this.menu_id=atob(this.activatedRoute.snapshot.params['menu_id'])

    this.inProgress = true;
    this.dataService.global_service(0,'/static_menu',`hotel_id=${this.hotel_id}&res_id=${this.menu_id}`).subscribe((apiResult: any) => {
      //console.log(apiResult)
      this.masterData = apiResult;
      this.inProgress = false;
    })
  }
  
  public getKeys(obj: any): string[] {
    //console.log(obj, 'xxxxxxxxxxxxx');
    
    return Object.keys(obj);
  }
  
  public fillContent(meuName: string) {
    this.activeTab = meuName;
    //onsole.log(this.activeTab); 
  }

  printPageArea(areaID:any){
    console.log(areaID)
    this.printContent = document.getElementById(areaID)?.innerHTML;
    this.originalContent = document.body.innerHTML;
    document.body.innerHTML = this.printContent;
    window.print();
    document.body.innerHTML = this.originalContent;
  }

  // printBtn(areaID:any){
  //   console.log('areaID')
  //   this.printContent = document.getElementById(areaID)?.innerHTML;
  //   this.originalContent = document.body.innerHTML;
  //   document.body.innerHTML = this.printContent;
  //   window.print();
  //   document.body.innerHTML = this.originalContent;
  // }




  ngOnInit() {
    this.loadServerData();
    this.fillContent('B');  
  }
  

}
