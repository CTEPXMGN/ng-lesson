import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { ProfileInterface } from '../interfaces/profile.interface';
import { Pageble } from '../interfaces/pageble.interface';
import { map, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Profile {
  [x: string]: any;

  http: HttpClient = inject(HttpClient);
  baseApiUrl: string = 'https://icherniakov.ru/yt-course/';

  me = signal<ProfileInterface | null>(null);

  getTestAccounts() {
    return this.http.get<ProfileInterface[]>(`${this.baseApiUrl}account/test_accounts`);
  }

  getMe() {
    return this.http.get<ProfileInterface>(`${this.baseApiUrl}account/me`)
    .pipe(
      tap(res => {
        this.me.set(res);
      })
    );
  }

  getAccount(id: string) {
    return this.http.get<ProfileInterface>(`${this.baseApiUrl}account/${id}`);
  }

  getSubscribersShortList() {
    return this.http
      .get<Pageble<ProfileInterface>>(`${this.baseApiUrl}account/subscribers/`)
      .pipe(map((res) => res.items.slice(0, 3)));
  }
}
