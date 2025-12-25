import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { ProfileInterface } from '../interfaces/profile.interface';
import { Pageble } from '../interfaces/pageble.interface';

@Injectable({
  providedIn: 'root',
})
export class Profile {
[x: string]: any;

  http : HttpClient = inject(HttpClient);
  baseApiUrl : string = 'https://icherniakov.ru/yt-course';

  getTestAccounts() {
    return this.http.get< ProfileInterface[]>( `${this.baseApiUrl}/account/test_accounts`)
  }
  
  getMe() {
    return this.http.get<ProfileInterface>( `${this.baseApiUrl}/account/me`)
  }

  getAccount(id: string) {
    return this.http.get<Profile>( `${this.baseApiUrl}/account/${id}`)
  }

  getSubscribersShortList() {
    return this.http.get<Pageble<Profile>>( `${this.baseApiUrl}/account/subscribers`)
  }
}
