import { Component } from '@angular/core';

@Component({
  selector: 'app-copy-web',
  templateUrl: './copy-web.component.html',
  styleUrls: ['./copy-web.component.css']
})
export class CopyWebComponent {
  firstNaming: string="LLLLLLLLLLLLLLLLL";
  lol(){
    this.firstNaming = "it workssssssssssss";
  }
}
