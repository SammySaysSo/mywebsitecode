import { Component, OnInit } from '@angular/core';
import { tempData } from '../tempData';
import { TempServService } from '../temp-serv.service';

@Component({
  selector: 'app-main-compon',
  templateUrl: './main-compon.component.html',
  styleUrls: ['./main-compon.component.css']
})
export class MainComponComponent implements OnInit{
  tempValues: tempData[]=[];

  constructor(private service: TempServService){}

  ngOnInit(): void {
    // this.refreshDataList();
  }

  // refreshDataList(){
  //   this.service.getValues().subscribe((data: tempData[]) => {
  //     this.tempValues=data;
  //   });
  // }
}
