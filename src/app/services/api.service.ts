import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { environment } from '../../environments/environment';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private apiUrl = environment.apiUrl;
 //private apiUrl = 'http://127.0.0.1:8000/api'; // Base URL // Update with your Django API URL

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) { }

  //get all employees
   getEmployees(): Observable<any> {
    return this.http.get(`${this.apiUrl}/employees/`);
  }

   //get all employees
   getCaptains(): Observable<any> {
    return this.http.get(`${this.apiUrl}/captains-pump/`);
  }
  

   getCaptainsShop(): Observable<any> {
    return this.http.get(`${this.apiUrl}/captains-shop/`);
  }


  //get an employee with id
  getEmployee(empId: number): Observable<any> {
  return this.http.get(`${this.apiUrl}/employees/${empId}/`, {
  withCredentials: true
  });
  }

 

  //creating fuel sales
  createFuelSales(fuelSalesData: any): Observable<any> {
  const userId = this.authService.getUserId();
  if (!userId) {
    return throwError(() => new Error('User not authenticated'));
  }
  const payload = {
    user: userId,  // Include the user ID from authService  // 
    date: new Date(fuelSalesData.date).toISOString().split('T')[0],  // Format date
    pump: fuelSalesData.pump,                                        // Pump value
    captain: +fuelSalesData.captain,                                 // Cast to number
    pms_sales: +fuelSalesData.pms_sales,                             // Cast to number
    dx_sales: +fuelSalesData.dx_sales,                               // Cast to number
    vp_sales: +fuelSalesData.vp_sales                                // Cast to number
  };

  console.log('Sending Fuel Sales payload:', payload);

  return this.http.post(`${this.apiUrl}/fuel-sales/`, payload).pipe(
    catchError((error) => {
      console.error('Error creating fuel sales record:', error.error);
      return throwError(() => error);
    })
  );
}



 createShopSales(shopSalesData: any): Observable<any> {
  const userId = this.authService.getUserId();
  if (!userId) {
    return throwError(() => new Error('User not authenticated'));
  }
  const payload = {
    user: userId,  // Include the user ID from authService  // 
    date: new Date(shopSalesData.date).toISOString().split('T')[0],  // Format date
    sales: shopSalesData.sales,                                       // sales value
    captain: +shopSalesData.captain,                                 // Cast to number                            
  };
  console.log('Sending Shop Sales payload:', payload);
  return this.http.post(`${this.apiUrl}/shop-sales/`, payload).pipe(
    catchError((error) => {
      console.error('Error creating shop sales record:', error.error);
      return throwError(() => error);
    })
  );
}


getActiveAttendants(): Observable<any[]> {
  return this.http.get<any[]>(`${this.apiUrl}/active-attendants/`);
}

submitBulkEvaluation(payload: any): Observable<any> {
  return this.http.post(`${this.apiUrl}/weekly-evaluations-post/`, payload);
}

submitRegister(payload: any): Observable<any> {
  return this.http.post(`${this.apiUrl}/daily-attendance-post/`, payload);
}


// get all fuel summaries: getFuelSummaries(): Observable<any
getAllFuelSalesSummary(params: any): Observable<any> {
  return this.http.get(`${this.apiUrl}/fuel-sales-summary/`, { params });
}


}
