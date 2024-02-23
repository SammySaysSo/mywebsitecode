import { Component } from '@angular/core';
import { TempServService } from '../temp-serv.service';
import { tempCreateData } from '../tempCreateData';

@Component({
  selector: 'app-experience',
  templateUrl: './experience.component.html',
  styleUrls: ['./experience.component.css']
})
export class ExperienceComponent {
  // constructor(private service: TempServService){}

  // newExpenseCost?: number;
  // newExpenseName?: string;
  // newCreatedExpense?: tempCreateData;

  // getValues(): void{
  //   this.newExpenseCost = parseFloat((<HTMLInputElement>document.getElementById("newCost")).value);
  //   this.newExpenseName = (<HTMLInputElement>document.getElementById("newName")).value;

  //   this.newCreatedExpense = new tempCreateData();
  //   this.newCreatedExpense.tempCost = this.newExpenseCost;
  //   this.newCreatedExpense.tempName = this.newExpenseName;

  //   this.service.insertValues(this.newCreatedExpense).subscribe();
  // }
}
