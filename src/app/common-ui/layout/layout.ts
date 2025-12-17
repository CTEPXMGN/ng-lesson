import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Sidebar } from '../sidebar/sidebar';
import { Profile } from '../../data/services/profile.service';

@Component({
  selector: 'app-layout',
  imports: [RouterOutlet, Sidebar],
  templateUrl: './layout.html',
  styleUrl: './layout.scss',
})
export class Layout {
  profileService = inject(Profile);

  ngOnInit() {
    // console.log('ngOnInit');
    this.profileService.getMe().subscribe(val => {
      // console.log('Current user profile:', val);
      
    })
  }
}
