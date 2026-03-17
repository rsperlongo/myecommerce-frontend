import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { email, FormField } from '@angular/forms/signals';
import { merge, takeUntil } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [
    MatGridListModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  templateUrl: './login.html',
  styleUrl: './login.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})


export class Login {
  private authService = inject(AuthService);
  private router = inject(Router);

  loading = signal(false);
  submitted = signal(false);

  readonly email = new FormControl('', [Validators.required, Validators.email]);
  readonly password = new FormControl('', [Validators.required, Validators.minLength(6)]);

  errorMessage = signal('');

  constructor() {
    merge(
      this.email.statusChanges,
      this.email.valueChanges,
      this.password.statusChanges,
      this.password.valueChanges,
    )
      .pipe(takeUntilDestroyed())
      .subscribe(() => this.updateErrorMessage());
  }


  updateErrorMessage() {
    if (this.email.hasError('required')) {
      this.errorMessage.set('You must enter a value');
    } else if (this.email.hasError('email')) {
      this.errorMessage.set('Not a valid email');
    }
    if (this.password.hasError('required')) {
      this.errorMessage.set('You must enter a value');
    } else if (this.password.hasError('minlength')) {
      this.errorMessage.set('Password must be at least 6 characters long');
    }
  }

  updateErrorMessage2() {
    if (this.password.hasError('required')) {
      this.errorMessage.set('You must enter a value');
    } else if (this.password.hasError('minlength')) {
      this.errorMessage.set('Password must be at least 6 characters long');
    }
  }

  login() {
    if (this.email.valid && this.password.valid) {
      this.loading.set(true);
      if (this.submitted()) {
        return;
      }
      this.submitted.set(true);
      this.errorMessage.set('');

      // Use mock login for now
      this.authService.mockLogin({ email: this.email.value!, password: this.password.value! }).subscribe({
        next: () => {
          this.loading.set(false);
          this.submitted.set(false);
          this.router.navigate(['/home']);
        },
        error: (err) => {
          this.loading.set(false);
          this.submitted.set(false);
          this.errorMessage.set(err.message || 'Login failed');
        }
      });
    } else {
      this.updateErrorMessage();
    }
  }
}
