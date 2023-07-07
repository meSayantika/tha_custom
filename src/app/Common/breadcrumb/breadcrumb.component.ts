import { Component, OnInit } from '@angular/core';
import { Breadcrumb } from '../models/breadcrumb.model';
import { BreadcrumbService } from 'src/app/breadcrumb.service';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.css']
})
export class BreadcrumbComponent implements OnInit {

  breadcrumbs$: Observable<Breadcrumb[]>;

  constructor(private readonly breadcrumbService: BreadcrumbService) {
    this.breadcrumbs$ = breadcrumbService.breadcrumbs$;
  }
ngOnInit(): void {
  
}

}
