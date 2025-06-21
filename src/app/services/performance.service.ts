

import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, catchError, map, of, shareReplay } from 'rxjs';
import { environment } from '../../environments/environment';


interface PerformanceSummary {
  average_performance: number;
  quarterly_performance: {
    quarter: string;
    average: number;
  }[];
  monthly_performance: {
    month: string;
    performance: number;
  }[];
  daily_performance: {
    date: string;
    day: string;
    performance: number;
  }[];
  // New optional fields
  average_score?: number;
  performance_history?: {
    date: string;
    performance: number;
  }[];
  meta?: {
    year?: number;
    last_n_days?: number;
    current_quarter?: string;
  };
}


interface EvaluationScore {
  qtr_score: number;
  score_history: {
    date: string;
    score: number;
  }[];
}

interface RegisterScore {
  qtr_score: number;
  score_history: {
    date: string;
    score: number;
  }[];
}



export interface MonthlySummary {
  month: string;
  sales: number;
  target: number;
  percentage: number;
  growth: number;
}

export interface CaptainPerformance {
  captain: string;
  raw_score: number;
  target: number;
  performance: number;
}

export interface CurrentMonthSummary {
  raw_score: number;
  target: number;
  performance: number;
}

export interface FuelSalesSummary {
  current_month_summary: CurrentMonthSummary;
  captain_performance: CaptainPerformance[];
  monthly_summary: MonthlySummary[];
}


@Injectable({
  providedIn: 'root'
})
export class PerformanceService {
  private apiUrl = `${environment.apiUrl}`;
  private cache = new Map<string, Observable<any>>();

  constructor(private http: HttpClient) { }

  // Main method to get performance summary
  getPerformanceSummary(userId?: number, filters?: { year?: number, lastNDays?: number }): Observable<PerformanceSummary> {
    const cacheKey = `summary_${userId || 'current'}_${filters?.year || 'default'}_${filters?.lastNDays || 30}`;
    
    if (!this.cache.has(cacheKey)) {
      let params = new HttpParams();
      if (filters?.year) params = params.set('year', filters.year.toString());
      if (filters?.lastNDays) params = params.set('last_n_days', filters.lastNDays.toString());

      const url = userId 
        ? `${this.apiUrl}/fuel-performance-summary/${userId}/`
        : `${this.apiUrl}/fuel-performance-summary/`;

         console.log(userId)

      const request = this.http.get<PerformanceSummary>(url, { params }).pipe(
        catchError(error => {
          console.error('Error loading performance summary:', error);
          return of(this.getEmptyPerformanceSummary());
        }),
        shareReplay(1) // Cache the result
      );

      this.cache.set(cacheKey, request);
    }

    return this.cache.get(cacheKey)!;
  }


   // Get user evaluation score
  getEvaluationScore(userId?: number): Observable<EvaluationScore> {
    const url = userId
  
      ? `${this.apiUrl}/evaluation-summary/${userId}/`
      : `${this.apiUrl}/evaluation-summary/`;

      console.log(userId)

    return this.http.get<EvaluationScore>(url).pipe(
      catchError(error => {
        console.error('Error loading ranking data:', error);
        return of({
          qtr_score: 0,
          score_history: []
        });
      })
    );
  }



  // Get user attendance_puntuality score
  getRegisterScore(userId?: number): Observable<RegisterScore> {
    const url = userId
  
      ? `${this.apiUrl}/attendance-summary/${userId}/`
      : `${this.apiUrl}/attendance-summary/`;

      console.log(userId)

    return this.http.get<RegisterScore>(url).pipe(
      catchError(error => {
        console.error('Error loading Register data:', error);
        return of({
          qtr_score: 0,
          score_history: []
        });
      })
    );
  }


  // Clear cache (useful when you know data has changed)
  clearCache(): void {
    this.cache.clear();
  }

//get fuel user performance summary
  private getEmptyPerformanceSummary(): PerformanceSummary {
  return {
    average_performance: 0,
    quarterly_performance: [],
    monthly_performance: [],
    daily_performance: [],
    meta: {
      year: new Date().getFullYear(),
      last_n_days: 30,
      current_quarter: `Q${Math.floor(new Date().getMonth() / 3) + 1}`
    }
  };
}




// Get all fuelslaes for site and captian scores
getAllFuelSalesSummary(params: any): Observable<any> {
  return this.http.get(`${this.apiUrl}/fuel-sales-summary/`, { params: params });
}


// Get all fuelslaes for site and captian scores
getAllShopSalesSummary(params: any): Observable<any> {
  return this.http.get(`${this.apiUrl}/shop-sales-summary/`, { params: params });
}


}