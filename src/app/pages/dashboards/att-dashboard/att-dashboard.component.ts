import { Component, OnInit, inject } from '@angular/core';
import { PerformanceService } from '../../../services/performance.service';
import { ChartConfiguration, ChartOptions } from 'chart.js';
import { AuthService } from '../../../services/auth.service';


import { 
  Chart, 
  LinearScale,
  CategoryScale,
  BarController,
  BarElement,
  Tooltip,
  Legend
} from 'chart.js';


// Register all required Chart.js components
Chart.register(
  LinearScale,
  CategoryScale,
  BarController,
  BarElement,
  Tooltip,
  Legend
);

@Component({
  selector: 'app-att-dashboard',
  standalone: false,
  templateUrl: './att-dashboard.component.html',
  styleUrl: './att-dashboard.component.css'
 
})

export class AttDashboardComponent {

  // Dashboard Data
  performanceData: any;
  evaluationData:any;
  registerData:any;
  loading = true;
  showAllQuarters = false;
  showQmScores=false;
  selectedYear = new Date().getFullYear();
  availableYears: number[] = [];
  currentYear: number = new Date().getFullYear();
  user:any;
  
  // Chart Config start
    public barChartData: ChartConfiguration<'bar'>['data'] = {
      labels: [],
      datasets: [{
        data: [],
        label: 'Daily Performance',
        backgroundColor: '#4e73df',
        borderColor: '#1e3a8a',
        borderWidth: 1
      }]
    };

    // public showAllQuarters = false;

    public barChartOptions: ChartConfiguration<'bar'>['options'] = {
      responsive: true,
      scales: {
        y: {
          beginAtZero: true,
          type: 'linear',  // Explicitly specify scale type
          max: 100,
          ticks: {
            callback: (value) => `${value}%`
          }
        },
         x: {
        type: 'category'  // Explicitly specify scale type
      }
      },
      plugins: {
        tooltip: {
          callbacks: {
            label: (context) => `${context.dataset.label}: ${context.parsed.y}%`
          }
        },
        legend: {
          display: false // Hide legend if not needed
        }
      }
    };

    public barChartType: ChartConfiguration<'bar'>['type'] = 'bar';
  //chart config end

  constructor(private performanceService: PerformanceService) {}
  private authService = inject(AuthService);


  ngOnInit(): void {
    this.initializeYears();
    this.loadPerformanceData();
    this.loadEvaluationData();
    this.loadRegisterData();
  }

  initializeYears(): void {
    const currentYear = new Date().getFullYear();
    this.availableYears = Array.from({length: 5}, (_, i) => currentYear - i);
  }

  loadPerformanceData(): void {
    this.loading = true;
    const user = this.authService.getUser().usid;
    this.performanceService.getPerformanceSummary(user, { 
      year: this.selectedYear 
    }).subscribe({
      next: (data) => {

        //console.log(data.daily_performance)
        console.log(data)

        this.performanceData = data;
        this.updateChartData(data.daily_performance);
        this.loading = false;
      },
      error: (err) => {
        console.error('Error loading data:', err);
        this.loading = false;
      }
    });
  }


 //load Evalution scores
  loadEvaluationData(): void {
    this.loading = true;
    const user = this.authService.getUser().usid;
    this.performanceService.getEvaluationScore(user,).subscribe({
      next: (data) => {

      console.log(data)

      this.evaluationData = data;
      this.loading = false;
    },
      error: (err) => {
        console.error('Error loading data:', err);
        this.loading = false;
      }
    });
  }


  //load Evalution scores
  loadRegisterData(): void {
    this.loading = true;
    const user = this.authService.getUser().usid;
    this.performanceService.getRegisterScore(user,).subscribe({
      next: (data) => {

      console.log(data)

      this.registerData = data;
      this.loading = false;
    },
      error: (err) => {
        console.error('Error loading data:', err);
        this.loading = false;
      }
    });
  }


  updateChartData(dailyData: any[]): void {
    this.barChartData = {
      labels: dailyData.map(item => item.day),
      datasets: [{
        data: dailyData.map(item => item.performance),
        label: 'Daily Performance trend',
        backgroundColor: '#4e73df',
        borderColor: '#1e3a8a',
        borderWidth: 1
      }]
    };
  }

  toggleQuarters(): void {
    this.showAllQuarters = !this.showAllQuarters;
  }

  toggleScores(): void {
    this.showQmScores = !this.showQmScores;
  }

  onYearChange(): void {
    this.loadPerformanceData();
  }

    getCurrentQuarterPerformance(): number {
    if (!this.performanceData?.quarterly_performance) return 0;
    
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth() + 1;
    const currentQuarter = Math.ceil(currentMonth / 3);
    
    const quarter = this.performanceData.quarterly_performance
      .find((q: any) => q.quarter === `Q${currentQuarter}`);
      
    return quarter ? quarter.average : 0;
  }

  getTotalScore(): number | null {
  if (this.performanceData && this.evaluationData && this.registerData) {
    const performance = this.performanceData.average_performance || 0;
    const evaluation = this.evaluationData.qtr_score || 0;
    const register = this.registerData.qtr_score || 0;

    const total = (performance + evaluation + register) / 3;

    return Math.round(total * 100) / 100;  // Rounded to 2 decimal places
  }
  return 0;  // Return null if data isn't fully loaded yet
 }


 
  getTotalRawScore(): number | null {
  if (this.performanceData && this.evaluationData && this.registerData) {
    const performance = this.performanceData.average_performance || 0;
    const evaluation = this.evaluationData.qtr_score || 0;
    const register = this.registerData.qtr_score || 0;

    const total = (performance + evaluation + register);

    return Math.round(total)  // Rounded to 2 decimal places
  }
  return 0;  // Return null if data isn't fully loaded yet
 }
}
