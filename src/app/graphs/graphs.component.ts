import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Chart, ChartConfiguration, ChartEvent, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { User } from '../models/user.model';
import { UserService } from '../shared/user.service';
import { AuthService } from '.././shared/auth.service';
import { default as Annotation } from 'chartjs-plugin-annotation';

@Component({
  selector: 'app-graphs',
  templateUrl: './graphs.component.html',
  styleUrls: ['./graphs.component.scss']
})
export class GraphsComponent implements OnInit {
  private newLabel? = 'New label';
  currentUser: User;


  constructor
    (
      private userService: UserService,
      private authService: AuthService,
    )
    {
      Chart.register(Annotation)
    }

  ngOnInit(): void {
    this.userService.currentUserSubject.subscribe((user: User) => {
      console.log(user);
      this.currentUser = user;
    })
    // WILL NEED MODAL
    }

    logout() {
      this.authService.logout();
    }

  public lineChartData: ChartConfiguration['data'] = {
    datasets: [
      {
        data: [ 35, 36, 35, 37, 36, 35, 37 ],
        label: 'Salinity',
        // yAxisID: 'y2',
        borderColor: 'rgba(148,159,177,1)',
        pointBackgroundColor: 'rgba(148,159,177,1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(148,159,177,0.8)',

      },
      {
        data: [ 420, 390, 440, 400, 410, 420, 400 ],
        label: 'Calcium',

        borderColor: 'rgba(77,83,96,1)',
        pointBackgroundColor: 'rgba(77,83,96,1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(77,83,96,1)',

      },
      {
        data: [ 8.6, 9.1, 8.8, 10, 9.7, 8.9, 10.1 ],
        label: 'Alkilinity',
        // yAxisID: 'y2',
        borderColor: 'red',
        pointBackgroundColor: 'rgba(148,159,177,1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(148,159,177,0.8)',

      },
      {
        data: [ 1350, 1400, 1380, 1360, 1400, 1350, 1390 ], // An array of numerical data points for the chart
        label: 'Magnesium',                                 // Label for this dataset, used in tooltips and the legend
        yAxisID: 'y1',                                      // Associates this dataset with a specific Y-axis in the chart
        borderColor: 'blue',                                // Color of the line that connects data points in the chart
        pointBackgroundColor: 'rgba(148,159,177,1)',        // Background color of the data points; in this case, a solid grayish-blue color
        pointBorderColor: '#fff',                           // Border color of the data points; in this case, white
        pointHoverBackgroundColor: '#fff',                  // Background color of data points when hovered over; in this case, white
        pointHoverBorderColor: 'rgba(148,159,177,0.8)',     // Border color of data points when hovered over; in this case, a semi-transparent grayish-blue color
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
    const isHidden = this.chart?.isDatasetHidden(1);
    this.chart?.hideDataset(1, !isHidden);
    this.chart?.hideDataset(3, !isHidden);
  }


}




// {
//   data: [ 1350, 1400, 1380, 1360, 1400, 1350, 1390 ],
//   label: 'Magnesium',
//   yAxisID: 'y1',
//   // backgroundColor: 'rgba(64, 224, 208, 0.8)',
//   borderColor: 'blue',
//   pointBackgroundColor: 'rgba(148,159,177,1)',
//   pointBorderColor: '#fff',
//   pointHoverBackgroundColor: '#fff',
//   pointHoverBorderColor: 'rgba(148,159,177,0.8)',
//   // fill: 'origin',
// },

  // public randomize(): void {
  //   for (let i = 0; i < this.lineChartData.datasets.length; i++) {
  //     for (let j = 0; j < this.lineChartData.datasets[i].data.length; j++) {
  //       this.lineChartData.datasets[i].data[j] = GraphsComponent.generateNumber(i);
  //     }
  //   }
  //   this.chart?.update();
  // }
