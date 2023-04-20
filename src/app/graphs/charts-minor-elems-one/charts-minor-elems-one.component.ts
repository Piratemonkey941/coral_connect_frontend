import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Chart, ChartConfiguration, ChartEvent, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { default as Annotation } from 'chartjs-plugin-annotation';
import {  ElementMeasurement } from '../../model';
import { ElementMeasurementsService } from '../../shared/element-measurements.service';
import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-charts-minor-elems-one',
  templateUrl: './charts-minor-elems-one.component.html',
  styleUrls: ['./charts-minor-elems-one.component.scss'],
  providers: [DatePipe]
})
export class ChartsMinorElemsOneComponent implements OnInit {
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
        // console.error('Error fetching element measurements:', error);
      }
    );
  }

  @ViewChild(BaseChartDirective, { static: false }) chart?: BaseChartDirective;

 processMeasurements(measurements: ElementMeasurement[]) {
  const bariumData: number[] = [];
  const chromiumData: number[] = [];
  const cobaltData: number[] = [];
  const copperData: number[] = [];
  const fluorideData: number[] = [];
  const iodineData: number[] = [];
  const labels: string[] = [];

  measurements.forEach((measurement, index) => {
    if (measurement.reef_water_element_id === 10) {
      bariumData.push(measurement.qt);
    } else if (measurement.reef_water_element_id === 11) {
      chromiumData.push(measurement.qt);
    } else if (measurement.reef_water_element_id === 12) {
      cobaltData.push(measurement.qt);
    } else if (measurement.reef_water_element_id === 13) {
      copperData.push(measurement.qt);
    }else if (measurement.reef_water_element_id === 14) {
      fluorideData.push(measurement.qt);
    }else if (measurement.reef_water_element_id === 15) {
      iodineData.push(measurement.qt);
    }

    // Assuming the measurements are sorted by date
    const formattedDate = this.datePipe.transform(measurement.created_at, 'MMM dd h:mm a');
    labels.push(formattedDate || measurement.created_at.toString());

    // Assuming the measurements are sorted by date
    // labels.push(measurement.created_at.toString());
  });

  this.lineChartData.labels = labels;
  this.lineChartData.datasets[0].data = bariumData;
  this.lineChartData.datasets[1].data = chromiumData;
  this.lineChartData.datasets[2].data = cobaltData;
  this.lineChartData.datasets[3].data = copperData;
  this.lineChartData.datasets[4].data = fluorideData;
  this.lineChartData.datasets[5].data = iodineData;

   // Update the chart with the new data
   this.chart?.update();
}
  public lineChartData: ChartConfiguration['data'] = {
    datasets: [
      {
        data: [],
        label: 'Barium',
        // yAxisID: 'y2',
        borderColor: 'rgba(148,159,177,1)',
        pointBackgroundColor: 'rgba(148,159,177,1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(148,159,177,0.8)',

      },
      {
        data: [],
        label: 'Chromium',

        borderColor: 'rgba(77,83,96,1)',
        pointBackgroundColor: 'rgba(77,83,96,1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(77,83,96,1)',

      },
      {
        data: [],
        label: 'Cobalt',
        // yAxisID: 'y2',
        borderColor: 'red',
        pointBackgroundColor: 'rgba(148,159,177,1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(148,159,177,0.8)',

      },
      {
        data: [], // An array of numerical data points for the chart
        label: 'Copper',                                 // Label for this dataset, used in tooltips and the legend
        yAxisID: 'y1',                                      // Associates this dataset with a specific Y-axis in the chart
        borderColor: 'blue',                                // Color of the line that connects data points in the chart
        pointBackgroundColor: 'rgba(148,159,177,1)',        // Background color of the data points; in this case, a solid grayish-blue color
        pointBorderColor: '#fff',                           // Border color of the data points; in this case, white
        pointHoverBackgroundColor: '#fff',                  // Background color of data points when hovered over; in this case, white
        pointHoverBorderColor: 'rgba(148,159,177,0.8)',     // Border color of data points when hovered over; in this case, a semi-transparent grayish-blue color
      },
      {
        data: [],
        label: 'Fluoride',

        borderColor: 'rgba(77,83,96,1)',
        pointBackgroundColor: 'rgba(77,83,96,1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(77,83,96,1)',


      },
      {
        data: [],
        label: 'Iodine',
        // yAxisID: 'y2',
        borderColor: 'red',
        pointBackgroundColor: 'rgba(148,159,177,1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(148,159,177,0.8)',
        hidden: false
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
    // console.log(event, active);
  }

  public chartHovered({ event, active }: { event?: ChartEvent, active?: {}[] }): void {
    // console.log(event, active);
  }

  //Hides acording to index value
  public hideOne(): void {
    // console.log('Datasets:', this.chart?.data.datasets);
    const isHidden = this.chart?.isDatasetHidden(5);
    // console.log('isHidden:', isHidden);
    this.chart?.hideDataset(5, !isHidden);
  }


}


  // @ViewChild(BaseChartDirective) chart?: BaseChartDirective;

  // private static generateNumber(i: number): number {
  //   return Math.floor((Math.random() * (i < 2 ? 100 : 1000)) + 1);
  // }


