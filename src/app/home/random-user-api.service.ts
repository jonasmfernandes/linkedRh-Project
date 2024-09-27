import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class RandomUserApiService {
  constructor(public http: HttpClient) {}

  getRandomUser() {
    return this.http.get('https://randomuser.me/api/');
  }
}
