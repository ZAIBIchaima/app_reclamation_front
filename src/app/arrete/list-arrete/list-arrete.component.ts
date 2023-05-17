import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { MatDialog, MatDialogConfig, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Arrete } from 'src/app/models/arrete';
import { ArreteService } from 'src/app/services/arrete.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import { AddArreteComponent } from '../add-arrete/add-arrete.component';
import { ExecutionArreteComponent } from '../execution-arrete/execution-arrete.component';

import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import * as XLSX from 'xlsx';
import { FileSaverService } from 'ngx-filesaver';
import { CourComponent } from '../cour/cour.component';

@Component({
  selector: 'app-list-arrete',
  templateUrl: './list-arrete.component.html',
  styleUrls: ['./list-arrete.component.css']
})
export class ListArreteComponent implements OnInit {

  p: number = 1;
  control: FormControl = new FormControl('');
  arretes: [];
  items: Arrete;
  //Search
  dateArreteStart: Date;
  dateArreteEnd: Date;
  numArrete: number;
  refArrete: string;

  constructor(public crudApi: ArreteService, public toastr: ToastrService,
    public fb: FormBuilder, private matDialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<ExecutionArreteComponent>,
    private fileSaver: FileSaverService) { }

  ngOnInit() {
    this.getData();
    console.log("Data of arrete table", this.getData());
    this.crudApi.getAll().subscribe(
      response => {
        this.arretes = response;
        console.log(response);
      }
    );
  }
  addarticle() {
    this.crudApi.choixmenu = "A";
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.disableClose = true;
    dialogConfig.width = "50%";
    //dialogConfig.data="gdddd";

    this.matDialog.open(AddArreteComponent, dialogConfig);
  }
  getData() {
    this.crudApi.getAll().subscribe(
      response => {
        this.crudApi.listData = response;
        console.log("Inffff", this.crudApi.listData);
      }
    );

  }
  removeData(id: number) {
    if (window.confirm('Are sure you want to delete this arrete ?')) {
      this.crudApi.deleteData(id)
        .subscribe(
          data => {
            console.log(data);
            this.toastr.warning(' data successfully deleted!');
            this.getData();
          },
          error => console.log(error));
    }
  }
  selectData(item: Arrete) {
    this.crudApi.choixmenu = "M";
    this.crudApi.dataForm = this.fb.group(Object.assign({}, item));
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.disableClose = true;
    dialogConfig.width = "50%";

    this.matDialog.open(AddArreteComponent, dialogConfig);
  }
  selectDataEx(item: Arrete) {
    this.crudApi.choixmenu = "M";
    this.crudApi.dataForm = this.fb.group(Object.assign({}, item));
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.disableClose = true;
    dialogConfig.width = "50%";

    this.matDialog.open(ExecutionArreteComponent, dialogConfig);
  }
  selectDataCour(item: Arrete) {
    this.crudApi.choixmenu = "M";
    this.crudApi.dataForm = this.fb.group(Object.assign({}, item));
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.disableClose = true;
    dialogConfig.width = "50%";

    this.matDialog.open(CourComponent, dialogConfig);
  }

  exportPdf() {
    this.crudApi.exportPdf().subscribe(response => {
      const blob = new Blob([response], { type: 'application/pdf' });

      const data = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = data;
      link.download = 'جدول القرارات.pdf';
      link.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true, view: window }));

      setTimeout(function () {
        window.URL.revokeObjectURL(data);
        link.remove();
      }, 100);
    })

  }
  exportArretePdf(id: number) {

    this.crudApi.courtPdf(id).subscribe(response => {
      const blob = new Blob([response], { type: 'application/pdf' });

      const data = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = data;
      link.download = '  القرار .pdf';
      link.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true, view: window }));

      setTimeout(function () {
        window.URL.revokeObjectURL(data);
        link.remove();
      }, 100);
    })

  }

  public downloadFileCSV() {

    const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    const EXCEL_EXTENSION = '.xlsx';

    const worksheet = XLSX.utils.json_to_sheet(this.arretes);
    const workbook = {
      Sheets: {
        'testingSheet': worksheet
      },
      SheetNames: ['testingSheet']
    }
    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const blobData = new Blob([excelBuffer], { type: EXCEL_TYPE });
    this.fileSaver.save(blobData, "  جدول القرارات")
  }

  filter() {
    this.crudApi.getBetweenTwoDate(this.dateArreteStart, this.dateArreteEnd, this.refArrete).subscribe(
      response => {
        this.crudApi.listData = response;
      }
    );
  }

  getArreteByNumAndNom() {
    this.crudApi.getArreteByNumAndNom(this.numArrete, this.refArrete).subscribe(
      response => {
        this.crudApi.listData = response;
      }
    );

  }

  search(key: string) {
    const results: Arrete[] = [];
    if (key.trim() === '') {
      this.crudApi.getAll().subscribe((data: Arrete[]) => {
        this.crudApi.listData = data;
      });
    } else {
      for (const rec of this.crudApi.listData) {
        if (rec.refArrete.toLowerCase().indexOf(key.toLowerCase()) !== -1) {
          results.push(rec);
        }
      }
      this.crudApi.listData = results;
    }
  }

}
