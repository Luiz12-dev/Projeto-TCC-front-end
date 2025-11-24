import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { response } from 'express';

@Component({
  selector: 'app-auth.component',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.scss',
})
export class AuthComponent {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);

  isLoginMode = true;

  authForm: FormGroup = this.fb.group({
    username: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    role: ['CLIENT'],
  });

  ngOnInit() {
    this.atualizarValidacoes();
  }

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
    this.atualizarValidacoes();
  }

  private atualizarValidacoes() {
    const usernameControl = this.authForm.get('username');
    const roleControl = this.authForm.get('role');

    if (this.isLoginMode) {
      usernameControl?.clearValidators();
      roleControl?.clearValidators();
    } else {
      usernameControl?.setValidators([Validators.required]);
      roleControl?.setValidators([Validators.required]);
    }
    usernameControl?.updateValueAndValidity();
    roleControl?.updateValueAndValidity();
  }

  setMode(isLogin: boolean) {
    if (this.isLoginMode !== isLogin) {
      this.isLoginMode = isLogin;
      this.atualizarValidacoes();
    }
  }

  onSubmit() {
    if (this.authForm.invalid) return;

    const dados = this.authForm.value;

    if (this.isLoginMode) {
      this.authService
        .login({
          email: dados.email,
          password: dados.password,
        })
        .subscribe({
          next: (response) => {
            console.log('Login bem-sucedido:', response);
          },
          error: (error) => {
            console.error('Erro no login:', error);
          },
        });
    } else {
      this.authService
        .register({
          username: dados.username,
          email: dados.email,
          password: dados.password,
          role: dados.role,
        })
        .subscribe({
          next: (response) => {
            console.log('Registro bem-sucedido:', response);
          },
          error: (error) => {
            console.error('Erro no registro:', error);
          },
        });
    }
  }
}
