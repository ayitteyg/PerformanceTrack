
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { NotificationService } from '../../services/notification.service';
import { ApiService } from '../../services/api.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-fuelsales',
  standalone: false,
  templateUrl: './fuelsales.component.html',
  styleUrl: './fuelsales.component.css'
})
export class FuelsalesComponent implements OnInit {


  constructor(
    private fb: FormBuilder,
    private apiService: ApiService,
    private router: Router, 
    private notification: NotificationService
  ) {}

  searchTerm: string = '';
  fuelSalesForm!: FormGroup;
  pumpSearchControl = new FormControl('');
  showPumpDropdown = false;
  filteredPumps: string[] = [];
  pumps: string[] = ['pump1', 'pump2', 'pump3','pump4']; // Example pump list
  today: string = new Date().toISOString().split('T')[0];
  captains: any[] = [];
  


 ngOnInit() {
  this.fuelSalesForm = this.fb.group({
    pump: ['', Validators.required],
    captain: ['', Validators.required],
    date: [this.today, Validators.required],
    pms_sales: ['', Validators.required],
    dx_sales: ['', Validators.required],
    vp_sales: ['', Validators.required],
  });

  this.loadCaptains();
}

//load captains data
  loadCaptains() {
    this.apiService.getCaptains().subscribe({
      next: (data) => {
        this.captains = data;
      },
      error: (error) => {
        console.error('Error fetching captains:', error);
      }
    });
  }

  // Call this on (input) event in the HTML
  filterPumps() {
    const term = this.searchTerm.trim();
    if (term) {
      this.filteredPumps = this.pumps.filter(pump =>
        pump.toLowerCase().includes(term.toLowerCase())
      );
    } else {
      this.filteredPumps = [...this.pumps]; // Show all when empty
    }
  }

  selectPump(pump: string) {
    this.fuelSalesForm.patchValue({ pump });
    this.pumpSearchControl.setValue(pump);
    this.showPumpDropdown = false;
  }

  hidePumpDropdownWithDelay() {
    setTimeout(() => {
      this.showPumpDropdown = false;
    }, 200);
  }

  get totalSales(): number {
    const { pms_sales, dx_sales, vp_sales } = this.fuelSalesForm.value;
    return (Number(pms_sales) || 0) + (Number(dx_sales) || 0) + (Number(vp_sales) || 0);
  }

  onSubmit() {
    if (this.fuelSalesForm.valid) {
      console.log('Fuel Sales Data:', this.fuelSalesForm.value);
      // You can now post this data to your backend
    }
  }

   confirmSubmission(): void {
  if (this.fuelSalesForm.valid) {
    this.apiService.createFuelSales(this.fuelSalesForm.value).subscribe({
      next: (response) => {
        this.notification.showSuccess('Fuel sales record created successfully!');
        this.fuelSalesForm.reset(); // Reset the form after successful submission

        // Optionally reset the pump input display (if using separate selectedPump variable)
        //this.selectedPump = '';
        this.today = new Date().toISOString().split('T')[0];// Reset date to today's date if you’re using it in the form

        // Optionally navigate if needed
        // this.router.navigate(['/fuel-sales']);
        // Redirect to dashboard after submission
        this.router.navigate(['/att-dashboard']);

      },
      error: (err) => {
        console.error('Error submitting fuel sales record:', err);
        this.notification.showError('Failed to create fuel sales record. Please try again.');
      }
    });
  }
}

}
