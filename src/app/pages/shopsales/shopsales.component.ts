import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { NotificationService } from '../../services/notification.service';
import { Router } from '@angular/router';
import { ApiService } from '../../services/api.service';
import * as iziToast from 'izitoast';

@Component({
  selector: 'app-shopsales',
  standalone: false,
  templateUrl: './shopsales.component.html',
  styleUrl: './shopsales.component.css'
})


export class ShopSalesComponent implements OnInit {
  shopSalesForm!: FormGroup;
  today: string = new Date().toISOString().split('T')[0];

  captains = [
    { id: 1, name: 'Captain A' },
    { id: 2, name: 'Captain B' }
    // Load actual captains from API in real scenario
  ];

  constructor(
    private fb: FormBuilder,
    private apiService: ApiService,
    private router: Router, 
    private notification: NotificationService
  ) {}

  isSubmitting:boolean = false;

  ngOnInit(): void {
    this.shopSalesForm = this.fb.group({
      captain: ['', Validators.required],
      date: [this.today, Validators.required],
      sales: ['', Validators.required]
    });

    this.loadCaptains()
    this.testToast()
    console.log('testing..izitaost')
  }


  //load captains data
  loadCaptains() {
    this.apiService.getCaptainsShop().subscribe({
      next: (data) => {
        this.captains = data;
      },
      error: (error) => {
        console.error('Error fetching captains:', error);
      }
    });
  }


  testToast() {
iziToast.success({
    title: 'Test',
    message: 'Does this work?',
    position: 'center',
    timeout: 3000,
    transitionIn: 'fadeInDown',
    transitionOut: 'fadeOutUp',
     zindex: 99999, // Explicitly set z-index
  });
}

  confirmSubmission(): void {
  if (this.shopSalesForm.valid) {

    
    // Prevent double submission
  if (this.isSubmitting) return;
  
  this.isSubmitting = true;

    this.apiService.createShopSales(this.shopSalesForm.value).subscribe({
      next: (response) => {
        this.notification.success('Shop sales record created successfully!');
        this.shopSalesForm.reset(); // Reset the form after successful submission
        this.today = new Date().toISOString().split('T')[0];// Reset date to today's date if you’re using it in the form

        this.router.navigate(['general-homepage']);
         this.isSubmitting = false;
      },
      error: (err) => {
        console.error('Error submitting Shop sales record:', err);
        this.notification.error('Failed to create shop sales record. Please try again.');
         this.isSubmitting = false;
      }
    });
  }
}
}
