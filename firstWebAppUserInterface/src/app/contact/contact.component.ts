import {Component} from '@angular/core';
// import {FormControl, Validators} from '@angular/forms';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent{
  //TDL: make random turn start
  b1: string=' '; b2: string=' '; b3: string=' '; b4: string=' '; b5: string=' '; b6: string=' '; b7: string=' '; b8: string=' '; b9: string=' ';
  turn: boolean=true; //true = player turn(X), false = ai turn(O)
  winner: boolean=false;
  whoWins: string=' ';
  randNum: number=0;
  flag: boolean=false;

  winCheck(): void{
    if(this.b1=='X' && this.b2=='X' && this.b3=='X'){this.winner=true; this.whoWins='X has won!';}
    else if(this.b4=='X' && this.b5=='X' && this.b6=='X'){this.winner=true; this.whoWins='X has won!';}
    else if(this.b7=='X' && this.b8=='X' && this.b9=='X'){this.winner=true; this.whoWins='X has won!';}
    else if(this.b1=='X' && this.b4=='X' && this.b7=='X'){this.winner=true; this.whoWins='X has won!';}
    else if(this.b2=='X' && this.b5=='X' && this.b8=='X'){this.winner=true; this.whoWins='X has won!';}
    else if(this.b3=='X' && this.b6=='X' && this.b9=='X'){this.winner=true; this.whoWins='X has won!';}
    else if(this.b1=='X' && this.b5=='X' && this.b9=='X'){this.winner=true; this.whoWins='X has won!';}
    else if(this.b3=='X' && this.b5=='X' && this.b7=='X'){this.winner=true; this.whoWins='X has won!';}

    else if(this.b1=='O' && this.b2=='O' && this.b3=='O'){this.winner=true; this.whoWins='O has won!';}
    else if(this.b4=='O' && this.b5=='O' && this.b6=='O'){this.winner=true; this.whoWins='O has won!';}
    else if(this.b7=='O' && this.b8=='O' && this.b9=='O'){this.winner=true; this.whoWins='O has won!';}
    else if(this.b1=='O' && this.b4=='O' && this.b7=='O'){this.winner=true; this.whoWins='O has won!';}
    else if(this.b2=='O' && this.b5=='O' && this.b8=='O'){this.winner=true; this.whoWins='O has won!';}
    else if(this.b3=='O' && this.b6=='O' && this.b9=='O'){this.winner=true; this.whoWins='O has won!';}
    else if(this.b1=='O' && this.b5=='O' && this.b9=='O'){this.winner=true; this.whoWins='O has won!';}
    else if(this.b3=='O' && this.b5=='O' && this.b7=='O'){this.winner=true; this.whoWins='O has won!';}

    else if(this.b1!=' '&&this.b2!=' '&&this.b3!=' '&&this.b4!=' '&&this.b5!=' '&&this.b6!=' '&&this.b7!=' '&&this.b8!=' '&&this.b9!=' '){this.winner=true; this.whoWins='CAT!';}
  }
  reset(){
    this.b1=' ';this.b2=' ';this.b3=' ';this.b4=' ';this.b5=' ';this.b6=' ';this.b7=' ';this.b8=' ';this.b9=' ';
    this.turn=true //true = player turn(X), false = ai turn(O)
    this.winner=false;
    this.whoWins=' ';
    (<HTMLButtonElement>document.getElementById("but1")).disabled = false;(<HTMLButtonElement>document.getElementById("but2")).disabled = false;(<HTMLButtonElement>document.getElementById("but3")).disabled = false;
    (<HTMLButtonElement>document.getElementById("but4")).disabled = false;(<HTMLButtonElement>document.getElementById("but5")).disabled = false;(<HTMLButtonElement>document.getElementById("but6")).disabled = false;
    (<HTMLButtonElement>document.getElementById("but7")).disabled = false;(<HTMLButtonElement>document.getElementById("but8")).disabled = false;(<HTMLButtonElement>document.getElementById("but9")).disabled = false;
  }
  runAI(){
    if(!this.winner){
      while(!this.flag){
        this.randNum = (Math.floor(Math.random() * 9)) + 1;
        if(this.randNum==1 && this.b1==' '){this.checkBox1(); this.flag=true;}
        else if(this.randNum==2 && this.b2==' '){this.checkBox2(); this.flag=true;}
        else if(this.randNum==3 && this.b3==' '){this.checkBox3(); this.flag=true;}
        else if(this.randNum==4 && this.b4==' '){this.checkBox4(); this.flag=true;}
        else if(this.randNum==5 && this.b5==' '){this.checkBox5(); this.flag=true;}
        else if(this.randNum==6 && this.b6==' '){this.checkBox6(); this.flag=true;}
        else if(this.randNum==7 && this.b7==' '){this.checkBox7(); this.flag=true;}
        else if(this.randNum==8 && this.b8==' '){this.checkBox8(); this.flag=true;}
        else if(this.randNum==9 && this.b9==' '){this.checkBox9(); this.flag=true;}
      }
      this.flag=false;
    }
  }
  checkBox1(): void{
    if(!this.winner){
      if(this.b1 ==' '){
        if(this.turn){
          this.b1='X'; this.turn = false;
        }else{
          this.b1='O'; this.turn = true;
        }
        (<HTMLButtonElement>document.getElementById("but1")).disabled = true;
      } 
    }
  }
  checkBox2(): void{
    if(!this.winner){
      if(this.b2 ==' '){
        if(this.turn){
          this.b2='X'; this.turn = false;
        }else{
          this.b2='O'; this.turn = true;
        }
        (<HTMLButtonElement>document.getElementById("but2")).disabled = true;
      }
    }
  }
  checkBox3(): void{
    if(!this.winner){
      if(this.b3 ==' '){
        if(this.turn){
          this.b3='X'; this.turn = false;
        }else{
          this.b3='O'; this.turn = true;
        }
        (<HTMLButtonElement>document.getElementById("but3")).disabled = true;
      }
    }
  }
  checkBox4(): void{
    if(!this.winner){
      if(this.b4 ==' '){
        if(this.turn){
          this.b4='X'; this.turn = false;
        }else{
          this.b4='O'; this.turn = true;
        }
        (<HTMLButtonElement>document.getElementById("but4")).disabled = true;
      }
    }
  }
  checkBox5(): void{
    if(!this.winner){
      if(this.b5 ==' '){
        if(this.turn){
          this.b5='X'; this.turn = false;
        }else{
          this.b5='O'; this.turn = true;
        }
        (<HTMLButtonElement>document.getElementById("but5")).disabled = true;
      }
    }
  }
  checkBox6(): void{
    if(!this.winner){
      if(this.b6 ==' '){
        if(this.turn){
          this.b6='X'; this.turn = false;
        }else{
          this.b6='O'; this.turn = true;
        }
        (<HTMLButtonElement>document.getElementById("but6")).disabled = true;
      }
    }
  }
  checkBox7(): void{
    if(!this.winner){
      if(this.b7 ==' '){
        if(this.turn){
          this.b7='X'; this.turn = false;
        }else{
          this.b7='O'; this.turn = true;
        }
        (<HTMLButtonElement>document.getElementById("but7")).disabled = true;
      }
    }
  }
  checkBox8(): void{
    if(!this.winner){
      if(this.b8 ==' '){
        if(this.turn){
          this.b8='X'; this.turn = false;
        }else{
          this.b8='O'; this.turn = true;
        }
        (<HTMLButtonElement>document.getElementById("but8")).disabled = true;
      }
    }
  }
  checkBox9(): void{
    if(!this.winner){
      if(this.b9==' '){
        if(this.turn){
          this.b9='X'; this.turn = false;
        }else{
          this.b9='O'; this.turn = true;
        }
        (<HTMLButtonElement>document.getElementById("but9")).disabled = true;
      }
    }
  }

  // emailFormControl = new FormControl('', [Validators.required, Validators.email]);
  // NameFormControl = new FormControl('', [Validators.required]);
  // CommentFormControl = new FormControl('', [Validators.required]);
  // ifSend = false;

  // sendMessage(){
  //   console.log(this.emailFormControl.value + " " + this.NameFormControl.value + " " + this.CommentFormControl.value);
  //   this.ifSend = true;
  // }
}

