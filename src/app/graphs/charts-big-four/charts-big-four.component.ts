import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Chart, ChartConfiguration, ChartEvent, ChartType } from 'chart.js';
import { BaseChartDirective,  } from 'ng2-charts';
import { default as Annotation } from 'chartjs-plugin-annotation';
import { HttpClient } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { CreateElementMeasurement  } from '../../model';
import { ElementMeasurementsService } from '../../shared/element-measurements.service';

@Component({
  selector: 'app-charts-big-four',
  templateUrl: './charts-big-four.component.html',
  styleUrls: ['./charts-big-four.component.scss']
})
export class ChartsBigFourComponent implements OnInit {
  private newLabel? = 'New label';

  constructor(
    private http: HttpClient,
    private elementMeasurementService: ElementMeasurementsService
    ) {
    Chart.register(Annotation)
  }

  // WILL NEED MODAL
  ngOnInit() {
    // Replace '1' with the user ID you want to fetch data for
    this.elementMeasurementService.getElementMeasurements(1).subscribe(
      (measurements) => {
        this.processMeasurements(measurements);
      },
      (error) => {
        console.error('Error fetching element measurements:', error);
      }
    );
  }

  processMeasurements(measurements: CreateElementMeasurement[]) {
    const salinityData: number[] = [];
    const calciumData: number[] = [];
    const alkilinityData: number[] = [];
    const magnesiumData: number[] = [];

    measurements.forEach((measurement) => {
      if (measurement.reef_water_element_id === 1) {
        salinityData.push(measurement.qt);
      } else if (measurement.reef_water_element_id === 2) {
        calciumData.push(measurement.qt);
      } else if (measurement.reef_water_element_id === 3) {
        alkilinityData.push(measurement.qt);
      } else if (measurement.reef_water_element_id === 4) {
        magnesiumData.push(measurement.qt);
      }
    });

    this.lineChartData[0].data = salinityData;
    this.lineChartData[1].data = calciumData;
    this.lineChartData[1].data = alkilinityData;
    this.lineChartData[1].data = magnesiumData;
  }

  public lineChartData: ChartConfiguration['data'] = {
    datasets: [
      {
        data: [],
        label: 'Salinity',
        // yAxisID: 'y2',
        borderColor: 'rgba(148,159,177,1)',
        pointBackgroundColor: 'rgba(148,159,177,1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(148,159,177,0.8)',

      },
      {
        data: [],
        label: 'Calcium',

        borderColor: 'rgba(77,83,96,1)',
        pointBackgroundColor: 'rgba(77,83,96,1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(77,83,96,1)',

      },
      {
        data: [],
        label: 'Alkilinity',
        // yAxisID: 'y2',
        borderColor: 'red',
        pointBackgroundColor: 'rgba(148,159,177,1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(148,159,177,0.8)',

      },
      {
        data: [],                                       // An array of numerical data points for the chart
        label: 'Magnesium',                             // Label for this dataset, used in tooltips and the legend
        yAxisID: 'y1',                                  // Associates this dataset with a specific Y-axis in the chart
        borderColor: 'blue',                            // Color of the line that connects data points in the chart
        pointBackgroundColor: 'rgba(148,159,177,1)',    // Background color of the data points; in this case, a solid grayish-blue color
        pointBorderColor: '#fff',                       // Border color of the data points; in this case, white
        pointHoverBackgroundColor: '#fff',              // Background color of data points when hovered over; in this case, white
        pointHoverBorderColor: 'rgba(148,159,177,0.8)', // Border color of data points when hovered over; in this case, a semi-transparent grayish-blue color
      },
    ],
    labels: [ 'January', 'February', 'March', 'April', 'May', 'June', 'July' ]
  };
 public lineChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    maintainAspectRatio: true, // You can set this to true if you want to maintain the aspect ratio while resizing
    elements: {
      line: {
        tension: 0.5
      }
    },
    scales: {
      // We use this empty structure as a placeholder for dynamic theming.
      y:
        {
          position: 'left',
        },
      y1: {
        position: 'right',
        grid: {
          color: 'rgba(255,0,0,0.3)',
        },
        ticks: {
          color: 'red'
        }
      },
      // y2: {
      //   position: 'right',
      //   grid: {
      //     color: 'rgba(255,0,0,0.3)',
      //   },
      //   ticks: {
      //     color: 'blue'
      //   }
      // }
    },

    plugins: {
      legend: { display: true },
      annotation: {
        annotations: [
          {
            type: 'line',
            scaleID: 'x',
            value: 'March',
            borderColor: 'orange',
            borderWidth: 2,
            label: {
              display: true,
              position: 'center',
              color: 'orange',
              content: 'LineAnno',
              font: {
                weight: 'bold'
              }
            }
          },
        ],
      }
    }
  };

  public lineChartType: ChartType = 'line';

  @ViewChild(BaseChartDirective) chart?: BaseChartDirective;

  // private static generateNumber(i: number): number {
  //   return Math.floor((Math.random() * (i < 2 ? 100 : 1000)) + 1);
  // }


  // events
  public chartClicked({ event, active }: { event?: ChartEvent, active?: {}[] }): void {
    console.log(event, active);
  }

  public chartHovered({ event, active }: { event?: ChartEvent, active?: {}[] }): void {
    console.log(event, active);
  }

//Hides acording to index value
  public hideOne(): void {
    console.log(this.chart)
    const isHidden = this.chart?.isDatasetHidden(1);
    this.chart?.hideDataset(1, !isHidden);
    this.chart?.hideDataset(3, !isHidden);
    console.log(this.chart)
  }


}
