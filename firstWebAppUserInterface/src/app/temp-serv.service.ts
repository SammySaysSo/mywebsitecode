import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tempData } from './tempData';
import { tempCreateData } from './tempCreateData';

@Injectable({
  providedIn: 'root'
})
export class TempServService {

  private APIUrl="https://localhost:7197/api"; //"https://10.203.1.151:7197/api" replace local host with numbers ||| "https://localhost:7197/api"

  constructor(private http:HttpClient) { }

  getValues():Observable<tempData[]>{
    return this.http.get<tempData[]>(this.APIUrl);
  }

  insertValues(val: tempCreateData){
    return this.http.post(this.APIUrl, val);
  }
}
