// weeklyevaluation.component.ts

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { Router } from '@angular/router';
import { NotificationService } from '../../services/notification.service';

@Component({
  standalone: false,
  selector: 'app-weeklyevaluation',
  templateUrl: './weeklyevaluation.component.html',
  styleUrls: ['./weeklyevaluation.component.css']
})


export class WeeklyevaluationComponent implements OnInit {
  
  evaluationForm!: FormGroup;
  attendants: any[] = [];

  constructor(
    private fb: FormBuilder,
    private apiService: ApiService,
    private router: Router,
    private notification: NotificationService
  ) {}

  ngOnInit(): void {

    //oninit config your form
    this.evaluationForm = this.fb.group({
      evaluations: this.fb.array([])
    });

    this.loadAttendants();
  }

  loadAttendants(): void {
    this.apiService.getActiveAttendants().subscribe({
      next: (attendants: any[]) => {
        this.attendants = attendants;
        const evaluationsArray = this.evaluationForm.get('evaluations') as FormArray;

        attendants.forEach(attendant => {
          evaluationsArray.push(this.fb.group({
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

  get evaluations(): FormArray {
    return this.evaluationForm.get('evaluations') as FormArray;
  }

  onSubmit(): void {
    if (this.evaluationForm.valid) {
     const payload = { evaluations: this.evaluationForm.value.evaluations };
      console.log('Submitting payload:', payload);

      this.apiService.submitBulkEvaluation(payload).subscribe({
        next: (response) => {
          this.notification.success('Evaluations submitted successfully!');
          this.evaluationForm.reset();
          this.router.navigate(['/evaluations']);
        },
        error: (err) => {
          console.error('Error submitting evaluations:', err);
          this.notification.error('Submission failed. Please try again.');
        }
      });
    }
  }
}
