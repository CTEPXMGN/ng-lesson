import { Component, inject, signal } from '@angular/core';
import { ProfileCard } from "../../common-ui/profile-card/profile-card";
import { Profile } from '../../data/services/profile.service';
import { ProfileInterface } from '../../data/interfaces/profile.interface';

@Component({
  selector: 'app-search-page',
  imports: [ProfileCard],
  templateUrl: './search-page.html',
  styleUrl: './search-page.scss',
})
export class SearchPage {
  protected readonly title = signal('ng-lesson');

  profileService = inject(Profile);
  profiles : ProfileInterface[] = [];

  constructor() {
    this.profileService.getTestAccounts().subscribe((data: ProfileInterface[]) => {
      this.profiles = data;
    });
  }
}
