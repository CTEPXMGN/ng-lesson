import { Component, inject } from '@angular/core';
import { SvgIcon } from '../svg-icon/svg-icon';
import { JsonPipe, NgForOf, AsyncPipe } from '@angular/common';
import { SubscriberCard } from './subscriber-card/subscriber-card';
import { RouterLink } from '@angular/router';
import { Profile } from '../../data/services/profile.service';
import { Observable } from 'rxjs';
import { Pageble } from '../../data/interfaces/pageble.interface';

@Component({
  selector: 'app-sidebar',
  imports: [SvgIcon, NgForOf, SubscriberCard, RouterLink, AsyncPipe, JsonPipe],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.scss',
})
export class Sidebar {
  profileService: Profile = inject(Profile);

  subscribers$ : Observable<Pageble<Profile>> = this.profileService.getSubscribersShortList();

  me = this.profileService.getMe();

  menuItems = [
    { icon: 'home', label: 'Моя страница', link: '' },
    { icon: 'chat', label: 'Чаты', link: 'chats' },
    { icon: 'search', label: 'Поиск', link: 'search' },
  ];
}
