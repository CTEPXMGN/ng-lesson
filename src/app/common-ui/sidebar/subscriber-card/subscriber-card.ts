import { Component, Input } from '@angular/core';
import { ImgUrlPipe } from "../../../helpers/pipes/img-url-pipe";
import { ProfileInterface } from '../../../data/interfaces/profile.interface';

@Component({
  selector: 'app-subscriber-card',
  standalone: true,
  imports: [ImgUrlPipe],
  templateUrl: './subscriber-card.html',
  styleUrl: './subscriber-card.scss',
})
export class SubscriberCard {
  @Input() profile!: ProfileInterface
}
