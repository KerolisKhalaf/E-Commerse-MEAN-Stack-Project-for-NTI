import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { LoginRequest } from '../../interfaces/user.interface';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  // Login form data
  loginData: LoginRequest = {
    email: '',
    password: ''
  };
  
  // UI state
  isLoading = false;
  errorMessage = '';

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  /**
   * Handle login form submission
   */
  onSubmit(): void {
    // Validate form fields
    if (!this.loginData.email || !this.loginData.password) {
      this.errorMessage = 'Please fill in all fields';
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';

    // Attempt login
    this.authService.login(this.loginData).subscribe({
      next: (response: any) => {
        this.isLoading = false;
        
        // Store authentication data
        if (response.token) {
          this.authService.setToken(response.token);
        }
        if (response.user) {
          this.authService.setCurrentUser(response.user);
        }
        
        // Navigate to home page
        this.router.navigate(['/']);
      },
      error: (error) => {
        this.isLoading = false;
        
        // Handle different error formats
        if (error.error?.error) {
          this.errorMessage = error.error.error;
        } else if (error.error?.message) {
          this.errorMessage = error.error.message;
        } else {
          this.errorMessage = 'Login failed. Please try again.';
        }
      }
    });
  }
}
