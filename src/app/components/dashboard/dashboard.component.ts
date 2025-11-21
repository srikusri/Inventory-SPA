import { Component, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseChartDirective } from 'ng2-charts';
import { ChartConfiguration, ChartData, ChartType } from 'chart.js';
import { SalesHistoryService } from '../../services/sales-history.service';
import { CurrencyFormatPipe } from '../../pipes/currency-format.pipe';

@Component({
    selector: 'app-dashboard',
    standalone: true,
    imports: [CommonModule, BaseChartDirective, CurrencyFormatPipe],
    template: `
    <div class="dashboard-container">
      <div class="header">
        <h1>📊 Manager's Office</h1>
        <p>Track your store's success!</p>
      </div>

      <div class="stats-grid">
        <div class="stat-card">
          <div class="icon">💰</div>
          <div class="info">
            <div class="label">Total Sales</div>
            <div class="value">{{ salesService.getTotalSales() | currencyFormat }}</div>
          </div>
        </div>
        <div class="stat-card">
          <div class="icon">🧾</div>
          <div class="info">
            <div class="label">Transactions</div>
            <div class="value">{{ salesService.getTotalTransactions() }}</div>
          </div>
        </div>
        <div class="stat-card">
          <div class="icon">📅</div>
          <div class="info">
            <div class="label">Today's Sales</div>
            <div class="value">{{ todaySalesTotal() | currencyFormat }}</div>
          </div>
        </div>
      </div>

      <div class="charts-grid">
        <div class="chart-card">
          <h3>Sales Trend (Last 7 Days)</h3>
          <div class="chart-wrapper">
            <canvas baseChart
              [data]="salesTrendData"
              [options]="lineChartOptions"
              [type]="'line'">
            </canvas>
          </div>
        </div>

        <div class="chart-card">
          <h3>Top Selling Items</h3>
          <div class="chart-wrapper">
            <canvas baseChart
              [data]="topItemsData"
              [options]="barChartOptions"
              [type]="'bar'">
            </canvas>
          </div>
        </div>
      </div>
    </div>
  `,
    styles: [`
    .dashboard-container {
      padding: 2rem;
      max-width: 1200px;
      margin: 0 auto;
    }

    .header {
      margin-bottom: 2rem;
      text-align: center;
    }

    .header h1 {
      font-size: 2.5rem;
      margin-bottom: 0.5rem;
      color: #2d3436;
    }

    .stats-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 1.5rem;
      margin-bottom: 2rem;
    }

    .stat-card {
      background: white;
      padding: 1.5rem;
      border-radius: 16px;
      box-shadow: 0 4px 12px rgba(0,0,0,0.05);
      display: flex;
      align-items: center;
      gap: 1.5rem;
      transition: transform 0.2s;
    }

    .stat-card:hover {
      transform: translateY(-4px);
    }

    .icon {
      font-size: 3rem;
      background: #f8f9fa;
      width: 80px;
      height: 80px;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 50%;
    }

    .info .label {
      color: #636e72;
      font-size: 0.9rem;
      margin-bottom: 0.25rem;
    }

    .info .value {
      font-size: 1.75rem;
      font-weight: 700;
      color: #2d3436;
    }

    .charts-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
      gap: 2rem;
    }

    .chart-card {
      background: white;
      padding: 1.5rem;
      border-radius: 16px;
      box-shadow: 0 4px 12px rgba(0,0,0,0.05);
    }

    .chart-card h3 {
      margin-bottom: 1.5rem;
      color: #2d3436;
      font-size: 1.25rem;
    }

    .chart-wrapper {
      height: 300px;
    }
  `]
})
export class DashboardComponent {
    todaySalesTotal = computed(() => {
        return this.salesService.getSalesToday().reduce((sum, sale) => sum + sale.total, 0);
    });

    public lineChartOptions: ChartConfiguration['options'] = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: { display: false }
        },
        scales: {
            y: { beginAtZero: true }
        }
    };

    public barChartOptions: ChartConfiguration['options'] = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: { display: false }
        },
        scales: {
            y: { beginAtZero: true }
        }
    };

    public salesTrendData: ChartData<'line'> = {
        labels: [],
        datasets: [
            {
                data: [],
                label: 'Sales',
                borderColor: '#6c5ce7',
                backgroundColor: 'rgba(108, 92, 231, 0.2)',
                fill: true,
                tension: 0.4
            }
        ]
    };

    public topItemsData: ChartData<'bar'> = {
        labels: [],
        datasets: [
            {
                data: [],
                label: 'Quantity Sold',
                backgroundColor: [
                    '#ff7675', '#74b9ff', '#55efc4', '#ffeaa7', '#a29bfe'
                ],
                borderRadius: 8
            }
        ]
    };

    constructor(public salesService: SalesHistoryService) {
        this.initCharts();
    }

    private initCharts(): void {
        // Prepare Sales Trend Data (Last 7 days)
        const last7Days = Array.from({ length: 7 }, (_, i) => {
            const d = new Date();
            d.setDate(d.getDate() - (6 - i));
            return d;
        });

        const salesByDate = new Map<string, number>();
        this.salesService.getSalesThisWeek().forEach(sale => {
            const dateStr = new Date(sale.timestamp).toLocaleDateString();
            salesByDate.set(dateStr, (salesByDate.get(dateStr) || 0) + sale.total);
        });

        this.salesTrendData.labels = last7Days.map(d => d.toLocaleDateString(undefined, { weekday: 'short' }));
        this.salesTrendData.datasets[0].data = last7Days.map(d =>
            salesByDate.get(d.toLocaleDateString()) || 0
        );

        // Prepare Top Items Data
        const itemCounts = new Map<string, number>();
        this.salesService.salesHistory().forEach(sale => {
            sale.items.forEach(item => {
                itemCounts.set(item.item.name, (itemCounts.get(item.item.name) || 0) + item.quantity);
            });
        });

        const sortedItems = [...itemCounts.entries()]
            .sort((a, b) => b[1] - a[1])
            .slice(0, 5);

        this.topItemsData.labels = sortedItems.map(i => i[0]);
        this.topItemsData.datasets[0].data = sortedItems.map(i => i[1]);
    }
}
