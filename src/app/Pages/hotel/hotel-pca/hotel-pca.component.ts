import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { MessageService } from "src/app/Services/message.service";
import { DataService } from "src/app/Services/data.service";
@Component({
  selector: "app-hotel-pca",
  templateUrl: "./hotel-pca.component.html",
  styleUrls: ["./hotel-pca.component.css"],
})
export class HotelPcaComponent implements OnInit {
  constructor(
    private router: Router,
    private msg: MessageService,
    private dataServe: DataService
  ) {}
  hotel_id: any;
  ngOnInit() {
    this.hotel_id = localStorage.getItem("hotel_id");
  }
  go_home() {
    this.router
      .navigate(["hotel/home", btoa(this.hotel_id)])
      .catch((e) => this.msg.globalError(e));
  }
  viewInfo() {
    this.dataServe.showInfo.next({
      data: "add-pca",
      flag: true,
      heading: "Avatar",
    });
  }
}
