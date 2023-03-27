import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {
  private baseUrl : string ="https://localhost:7072/api/User/";
  private cardurl : string ="https://localhost:7072/api/CardRequest/";
  private adcardurl : string ="https://localhost:7072/api/Card/AddCard";
  constructor(private http : HttpClient) { }


  
  isLoggedIn: boolean = false;
  
  login(loginObj:any){
    return this.http.post<any>(`${this.baseUrl}authentication`,loginObj)
  }

  SearchUserbyid(user_id : any){
    let url = 'https://localhost:7072/api/User/SearchUserbyid/'+user_id;
    return this.http.get(url)
  }

  signup(userObj: any){
    return this.http.post<any>(`${this.baseUrl}register`,userObj)
  }

  updateUser(userObj:any){
    return this.http.put<any>(`${this.baseUrl}update_user`,userObj);
  }

  requestcard(reqObj:any){
    return this.http.post<any>(`${this.cardurl}AddRequset`,reqObj)
  }

  addcard(cardObj : any){
    return this.http.post<any>(`${this.adcardurl}`,cardObj);
  }

}
