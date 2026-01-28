import { Component, inject } from '@angular/core';
import { ProfileHeader } from '../../common-ui/profile-header/profile-header';
import { ActivatedRoute } from '@angular/router';
import { Profile } from '../../data/services/profile.service';
import { switchMap } from 'rxjs';
import { toObservable } from '@angular/core/rxjs-interop';
import { AsyncPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ImgUrlPipe } from "../../helpers/pipes/img-url-pipe";
import { PostFeed } from "./post-feed/post-feed";
import { SvgIcon } from "../../common-ui/svg-icon/svg-icon";

@Component({
  selector: 'app-profile-page',
  imports: [ProfileHeader, AsyncPipe, RouterLink, ImgUrlPipe, PostFeed, SvgIcon],
  templateUrl: './profile-page.html',
  styleUrl: './profile-page.scss',
})
export class ProfilePage {
  profileService = inject(Profile);
  route = inject(ActivatedRoute);

  me$ = toObservable(this.profileService.me);
  subscribers$ = this.profileService.getSubscribersShortList(5);

  profile$ = this.route.params.pipe(
    switchMap(({ id }) => {
      if (id === 'me') return this.me$;
      return this.profileService.getAccount(id);
    })
  );
}
