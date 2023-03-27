import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AdminServiceService {

  private baseUrl : string ="https://localhost:7072/api/Game/";
  private userurl : string ="https://localhost:7072/api/User/";
  addgame(gameObj: any){
    return this.http.post<any>(`${this.baseUrl}AddGame`,gameObj)
  }
  
  getgame(){
    return this.http.get(`${this.baseUrl}getGame`)
  }

  DelGame(g_Id:any){
    let dl = "https://localhost:7072/api/Game/delete_game/"+g_Id;
    return this.http.delete(dl);
  }

  SearchGamebyid(user_id : any){
    let url = 'https://localhost:7072/api/Game/SearchGameid/'+user_id;
    return this.http.get(url)
  }

  updateGame(gameObj:any){
    return this.http.put<any>(`${this.baseUrl}update_employee`,gameObj);
  }

  getalluser(){
    return this.http.get<any>(`${this.userurl}getUser`);
  }

  deleteuser(userId : any){
    return this.http.delete(`${this.userurl}delete_user/`+userId);
  }

  constructor(private http : HttpClient) { }
}
