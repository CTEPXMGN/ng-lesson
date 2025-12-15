import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class Profile {

  http : HttpClient = inject(HttpClient);
  baseApiUrl : string = 'https://icherniakov.ru/yt-course';

  getTestAccounts() {
    return this.http.get<Profile[]>( `${this.baseApiUrl}/account/test_accounts`)
  }
  
}
