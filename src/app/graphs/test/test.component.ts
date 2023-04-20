import { Component, OnInit, ElementRef, ViewChild, Input } from '@angular/core';
import { Chart, ChartConfiguration, ChartEvent, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { default as Annotation } from 'chartjs-plugin-annotation';
import { HttpClient } from '@angular/common/http';
import { ElementMeasurement } from '../../model';
import { ElementMeasurementsService } from '../../shared/element-measurements.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss'],
  providers: [DatePipe]

})
export class TestComponent implements OnInit {
  @Input() config?: ChartConfiguration;

  constructor(
    private http: HttpClient,
    private elementMeasurementService: ElementMeasurementsService,
    private datePipe: DatePipe
  ) {
    Chart.register(Annotation);
  }

  ngOnInit() {
    if (!this.config) {
      this.config = this.sampleChartConfig();
    }

    this.lineChartData = this.config.data;
    this.lineChartOptions = this.config.options;
    this.lineChartType = this.config.type as ChartType;
  }

  @ViewChild(BaseChartDirective, { static: false }) chart?: BaseChartDirective;

  public lineChartData: ChartConfiguration['data'] = {
    datasets: [],
    labels: [],
  };

  public lineChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    maintainAspectRatio: true,
    elements: {
      line: {
        tension: 0.5,
      },
    },
    scales: {},
    plugins: {
      legend: { display: true },
      annotation: {},
    },
  };

  public lineChartType: ChartType = 'line';

  public chartClicked({ event, active }: { event?: ChartEvent; active?: {}[] }): void {
    // console.log(event, active);
  }

  public chartHovered({ event, active }: { event?: ChartEvent; active?: {}[] }): void {
    // console.log(event, active);
  }

  private sampleChartConfig(): ChartConfiguration {
    return {
      type: 'line',
      data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        datasets: [
          {
            label: 'Dataset 1',
            data: [65, 59, 80, 81, 56, 55, 40, 35, 48, 67, 74, 88],
            borderColor: 'rgba(75,192,192,1)',
            fill: false,
          },
          {
            label: 'Dataset 2',
            data: [28, 48, 40, 19, 86, 27, 90, 82, 52, 45, 60, 30],
            borderColor: 'rgba(255,99,132,1)',
            fill: false,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: true,
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    };
  }
}
