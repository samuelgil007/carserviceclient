import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({providedIn: 'root'})
export class OwnerService {
  public API = 'https://thawing-chamber-47973.herokuapp.com';
  public owner_API = this.API + '/owners';

  constructor(private http: HttpClient) {
  }

  getAll(): Observable<any> {
    return this.http.get(this.owner_API);
  }

  get(id: string) {
    return this.http.get(this.owner_API + '/' + id);
  }
  //marca error pero esta correcto
  async getAll2(){
    let response = await fetch(this.owner_API);
    let datos:JSON = await response.json();
    return datos;
  }


  save(owner: any): Observable<any> {
    let result: Observable<Object>;
    if (owner['href']) {
      result = this.http.put(owner.href, owner);
    } else {
      result = this.http.post(this.owner_API, owner);
    }
    return result;
  }

  remove(href: string) {
    return this.http.delete(href);
  }
}
