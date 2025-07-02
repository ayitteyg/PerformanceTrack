import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { Router } from '@angular/router';
import { NotificationService } from '../../services/notification.service';


@Component({
  selector: 'app-dailyregister',
  standalone: false,
  templateUrl: './dailyregister.component.html',
  styleUrl: './dailyregister.component.css'
})
export class DailyregisterComponent implements OnInit{

  registerForm!: FormGroup;
  attendants: any[] = [];

  constructor(
    private fb: FormBuilder,
    private apiService: ApiService,
    private router: Router,
    private notification: NotificationService
  ) {}

  ngOnInit(): void {

    //oninit config your form
    this.registerForm = this.fb.group({
      register: this.fb.array([])
    });

    this.loadAttendants();
  }

  loadAttendants(): void {
    this.apiService.getActiveAttendants().subscribe({
      next: (attendants: any[]) => {
        this.attendants = attendants;
        const registerArray = this.registerForm.get('register') as FormArray;

        attendants.forEach(attendant => {
          registerArray.push(this.fb.group({
            attendant: [attendant.id, Validators.required],
            raw_score: [0, [Validators.required, Validators.max(7)]]
          }));
        });
      },
      error: (err) => {
        console.error('Error loading attendants:', err);
      }
    });
  }

  get register(): FormArray {
    return this.registerForm.get('register') as FormArray;
  }

  onSubmit(): void {
    if (this.registerForm.valid) {
     const payload = { register: this.registerForm.value.register };
      console.log('Submitting payload:', payload);

      this.apiService.submitRegister(payload).subscribe({
        next: (response) => {
          this.notification.success('Register submitted successfully!');
          this.registerForm.reset();
          this.router.navigate(['/register']);
        },
        error: (err) => {
          console.error('Error submitting register:', err);
          this.notification.error('Submission failed. Please try again.');
        }
      });
    }
  }

}
