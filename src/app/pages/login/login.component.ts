import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';



@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})



export class LoginComponent {
  loginForm: FormGroup;
  isSubmitted = false;
  errorMessage = '';
  // Add this property
  isLoading: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) 
  
  
  {
    this.loginForm = this.formBuilder.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  // Getter for easy access to form fields
  get formControls() {
    return this.loginForm.controls;
  }

onSubmit() {
  this.isSubmitted = true;
   

  if (this.loginForm.invalid) {
    return;
  }
 
  //show spinner when credentials is submitted
  this.isLoading = true;

  const { username, password } = this.loginForm.value;

  console.log('Login credentials:', this.loginForm.value);


  this.authService.login(username.trim(), password.trim()).subscribe({
    next: (response) => {
      // Save full user info
      localStorage.setItem('token', response.token);
      localStorage.setItem('currentUser', JSON.stringify({
        mid: response.mid,
        usid:response.usid,
        member_name:response.employee_name,
        username: response.username,
        isCaptain: response.isCaptain,
        isManager: response.isManager,
        isSupervisor: response.isSupervisor,
        isnoRole: response.isnoRole,
       
        
      }));

      console.log(localStorage)
      console.log(response.username, password);

       // Dynamic Routing Based on Role
      if (response.isManager) {
        this.router.navigate(['/manager-homepage']);
      } else if (response.isSupervisor) {
        this.router.navigate(['/supervisor-homepage']);
      } else if (response.isCaptain) {
        this.router.navigate(['/captain-homepage']);
      } else if (response.isnoRole) {
        this.router.navigate(['/general-homepage']);
      } else {
        // Fallback route
        this.router.navigate(['/login']);
      }
  
    },
    error: (err) => { 
      this.errorMessage = 'Invalid username or password';
       console.error('Login error:', err.error);
       this.isLoading = false; // Hide spinner on error
       this.errorMessage = err.error?.non_field_errors?.[0] || 'Login failed';
    },
    complete: () => {
        this.isLoading = false; // Hide spinner when complete
      }
  });
}


}

