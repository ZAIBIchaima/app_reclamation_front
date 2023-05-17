import { Component, OnInit } from '@angular/core';
import { ChartOptions, ChartType } from 'chart.js';
import { Color, Label, SingleDataSet } from 'ng2-charts';
import { CountEtat } from 'src/app/models/countEtat';
import { InfractionService } from 'src/app/services/infraction.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  etat = '';

  public doughnutChartOptions: ChartOptions = {
    responsive: true,
    legend: {
      display: false,
    },
    cutoutPercentage: 80,
  };
  public doughnutChartLabels: Label[] = [];
  public doughnutChartData: SingleDataSet = [];
  public doughnutChartType: ChartType = 'pie';
  public doughnutChartColor: Color[] = [
    { backgroundColor: ['#f68059', '#ffbf3a', '#4e3dc8'] },
  ];
  public typeData: Array<CountEtat> = [];

  constructor(private infractionService: InfractionService) { }

  ngOnInit(): void {
    this.getEtatPercentage();
  }


  //chart
  getEtatPercentage() {
    this.doughnutChartData = [];
    this.doughnutChartLabels = [];

    this.infractionService.getCountEtat().subscribe(
      (d) => {
        // console.log(d);
        d.forEach((typeCount: CountEtat) => {
          this.etat = typeCount.etat + '';
          console.log(typeCount.count);
          console.log(typeCount.etat);
          this.doughnutChartData.push(typeCount.count);
          this.doughnutChartLabels.push(this.etat);
        });
      },
      (error) => {
        console.error(error);
      }
    );
  }

}
