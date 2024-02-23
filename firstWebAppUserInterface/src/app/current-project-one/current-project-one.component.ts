import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-current-project-one',
  templateUrl: './current-project-one.component.html',
  styleUrls: ['./current-project-one.component.css']
})
export class CurrentProjectOneComponent implements OnInit{ //TDL: fix placing red on green or vice versa
  h1: boolean=false; h2: boolean=false; h3: boolean=false; h4: boolean=false;
  startButtonCounter = 0; endButtonCounter = 0; startButtonPlace = 0; endButtonPlace = 0; found = false; notPossible = false; endPathFound = false;
  allButtons: number[]=[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30,
                        31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60,
                        61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90,
                        91, 92, 93, 94, 95, 96, 97, 98, 99, 100];
  tempYellowSquares: number[]=[]; tempCountYellowStart = 0; tempCountYellowEnd = 0; allWallSquares: number[]=[]; tempEndPath: number[]=[];
  prioDoublePositive = false; prioPositiveNegative = false; prioNegativePositive = false; prioDoubleNegative = false;
  leftOnly = false; rightOnly = false; upOnly = false; downOnly = false;

  ngOnInit(): void {
    for(let i=0; i < this.allButtons.length; i++){
      (<HTMLButtonElement>document.getElementById("b"+this.allButtons[i])).style.backgroundColor = 'white';
    }
  }

  h1Pressed(){
    this.h1 = true; this.h2 = false; this.h3 = false; this.h4 = false;
    (<HTMLButtonElement>document.getElementById("h1")).style.backgroundColor = 'darkblue';
    (<HTMLButtonElement>document.getElementById("h2")).style.backgroundColor = 'blue';
    (<HTMLButtonElement>document.getElementById("h3")).style.backgroundColor = 'blue';
    (<HTMLButtonElement>document.getElementById("h4")).style.backgroundColor = 'blue';
  }
  h2Pressed(){
    this.h1 = false; this.h2 = true; this.h3 = false; this.h4 = false;
    (<HTMLButtonElement>document.getElementById("h1")).style.backgroundColor = 'blue';
    (<HTMLButtonElement>document.getElementById("h2")).style.backgroundColor = 'darkblue';
    (<HTMLButtonElement>document.getElementById("h3")).style.backgroundColor = 'blue';
    (<HTMLButtonElement>document.getElementById("h4")).style.backgroundColor = 'blue';
  }
  h3Pressed(){
    this.h1 = false; this.h2 = false; this.h3 = true; this.h4 = false;
    (<HTMLButtonElement>document.getElementById("h1")).style.backgroundColor = 'blue';
    (<HTMLButtonElement>document.getElementById("h2")).style.backgroundColor = 'blue';
    (<HTMLButtonElement>document.getElementById("h3")).style.backgroundColor = 'darkblue';
    (<HTMLButtonElement>document.getElementById("h4")).style.backgroundColor = 'blue';
  }
  h4Pressed(){
    this.h1 = false; this.h2 = false; this.h3 = false; this.h4 = true;
    (<HTMLButtonElement>document.getElementById("h1")).style.backgroundColor = 'blue';
    (<HTMLButtonElement>document.getElementById("h2")).style.backgroundColor = 'blue';
    (<HTMLButtonElement>document.getElementById("h3")).style.backgroundColor = 'blue';
    (<HTMLButtonElement>document.getElementById("h4")).style.backgroundColor = 'darkblue';
    this.search();
  }

  h5Pressed(){
    this.h1 = false; this.h2 = false; this.h3 = false; this.h4 = false; this.allWallSquares = []; this.notPossible = false; this.endPathFound = false;
    this.startButtonCounter = 0; this.endButtonCounter = 0; this.startButtonPlace = 0; this.endButtonPlace = 0; this.found = false; this.tempCountYellowEnd = 0;
    this.tempYellowSquares = []; this.tempCountYellowStart = 0; this.tempCountYellowEnd = 0; this.allWallSquares = []; this.tempEndPath = [];
    this.prioDoubleNegative = false; this.prioDoublePositive = false; this.prioNegativePositive = false; this.prioPositiveNegative = false;
    this.leftOnly = false; this.rightOnly = false; this.upOnly = false; this.downOnly = false;
    (<HTMLButtonElement>document.getElementById("h1")).style.backgroundColor = 'blue';
    (<HTMLButtonElement>document.getElementById("h2")).style.backgroundColor = 'blue';
    (<HTMLButtonElement>document.getElementById("h3")).style.backgroundColor = 'blue';
    (<HTMLButtonElement>document.getElementById("h4")).style.backgroundColor = 'blue';
    (<HTMLButtonElement>document.getElementById("h5")).style.backgroundColor = 'blue';

    for(let i=0; i < this.allButtons.length; i++){
      (<HTMLButtonElement>document.getElementById("b"+this.allButtons[i])).style.backgroundColor = 'white';
    }
  }

  async search(){
    for(let i=0; i < this.allButtons.length; i++){ //finding start, end, and wall positions
      if((<HTMLButtonElement>document.getElementById("b"+this.allButtons[i])).style.backgroundColor == 'darkgreen'){ this.startButtonPlace = i; this.startButtonPlace += 1; }
      if((<HTMLButtonElement>document.getElementById("b"+this.allButtons[i])).style.backgroundColor == 'red'){ this.endButtonPlace = i; this.endButtonPlace += 1; }
      if((<HTMLButtonElement>document.getElementById("b"+this.allButtons[i])).style.backgroundColor == 'black'){ this.allWallSquares.push((i+1)); }
    }
    this.found = this.firstSearchOutcome();
    await new Promise(resolve => setTimeout(resolve, 500));
    if(!this.found){
      this.secondSearchOutcome();
      this.found = this.checkIfEndNextToYellow();
    }
    await new Promise(resolve => setTimeout(resolve, 500));
    while(!this.found){
      this.tempYellowSquares = [];
      for(let i=0; i < this.allButtons.length; i++){ //finding all yellows and palcing them in a temp array
        if((<HTMLButtonElement>document.getElementById("b"+this.allButtons[i])).style.backgroundColor == 'yellow'){ 
          this.tempYellowSquares.push(this.allButtons[i]); this.tempCountYellowStart += 1; 
        }
      }
      if(this.tempCountYellowStart > this.tempCountYellowEnd){
        for(let i=0; i < this.tempYellowSquares.length; i++){
          this.placingYellowOnThirdSearch(this.tempYellowSquares[i]);
        }
        this.tempCountYellowEnd = this.tempCountYellowStart;
        this.tempCountYellowStart = 0;
        this.found = this.checkIfEndNextToYellow();
      }else{ this.found = true; this.notPossible = true; }
      await new Promise(resolve => setTimeout(resolve, 500));
    }
    if(!this.notPossible){
      let widthEnd = this.endButtonPlace%10; let heightEnd = ((this.endButtonPlace - (this.endButtonPlace%10))/10)+1;
      let widthStart = this.startButtonPlace%10; let heightStart = ((this.startButtonPlace - (this.startButtonPlace%10))/10)+1;
      if(widthStart-widthEnd == 0 && heightStart-heightEnd > 0){ this.upOnly = true; }
      else if(widthStart-widthEnd == 0 && heightStart-heightEnd < 0){ this.downOnly = true; }
      else if(widthStart-widthEnd > 0 && heightStart-heightEnd == 0){ this.rightOnly = true; }
      else if(widthStart-widthEnd < 0 && heightStart-heightEnd == 0){ this.leftOnly = true; }
      else if(widthStart-widthEnd >= 0 && heightStart-heightEnd >= 0){ this.prioDoublePositive = true; }
      else if(widthStart-widthEnd <= 0 && heightStart-heightEnd <= 0){ this.prioDoubleNegative = true; }
      else if(widthStart-widthEnd >= 0 && heightStart-heightEnd <= 0){ this.prioPositiveNegative = true; }
      else if(widthStart-widthEnd <= 0 && heightStart-heightEnd >= 0){ this.prioNegativePositive = true; }
      let mainPoint = this.getNextPossibleYellow(this.endButtonPlace); let f = 0;
      while(!this.endPathFound){
        if(mainPoint == -2){
          this.endPathFound = true;
        }
        else if(mainPoint == -1){
          mainPoint = this.getNextPossibleYellow(this.endButtonPlace);
          this.tempEndPath = [];
          this.tempEndPath.push(mainPoint);
        }else{
          this.tempEndPath.push(mainPoint);
          heightEnd = ((mainPoint - (mainPoint%10))/10)+1;
          if(mainPoint%10 != 0){ widthEnd = mainPoint%10; }
          else{ widthEnd = 10; }
          if(widthStart-widthEnd == 0 && heightStart-heightEnd > 0){ 
            this.prioDoubleNegative = false; this.prioDoublePositive = false; this.prioNegativePositive = false; this.prioPositiveNegative = false; 
            this.upOnly = false; this.downOnly = true; this.leftOnly = false; this.rightOnly = false;}
          else if(widthStart-widthEnd == 0 && heightStart-heightEnd < 0){ 
            this.prioDoubleNegative = false; this.prioDoublePositive = false; this.prioNegativePositive = false; this.prioPositiveNegative = false; 
            this.upOnly = true; this.downOnly = false; this.leftOnly = false; this.rightOnly = false;}
          else if(widthStart-widthEnd > 0 && heightStart-heightEnd == 0){ 
            this.prioDoubleNegative = false; this.prioDoublePositive = false; this.prioNegativePositive = false; this.prioPositiveNegative = false; 
            this.upOnly = false; this.downOnly = false; this.leftOnly = false; this.rightOnly = true;}
          else if(widthStart-widthEnd < 0 && heightStart-heightEnd == 0){ 
            this.prioDoubleNegative = false; this.prioDoublePositive = false; this.prioNegativePositive = false; this.prioPositiveNegative = false; 
            this.upOnly = false; this.downOnly = false; this.leftOnly = true; this.rightOnly = false;}
          else if(widthStart-widthEnd >= 0 && heightStart-heightEnd >= 0){ 
            this.prioDoubleNegative = false; this.prioDoublePositive = true; this.prioNegativePositive = false; this.prioPositiveNegative = false; 
            this.upOnly = false; this.downOnly = false; this.leftOnly = false; this.rightOnly = false;}
          else if(widthStart-widthEnd <= 0 && heightStart-heightEnd <= 0){ 
            this.prioDoubleNegative = true; this.prioDoublePositive = false; this.prioNegativePositive = false; this.prioPositiveNegative = false; 
            this.upOnly = false; this.downOnly = false; this.leftOnly = false; this.rightOnly = false;}
          else if(widthStart-widthEnd >= 0 && heightStart-heightEnd <= 0){ 
            this.prioDoubleNegative = false; this.prioDoublePositive = false; this.prioNegativePositive = false; this.prioPositiveNegative = true; 
            this.upOnly = false; this.downOnly = false; this.leftOnly = false; this.rightOnly = false;}
          else if(widthStart-widthEnd <= 0 && heightStart-heightEnd >= 0){ 
            this.prioDoubleNegative = false; this.prioDoublePositive = false; this.prioNegativePositive = true; this.prioPositiveNegative = false; 
            this.upOnly = false; this.downOnly = false; this.leftOnly = false; this.rightOnly = false;}
          mainPoint = this.getNextMainPoint(mainPoint);
        }
        f++;
      }
      for(let i=0; i < this.allButtons.length; i++){
        (<HTMLButtonElement>document.getElementById("b"+this.allButtons[i])).style.backgroundColor = 'white';
      }
      (<HTMLButtonElement>document.getElementById("b"+this.startButtonPlace)).style.backgroundColor = 'darkgreen';
      (<HTMLButtonElement>document.getElementById("b"+this.endButtonPlace)).style.backgroundColor = 'red';
      for(let i=0; i < this.allWallSquares.length; i++){
        (<HTMLButtonElement>document.getElementById("b"+this.allWallSquares[i])).style.backgroundColor = 'black';
      }
      for(let i=0; i < this.tempEndPath.length; i++){
        (<HTMLButtonElement>document.getElementById("b"+this.tempEndPath[i])).style.backgroundColor = 'yellow';
        await new Promise(resolve => setTimeout(resolve, 400));
      }
    }
  }

  getNextMainPoint(placement: number): number{
    let alreadyInLoopRight = false; let alreadyInLoopLeft = false; let alreadyInLoopUp = false; let alreadyInLoopDown = false;
    if((placement + 1)%10 != 1 && (<HTMLButtonElement>document.getElementById("b"+(placement + 1))).style.backgroundColor == 'darkgreen'){ return -2; }
    if(placement%10 != 1 && (<HTMLButtonElement>document.getElementById("b"+(placement - 1))).style.backgroundColor == 'darkgreen'){ return -2; }
    if((placement - 10)>0 && (<HTMLButtonElement>document.getElementById("b"+(placement - 10))).style.backgroundColor == 'darkgreen'){ return -2; }
    if((placement + 10)<101 && (<HTMLButtonElement>document.getElementById("b"+(placement + 10))).style.backgroundColor == 'darkgreen'){ return -2; }
    if(this.upOnly){
      for(let i=0; i < this.tempEndPath.length; i++){ //checking down
        if((placement - 10)>0 && (placement - 10)==this.tempEndPath[i]){ alreadyInLoopDown = true; }
      }
      if(!alreadyInLoopDown){ 
        if((placement - 10)>0 && (<HTMLButtonElement>document.getElementById("b"+(placement - 10))).style.backgroundColor == 'yellow'){ return (placement - 10); }
      }
      for(let i=0; i < this.tempEndPath.length; i++){ //checking left
        if(placement%10 != 1 && (placement - 1)==this.tempEndPath[i]){ alreadyInLoopLeft = true; }
      }
      if(!alreadyInLoopLeft){ 
        if(placement%10 != 1 && (<HTMLButtonElement>document.getElementById("b"+(placement - 1))).style.backgroundColor == 'yellow'){ return (placement - 1); }
      }
      for(let i=0; i < this.tempEndPath.length; i++){ //checking right
        if((placement + 1)%10 != 1 && (placement + 1)==this.tempEndPath[i]){ alreadyInLoopRight = true; }
      }
      if(!alreadyInLoopRight){ 
        if((placement + 1)%10 != 1 && (<HTMLButtonElement>document.getElementById("b"+(placement + 1))).style.backgroundColor == 'yellow'){ return (placement + 1); }
      }
      for(let i=0; i < this.tempEndPath.length; i++){ //checking up
        if((placement + 10)<101 && (placement + 10)==this.tempEndPath[i]){ alreadyInLoopUp = true; }
      }
      if(!alreadyInLoopUp){ 
        if((placement + 10)<101 && (<HTMLButtonElement>document.getElementById("b"+(placement + 10))).style.backgroundColor == 'yellow'){ return (placement + 10); }
      }
    }
    else if(this.downOnly){
      for(let i=0; i < this.tempEndPath.length; i++){ //checking up
        if((placement + 10)<101 && (placement + 10)==this.tempEndPath[i]){ alreadyInLoopUp = true; }
      }
      if(!alreadyInLoopUp){ 
        if((placement + 10)<101 && (<HTMLButtonElement>document.getElementById("b"+(placement + 10))).style.backgroundColor == 'yellow'){ return (placement + 10); }
      }
      for(let i=0; i < this.tempEndPath.length; i++){ //checking left
        if(placement%10 != 1 && (placement - 1)==this.tempEndPath[i]){ alreadyInLoopLeft = true; }
      }
      if(!alreadyInLoopLeft){ 
        if(placement%10 != 1 && (<HTMLButtonElement>document.getElementById("b"+(placement - 1))).style.backgroundColor == 'yellow'){ return (placement - 1); }
      }
      for(let i=0; i < this.tempEndPath.length; i++){ //checking right
        if((placement + 1)%10 != 1 && (placement + 1)==this.tempEndPath[i]){ alreadyInLoopRight = true; }
      }
      if(!alreadyInLoopRight){ 
        if((placement + 1)%10 != 1 && (<HTMLButtonElement>document.getElementById("b"+(placement + 1))).style.backgroundColor == 'yellow'){ return (placement + 1); }
      }
      for(let i=0; i < this.tempEndPath.length; i++){ //checking down
        if((placement - 10)>0 && (placement - 10)==this.tempEndPath[i]){ alreadyInLoopDown = true; }
      }
      if(!alreadyInLoopDown){ 
        if((placement - 10)>0 && (<HTMLButtonElement>document.getElementById("b"+(placement - 10))).style.backgroundColor == 'yellow'){ return (placement - 10); }
      }
    }
    else if(this.leftOnly){
      for(let i=0; i < this.tempEndPath.length; i++){ //checking left
        if(placement%10 != 1 && (placement - 1)==this.tempEndPath[i]){ alreadyInLoopLeft = true; }
      }
      if(!alreadyInLoopLeft){ 
        if(placement%10 != 1 && (<HTMLButtonElement>document.getElementById("b"+(placement - 1))).style.backgroundColor == 'yellow'){ return (placement - 1); }
      }
      for(let i=0; i < this.tempEndPath.length; i++){ //checking up
        if((placement + 10)<101 && (placement + 10)==this.tempEndPath[i]){ alreadyInLoopUp = true; }
      }
      if(!alreadyInLoopUp){ 
        if((placement + 10)<101 && (<HTMLButtonElement>document.getElementById("b"+(placement + 10))).style.backgroundColor == 'yellow'){ return (placement + 10); }
      }
      for(let i=0; i < this.tempEndPath.length; i++){ //checking right
        if((placement + 1)%10 != 1 && (placement + 1)==this.tempEndPath[i]){ alreadyInLoopRight = true; }
      }
      if(!alreadyInLoopRight){ 
        if((placement + 1)%10 != 1 && (<HTMLButtonElement>document.getElementById("b"+(placement + 1))).style.backgroundColor == 'yellow'){ return (placement + 1); }
      }
      for(let i=0; i < this.tempEndPath.length; i++){ //checking down
        if((placement - 10)>0 && (placement - 10)==this.tempEndPath[i]){ alreadyInLoopDown = true; }
      }
      if(!alreadyInLoopDown){ 
        if((placement - 10)>0 && (<HTMLButtonElement>document.getElementById("b"+(placement - 10))).style.backgroundColor == 'yellow'){ return (placement - 10); }
      }
    }
    else if(this.rightOnly){
      for(let i=0; i < this.tempEndPath.length; i++){ //checking right
        if((placement + 1)%10 != 1 && (placement + 1)==this.tempEndPath[i]){ alreadyInLoopRight = true; }
      }
      if(!alreadyInLoopRight){ 
        if((placement + 1)%10 != 1 && (<HTMLButtonElement>document.getElementById("b"+(placement + 1))).style.backgroundColor == 'yellow'){ return (placement + 1); }
      }
      for(let i=0; i < this.tempEndPath.length; i++){ //checking up
        if((placement + 10)<101 && (placement + 10)==this.tempEndPath[i]){ alreadyInLoopUp = true; }
      }
      if(!alreadyInLoopUp){ 
        if((placement + 10)<101 && (<HTMLButtonElement>document.getElementById("b"+(placement + 10))).style.backgroundColor == 'yellow'){ return (placement + 10); }
      }
      for(let i=0; i < this.tempEndPath.length; i++){ //checking left
        if(placement%10 != 1 && (placement - 1)==this.tempEndPath[i]){ alreadyInLoopLeft = true; }
      }
      if(!alreadyInLoopLeft){ 
        if(placement%10 != 1 && (<HTMLButtonElement>document.getElementById("b"+(placement - 1))).style.backgroundColor == 'yellow'){ return (placement - 1); }
      }
      for(let i=0; i < this.tempEndPath.length; i++){ //checking down
        if((placement - 10)>0 && (placement - 10)==this.tempEndPath[i]){ alreadyInLoopDown = true; }
      }
      if(!alreadyInLoopDown){ 
        if((placement - 10)>0 && (<HTMLButtonElement>document.getElementById("b"+(placement - 10))).style.backgroundColor == 'yellow'){ return (placement - 10); }
      }
    }
    else if(this.prioDoublePositive){
      for(let i=0; i < this.tempEndPath.length; i++){ //checking right
        if((placement + 1)%10 != 1 && (placement + 1)==this.tempEndPath[i]){ alreadyInLoopRight = true; }
      }
      if(!alreadyInLoopRight){ 
        if((placement + 1)%10 != 1 && (<HTMLButtonElement>document.getElementById("b"+(placement + 1))).style.backgroundColor == 'yellow'){ return (placement + 1); }
      }
      for(let i=0; i < this.tempEndPath.length; i++){ //checking up
        if((placement + 10)<101 && (placement + 10)==this.tempEndPath[i]){ alreadyInLoopUp = true; }
      }
      if(!alreadyInLoopUp){ 
        if((placement + 10)<101 && (<HTMLButtonElement>document.getElementById("b"+(placement + 10))).style.backgroundColor == 'yellow'){ return (placement + 10); }
      }
      for(let i=0; i < this.tempEndPath.length; i++){ //checking left
        if(placement%10 != 1 && (placement - 1)==this.tempEndPath[i]){ alreadyInLoopLeft = true; }
      }
      if(!alreadyInLoopLeft){ 
        if(placement%10 != 1 && (<HTMLButtonElement>document.getElementById("b"+(placement - 1))).style.backgroundColor == 'yellow'){ return (placement - 1); }
      }
      for(let i=0; i < this.tempEndPath.length; i++){ //checking down
        if((placement - 10)>0 && (placement - 10)==this.tempEndPath[i]){ alreadyInLoopDown = true; }
      }
      if(!alreadyInLoopDown){ 
        if((placement - 10)>0 && (<HTMLButtonElement>document.getElementById("b"+(placement - 10))).style.backgroundColor == 'yellow'){ return (placement - 10); }
      }
    }else if(this.prioDoubleNegative){
      for(let i=0; i < this.tempEndPath.length; i++){ //checking down
        if((placement - 10)>0 && (placement - 10)==this.tempEndPath[i]){ alreadyInLoopDown = true; }
      }
      if(!alreadyInLoopDown){ 
        if((placement - 10)>0 && (<HTMLButtonElement>document.getElementById("b"+(placement - 10))).style.backgroundColor == 'yellow'){ return (placement - 10); }
      }
      for(let i=0; i < this.tempEndPath.length; i++){ //checking left
        if(placement%10 != 1 && (placement - 1)==this.tempEndPath[i]){ alreadyInLoopLeft = true; }
      }
      if(!alreadyInLoopLeft){ 
        if(placement%10 != 1 && (<HTMLButtonElement>document.getElementById("b"+(placement - 1))).style.backgroundColor == 'yellow'){ return (placement - 1); }
      }
      for(let i=0; i < this.tempEndPath.length; i++){ //checking right
        if((placement + 1)%10 != 1 && (placement + 1)==this.tempEndPath[i]){ alreadyInLoopRight = true; }
      }
      if(!alreadyInLoopRight){ 
        if((placement + 1)%10 != 1 && (<HTMLButtonElement>document.getElementById("b"+(placement + 1))).style.backgroundColor == 'yellow'){ return (placement + 1); }
      }
      for(let i=0; i < this.tempEndPath.length; i++){ //checking up
        if((placement + 10)<101 && (placement + 10)==this.tempEndPath[i]){ alreadyInLoopUp = true; }
      }
      if(!alreadyInLoopUp){ 
        if((placement + 10)<101 && (<HTMLButtonElement>document.getElementById("b"+(placement + 10))).style.backgroundColor == 'yellow'){ return (placement + 10); }
      }
    }else if(this.prioNegativePositive){
      for(let i=0; i < this.tempEndPath.length; i++){ //checking up
        if((placement + 10)<101 && (placement + 10)==this.tempEndPath[i]){ alreadyInLoopUp = true; }
      }
      if(!alreadyInLoopUp){ 
        if((placement + 10)<101 && (<HTMLButtonElement>document.getElementById("b"+(placement + 10))).style.backgroundColor == 'yellow'){ return (placement + 10); }
      }
      for(let i=0; i < this.tempEndPath.length; i++){ //checking left
        if(placement%10 != 1 && (placement - 1)==this.tempEndPath[i]){ alreadyInLoopLeft = true; }
      }
      if(!alreadyInLoopLeft){ 
        if(placement%10 != 1 && (<HTMLButtonElement>document.getElementById("b"+(placement - 1))).style.backgroundColor == 'yellow'){ return (placement - 1); }
      }
      for(let i=0; i < this.tempEndPath.length; i++){ //checking right
        if((placement + 1)%10 != 1 && (placement + 1)==this.tempEndPath[i]){ alreadyInLoopRight = true; }
      }
      if(!alreadyInLoopRight){ 
        if((placement + 1)%10 != 1 && (<HTMLButtonElement>document.getElementById("b"+(placement + 1))).style.backgroundColor == 'yellow'){ return (placement + 1); }
      }
      for(let i=0; i < this.tempEndPath.length; i++){ //checking down
        if((placement - 10)>0 && (placement - 10)==this.tempEndPath[i]){ alreadyInLoopDown = true; }
      }
      if(!alreadyInLoopDown){ 
        if((placement - 10)>0 && (<HTMLButtonElement>document.getElementById("b"+(placement - 10))).style.backgroundColor == 'yellow'){ return (placement - 10); }
      }
    }else if(this.prioPositiveNegative){
      for(let i=0; i < this.tempEndPath.length; i++){ //checking right
        if((placement + 1)%10 != 1 && (placement + 1)==this.tempEndPath[i]){ alreadyInLoopRight = true; }
      }
      if(!alreadyInLoopRight){ 
        if((placement + 1)%10 != 1 && (<HTMLButtonElement>document.getElementById("b"+(placement + 1))).style.backgroundColor == 'yellow'){ return (placement + 1); }
      }
      for(let i=0; i < this.tempEndPath.length; i++){ //checking up
        if((placement + 10)<101 && (placement + 10)==this.tempEndPath[i]){ alreadyInLoopUp = true; }
      }
      if(!alreadyInLoopUp){ 
        if((placement + 10)<101 && (<HTMLButtonElement>document.getElementById("b"+(placement + 10))).style.backgroundColor == 'yellow'){ return (placement + 10); }
      }
      for(let i=0; i < this.tempEndPath.length; i++){ //checking down
        if((placement - 10)>0 && (placement - 10)==this.tempEndPath[i]){ alreadyInLoopDown = true; }
      }
      if(!alreadyInLoopDown){ 
        if((placement - 10)>0 && (<HTMLButtonElement>document.getElementById("b"+(placement - 10))).style.backgroundColor == 'yellow'){ return (placement - 10); }
      }
      for(let i=0; i < this.tempEndPath.length; i++){ //checking left
        if(placement%10 != 1 && (placement - 1)==this.tempEndPath[i]){ alreadyInLoopLeft = true; }
      }
      if(!alreadyInLoopLeft){ 
        if(placement%10 != 1 && (<HTMLButtonElement>document.getElementById("b"+(placement - 1))).style.backgroundColor == 'yellow'){ return (placement - 1); }
      }
    }
    (<HTMLButtonElement>document.getElementById("b"+placement)).style.backgroundColor = 'white';
    return -1;
  }

  getNextPossibleYellow(placement: number): number{
    if((placement + 1)%10 != 1 && (<HTMLButtonElement>document.getElementById("b"+(placement + 1))).style.backgroundColor == 'yellow'){ return (placement + 1); }
    else if(placement%10 != 1 && (<HTMLButtonElement>document.getElementById("b"+(placement - 1))).style.backgroundColor == 'yellow'){ return (placement - 1); }
    else if((placement - 10)>0 && (<HTMLButtonElement>document.getElementById("b"+(placement - 10))).style.backgroundColor == 'yellow'){ return (placement - 10); }
    else if((placement + 10)<101 && (<HTMLButtonElement>document.getElementById("b"+(placement + 10))).style.backgroundColor == 'yellow'){ return (placement + 10); }
    else if((placement + 1)%10 != 1 && (<HTMLButtonElement>document.getElementById("b"+(placement + 1))).style.backgroundColor == 'darkgreen'){ return -2; }
    else if(placement%10 != 1 && (<HTMLButtonElement>document.getElementById("b"+(placement - 1))).style.backgroundColor == 'darkgreen'){ return -2; }
    else if((placement - 10)>0 && (<HTMLButtonElement>document.getElementById("b"+(placement - 10))).style.backgroundColor == 'darkgreen'){ return -2; }
    else if((placement + 10)<101 && (<HTMLButtonElement>document.getElementById("b"+(placement + 10))).style.backgroundColor == 'darkgreen'){ return -2; }
    else{ return -1; } //this needs fixing
  }

  placingYellowOnThirdSearch(placement: number): void{
    if((placement + 1)%10 != 1 && (<HTMLButtonElement>document.getElementById("b"+(placement + 1))).style.backgroundColor == 'white' && (<HTMLButtonElement>document.getElementById("b"+(placement + 1))).style.backgroundColor != 'black'){ 
      (<HTMLButtonElement>document.getElementById("b"+(placement + 1))).style.backgroundColor = 'yellow'; }
    if(placement%10 != 1 && (<HTMLButtonElement>document.getElementById("b"+(placement - 1))).style.backgroundColor == 'white' && (<HTMLButtonElement>document.getElementById("b"+(placement - 1))).style.backgroundColor != 'black'){ 
      (<HTMLButtonElement>document.getElementById("b"+(placement - 1))).style.backgroundColor = 'yellow'; }
    if((placement - 10)>0 && (<HTMLButtonElement>document.getElementById("b"+(placement - 10))).style.backgroundColor == 'white' && (<HTMLButtonElement>document.getElementById("b"+(placement - 10))).style.backgroundColor != 'black'){ 
      (<HTMLButtonElement>document.getElementById("b"+(placement - 10))).style.backgroundColor = 'yellow'; }
    if((placement + 10)<101 && (<HTMLButtonElement>document.getElementById("b"+(placement + 10))).style.backgroundColor == 'white' && (<HTMLButtonElement>document.getElementById("b"+(placement + 10))).style.backgroundColor != 'black'){ 
      (<HTMLButtonElement>document.getElementById("b"+(placement + 10))).style.backgroundColor = 'yellow'; }
  }

  checkIfEndNextToYellow(): boolean{
    if((this.endButtonPlace + 1)%10 != 1 && (<HTMLButtonElement>document.getElementById("b"+(this.endButtonPlace + 1))).style.backgroundColor == 'yellow'){ return true; }
    if(this.endButtonPlace%10 != 1 && (<HTMLButtonElement>document.getElementById("b"+(this.endButtonPlace - 1))).style.backgroundColor == 'yellow'){ return true; }
    if((this.endButtonPlace - 10)>0 && (<HTMLButtonElement>document.getElementById("b"+(this.endButtonPlace - 10))).style.backgroundColor == 'yellow'){ return true; }
    if((this.endButtonPlace + 10)<101 && (<HTMLButtonElement>document.getElementById("b"+(this.endButtonPlace + 10))).style.backgroundColor == 'yellow'){ return true; }
    return false;
  }

  secondSearchOutcome(): void{
    if((this.startButtonPlace + 1)%10 != 1 && (<HTMLButtonElement>document.getElementById("b"+(this.startButtonPlace + 1))).style.backgroundColor != 'black'){ 
      (<HTMLButtonElement>document.getElementById("b"+(this.startButtonPlace + 1))).style.backgroundColor = 'yellow'; }
    if(this.startButtonPlace%10 != 1 && (<HTMLButtonElement>document.getElementById("b"+(this.startButtonPlace - 1))).style.backgroundColor != 'black'){ 
      (<HTMLButtonElement>document.getElementById("b"+(this.startButtonPlace - 1))).style.backgroundColor = 'yellow'; }
    if((this.startButtonPlace - 10)>0 && (<HTMLButtonElement>document.getElementById("b"+(this.startButtonPlace - 10))).style.backgroundColor != 'black'){ 
      (<HTMLButtonElement>document.getElementById("b"+(this.startButtonPlace - 10))).style.backgroundColor = 'yellow'; }
    if((this.startButtonPlace + 10)<101 && (<HTMLButtonElement>document.getElementById("b"+(this.startButtonPlace + 10))).style.backgroundColor != 'black'){ 
      (<HTMLButtonElement>document.getElementById("b"+(this.startButtonPlace + 10))).style.backgroundColor = 'yellow'; }
  }

  firstSearchOutcome(): boolean{ //checking to see if start is around red by using red as the baseline
    if((this.endButtonPlace + 1)%10 != 1 && (<HTMLButtonElement>document.getElementById("b"+(this.endButtonPlace + 1))).style.backgroundColor == 'darkgreen'){ return true; }
    if(this.endButtonPlace%10 != 1 && (<HTMLButtonElement>document.getElementById("b"+(this.endButtonPlace - 1))).style.backgroundColor == 'darkgreen'){ return true; }
    if((this.endButtonPlace - 10)>0 && (<HTMLButtonElement>document.getElementById("b"+(this.endButtonPlace - 10))).style.backgroundColor == 'darkgreen'){ return true; }
    if((this.endButtonPlace + 10)<101 && (<HTMLButtonElement>document.getElementById("b"+(this.endButtonPlace + 10))).style.backgroundColor == 'darkgreen'){ return true; }
    return false;
  }

  btnPress1(){
    if(this.h1 && this.startButtonCounter == 0){ (<HTMLButtonElement>document.getElementById("b1")).style.backgroundColor = 'darkgreen'; this.startButtonCounter += 1;} 
    if(this.h2){ (<HTMLButtonElement>document.getElementById("b1")).style.backgroundColor = 'black'; } 
    if(this.h3 && this.endButtonCounter == 0){ (<HTMLButtonElement>document.getElementById("b1")).style.backgroundColor = 'red'; this.endButtonCounter += 1;} 
  }
  btnPress2(){
    if(this.h1 && this.startButtonCounter == 0){ (<HTMLButtonElement>document.getElementById("b2")).style.backgroundColor = 'darkgreen'; this.startButtonCounter += 1; this.startButtonCounter += 1; } 
    if(this.h2){ (<HTMLButtonElement>document.getElementById("b2")).style.backgroundColor = 'black'; } 
    if(this.h3 && this.endButtonCounter == 0){ (<HTMLButtonElement>document.getElementById("b2")).style.backgroundColor = 'red'; this.endButtonCounter += 1; } 
  }
  btnPress3(){
    if(this.h1 && this.startButtonCounter == 0){ (<HTMLButtonElement>document.getElementById("b3")).style.backgroundColor = 'darkgreen'; this.startButtonCounter += 1; this.startButtonCounter += 1; } 
    if(this.h2){ (<HTMLButtonElement>document.getElementById("b3")).style.backgroundColor = 'black'; } 
    if(this.h3 && this.endButtonCounter == 0){ (<HTMLButtonElement>document.getElementById("b3")).style.backgroundColor = 'red'; this.endButtonCounter += 1; } 
  }
  btnPress4(){
    if(this.h1 && this.startButtonCounter == 0){ (<HTMLButtonElement>document.getElementById("b4")).style.backgroundColor = 'darkgreen'; this.startButtonCounter += 1; this.startButtonCounter += 1; } 
    if(this.h2){ (<HTMLButtonElement>document.getElementById("b4")).style.backgroundColor = 'black'; } 
    if(this.h3 && this.endButtonCounter == 0){ (<HTMLButtonElement>document.getElementById("b4")).style.backgroundColor = 'red'; this.endButtonCounter += 1; } 
  }
  btnPress5(){
    if(this.h1 && this.startButtonCounter == 0){ (<HTMLButtonElement>document.getElementById("b5")).style.backgroundColor = 'darkgreen'; this.startButtonCounter += 1; this.startButtonCounter += 1; } 
    if(this.h2){ (<HTMLButtonElement>document.getElementById("b5")).style.backgroundColor = 'black'; } 
    if(this.h3 && this.endButtonCounter == 0){ (<HTMLButtonElement>document.getElementById("b5")).style.backgroundColor = 'red'; this.endButtonCounter += 1; } 
  }
  btnPress6(){
    if(this.h1 && this.startButtonCounter == 0){ (<HTMLButtonElement>document.getElementById("b6")).style.backgroundColor = 'darkgreen'; this.startButtonCounter += 1; } 
    if(this.h2){ (<HTMLButtonElement>document.getElementById("b6")).style.backgroundColor = 'black'; } 
    if(this.h3 && this.endButtonCounter == 0){ (<HTMLButtonElement>document.getElementById("b6")).style.backgroundColor = 'red'; this.endButtonCounter += 1; } 
  }
  btnPress7(){
    if(this.h1 && this.startButtonCounter == 0){ (<HTMLButtonElement>document.getElementById("b7")).style.backgroundColor = 'darkgreen'; this.startButtonCounter += 1; } 
    if(this.h2){ (<HTMLButtonElement>document.getElementById("b7")).style.backgroundColor = 'black'; } 
    if(this.h3 && this.endButtonCounter == 0){ (<HTMLButtonElement>document.getElementById("b7")).style.backgroundColor = 'red'; this.endButtonCounter += 1; } 
  }
  btnPress8(){
    if(this.h1 && this.startButtonCounter == 0){ (<HTMLButtonElement>document.getElementById("b8")).style.backgroundColor = 'darkgreen'; this.startButtonCounter += 1; } 
    if(this.h2){ (<HTMLButtonElement>document.getElementById("b8")).style.backgroundColor = 'black'; } 
    if(this.h3 && this.endButtonCounter == 0){ (<HTMLButtonElement>document.getElementById("b8")).style.backgroundColor = 'red'; this.endButtonCounter += 1; } 
  }
  btnPress9(){
    if(this.h1 && this.startButtonCounter == 0){ (<HTMLButtonElement>document.getElementById("b9")).style.backgroundColor = 'darkgreen'; this.startButtonCounter += 1; } 
    if(this.h2){ (<HTMLButtonElement>document.getElementById("b9")).style.backgroundColor = 'black'; } 
    if(this.h3 && this.endButtonCounter == 0){ (<HTMLButtonElement>document.getElementById("b9")).style.backgroundColor = 'red'; this.endButtonCounter += 1; } 
  }
  btnPress10(){
    if(this.h1 && this.startButtonCounter == 0){ (<HTMLButtonElement>document.getElementById("b10")).style.backgroundColor = 'darkgreen'; this.startButtonCounter += 1; } 
    if(this.h2){ (<HTMLButtonElement>document.getElementById("b10")).style.backgroundColor = 'black'; } 
    if(this.h3 && this.endButtonCounter == 0){ (<HTMLButtonElement>document.getElementById("b10")).style.backgroundColor = 'red'; this.endButtonCounter += 1; } 
  }
  btnPress11(){
    if(this.h1 && this.startButtonCounter == 0){ (<HTMLButtonElement>document.getElementById("b11")).style.backgroundColor = 'darkgreen'; this.startButtonCounter += 1; } 
    if(this.h2){ (<HTMLButtonElement>document.getElementById("b11")).style.backgroundColor = 'black'; } 
    if(this.h3 && this.endButtonCounter == 0){ (<HTMLButtonElement>document.getElementById("b11")).style.backgroundColor = 'red'; this.endButtonCounter += 1; } 
  }
  btnPress12(){
    if(this.h1 && this.startButtonCounter == 0){ (<HTMLButtonElement>document.getElementById("b12")).style.backgroundColor = 'darkgreen'; this.startButtonCounter += 1; } 
    if(this.h2){ (<HTMLButtonElement>document.getElementById("b12")).style.backgroundColor = 'black'; } 
    if(this.h3 && this.endButtonCounter == 0){ (<HTMLButtonElement>document.getElementById("b12")).style.backgroundColor = 'red'; this.endButtonCounter += 1; } 
  }
  btnPress13(){
    if(this.h1 && this.startButtonCounter == 0){ (<HTMLButtonElement>document.getElementById("b13")).style.backgroundColor = 'darkgreen'; this.startButtonCounter += 1; } 
    if(this.h2){ (<HTMLButtonElement>document.getElementById("b13")).style.backgroundColor = 'black'; } 
    if(this.h3 && this.endButtonCounter == 0){ (<HTMLButtonElement>document.getElementById("b13")).style.backgroundColor = 'red'; this.endButtonCounter += 1; } 
  }
  btnPress14(){
    if(this.h1 && this.startButtonCounter == 0){ (<HTMLButtonElement>document.getElementById("b14")).style.backgroundColor = 'darkgreen'; this.startButtonCounter += 1; } 
    if(this.h2){ (<HTMLButtonElement>document.getElementById("b14")).style.backgroundColor = 'black'; } 
    if(this.h3 && this.endButtonCounter == 0){ (<HTMLButtonElement>document.getElementById("b14")).style.backgroundColor = 'red'; this.endButtonCounter += 1; } 
  }
  btnPress15(){
    if(this.h1 && this.startButtonCounter == 0){ (<HTMLButtonElement>document.getElementById("b15")).style.backgroundColor = 'darkgreen'; this.startButtonCounter += 1; } 
    if(this.h2){ (<HTMLButtonElement>document.getElementById("b15")).style.backgroundColor = 'black'; } 
    if(this.h3 && this.endButtonCounter == 0){ (<HTMLButtonElement>document.getElementById("b15")).style.backgroundColor = 'red'; this.endButtonCounter += 1; } 
  }
  btnPress16(){
    if(this.h1 && this.startButtonCounter == 0){ (<HTMLButtonElement>document.getElementById("b16")).style.backgroundColor = 'darkgreen'; this.startButtonCounter += 1; } 
    if(this.h2){ (<HTMLButtonElement>document.getElementById("b16")).style.backgroundColor = 'black'; } 
    if(this.h3 && this.endButtonCounter == 0){ (<HTMLButtonElement>document.getElementById("b16")).style.backgroundColor = 'red'; this.endButtonCounter += 1; } 
  }
  btnPress17(){
    if(this.h1 && this.startButtonCounter == 0){ (<HTMLButtonElement>document.getElementById("b17")).style.backgroundColor = 'darkgreen'; this.startButtonCounter += 1; } 
    if(this.h2){ (<HTMLButtonElement>document.getElementById("b17")).style.backgroundColor = 'black'; } 
    if(this.h3 && this.endButtonCounter == 0){ (<HTMLButtonElement>document.getElementById("b17")).style.backgroundColor = 'red'; this.endButtonCounter += 1; } 
  }
  btnPress18(){
    if(this.h1 && this.startButtonCounter == 0){ (<HTMLButtonElement>document.getElementById("b18")).style.backgroundColor = 'darkgreen'; this.startButtonCounter += 1; } 
    if(this.h2){ (<HTMLButtonElement>document.getElementById("b18")).style.backgroundColor = 'black'; } 
    if(this.h3 && this.endButtonCounter == 0){ (<HTMLButtonElement>document.getElementById("b18")).style.backgroundColor = 'red'; this.endButtonCounter += 1; } 
  }
  btnPress19(){
    if(this.h1 && this.startButtonCounter == 0){ (<HTMLButtonElement>document.getElementById("b19")).style.backgroundColor = 'darkgreen'; this.startButtonCounter += 1; } 
    if(this.h2){ (<HTMLButtonElement>document.getElementById("b19")).style.backgroundColor = 'black'; } 
    if(this.h3 && this.endButtonCounter == 0){ (<HTMLButtonElement>document.getElementById("b19")).style.backgroundColor = 'red'; this.endButtonCounter += 1; } 
  }
  btnPress20(){
    if(this.h1 && this.startButtonCounter == 0){ (<HTMLButtonElement>document.getElementById("b20")).style.backgroundColor = 'darkgreen'; this.startButtonCounter += 1; } 
    if(this.h2){ (<HTMLButtonElement>document.getElementById("b20")).style.backgroundColor = 'black'; } 
    if(this.h3 && this.endButtonCounter == 0){ (<HTMLButtonElement>document.getElementById("b20")).style.backgroundColor = 'red'; this.endButtonCounter += 1; } 
  }
  btnPress21(){
    if(this.h1 && this.startButtonCounter == 0){ (<HTMLButtonElement>document.getElementById("b21")).style.backgroundColor = 'darkgreen'; this.startButtonCounter += 1; } 
    if(this.h2){ (<HTMLButtonElement>document.getElementById("b21")).style.backgroundColor = 'black'; } 
    if(this.h3 && this.endButtonCounter == 0){ (<HTMLButtonElement>document.getElementById("b21")).style.backgroundColor = 'red'; this.endButtonCounter += 1; } 
  }
  btnPress22(){
    if(this.h1 && this.startButtonCounter == 0){ (<HTMLButtonElement>document.getElementById("b22")).style.backgroundColor = 'darkgreen'; this.startButtonCounter += 1; } 
    if(this.h2){ (<HTMLButtonElement>document.getElementById("b22")).style.backgroundColor = 'black'; } 
    if(this.h3 && this.endButtonCounter == 0){ (<HTMLButtonElement>document.getElementById("b22")).style.backgroundColor = 'red'; this.endButtonCounter += 1; } 
  }
  btnPress23(){
    if(this.h1 && this.startButtonCounter == 0){ (<HTMLButtonElement>document.getElementById("b23")).style.backgroundColor = 'darkgreen'; this.startButtonCounter += 1; } 
    if(this.h2){ (<HTMLButtonElement>document.getElementById("b23")).style.backgroundColor = 'black'; } 
    if(this.h3 && this.endButtonCounter == 0){ (<HTMLButtonElement>document.getElementById("b23")).style.backgroundColor = 'red'; this.endButtonCounter += 1; } 
  }
  btnPress24(){
    if(this.h1 && this.startButtonCounter == 0){ (<HTMLButtonElement>document.getElementById("b24")).style.backgroundColor = 'darkgreen'; this.startButtonCounter += 1; } 
    if(this.h2){ (<HTMLButtonElement>document.getElementById("b24")).style.backgroundColor = 'black'; } 
    if(this.h3 && this.endButtonCounter == 0){ (<HTMLButtonElement>document.getElementById("b24")).style.backgroundColor = 'red'; this.endButtonCounter += 1; } 
  }
  btnPress25(){
    if(this.h1 && this.startButtonCounter == 0){ (<HTMLButtonElement>document.getElementById("b25")).style.backgroundColor = 'darkgreen'; this.startButtonCounter += 1; } 
    if(this.h2){ (<HTMLButtonElement>document.getElementById("b25")).style.backgroundColor = 'black'; } 
    if(this.h3 && this.endButtonCounter == 0){ (<HTMLButtonElement>document.getElementById("b25")).style.backgroundColor = 'red'; this.endButtonCounter += 1; } 
  }
  btnPress26(){
    if(this.h1 && this.startButtonCounter == 0){ (<HTMLButtonElement>document.getElementById("b26")).style.backgroundColor = 'darkgreen'; this.startButtonCounter += 1; } 
    if(this.h2){ (<HTMLButtonElement>document.getElementById("b26")).style.backgroundColor = 'black'; } 
    if(this.h3 && this.endButtonCounter == 0){ (<HTMLButtonElement>document.getElementById("b26")).style.backgroundColor = 'red'; this.endButtonCounter += 1; } 
  }
  btnPress27(){
    if(this.h1 && this.startButtonCounter == 0){ (<HTMLButtonElement>document.getElementById("b27")).style.backgroundColor = 'darkgreen'; this.startButtonCounter += 1; } 
    if(this.h2){ (<HTMLButtonElement>document.getElementById("b27")).style.backgroundColor = 'black'; } 
    if(this.h3 && this.endButtonCounter == 0){ (<HTMLButtonElement>document.getElementById("b27")).style.backgroundColor = 'red'; this.endButtonCounter += 1; } 
  }
  btnPress28(){
    if(this.h1 && this.startButtonCounter == 0){ (<HTMLButtonElement>document.getElementById("b28")).style.backgroundColor = 'darkgreen'; this.startButtonCounter += 1; } 
    if(this.h2){ (<HTMLButtonElement>document.getElementById("b28")).style.backgroundColor = 'black'; } 
    if(this.h3 && this.endButtonCounter == 0){ (<HTMLButtonElement>document.getElementById("b28")).style.backgroundColor = 'red'; this.endButtonCounter += 1; } 
  }
  btnPress29(){
    if(this.h1 && this.startButtonCounter == 0){ (<HTMLButtonElement>document.getElementById("b29")).style.backgroundColor = 'darkgreen'; this.startButtonCounter += 1; } 
    if(this.h2){ (<HTMLButtonElement>document.getElementById("b29")).style.backgroundColor = 'black'; } 
    if(this.h3 && this.endButtonCounter == 0){ (<HTMLButtonElement>document.getElementById("b29")).style.backgroundColor = 'red'; this.endButtonCounter += 1; } 
  }
  btnPress30(){
    if(this.h1 && this.startButtonCounter == 0){ (<HTMLButtonElement>document.getElementById("b30")).style.backgroundColor = 'darkgreen'; this.startButtonCounter += 1; } 
    if(this.h2){ (<HTMLButtonElement>document.getElementById("b30")).style.backgroundColor = 'black'; } 
    if(this.h3 && this.endButtonCounter == 0){ (<HTMLButtonElement>document.getElementById("b30")).style.backgroundColor = 'red'; this.endButtonCounter += 1; } 
  }
  btnPress31(){
    if(this.h1 && this.startButtonCounter == 0){ (<HTMLButtonElement>document.getElementById("b31")).style.backgroundColor = 'darkgreen'; this.startButtonCounter += 1; } 
    if(this.h2){ (<HTMLButtonElement>document.getElementById("b31")).style.backgroundColor = 'black'; } 
    if(this.h3 && this.endButtonCounter == 0){ (<HTMLButtonElement>document.getElementById("b31")).style.backgroundColor = 'red'; this.endButtonCounter += 1; } 
  }
  btnPress32(){
    if(this.h1 && this.startButtonCounter == 0){ (<HTMLButtonElement>document.getElementById("b32")).style.backgroundColor = 'darkgreen'; this.startButtonCounter += 1; } 
    if(this.h2){ (<HTMLButtonElement>document.getElementById("b32")).style.backgroundColor = 'black'; } 
    if(this.h3 && this.endButtonCounter == 0){ (<HTMLButtonElement>document.getElementById("b32")).style.backgroundColor = 'red'; this.endButtonCounter += 1; } 
  }
  btnPress33(){
    if(this.h1 && this.startButtonCounter == 0){ (<HTMLButtonElement>document.getElementById("b33")).style.backgroundColor = 'darkgreen'; this.startButtonCounter += 1; } 
    if(this.h2){ (<HTMLButtonElement>document.getElementById("b33")).style.backgroundColor = 'black'; } 
    if(this.h3 && this.endButtonCounter == 0){ (<HTMLButtonElement>document.getElementById("b33")).style.backgroundColor = 'red'; this.endButtonCounter += 1; } 
  }
  btnPress34(){
    if(this.h1 && this.startButtonCounter == 0){ (<HTMLButtonElement>document.getElementById("b34")).style.backgroundColor = 'darkgreen'; this.startButtonCounter += 1; } 
    if(this.h2){ (<HTMLButtonElement>document.getElementById("b34")).style.backgroundColor = 'black'; } 
    if(this.h3 && this.endButtonCounter == 0){ (<HTMLButtonElement>document.getElementById("b34")).style.backgroundColor = 'red'; this.endButtonCounter += 1; } 
  }
  btnPress35(){
    if(this.h1 && this.startButtonCounter == 0){ (<HTMLButtonElement>document.getElementById("b35")).style.backgroundColor = 'darkgreen'; this.startButtonCounter += 1; } 
    if(this.h2){ (<HTMLButtonElement>document.getElementById("b35")).style.backgroundColor = 'black'; } 
    if(this.h3 && this.endButtonCounter == 0){ (<HTMLButtonElement>document.getElementById("b35")).style.backgroundColor = 'red'; this.endButtonCounter += 1; } 
  }
  btnPress36(){
    if(this.h1 && this.startButtonCounter == 0){ (<HTMLButtonElement>document.getElementById("b36")).style.backgroundColor = 'darkgreen'; this.startButtonCounter += 1; } 
    if(this.h2){ (<HTMLButtonElement>document.getElementById("b36")).style.backgroundColor = 'black'; } 
    if(this.h3 && this.endButtonCounter == 0){ (<HTMLButtonElement>document.getElementById("b36")).style.backgroundColor = 'red'; this.endButtonCounter += 1; } 
  }
  btnPress37(){
    if(this.h1 && this.startButtonCounter == 0){ (<HTMLButtonElement>document.getElementById("b37")).style.backgroundColor = 'darkgreen'; this.startButtonCounter += 1; } 
    if(this.h2){ (<HTMLButtonElement>document.getElementById("b37")).style.backgroundColor = 'black'; } 
    if(this.h3 && this.endButtonCounter == 0){ (<HTMLButtonElement>document.getElementById("b37")).style.backgroundColor = 'red'; this.endButtonCounter += 1; } 
  }
  btnPress38(){
    if(this.h1 && this.startButtonCounter == 0){ (<HTMLButtonElement>document.getElementById("b38")).style.backgroundColor = 'darkgreen'; this.startButtonCounter += 1; } 
    if(this.h2){ (<HTMLButtonElement>document.getElementById("b38")).style.backgroundColor = 'black'; } 
    if(this.h3 && this.endButtonCounter == 0){ (<HTMLButtonElement>document.getElementById("b38")).style.backgroundColor = 'red'; this.endButtonCounter += 1; } 
  }
  btnPress39(){
    if(this.h1 && this.startButtonCounter == 0){ (<HTMLButtonElement>document.getElementById("b39")).style.backgroundColor = 'darkgreen'; this.startButtonCounter += 1; } 
    if(this.h2){ (<HTMLButtonElement>document.getElementById("b39")).style.backgroundColor = 'black'; } 
    if(this.h3 && this.endButtonCounter == 0){ (<HTMLButtonElement>document.getElementById("b39")).style.backgroundColor = 'red'; this.endButtonCounter += 1; } 
  }
  btnPress40(){
    if(this.h1 && this.startButtonCounter == 0){ (<HTMLButtonElement>document.getElementById("b40")).style.backgroundColor = 'darkgreen'; this.startButtonCounter += 1; } 
    if(this.h2){ (<HTMLButtonElement>document.getElementById("b40")).style.backgroundColor = 'black'; } 
    if(this.h3 && this.endButtonCounter == 0){ (<HTMLButtonElement>document.getElementById("b40")).style.backgroundColor = 'red'; this.endButtonCounter += 1; } 
  }
  btnPress41(){
    if(this.h1 && this.startButtonCounter == 0){ (<HTMLButtonElement>document.getElementById("b41")).style.backgroundColor = 'darkgreen'; this.startButtonCounter += 1; } 
    if(this.h2){ (<HTMLButtonElement>document.getElementById("b41")).style.backgroundColor = 'black'; } 
    if(this.h3 && this.endButtonCounter == 0){ (<HTMLButtonElement>document.getElementById("b41")).style.backgroundColor = 'red'; this.endButtonCounter += 1; } 
  }
  btnPress42(){
    if(this.h1 && this.startButtonCounter == 0){ (<HTMLButtonElement>document.getElementById("b42")).style.backgroundColor = 'darkgreen'; this.startButtonCounter += 1; } 
    if(this.h2){ (<HTMLButtonElement>document.getElementById("b42")).style.backgroundColor = 'black'; } 
    if(this.h3 && this.endButtonCounter == 0){ (<HTMLButtonElement>document.getElementById("b42")).style.backgroundColor = 'red'; this.endButtonCounter += 1; } 
  }
  btnPress43(){
    if(this.h1 && this.startButtonCounter == 0){ (<HTMLButtonElement>document.getElementById("b43")).style.backgroundColor = 'darkgreen'; this.startButtonCounter += 1; } 
    if(this.h2){ (<HTMLButtonElement>document.getElementById("b43")).style.backgroundColor = 'black'; } 
    if(this.h3 && this.endButtonCounter == 0){ (<HTMLButtonElement>document.getElementById("b43")).style.backgroundColor = 'red'; this.endButtonCounter += 1; } 
  }
  btnPress44(){
    if(this.h1 && this.startButtonCounter == 0){ (<HTMLButtonElement>document.getElementById("b44")).style.backgroundColor = 'darkgreen'; this.startButtonCounter += 1; } 
    if(this.h2){ (<HTMLButtonElement>document.getElementById("b44")).style.backgroundColor = 'black'; } 
    if(this.h3 && this.endButtonCounter == 0){ (<HTMLButtonElement>document.getElementById("b44")).style.backgroundColor = 'red'; this.endButtonCounter += 1; } 
  }
  btnPress45(){
    if(this.h1 && this.startButtonCounter == 0){ (<HTMLButtonElement>document.getElementById("b45")).style.backgroundColor = 'darkgreen'; this.startButtonCounter += 1; } 
    if(this.h2){ (<HTMLButtonElement>document.getElementById("b45")).style.backgroundColor = 'black'; } 
    if(this.h3 && this.endButtonCounter == 0){ (<HTMLButtonElement>document.getElementById("b45")).style.backgroundColor = 'red'; this.endButtonCounter += 1; } 
  }
  btnPress46(){
    if(this.h1 && this.startButtonCounter == 0){ (<HTMLButtonElement>document.getElementById("b46")).style.backgroundColor = 'darkgreen'; this.startButtonCounter += 1; } 
    if(this.h2){ (<HTMLButtonElement>document.getElementById("b46")).style.backgroundColor = 'black'; } 
    if(this.h3 && this.endButtonCounter == 0){ (<HTMLButtonElement>document.getElementById("b46")).style.backgroundColor = 'red'; this.endButtonCounter += 1; } 
  }
  btnPress47(){
    if(this.h1 && this.startButtonCounter == 0){ (<HTMLButtonElement>document.getElementById("b47")).style.backgroundColor = 'darkgreen'; this.startButtonCounter += 1; } 
    if(this.h2){ (<HTMLButtonElement>document.getElementById("b47")).style.backgroundColor = 'black'; } 
    if(this.h3 && this.endButtonCounter == 0){ (<HTMLButtonElement>document.getElementById("b47")).style.backgroundColor = 'red'; this.endButtonCounter += 1; } 
  }
  btnPress48(){
    if(this.h1 && this.startButtonCounter == 0){ (<HTMLButtonElement>document.getElementById("b48")).style.backgroundColor = 'darkgreen'; this.startButtonCounter += 1; } 
    if(this.h2){ (<HTMLButtonElement>document.getElementById("b48")).style.backgroundColor = 'black'; } 
    if(this.h3 && this.endButtonCounter == 0){ (<HTMLButtonElement>document.getElementById("b48")).style.backgroundColor = 'red'; this.endButtonCounter += 1; } 
  }
  btnPress49(){
    if(this.h1 && this.startButtonCounter == 0){ (<HTMLButtonElement>document.getElementById("b49")).style.backgroundColor = 'darkgreen'; this.startButtonCounter += 1; } 
    if(this.h2){ (<HTMLButtonElement>document.getElementById("b49")).style.backgroundColor = 'black'; } 
    if(this.h3 && this.endButtonCounter == 0){ (<HTMLButtonElement>document.getElementById("b49")).style.backgroundColor = 'red'; this.endButtonCounter += 1; } 
  }
  btnPress50(){
    if(this.h1 && this.startButtonCounter == 0){ (<HTMLButtonElement>document.getElementById("b50")).style.backgroundColor = 'darkgreen'; this.startButtonCounter += 1; } 
    if(this.h2){ (<HTMLButtonElement>document.getElementById("b50")).style.backgroundColor = 'black'; } 
    if(this.h3 && this.endButtonCounter == 0){ (<HTMLButtonElement>document.getElementById("b50")).style.backgroundColor = 'red'; this.endButtonCounter += 1; } 
  }
  btnPress51(){
    if(this.h1 && this.startButtonCounter == 0){ (<HTMLButtonElement>document.getElementById("b51")).style.backgroundColor = 'darkgreen'; this.startButtonCounter += 1; } 
    if(this.h2){ (<HTMLButtonElement>document.getElementById("b51")).style.backgroundColor = 'black'; } 
    if(this.h3 && this.endButtonCounter == 0){ (<HTMLButtonElement>document.getElementById("b51")).style.backgroundColor = 'red'; this.endButtonCounter += 1; } 
  }
  btnPress52(){
    if(this.h1 && this.startButtonCounter == 0){ (<HTMLButtonElement>document.getElementById("b52")).style.backgroundColor = 'darkgreen'; this.startButtonCounter += 1; } 
    if(this.h2){ (<HTMLButtonElement>document.getElementById("b52")).style.backgroundColor = 'black'; } 
    if(this.h3 && this.endButtonCounter == 0){ (<HTMLButtonElement>document.getElementById("b52")).style.backgroundColor = 'red'; this.endButtonCounter += 1; } 
  }
  btnPress53(){
    if(this.h1 && this.startButtonCounter == 0){ (<HTMLButtonElement>document.getElementById("b53")).style.backgroundColor = 'darkgreen'; this.startButtonCounter += 1; } 
    if(this.h2){ (<HTMLButtonElement>document.getElementById("b53")).style.backgroundColor = 'black'; } 
    if(this.h3 && this.endButtonCounter == 0){ (<HTMLButtonElement>document.getElementById("b53")).style.backgroundColor = 'red'; this.endButtonCounter += 1; } 
  }
  btnPress54(){
    if(this.h1 && this.startButtonCounter == 0){ (<HTMLButtonElement>document.getElementById("b54")).style.backgroundColor = 'darkgreen'; this.startButtonCounter += 1; } 
    if(this.h2){ (<HTMLButtonElement>document.getElementById("b54")).style.backgroundColor = 'black'; } 
    if(this.h3 && this.endButtonCounter == 0){ (<HTMLButtonElement>document.getElementById("b54")).style.backgroundColor = 'red'; this.endButtonCounter += 1; } 
  }
  btnPress55(){
    if(this.h1 && this.startButtonCounter == 0){ (<HTMLButtonElement>document.getElementById("b55")).style.backgroundColor = 'darkgreen'; this.startButtonCounter += 1; } 
    if(this.h2){ (<HTMLButtonElement>document.getElementById("b55")).style.backgroundColor = 'black'; } 
    if(this.h3 && this.endButtonCounter == 0){ (<HTMLButtonElement>document.getElementById("b55")).style.backgroundColor = 'red'; this.endButtonCounter += 1; } 
  }
  btnPress56(){
    if(this.h1 && this.startButtonCounter == 0){ (<HTMLButtonElement>document.getElementById("b56")).style.backgroundColor = 'darkgreen'; this.startButtonCounter += 1; } 
    if(this.h2){ (<HTMLButtonElement>document.getElementById("b56")).style.backgroundColor = 'black'; } 
    if(this.h3 && this.endButtonCounter == 0){ (<HTMLButtonElement>document.getElementById("b56")).style.backgroundColor = 'red'; this.endButtonCounter += 1; } 
  }
  btnPress57(){
    if(this.h1 && this.startButtonCounter == 0){ (<HTMLButtonElement>document.getElementById("b57")).style.backgroundColor = 'darkgreen'; this.startButtonCounter += 1; } 
    if(this.h2){ (<HTMLButtonElement>document.getElementById("b57")).style.backgroundColor = 'black'; } 
    if(this.h3 && this.endButtonCounter == 0){ (<HTMLButtonElement>document.getElementById("b57")).style.backgroundColor = 'red'; this.endButtonCounter += 1; } 
  }
  btnPress58(){
    if(this.h1 && this.startButtonCounter == 0){ (<HTMLButtonElement>document.getElementById("b58")).style.backgroundColor = 'darkgreen'; this.startButtonCounter += 1; } 
    if(this.h2){ (<HTMLButtonElement>document.getElementById("b58")).style.backgroundColor = 'black'; } 
    if(this.h3 && this.endButtonCounter == 0){ (<HTMLButtonElement>document.getElementById("b58")).style.backgroundColor = 'red'; this.endButtonCounter += 1; } 
  }
  btnPress59(){
    if(this.h1 && this.startButtonCounter == 0){ (<HTMLButtonElement>document.getElementById("b59")).style.backgroundColor = 'darkgreen'; this.startButtonCounter += 1; } 
    if(this.h2){ (<HTMLButtonElement>document.getElementById("b59")).style.backgroundColor = 'black'; } 
    if(this.h3 && this.endButtonCounter == 0){ (<HTMLButtonElement>document.getElementById("b59")).style.backgroundColor = 'red'; this.endButtonCounter += 1; } 
  }
  btnPress60(){
    if(this.h1 && this.startButtonCounter == 0){ (<HTMLButtonElement>document.getElementById("b60")).style.backgroundColor = 'darkgreen'; this.startButtonCounter += 1; } 
    if(this.h2){ (<HTMLButtonElement>document.getElementById("b60")).style.backgroundColor = 'black'; } 
    if(this.h3 && this.endButtonCounter == 0){ (<HTMLButtonElement>document.getElementById("b60")).style.backgroundColor = 'red'; this.endButtonCounter += 1; } 
  }
  btnPress61(){
    if(this.h1 && this.startButtonCounter == 0){ (<HTMLButtonElement>document.getElementById("b61")).style.backgroundColor = 'darkgreen'; this.startButtonCounter += 1; } 
    if(this.h2){ (<HTMLButtonElement>document.getElementById("b61")).style.backgroundColor = 'black'; } 
    if(this.h3 && this.endButtonCounter == 0){ (<HTMLButtonElement>document.getElementById("b61")).style.backgroundColor = 'red'; this.endButtonCounter += 1; } 
  }
  btnPress62(){
    if(this.h1 && this.startButtonCounter == 0){ (<HTMLButtonElement>document.getElementById("b62")).style.backgroundColor = 'darkgreen'; this.startButtonCounter += 1; } 
    if(this.h2){ (<HTMLButtonElement>document.getElementById("b62")).style.backgroundColor = 'black'; } 
    if(this.h3 && this.endButtonCounter == 0){ (<HTMLButtonElement>document.getElementById("b62")).style.backgroundColor = 'red'; this.endButtonCounter += 1; } 
  }
  btnPress63(){
    if(this.h1 && this.startButtonCounter == 0){ (<HTMLButtonElement>document.getElementById("b63")).style.backgroundColor = 'darkgreen'; this.startButtonCounter += 1; } 
    if(this.h2){ (<HTMLButtonElement>document.getElementById("b63")).style.backgroundColor = 'black'; } 
    if(this.h3 && this.endButtonCounter == 0){ (<HTMLButtonElement>document.getElementById("b63")).style.backgroundColor = 'red'; this.endButtonCounter += 1; } 
  }
  btnPress64(){
    if(this.h1 && this.startButtonCounter == 0){ (<HTMLButtonElement>document.getElementById("b64")).style.backgroundColor = 'darkgreen'; this.startButtonCounter += 1; } 
    if(this.h2){ (<HTMLButtonElement>document.getElementById("b64")).style.backgroundColor = 'black'; } 
    if(this.h3 && this.endButtonCounter == 0){ (<HTMLButtonElement>document.getElementById("b64")).style.backgroundColor = 'red'; this.endButtonCounter += 1; } 
  }
  btnPress65(){
    if(this.h1 && this.startButtonCounter == 0){ (<HTMLButtonElement>document.getElementById("b65")).style.backgroundColor = 'darkgreen'; this.startButtonCounter += 1; } 
    if(this.h2){ (<HTMLButtonElement>document.getElementById("b65")).style.backgroundColor = 'black'; } 
    if(this.h3 && this.endButtonCounter == 0){ (<HTMLButtonElement>document.getElementById("b65")).style.backgroundColor = 'red'; this.endButtonCounter += 1; } 
  }
  btnPress66(){
    if(this.h1 && this.startButtonCounter == 0){ (<HTMLButtonElement>document.getElementById("b66")).style.backgroundColor = 'darkgreen'; this.startButtonCounter += 1; } 
    if(this.h2){ (<HTMLButtonElement>document.getElementById("b66")).style.backgroundColor = 'black'; } 
    if(this.h3 && this.endButtonCounter == 0){ (<HTMLButtonElement>document.getElementById("b66")).style.backgroundColor = 'red'; this.endButtonCounter += 1; } 
  }
  btnPress67(){
    if(this.h1 && this.startButtonCounter == 0){ (<HTMLButtonElement>document.getElementById("b67")).style.backgroundColor = 'darkgreen'; this.startButtonCounter += 1; } 
    if(this.h2){ (<HTMLButtonElement>document.getElementById("b67")).style.backgroundColor = 'black'; } 
    if(this.h3 && this.endButtonCounter == 0){ (<HTMLButtonElement>document.getElementById("b67")).style.backgroundColor = 'red'; this.endButtonCounter += 1; } 
  }
  btnPress68(){
    if(this.h1 && this.startButtonCounter == 0){ (<HTMLButtonElement>document.getElementById("b68")).style.backgroundColor = 'darkgreen'; this.startButtonCounter += 1; } 
    if(this.h2){ (<HTMLButtonElement>document.getElementById("b68")).style.backgroundColor = 'black'; } 
    if(this.h3 && this.endButtonCounter == 0){ (<HTMLButtonElement>document.getElementById("b68")).style.backgroundColor = 'red'; this.endButtonCounter += 1; } 
  }
  btnPress69(){
    if(this.h1 && this.startButtonCounter == 0){ (<HTMLButtonElement>document.getElementById("b69")).style.backgroundColor = 'darkgreen'; this.startButtonCounter += 1; } 
    if(this.h2){ (<HTMLButtonElement>document.getElementById("b69")).style.backgroundColor = 'black'; } 
    if(this.h3 && this.endButtonCounter == 0){ (<HTMLButtonElement>document.getElementById("b69")).style.backgroundColor = 'red'; this.endButtonCounter += 1; } 
  }
  btnPress70(){
    if(this.h1 && this.startButtonCounter == 0){ (<HTMLButtonElement>document.getElementById("b70")).style.backgroundColor = 'darkgreen'; this.startButtonCounter += 1; } 
    if(this.h2){ (<HTMLButtonElement>document.getElementById("b70")).style.backgroundColor = 'black'; } 
    if(this.h3 && this.endButtonCounter == 0){ (<HTMLButtonElement>document.getElementById("b70")).style.backgroundColor = 'red'; this.endButtonCounter += 1; } 
  }
  btnPress71(){
    if(this.h1 && this.startButtonCounter == 0){ (<HTMLButtonElement>document.getElementById("b71")).style.backgroundColor = 'darkgreen'; this.startButtonCounter += 1; } 
    if(this.h2){ (<HTMLButtonElement>document.getElementById("b71")).style.backgroundColor = 'black'; } 
    if(this.h3 && this.endButtonCounter == 0){ (<HTMLButtonElement>document.getElementById("b71")).style.backgroundColor = 'red'; this.endButtonCounter += 1; } 
  }
  btnPress72(){
    if(this.h1 && this.startButtonCounter == 0){ (<HTMLButtonElement>document.getElementById("b72")).style.backgroundColor = 'darkgreen'; this.startButtonCounter += 1; } 
    if(this.h2){ (<HTMLButtonElement>document.getElementById("b72")).style.backgroundColor = 'black'; } 
    if(this.h3 && this.endButtonCounter == 0){ (<HTMLButtonElement>document.getElementById("b72")).style.backgroundColor = 'red'; this.endButtonCounter += 1; } 
  }
  btnPress73(){
    if(this.h1 && this.startButtonCounter == 0){ (<HTMLButtonElement>document.getElementById("b73")).style.backgroundColor = 'darkgreen'; this.startButtonCounter += 1; } 
    if(this.h2){ (<HTMLButtonElement>document.getElementById("b73")).style.backgroundColor = 'black'; } 
    if(this.h3 && this.endButtonCounter == 0){ (<HTMLButtonElement>document.getElementById("b73")).style.backgroundColor = 'red'; this.endButtonCounter += 1; } 
  }
  btnPress74(){
    if(this.h1 && this.startButtonCounter == 0){ (<HTMLButtonElement>document.getElementById("b74")).style.backgroundColor = 'darkgreen'; this.startButtonCounter += 1; } 
    if(this.h2){ (<HTMLButtonElement>document.getElementById("b74")).style.backgroundColor = 'black'; } 
    if(this.h3 && this.endButtonCounter == 0){ (<HTMLButtonElement>document.getElementById("b74")).style.backgroundColor = 'red'; this.endButtonCounter += 1; } 
  }
  btnPress75(){
    if(this.h1 && this.startButtonCounter == 0){ (<HTMLButtonElement>document.getElementById("b75")).style.backgroundColor = 'darkgreen'; this.startButtonCounter += 1; } 
    if(this.h2){ (<HTMLButtonElement>document.getElementById("b75")).style.backgroundColor = 'black'; } 
    if(this.h3 && this.endButtonCounter == 0){ (<HTMLButtonElement>document.getElementById("b75")).style.backgroundColor = 'red'; this.endButtonCounter += 1; } 
  }
  btnPress76(){
    if(this.h1 && this.startButtonCounter == 0){ (<HTMLButtonElement>document.getElementById("b76")).style.backgroundColor = 'darkgreen'; this.startButtonCounter += 1; } 
    if(this.h2){ (<HTMLButtonElement>document.getElementById("b76")).style.backgroundColor = 'black'; } 
    if(this.h3 && this.endButtonCounter == 0){ (<HTMLButtonElement>document.getElementById("b76")).style.backgroundColor = 'red'; this.endButtonCounter += 1; } 
  }
  btnPress77(){
    if(this.h1 && this.startButtonCounter == 0){ (<HTMLButtonElement>document.getElementById("b77")).style.backgroundColor = 'darkgreen'; this.startButtonCounter += 1; } 
    if(this.h2){ (<HTMLButtonElement>document.getElementById("b77")).style.backgroundColor = 'black'; } 
    if(this.h3 && this.endButtonCounter == 0){ (<HTMLButtonElement>document.getElementById("b77")).style.backgroundColor = 'red'; this.endButtonCounter += 1; } 
  }
  btnPress78(){
    if(this.h1 && this.startButtonCounter == 0){ (<HTMLButtonElement>document.getElementById("b78")).style.backgroundColor = 'darkgreen'; this.startButtonCounter += 1; } 
    if(this.h2){ (<HTMLButtonElement>document.getElementById("b78")).style.backgroundColor = 'black'; } 
    if(this.h3 && this.endButtonCounter == 0){ (<HTMLButtonElement>document.getElementById("b78")).style.backgroundColor = 'red'; this.endButtonCounter += 1; } 
  }
  btnPress79(){
    if(this.h1 && this.startButtonCounter == 0){ (<HTMLButtonElement>document.getElementById("b79")).style.backgroundColor = 'darkgreen'; this.startButtonCounter += 1; } 
    if(this.h2){ (<HTMLButtonElement>document.getElementById("b79")).style.backgroundColor = 'black'; } 
    if(this.h3 && this.endButtonCounter == 0){ (<HTMLButtonElement>document.getElementById("b79")).style.backgroundColor = 'red'; this.endButtonCounter += 1; } 
  }
  btnPress80(){
    if(this.h1 && this.startButtonCounter == 0){ (<HTMLButtonElement>document.getElementById("b80")).style.backgroundColor = 'darkgreen'; this.startButtonCounter += 1; } 
    if(this.h2){ (<HTMLButtonElement>document.getElementById("b80")).style.backgroundColor = 'black'; } 
    if(this.h3 && this.endButtonCounter == 0){ (<HTMLButtonElement>document.getElementById("b80")).style.backgroundColor = 'red'; this.endButtonCounter += 1; } 
  }
  btnPress81(){
    if(this.h1 && this.startButtonCounter == 0){ (<HTMLButtonElement>document.getElementById("b81")).style.backgroundColor = 'darkgreen'; this.startButtonCounter += 1; } 
    if(this.h2){ (<HTMLButtonElement>document.getElementById("b81")).style.backgroundColor = 'black'; } 
    if(this.h3 && this.endButtonCounter == 0){ (<HTMLButtonElement>document.getElementById("b81")).style.backgroundColor = 'red'; this.endButtonCounter += 1; } 
  }
  btnPress82(){
    if(this.h1 && this.startButtonCounter == 0){ (<HTMLButtonElement>document.getElementById("b82")).style.backgroundColor = 'darkgreen'; this.startButtonCounter += 1; } 
    if(this.h2){ (<HTMLButtonElement>document.getElementById("b82")).style.backgroundColor = 'black'; } 
    if(this.h3 && this.endButtonCounter == 0){ (<HTMLButtonElement>document.getElementById("b82")).style.backgroundColor = 'red'; this.endButtonCounter += 1; } 
  }
  btnPress83(){
    if(this.h1 && this.startButtonCounter == 0){ (<HTMLButtonElement>document.getElementById("b83")).style.backgroundColor = 'darkgreen'; this.startButtonCounter += 1; } 
    if(this.h2){ (<HTMLButtonElement>document.getElementById("b83")).style.backgroundColor = 'black'; } 
    if(this.h3 && this.endButtonCounter == 0){ (<HTMLButtonElement>document.getElementById("b83")).style.backgroundColor = 'red'; this.endButtonCounter += 1; } 
  }
  btnPress84(){
    if(this.h1 && this.startButtonCounter == 0){ (<HTMLButtonElement>document.getElementById("b84")).style.backgroundColor = 'darkgreen'; this.startButtonCounter += 1; } 
    if(this.h2){ (<HTMLButtonElement>document.getElementById("b84")).style.backgroundColor = 'black'; } 
    if(this.h3 && this.endButtonCounter == 0){ (<HTMLButtonElement>document.getElementById("b84")).style.backgroundColor = 'red'; this.endButtonCounter += 1; } 
  }
  btnPress85(){
    if(this.h1 && this.startButtonCounter == 0){ (<HTMLButtonElement>document.getElementById("b85")).style.backgroundColor = 'darkgreen'; this.startButtonCounter += 1; } 
    if(this.h2){ (<HTMLButtonElement>document.getElementById("b85")).style.backgroundColor = 'black'; } 
    if(this.h3 && this.endButtonCounter == 0){ (<HTMLButtonElement>document.getElementById("b85")).style.backgroundColor = 'red'; this.endButtonCounter += 1; } 
  }
  btnPress86(){
    if(this.h1 && this.startButtonCounter == 0){ (<HTMLButtonElement>document.getElementById("b86")).style.backgroundColor = 'darkgreen'; this.startButtonCounter += 1; } 
    if(this.h2){ (<HTMLButtonElement>document.getElementById("b86")).style.backgroundColor = 'black'; } 
    if(this.h3 && this.endButtonCounter == 0){ (<HTMLButtonElement>document.getElementById("b86")).style.backgroundColor = 'red'; this.endButtonCounter += 1; } 
  }
  btnPress87(){
    if(this.h1 && this.startButtonCounter == 0){ (<HTMLButtonElement>document.getElementById("b87")).style.backgroundColor = 'darkgreen'; this.startButtonCounter += 1; } 
    if(this.h2){ (<HTMLButtonElement>document.getElementById("b87")).style.backgroundColor = 'black'; } 
    if(this.h3 && this.endButtonCounter == 0){ (<HTMLButtonElement>document.getElementById("b87")).style.backgroundColor = 'red'; this.endButtonCounter += 1; } 
  }
  btnPress88(){
    if(this.h1 && this.startButtonCounter == 0){ (<HTMLButtonElement>document.getElementById("b88")).style.backgroundColor = 'darkgreen'; this.startButtonCounter += 1; } 
    if(this.h2){ (<HTMLButtonElement>document.getElementById("b88")).style.backgroundColor = 'black'; } 
    if(this.h3 && this.endButtonCounter == 0){ (<HTMLButtonElement>document.getElementById("b88")).style.backgroundColor = 'red'; this.endButtonCounter += 1; } 
  }
  btnPress89(){
    if(this.h1 && this.startButtonCounter == 0){ (<HTMLButtonElement>document.getElementById("b89")).style.backgroundColor = 'darkgreen'; this.startButtonCounter += 1; } 
    if(this.h2){ (<HTMLButtonElement>document.getElementById("b89")).style.backgroundColor = 'black'; } 
    if(this.h3 && this.endButtonCounter == 0){ (<HTMLButtonElement>document.getElementById("b89")).style.backgroundColor = 'red'; this.endButtonCounter += 1; } 
  }
  btnPress90(){
    if(this.h1 && this.startButtonCounter == 0){ (<HTMLButtonElement>document.getElementById("b90")).style.backgroundColor = 'darkgreen'; this.startButtonCounter += 1; } 
    if(this.h2){ (<HTMLButtonElement>document.getElementById("b90")).style.backgroundColor = 'black'; } 
    if(this.h3 && this.endButtonCounter == 0){ (<HTMLButtonElement>document.getElementById("b90")).style.backgroundColor = 'red'; this.endButtonCounter += 1; } 
  }
  btnPress91(){
    if(this.h1 && this.startButtonCounter == 0){ (<HTMLButtonElement>document.getElementById("b91")).style.backgroundColor = 'darkgreen'; this.startButtonCounter += 1; } 
    if(this.h2){ (<HTMLButtonElement>document.getElementById("b91")).style.backgroundColor = 'black'; } 
    if(this.h3 && this.endButtonCounter == 0){ (<HTMLButtonElement>document.getElementById("b91")).style.backgroundColor = 'red'; this.endButtonCounter += 1; } 
  }
  btnPress92(){
    if(this.h1 && this.startButtonCounter == 0){ (<HTMLButtonElement>document.getElementById("b92")).style.backgroundColor = 'darkgreen'; this.startButtonCounter += 1; } 
    if(this.h2){ (<HTMLButtonElement>document.getElementById("b92")).style.backgroundColor = 'black'; } 
    if(this.h3 && this.endButtonCounter == 0){ (<HTMLButtonElement>document.getElementById("b92")).style.backgroundColor = 'red'; this.endButtonCounter += 1; } 
  }
  btnPress93(){
    if(this.h1 && this.startButtonCounter == 0){ (<HTMLButtonElement>document.getElementById("b93")).style.backgroundColor = 'darkgreen'; this.startButtonCounter += 1; } 
    if(this.h2){ (<HTMLButtonElement>document.getElementById("b93")).style.backgroundColor = 'black'; } 
    if(this.h3 && this.endButtonCounter == 0){ (<HTMLButtonElement>document.getElementById("b93")).style.backgroundColor = 'red'; this.endButtonCounter += 1; } 
  }
  btnPress94(){
    if(this.h1 && this.startButtonCounter == 0){ (<HTMLButtonElement>document.getElementById("b94")).style.backgroundColor = 'darkgreen'; this.startButtonCounter += 1; } 
    if(this.h2){ (<HTMLButtonElement>document.getElementById("b94")).style.backgroundColor = 'black'; } 
    if(this.h3 && this.endButtonCounter == 0){ (<HTMLButtonElement>document.getElementById("b94")).style.backgroundColor = 'red'; this.endButtonCounter += 1; } 
  }
  btnPress95(){
    if(this.h1 && this.startButtonCounter == 0){ (<HTMLButtonElement>document.getElementById("b95")).style.backgroundColor = 'darkgreen'; this.startButtonCounter += 1; } 
    if(this.h2){ (<HTMLButtonElement>document.getElementById("b95")).style.backgroundColor = 'black'; } 
    if(this.h3 && this.endButtonCounter == 0){ (<HTMLButtonElement>document.getElementById("b95")).style.backgroundColor = 'red'; this.endButtonCounter += 1; } 
  }
  btnPress96(){
    if(this.h1 && this.startButtonCounter == 0){ (<HTMLButtonElement>document.getElementById("b96")).style.backgroundColor = 'darkgreen'; this.startButtonCounter += 1; } 
    if(this.h2){ (<HTMLButtonElement>document.getElementById("b96")).style.backgroundColor = 'black'; } 
    if(this.h3 && this.endButtonCounter == 0){ (<HTMLButtonElement>document.getElementById("b96")).style.backgroundColor = 'red'; this.endButtonCounter += 1; } 
  }
  btnPress97(){
    if(this.h1 && this.startButtonCounter == 0){ (<HTMLButtonElement>document.getElementById("b97")).style.backgroundColor = 'darkgreen'; this.startButtonCounter += 1; } 
    if(this.h2){ (<HTMLButtonElement>document.getElementById("b97")).style.backgroundColor = 'black'; } 
    if(this.h3 && this.endButtonCounter == 0){ (<HTMLButtonElement>document.getElementById("b97")).style.backgroundColor = 'red'; this.endButtonCounter += 1; } 
  }
  btnPress98(){
    if(this.h1 && this.startButtonCounter == 0){ (<HTMLButtonElement>document.getElementById("b98")).style.backgroundColor = 'darkgreen'; this.startButtonCounter += 1; } 
    if(this.h2){ (<HTMLButtonElement>document.getElementById("b98")).style.backgroundColor = 'black'; } 
    if(this.h3 && this.endButtonCounter == 0){ (<HTMLButtonElement>document.getElementById("b98")).style.backgroundColor = 'red'; this.endButtonCounter += 1; } 
  }
  btnPress99(){
    if(this.h1 && this.startButtonCounter == 0){ (<HTMLButtonElement>document.getElementById("b99")).style.backgroundColor = 'darkgreen'; this.startButtonCounter += 1; } 
    if(this.h2){ (<HTMLButtonElement>document.getElementById("b99")).style.backgroundColor = 'black'; } 
    if(this.h3 && this.endButtonCounter == 0){ (<HTMLButtonElement>document.getElementById("b99")).style.backgroundColor = 'red'; this.endButtonCounter += 1; } 
  }
  btnPress100(){
    if(this.h1 && this.startButtonCounter == 0){ (<HTMLButtonElement>document.getElementById("b100")).style.backgroundColor = 'darkgreen'; this.startButtonCounter += 1; } 
    if(this.h2){ (<HTMLButtonElement>document.getElementById("b100")).style.backgroundColor = 'black'; } 
    if(this.h3 && this.endButtonCounter == 0){ (<HTMLButtonElement>document.getElementById("b100")).style.backgroundColor = 'red'; this.endButtonCounter += 1; } 
  }
}
