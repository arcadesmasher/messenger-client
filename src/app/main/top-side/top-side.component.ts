import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'top-side',
  templateUrl: './top-side.component.html',
  styleUrls: ['./top-side.component.scss']
})
export class TopSideComponent implements OnInit {

  loggedInMail: string = "";

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.loggedInMail = this.dataService.loggedInEMail;
  }

}
