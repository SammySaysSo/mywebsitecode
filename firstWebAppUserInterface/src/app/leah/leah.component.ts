import { Component } from '@angular/core';

@Component({
  selector: 'app-leah',
  templateUrl: './leah.component.html',
  styleUrls: ['./leah.component.css']
})
export class LeahComponent {
  allButtons: number[]=[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30,
                        31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60,
                        61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90,
                        91, 92, 93, 94, 95, 96, 97, 98, 99, 100, 101, 102, 103, 104, 105, 106, 107, 108, 109, 110, 111, 112, 113, 114, 115, 116, 
                        117, 118, 119, 120, 121, 122, 123, 124, 125, 126, 127, 128, 129, 130, 131, 132, 133, 134, 135, 136, 137, 138, 139, 140, 
                        141, 142, 143, 144, 145, 146, 147, 148, 149, 150, 151, 152, 153, 154, 155, 156, 157, 158, 159, 160, 161, 162, 163, 164, 
                        165, 166, 167, 168, 169, 170, 171, 172, 173, 174, 175, 176, 177, 178, 179, 180, 181, 182, 183, 184, 185, 186, 187, 188, 189, 190,
                        191, 192, 193, 194, 195, 196, 197, 198, 199, 200, 201, 202, 203, 204, 205, 206, 207, 208, 209, 210, 211, 212, 213, 214, 215, 
                        216, 217, 218, 219, 220, 221, 222, 223, 224, 225, 226, 227, 228, 229, 230, 231, 232, 233, 234, 235, 236, 237, 238, 239];
  allButtonsStrings: string[]=['', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '',
                                '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '',
                                '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '',
                                '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', 
                                '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', 
                                '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', 
                                '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ''];
  allMineButtons: number[]=[7, 13, 25, 26, 28, 32, 34, 35, 44, 45, 49, 50, 51, 55, 56, 64, 76, 84, 104, 124, 125, 145, 146, 166, 167, 187, 188, 208, 209, 211, 
                            212, 192, 193, 173, 174, 154, 155, 135, 136, 116, 96, 230];
  allOuterNumberLeftButtons: number[]=[5, 6, 23, 24, 43, 63, 83, 103, 123, 144, 165, 186, 207, 229, 228, 227,
                                        0, 1, 2, 3, 4, 20, 21, 22, 40, 41, 42, 60, 61, 62, 80, 81, 82, 100, 101, 102, 120, 121, 122, 140, 141, 142, 143, 160, 161, 162, 163, 164, 180, 181, 182, 183, 184, 185, 200, 201, 202, 203, 204, 205, 206, 220, 221, 222, 223, 224, 225, 226, 227];
  allOuterNumberRightButtons: number[]=[14, 15, 16, 36, 37, 57, 77, 97, 117, 137, 157, 156, 176, 175, 196, 215, 195, 194, 214, 213, 231, 232, 233,
                                        234, 235, 236, 237, 238, 239, 216, 217, 218, 219, 197, 198, 199, 177, 178, 179, 158, 159, 138, 139, 118, 119, 98, 99, 78, 79, 58, 59, 38, 39, 17, 18, 19];
  allInnerNumberButtons: number[]=[27,46,47,48,68,69,70,71,72,52,53,54,33, 74, 75, 95, 115,114,134,133,153,152,171,
                                  172,191,190,189,210,169,168,148,147,127,126,106,105,85,65,66,
                                  67, 87, 86, 88, 89, 90, 91, 92, 93, 73, 94, 113, 112, 111, 110, 109, 108, 107, 128, 129, 130, 131, 132, 151, 150, 170, 149];
  allUpperOuterNumberButtons: number[]=[29,30,31, 8, 9, 10, 11, 12];
  flag: boolean = false;
  numberOfMines: number = 1;
  endGameIfPlacedOnMine: boolean = false;
  gameWin: boolean = false; gameWin2: boolean = true; indexOfPhoto = 0;
  audio = new Audio("assets/leahFiles/musicNCS.mp3");
  allPictures: string[]=["assets/leahFiles/img1.JPG", "assets/leahFiles/img2.jpg", "assets/leahFiles/img3.JPG", "assets/leahFiles/img4.JPG", "assets/leahFiles/img5.JPG",
                          "assets/leahFiles/img6.jpg", "assets/leahFiles/img7.JPG", "assets/leahFiles/img8.jpg", "assets/leahFiles/img9.jpg", "assets/leahFiles/img10.JPG",
                          "assets/leahFiles/img11.JPG", "assets/leahFiles/img12.jpg", "assets/leahFiles/img13.jpg", "assets/leahFiles/img14.jpg", "assets/leahFiles/img15.JPG",
                          "assets/leahFiles/img16.JPG", "assets/leahFiles/img17.JPG", "assets/leahFiles/img18.jpg", "assets/leahFiles/img19.jpg", "assets/leahFiles/img20.JPG",
                          "assets/leahFiles/img21.JPG", "assets/leahFiles/img22.jpg", "assets/leahFiles/img23.JPG", "assets/leahFiles/img24.jpg", "assets/leahFiles/img25.jpg",
                          "assets/leahFiles/img26.jpg", "assets/leahFiles/img27.jpg", "assets/leahFiles/img28.jpg", "assets/leahFiles/img29.JPG", "assets/leahFiles/img30.JPG",
                          "assets/leahFiles/img31.JPG", "assets/leahFiles/img32.JPG", "assets/leahFiles/img33.jpg", "assets/leahFiles/img34.jpg"];

  h1Pressed(): void{
    this.flag = !(this.flag);
  }

  h2Pressed(): void{
    for(var num of this.allButtons){
      (<HTMLButtonElement>document.getElementById(("" + num))).style.backgroundColor = 'pink';
    }
    for(let i=0; i < this.allButtonsStrings.length; i++){
      this.allButtonsStrings[i] = '';
    }
    this.endGameIfPlacedOnMine = false;
  }

  checkIfplaceOnMine(numbtn: number): boolean{
    for(var num of this.allMineButtons){
      if(numbtn == num){ return true; }
    }
    return false;
  }

  placeFromUserInput(numbtn: number): void{
    let found: boolean = false;
    if(!found){
      for(var num of this.allOuterNumberLeftButtons){
        if(num == numbtn){ this.uncheckAllLeft(); found = true; }
      }
    }
    if(!found){
      for(var num of this.allOuterNumberRightButtons){
        if(num == numbtn){ this.uncheckAllRight(); found = true; }
      }
    }
    if(!found){
      for(var num of this.allInnerNumberButtons){
        if(num == numbtn){ this.uncheckAllInner(); found = true; }
      }
    }
    if(!found){
      for(var num of this.allUpperOuterNumberButtons){
        if(num == numbtn){ this.uncheckAllUpper(); found = true; }
      }
    }
  }

  checkIfAllMinesDone(): boolean{
    for(var num of this.allMineButtons){
      if((<HTMLButtonElement>document.getElementById(("" + num))).style.backgroundColor != 'red'){ return false; }
    }
    return true;
  }

  runVideo(): void{
    this.waitForPicturesReading();
  }

  async waitForPicturesReading(){
    await new Promise(resolve => setTimeout(resolve, 10000));
    this.audio.play();
    this.gameWin2 = false;
    for(let i = 0; i < 300; i++){
      await new Promise(resolve => setTimeout(resolve, 4000));
      this.indexOfPhoto += 1;
      if(this.indexOfPhoto >= 32){ this.indexOfPhoto = 0; }
    }
  }

  btnPress(numButton: number): void{
    if(!(this.flag)){ this.endGameIfPlacedOnMine = this.checkIfplaceOnMine(numButton);}
    if(this.allButtonsStrings[numButton] == 'f'){
      this.allButtonsStrings[numButton] = '';
      (<HTMLButtonElement>document.getElementById(("" + numButton))).style.backgroundColor = 'pink';
    }
    else if(this.flag && (<HTMLButtonElement>document.getElementById(("" + numButton))).style.backgroundColor != 'grey'){
      (<HTMLButtonElement>document.getElementById(("" + numButton))).style.backgroundColor = 'red';
      this.allButtonsStrings[numButton] = 'f';
      this.gameWin = this.checkIfAllMinesDone();
      if(this.gameWin){ this.runVideo(); }
    }else{
      this.placeFromUserInput(numButton)
    }
  }

  uncheckAllLeft(): void{
    for(var num of this.allOuterNumberLeftButtons){
      (<HTMLButtonElement>document.getElementById(("" + num))).style.backgroundColor = 'grey';
      this.allButtonsStrings[num] = '';
      if(num == 4){ this.allButtonsStrings[4] = '1'; }
      else if(num == 5){ this.allButtonsStrings[5] = '2'; }
      else if(num == 6){ this.allButtonsStrings[6] = '3'; }
      else if(num == 23){ this.allButtonsStrings[23] = '1'; }
      else if(num == 24){ this.allButtonsStrings[24] = '3'; }
      else if(num == 43){ this.allButtonsStrings[43] = '2'; }
      else if(num == 63){ this.allButtonsStrings[63] = '3'; }
      else if(num == 83){ this.allButtonsStrings[83] = '3'; }
      else if(num == 103){ this.allButtonsStrings[103] = '3'; }
      else if(num == 123){ this.allButtonsStrings[123] = '2'; }
      else if(num == 144){ this.allButtonsStrings[144] = '3'; }
      else if(num == 143){ this.allButtonsStrings[143] = '1'; }
      else if(num == 164){ this.allButtonsStrings[164] = '1'; }
      else if(num == 165){ this.allButtonsStrings[165] = '3'; }
      else if(num == 185){ this.allButtonsStrings[185] = '1'; }
      else if(num == 186){ this.allButtonsStrings[186] = '3'; }
      else if(num == 206){ this.allButtonsStrings[206] = '1'; }
      else if(num == 207){ this.allButtonsStrings[207] = '3'; }
      else if(num == 227){ this.allButtonsStrings[227] = '1'; }
      else if(num == 228){ this.allButtonsStrings[228] = '2'; }
      else if(num == 229){ this.allButtonsStrings[229] = '3'; }
    }
  }

  uncheckAllRight(): void{
    for(var num of this.allOuterNumberRightButtons){
      (<HTMLButtonElement>document.getElementById(("" + num))).style.backgroundColor = 'grey';
      this.allButtonsStrings[num] = '';
      if(num == 14){ this.allButtonsStrings[14] = '3'; }
      else if(num == 15){ this.allButtonsStrings[15] = '2'; }
      else if(num == 16){ this.allButtonsStrings[16] = '1'; }
      else if(num == 36){ this.allButtonsStrings[36] = '3'; }
      else if(num == 37){ this.allButtonsStrings[37] = '1'; }
      else if(num == 57){ this.allButtonsStrings[57] = '2'; }
      else if(num == 77){ this.allButtonsStrings[77] = '3'; }
      else if(num == 97){ this.allButtonsStrings[97] = '3'; }
      else if(num == 117){ this.allButtonsStrings[117] = '3'; }
      else if(num == 137){ this.allButtonsStrings[137] = '2'; }
      else if(num == 157){ this.allButtonsStrings[157] = '1'; }
      else if(num == 156){ this.allButtonsStrings[156] = '3'; }
      else if(num == 176){ this.allButtonsStrings[176] = '1'; }
      else if(num == 175){ this.allButtonsStrings[175] = '3'; }
      else if(num == 195){ this.allButtonsStrings[195] = '1'; }
      else if(num == 194){ this.allButtonsStrings[194] = '3'; }
      else if(num == 214){ this.allButtonsStrings[214] = '1'; }
      else if(num == 213){ this.allButtonsStrings[213] = '3'; }
      else if(num == 233){ this.allButtonsStrings[233] = '1'; }
      else if(num == 232){ this.allButtonsStrings[232] = '2'; }
      else if(num == 231){ this.allButtonsStrings[231] = '3'; }
    }
  }

  uncheckAllInner(): void{
    for(var num of this.allInnerNumberButtons){
      (<HTMLButtonElement>document.getElementById(("" + num))).style.backgroundColor = 'grey';
      this.allButtonsStrings[num] = '';
      if(num == 27){ this.allButtonsStrings[27] = '3'; }
      else if(num == 46){ this.allButtonsStrings[46] = '3'; }
      else if(num == 47){ this.allButtonsStrings[47] = '2'; }
      else if(num == 48){ this.allButtonsStrings[48] = '2'; }
      else if(num == 68){ this.allButtonsStrings[68] = '1'; }
      else if(num == 69){ this.allButtonsStrings[69] = '2'; }
      else if(num == 70){ this.allButtonsStrings[70] = '3'; }
      else if(num == 71){ this.allButtonsStrings[71] = '2'; }
      else if(num == 72){ this.allButtonsStrings[72] = '1'; }
      else if(num == 52){ this.allButtonsStrings[52] = '2'; }
      else if(num == 53){ this.allButtonsStrings[53] = '2'; }
      else if(num == 54){ this.allButtonsStrings[54] = '3'; }
      else if(num == 33){ this.allButtonsStrings[33] = '3'; }
      else if(num == 74){ this.allButtonsStrings[74] = '1'; }
      else if(num == 75){ this.allButtonsStrings[75] = '4'; }
      else if(num == 95){ this.allButtonsStrings[95] = '3'; }
      else if(num == 115){ this.allButtonsStrings[115] = '4'; }
      else if(num == 114){ this.allButtonsStrings[114] = '1'; }
      else if(num == 134){ this.allButtonsStrings[134] = '3'; }
      else if(num == 133){ this.allButtonsStrings[133] = '1'; }
      else if(num == 153){ this.allButtonsStrings[153] = '3'; }
      else if(num == 152){ this.allButtonsStrings[152] = '1'; }
      else if(num == 172){ this.allButtonsStrings[172] = '3'; }
      else if(num == 171){ this.allButtonsStrings[171] = '1'; }
      else if(num == 191){ this.allButtonsStrings[191] = '3'; }
      else if(num == 190){ this.allButtonsStrings[190] = '2'; }
      else if(num == 189){ this.allButtonsStrings[189] = '3'; }
      else if(num == 210){ this.allButtonsStrings[210] = '3'; }
      else if(num == 169){ this.allButtonsStrings[169] = '1'; }
      else if(num == 168){ this.allButtonsStrings[168] = '3'; }
      else if(num == 148){ this.allButtonsStrings[148] = '1'; }
      else if(num == 147){ this.allButtonsStrings[147] = '3'; }
      else if(num == 127){ this.allButtonsStrings[127] = '1'; }
      else if(num == 126){ this.allButtonsStrings[126] = '3'; }
      else if(num == 106){ this.allButtonsStrings[106] = '1'; }
      else if(num == 105){ this.allButtonsStrings[105] = '4'; }
      else if(num == 85){ this.allButtonsStrings[85] = '3'; }
      else if(num == 65){ this.allButtonsStrings[65] = '4'; }
      else if(num == 66){ this.allButtonsStrings[66] = '1'; }
    }
  }

  uncheckAllUpper(): void{
    for(var num of this.allUpperOuterNumberButtons){
      (<HTMLButtonElement>document.getElementById(("" + num))).style.backgroundColor = 'grey';
      this.allButtonsStrings[num] = '';
      if(num == 8){ this.allButtonsStrings[8] = '2'; }
      else if(num == 9){ this.allButtonsStrings[9] = '1'; }
      else if(num == 11){ this.allButtonsStrings[11] = '1'; }
      else if(num == 12){ this.allButtonsStrings[12] = '2'; }
      else if(num == 29){ this.allButtonsStrings[29] = '3'; }
      else if(num == 30){ this.allButtonsStrings[30] = '3'; }
      else if(num == 31){ this.allButtonsStrings[31] = '3'; }
    }
  }
}
