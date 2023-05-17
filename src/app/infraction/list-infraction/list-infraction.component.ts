import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { MatDialog, MatDialogConfig, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { AddArreteComponent } from 'src/app/arrete/add-arrete/add-arrete.component';
import { Infraction } from 'src/app/models/infraction';
import { InfractionService } from 'src/app/services/infraction.service';
import { AddInfractionComponent } from '../add-infraction/add-infraction.component';


import * as XLSX from 'xlsx';
import { FileSaverService } from 'ngx-filesaver';
import { EmployeService } from 'src/app/services/employe.service';
import * as moment from 'moment';

@Component({
  selector: 'app-list-infraction',
  templateUrl: './list-infraction.component.html',
  styleUrls: ['./list-infraction.component.css']
})
export class ListInfractionComponent implements OnInit {

  infraction: Infraction;
  infractions: [];
  p: number = 1;
  EtatInfractionsList: Infraction;
  //employe
  emp: any = {};

  dateInfractionStart: Date;
  dateInfractionEnd: Date;
  numInfraction: number;
  source: string;

  constructor(public crudApi: InfractionService, public toastr: ToastrService,
    public fb: FormBuilder,
    private matDialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<AddInfractionComponent>,
    private fileSaver: FileSaverService, public empService: EmployeService) { }

  ngOnInit() {
    this.getData();
  }

  addarticle() {
    this.crudApi.choixmenu = "A";
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.disableClose = true;
    dialogConfig.width = "50%";
    this.matDialog.open(AddInfractionComponent, dialogConfig);

  }

  getData() {
    this.crudApi.getAll().subscribe(
      response => {
        this.crudApi.listData = response;
        this.infractions = response;
      }
    );
  }

  removeData(id: number) {
    if (window.confirm('هل انت متاكد من مسح المحضر ')) {
      this.crudApi.deleteData(id)
        .subscribe(
          data => {
            console.log(data);
            this.toastr.warning(' تم حذف البيانات بنجاح');
            this.crudApi.getAll().subscribe(
              response => {
                this.crudApi.listData = response;
              }
            );
          },
          error => console.log(error));
    }
  }

  selectData(item: Infraction) {
    this.crudApi.choixmenu = "M";
    this.crudApi.dataForm = this.fb.group(Object.assign({}, item));
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.disableClose = true;
    dialogConfig.width = "50%";

    this.matDialog.open(AddInfractionComponent, dialogConfig);
  }

  selectDataArrete(item: Infraction) {
    this.crudApi.choixmenu = "A";
    this.crudApi.dataForm = this.fb.group(Object.assign({}, item));
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.disableClose = true;
    dialogConfig.width = "50%";

    this.matDialog.open(AddArreteComponent, dialogConfig);
  }

  exportPdf() {
    this.crudApi.exportPdf().subscribe(response => {
      const blob = new Blob([response], { type: 'application/pdf' });

      const data = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = data;
      link.download = 'جدول المحاضر.pdf';
      link.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true, view: window }));

      setTimeout(function () {
        window.URL.revokeObjectURL(data);
        link.remove();
      }, 100);
    })
  }

  public downloadFileCSV() {
    const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    const worksheet = XLSX.utils.json_to_sheet(this.infractions);
    const workbook = {
      Sheets: {
        'testingSheet': worksheet
      },
      SheetNames: ['testingSheet']
    }
    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const blobData = new Blob([excelBuffer], { type: EXCEL_TYPE });
    this.fileSaver.save(blobData, "جدول المحاضر")
  }

  filter() {
    this.crudApi.getInfractionByDate(this.dateInfractionStart, this.dateInfractionEnd, this.numInfraction, this.source).subscribe(
      response => {
        this.crudApi.listData = response;
        console.log("Filter by date", response);
      }
    );

  }

  search(key: string) {
    const results: Infraction[] = [];
    if (key.trim() === '') {
      this.crudApi.getAll().subscribe((data: Infraction[]) => {
        this.crudApi.listData = data;
      });
    } else {
      for (const rec of this.crudApi.listData) {
        if (rec.source.toLowerCase().indexOf(key.toLowerCase()) !== -1) {
          results.push(rec);
        }
      }
      this.crudApi.listData = results;
    }
  }

  getInfractionByNumAndSource() {
    this.crudApi.getInfractionByNumAndEmp(this.numInfraction, this.source).subscribe(
      response => {
        this.crudApi.listData = response;
        console.log("Filter by numInfraction and source", response);
      }
    );
  }
}
