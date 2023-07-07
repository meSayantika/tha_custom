import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from 'src/app/Services/data.service';
import { MessageService } from 'src/app/Services/message.service';




@Component({
  selector: 'app-payment_page',
  templateUrl: './payment_page.component.html',
  styleUrls: ['./payment_page.component.css']
})
export class Payment_pageComponent implements OnInit {

  constructor(private activatedRoute:ActivatedRoute,private router:Router,private dataServe: DataService, private msg: MessageService) { }
 id:any;
 hotel_id:any;
 paymentprop:any;
  ngOnInit() {
    this.id=atob(this.activatedRoute.snapshot.params['id']),
    this.hotel_id=atob(this.activatedRoute.snapshot.params['hotel_id'])
  }
  payment(amt:any){
    var dt={
      id:this.id,
      hotel_id:this.hotel_id,
      amt:amt,
      user:this.hotel_id
    }
    this.dataServe.global_service(1,'/pay_proposal',dt).subscribe(data =>{
       console.log(data);
       this.paymentprop=data;
       if( this.paymentprop.suc>0){
          this.msg.successMsg('SS')
          this.router.navigate(['/auth'])
       }
       else{
        this.msg.errorMsg('ES')
       }
    })
  }

}
