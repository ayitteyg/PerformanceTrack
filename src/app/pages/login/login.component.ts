import { Component, OnInit  } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { NotificationService } from '../../services/notification.service';





@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})



export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  isSubmitted = false;
  errorMessage = '';
  // Add this property
  isLoading: boolean = false;
  currentTime: string = '';

  //typing effect
  fullText: string = 'PERFORMANCE TRACKER';
  displayedText: string = '';
  currentIndex: number = 0;
  intervalId: any;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private notification: NotificationService
  ) 
  
  
  {
    this.loginForm = this.formBuilder.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

    ngOnInit() {
    this.updateTime();
    setInterval(() => this.updateTime(), 1000); // Update every second
    this.startTyping();
  }

  // Getter for easy access to form fields
  get formControls() {
    return this.loginForm.controls;
  }

// onSubmit() {
//   this.isSubmitted = true;
   

//   if (this.loginForm.invalid) {
//     return;
//   }
 
//   //show spinner when credentials is submitted
//   this.isLoading = true;
//   const { username, password } = this.loginForm.value;

//   console.log('Login credentials:', this.loginForm.value);

//   this.authService.login(username.trim(), password.trim()).subscribe({
//     next: (response) => {
//       // Save full user info
//       localStorage.setItem('token', response.token);
//       localStorage.setItem('currentUser', JSON.stringify({
//         mid: response.mid,
//         usid:response.usid,
//         member_name:response.employee_name,
//         username: response.username,
//         isCaptain: response.isCaptain,
//         isManager: response.isManager,
//         isSupervisor: response.isSupervisor,
//         isnoRole: response.isnoRole,
//         job:response.job
       
        
//       }));

//       console.log(localStorage)
//       console.log(response.username, password);

//        // Dynamic Routing Based on Role
 
//     },
//     error: (err) => { 
//       this.errorMessage = 'Invalid username or password';
//        console.error('Login error:', err.error);
//        this.isLoading = false; // Hide spinner on error
//        this.errorMessage = err.error?.non_field_errors?.[0] || 'Login failed';
//     },
//     complete: () => {
//         this.isLoading = false; // Hide spinner when complete
//       }
//   });
// }



onSubmit() {
  this.isSubmitted = true;

  if (this.loginForm.invalid) {
    // Use iziToast for form validation errors (more visible)
    this.notification.warning(
      'Form Validation', 
      'Please fill in all required fields correctly'
    );
    return;
  }
 
  this.isLoading = true;
  const { username, password } = this.loginForm.value;

  this.authService.login(username.trim(), password.trim()).subscribe({
    next: (response) => {
      // Save user data
      localStorage.setItem('token', response.token);
      localStorage.setItem('currentUser', JSON.stringify({
        mid: response.mid,
        usid: response.usid,
        member_name: response.employee_name,
        username: response.username,
        isCaptain: response.isCaptain,
        isManager: response.isManager,
        isSupervisor: response.isSupervisor,
        isnoRole: response.isnoRole,
        job: response.job
      }));

      // Use iziToast for success notification (more prominent)
      this.notification.success(
        'Login Successful', 
        `Welcome back, ${response.employee_name || response.username}!`
      );

      // Optional: Use Material Snackbar for a secondary confirmation
      this.notification.success('You are being redirected...');

      // Dynamic Routing Based on Role
     this.router.navigate(['/general-homepage']);
    },
    error: (err) => { 
      this.errorMessage = err.error?.non_field_errors?.[0] || 'Invalid username or password';
      this.isLoading = false;
      
      // Use iziToast for error notification (more attention-grabbing)
      this.notification.error(
        'Login Failed', 
        this.errorMessage
      );
      
      // Optional: Use Material Snackbar for additional error details
      this.notification.error('Please try again');
    },
    complete: () => {
      this.isLoading = false;
    }
  });
}



updateTime() {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    this.currentTime = `${hours}:${minutes}`;
  }


   startTyping() {
    this.intervalId = setInterval(() => {
      if (this.currentIndex < this.fullText.length) {
        this.displayedText += this.fullText[this.currentIndex];
        this.currentIndex++;
      } else {
        clearInterval(this.intervalId); // Stop when complete
      }
    }, 150); // Speed: 150ms per letter, you can adjust this
  }

}

