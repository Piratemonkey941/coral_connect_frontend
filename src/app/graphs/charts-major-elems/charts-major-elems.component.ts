import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Chart, ChartConfiguration, ChartEvent, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { default as Annotation } from 'chartjs-plugin-annotation';
import {  ElementMeasurement } from '../../model';
import { ElementMeasurementsService } from '../../shared/element-measurements.service';
import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-charts-major-elems',
  templateUrl: './charts-major-elems.component.html',
  styleUrls: ['./charts-major-elems.component.scss'],
  providers: [DatePipe]
})
export class ChartsMajorElemsComponent implements OnInit {
  private newLabel? = 'New label';

  constructor(
    private http: HttpClient,
    private elementMeasurementService: ElementMeasurementsService,
    private datePipe: DatePipe
    ) {
    Chart.register(Annotation)
  }

  // WILL NEED MODAL
  ngOnInit() {
    this.elementMeasurementService.getElementMeasurements().subscribe(
      (measurements: ElementMeasurement[]) => {
        this.processMeasurements(measurements);
      },
      (error) => {
        console.error('Error fetching element measurements:', error);
      }
    );
  }

  @ViewChild(BaseChartDirective, { static: false }) chart?: BaseChartDirective;

 processMeasurements(measurements: ElementMeasurement[]) {
  const boronData: number[] = [];
  const bromideData: number[] = [];
  const potassiumData: number[] = [];
  const strontiumData: number[] = [];
  const sulfateData: number[] = [];
  const labels: string[] = [];

  measurements.forEach((measurement, index) => {
    if (measurement.reef_water_element_id === 5) {
      boronData.push(measurement.qt);
    } else if (measurement.reef_water_element_id === 6) {
      bromideData.push(measurement.qt);
    } else if (measurement.reef_water_element_id === 7) {
      potassiumData.push(measurement.qt);
    } else if (measurement.reef_water_element_id === 8) {
      strontiumData.push(measurement.qt);
    } else if (measurement.reef_water_element_id === 9) {
      sulfateData.push(measurement.qt);
    }

    // Assuming the measurements are sorted by date
    const formattedDate = this.datePipe.transform(measurement.created_at, 'MMM dd h:mm a');
    labels.push(formattedDate || measurement.created_at.toString());

    // Assuming the measurements are sorted by date
    // labels.push(measurement.created_at.toString());
  });

  this.lineChartData.labels = labels;
  this.lineChartData.datasets[0].data = boronData;
  this.lineChartData.datasets[1].data = bromideData;
  this.lineChartData.datasets[2].data = potassiumData;
  this.lineChartData.datasets[3].data = strontiumData;
  this.lineChartData.datasets[4].data = sulfateData;

   // Update the chart with the new data
   this.chart?.update();
}

  public lineChartData: ChartConfiguration['data'] = {
    datasets: [
      {
        data: [],
        label: 'Boron',
        // yAxisID: 'y2',
        borderColor: 'rgba(148,159,177,1)',
        pointBackgroundColor: 'rgba(148,159,177,1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(148,159,177,0.8)',

      },
      {
        data: [],
        label: 'Bromide',

        borderColor: 'rgba(77,83,96,1)',
        pointBackgroundColor: 'rgba(77,83,96,1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(77,83,96,1)',

      },
      {
        data: [],
        label: 'Potassium',
        // yAxisID: 'y2',
        borderColor: 'red',
        pointBackgroundColor: 'rgba(148,159,177,1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(148,159,177,0.8)',

      },
      {
        data: [], // An array of numerical data points for the chart
        label: 'Strontium',                                 // Label for this dataset, used in tooltips and the legend
        yAxisID: 'y1',                                      // Associates this dataset with a specific Y-axis in the chart
        borderColor: 'blue',                                // Color of the line that connects data points in the chart
        pointBackgroundColor: 'rgba(148,159,177,1)',        // Background color of the data points; in this case, a solid grayish-blue color
        pointBorderColor: '#fff',                           // Border color of the data points; in this case, white
        pointHoverBackgroundColor: '#fff',                  // Background color of data points when hovered over; in this case, white
        pointHoverBorderColor: 'rgba(148,159,177,0.8)',     // Border color of data points when hovered over; in this case, a semi-transparent grayish-blue color
      },
      {
        data: [],
        label: 'Sulfate ',
        // yAxisID: 'y2',
        borderColor: 'magenta',
        pointBackgroundColor: 'rgba(148,159,177,1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(148,159,177,0.8)',

      },
    ],
    labels: []
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


  // events
  public chartClicked({ event, active }: { event?: ChartEvent, active?: {}[] }): void {
    console.log(event, active);
  }

  public chartHovered({ event, active }: { event?: ChartEvent, active?: {}[] }): void {
    console.log(event, active);
  }


//Hides acording to index value
  public hideOne(): void {
    const isHidden2 = this.chart?.isDatasetHidden(2);
    const isHidden4 = this.chart?.isDatasetHidden(4);
    // const isHidden = this.chart?.isDatasetHidden();
    this.chart?.hideDataset(2, !isHidden2);
    this.chart?.hideDataset(4, !isHidden4);
  }


}

// @ViewChild(BaseChartDirective) chart?: BaseChartDirective;

  // private static generateNumber(i: number): number {
  //   return Math.floor((Math.random() * (i < 2 ? 100 : 1000)) + 1);
  // }

//   //Hides acording to index value
// public hideOne(): void {
//   console.log('Datasets:', this.chart?.data.datasets);
//   const isHidden = this.chart?.isDatasetHidden(5);
//   console.log('isHidden:', isHidden);
//   this.chart?.hideDataset(5, !isHidden);
// }
