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
  selector: 'app-cap-dashboard',
  standalone: false,
  templateUrl: './cap-dashboard.component.html',
  styleUrl: './cap-dashboard.component.css'
})


export class CapDashboardComponent implements OnInit {

  // Dashboard Data
  fuelSummaryData: any;
  shopSummaryData: any;
  loading = true;
  selectedYear = new Date().getFullYear();
  availableYears: number[] = [];
  activeDashboard: string = 'fuel';  // default view

  // Chart Config
  public barChartData: ChartConfiguration<'bar'>['data'] = {
    labels: [],
    datasets: [{
      data: [],
      label: 'Monthly Sales Performance',
      backgroundColor: '#4e73df',
      borderColor: '#1e3a8a',
      borderWidth: 1
    }]
  };

  public barChartOptions: ChartConfiguration<'bar'>['options'] = {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true,
        type: 'linear',
        max: 100,
        ticks: {
          callback: (value) => `${value}%`
        }
      },
      x: { type: 'category' }
    },
    plugins: {
      tooltip: {
        callbacks: {
          label: (context) => `${context.dataset.label}: ${context.parsed.y}%`
        }
      },
      legend: { display: false }
    }
  };


  //shop char config
  // Shop Chart Config
public shopBarChartData: ChartConfiguration<'bar'>['data'] = {
  labels: [],
  datasets: [{
    data: [],
    label: 'Monthly Shop Sales Performance',
    backgroundColor: '#4e73df',
    borderColor: '#1e3a8a',
    borderWidth: 1
  }]
};

public shopBarChartOptions: ChartConfiguration<'bar'>['options'] = {
  responsive: true,
  scales: {
    y: {
      beginAtZero: true,
      type: 'linear',
      max: 100,
      ticks: {
        callback: (value) => `${value}%`
      }
    },
    x: { type: 'category' }
  },
  plugins: {
    tooltip: {
      callbacks: {
        label: (context) => `${context.dataset.label}: ${context.parsed.y}%`
      }
    },
    legend: { display: false }
  }
};


  public barChartType: ChartConfiguration<'bar'>['type'] = 'bar';
  public shopBarChartType: ChartConfiguration<'bar'>['type'] = 'bar';


  constructor(private performanceService: PerformanceService) {}
  private authService = inject(AuthService);

  ngOnInit(): void {
    this.initializeYears();
    this.loadFuelSalesSummary();
    this.loadShopSalesSummary();
  }

  initializeYears(): void {
    const currentYear = new Date().getFullYear();
    this.availableYears = Array.from({ length: 5 }, (_, i) => currentYear - i);
  }

  loadFuelSalesSummary(): void {
    this.loading = true;
    const params = { year: this.selectedYear };

    this.performanceService.getAllFuelSalesSummary(params).subscribe({
      next: (data) => {
        console.log('Fuel Sales Summary:', data);
        this.fuelSummaryData = data;
        this.updateChartData(data.monthly_summary);
        this.loading = false;
      },
      error: (err) => {
        console.error('Error loading fuel sales summary:', err);
        this.loading = false;
      }
    });
  }



   loadShopSalesSummary(): void {
    this.loading = true;
    const params = { year: this.selectedYear };

    this.performanceService.getAllShopSalesSummary(params).subscribe({
      next: (data) => {
        console.log('Shop Sales Summary:', data);
        this.shopSummaryData = data;
        this.updateChartDataShop(data.monthly_summary);
        this.loading = false;
      },
      error: (err) => {
        console.error('Error loading shop sales summary:', err);
        this.loading = false;
      }
    });
  }


  updateChartData(monthlyData: any[]): void {
    this.barChartData = {
      labels: monthlyData.map(item => item.month),
      datasets: [{
        data: monthlyData.map(item => item.percentage),
        label: 'Monthly Sales Performance',
        backgroundColor: '#4e73df',
        borderColor: '#1e3a8a',
        borderWidth: 1
      }]
    };
  }


  updateChartDataShop(monthlyData: any[]): void {
    this.shopBarChartData = {
      labels: monthlyData.map(item => item.month),
      datasets: [{
        data: monthlyData.map(item => item.percentage),
        label: 'Monthly Sales Performance',
        backgroundColor: '#4e73df',
        borderColor: '#1e3a8a',
        borderWidth: 1
      }]
    };
  }

  onYearChange(): void {
    this.loadFuelSalesSummary();
  }


  onYearChangeShop(): void {
    this.loadShopSalesSummary();
  }

  getCurrentPerformance(): number {
    if (!this.fuelSummaryData?.current_performance) return 0;

    return Math.round(this.fuelSummaryData.current_performance.performance * 100) / 100;
  }


   getCurrentPerformanceShop(): number {
    if (!this.shopSummaryData?.current_performance) return 0;

    return Math.round(this.shopSummaryData.current_performance.performance * 100) / 100;
  }

  // Monthly performance score
  getMonthlyPerformance(): number {
    return this.fuelSummaryData?.current_performance?.performance || 0;
  }

  // Captain 1 score
  getCaptain1Performance(): number {
    return this.fuelSummaryData.captain_performance[0]?.performance  || 0;
  }


  getCaptain1Target(): number {
    return this.fuelSummaryData.captain_performance[0]?.target /2  || 0;
  }


  getCaptain1Name(): string {
    return this.fuelSummaryData.captain_performance[0]?.captain || "" 
  }


  getCaptain2Name(): string {
    return this.fuelSummaryData.captain_performance[1]?.captain || "" 
  }
  // Captain 2 score
  getCaptain2Performance(): number {
    return this.fuelSummaryData.captain_performance[1]?.performance  || 0;
  }

  getCaptain2Target(): number {
    return this.fuelSummaryData.captain_performance[1]?.target/2  || 0;
  }

 getCaptain1RawScore(): number {
    return this.fuelSummaryData.captain_performance[0]?.raw_score || 0;
  }

 getCaptain2RawScore(): number {
    return this.fuelSummaryData.captain_performance[1]?.raw_score || 0;
  }


  switchDashboard(dashboard: string): void {
  this.activeDashboard = dashboard;
  // You can trigger any logic or router navigation here
}

// shop functions
// Monthly performance score
getMonthlyPerformanceShop(): number {
  return this.shopSummaryData?.current_performance?.performance || 0;
}

// Captain 1 score
getCaptain1PerformanceShop(): number {
  return this.shopSummaryData.captain_performance[0]?.performance || 0;
}

getCaptain1TargetShop(): number {
  return this.shopSummaryData.captain_performance[0]?.target  || 0;
}

getCaptain1NameShop(): string {
  return this.shopSummaryData.captain_performance[0]?.captain || "";
}

getCaptain2NameShop(): string {
  return this.shopSummaryData.captain_performance[1]?.captain || "";
}

// Captain 2 score
getCaptain2PerformanceShop(): number {
  return this.shopSummaryData.captain_performance[1]?.performance || 0;
}

getCaptain2TargetShop(): number {
  return this.shopSummaryData.captain_performance[1]?.target || 0;
}

getCaptain1RawScoreShop(): number {
  return this.shopSummaryData.captain_performance[0]?.raw_score || 0;
}

getCaptain2RawScoreShop(): number {
  return this.shopSummaryData.captain_performance[1]?.raw_score || 0;
}



}