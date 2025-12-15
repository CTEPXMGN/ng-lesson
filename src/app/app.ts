import { Component, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ProfileCard } from "./common-ui/profile-card/profile-card";
import { Profile } from './data/services/profile.service';
import { ProfileInterface } from './data/interfaces/profile.interface';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ProfileCard, JsonPipe],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('ng-lesson');

  profileService = inject(Profile);
  profiles : ProfileInterface[] = [];

  constructor() {
    this.profileService.getTestAccounts().subscribe((data: ProfileInterface[]) => {
      this.profiles = data;
    });
  }
}
