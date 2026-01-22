import { Component, effect, inject } from '@angular/core';
import { ProfileHeader } from '../../common-ui/profile-header/profile-header';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Profile } from '../../data/services/profile.service';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-settings-page',
  imports: [ProfileHeader, ReactiveFormsModule],
  templateUrl: './settings-page.html',
  styleUrl: './settings-page.scss',
})
export class SettingsPage {
  fb = inject(FormBuilder);
  profileService = inject(Profile);

  form = this.fb.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    username: [{ value: '', disabled: true }, Validators.required],
    description: [''],
    stack: [''],
  });

  constructor() {
    effect(() => {
      //@ts-ignore
      this.form.patchValue({
        ...this.profileService.me(),
        //@ts-ignore
        stack: this.mergeStack(this.profileService.me()?.stack),
      });
    });
  }

  onSave() {
    this.form.markAllAsTouched();
    this.form.updateValueAndValidity();

    if (this.form.invalid) return;
    // @ts-ignore
    firstValueFrom(this.profileService.patchProfile({ ...this.form.value , stack: this.splitStack(this.form.value.stack) }));
  }

  splitStack(stack: string | null | string[] | undefined) {
    if (Array.isArray(stack)) return stack;
    if (!stack) return [];

    return stack.split(',').map((s) => s.trim());
  }

  mergeStack(stack: string | null | string[] | undefined) {
    if (Array.isArray(stack)) return stack.join(', ');
    if (!stack) return '';

    return stack;
  }
}
