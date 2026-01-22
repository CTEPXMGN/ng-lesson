import { Component, inject } from '@angular/core';
import { SvgIcon } from '../svg-icon/svg-icon';
import { NgForOf, AsyncPipe } from '@angular/common';
import { SubscriberCard } from './subscriber-card/subscriber-card';
import { RouterLink } from '@angular/router';
import { Profile } from '../../data/services/profile.service';
import { firstValueFrom } from 'rxjs';
import { ImgUrlPipe } from '../../helpers/pipes/img-url-pipe';

@Component({
  selector: 'app-sidebar',
  imports: [SvgIcon, NgForOf, SubscriberCard, RouterLink, AsyncPipe, ImgUrlPipe],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.scss',
})
export class Sidebar {
  profileService: Profile = inject(Profile);

  subscribers$ = this.profileService.getSubscribersShortList();

  me = this.profileService.me;

  menuItems = [
    { icon: 'home', label: 'Моя страница', link: 'profile/me' },
    { icon: 'chat', label: 'Чаты', link: 'chats' },
    { icon: 'search', label: 'Поиск', link: 'search' },
  ];

  ngOnInit(): void {
    firstValueFrom(this.profileService.getMe());
  }
}
