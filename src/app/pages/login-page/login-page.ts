import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-login-page',
  imports: [ReactiveFormsModule],
  templateUrl: './login-page.html',
  styleUrl: './login-page.scss',
})
export class LoginPage {
  onSubmit() {
    console.log(this.form.value);
  }

  form = new FormGroup({
    username: new FormControl(null),
    password: new FormControl(null),
  });
}
