import { Component, inject } from '@angular/core';
import { ProfileHeader } from "../../common-ui/profile-header/profile-header";
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-settings-page',
  imports: [ProfileHeader, ReactiveFormsModule],
  templateUrl: './settings-page.html',
  styleUrl: './settings-page.scss',
})
export class SettingsPage {
  fb = inject(FormBuilder);

 form = this.fb.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    username: ['', Validators.required],
    description: [''],
    stack: [''],
  });
}
