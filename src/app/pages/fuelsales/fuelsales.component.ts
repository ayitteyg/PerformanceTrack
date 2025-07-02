
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


  isSubmitting: boolean = false;
  
  isFieldInvalid(field: string): boolean {
  const formField = this.fuelSalesForm.get(field);
  return formField ? formField.invalid && (formField.dirty || formField.touched) : false;
}


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

    // Prevent double submission
  if (this.isSubmitting) return;
  
  this.isSubmitting = true;

  if (this.fuelSalesForm.valid) {
    this.apiService.createFuelSales(this.fuelSalesForm.value).subscribe({
      next: (response) => {

      this.notification.success('Record saved successfully!');
      this.isSubmitting = false;
      
      // Reset form if needed
      this.fuelSalesForm.reset();

        //this.today = new Date().toISOString().split('T')[0];// Reset date to today's date if you’re using it in the form
        //this.router.navigate(['/general-homepage']);

      },
      error: (err) => {
        console.error('Error submitting fuel sales record:', err);
        this.notification.error('Failed to save record');
        this.isSubmitting = false;
      }
    });
  }
}

}
