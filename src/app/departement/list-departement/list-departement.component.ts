import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog, MatDialogConfig, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Departement } from 'src/app/models/departement';
import { DepartementService } from 'src/app/services/departement.service';
import { AddDepartementComponent } from '../add-departement/add-departement.component';

import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import * as XLSX from 'xlsx';
import { FileSaverService } from 'ngx-filesaver';

@Component({
  selector: 'app-list-departement',
  templateUrl: './list-departement.component.html',
  styleUrls: ['./list-departement.component.css']
})
export class ListDepartementComponent implements OnInit {

  departement: Departement;
  departements: [];
  p: number = 1;
  //employe
  idF: number;
  emp: any = {};

  constructor(public crudApi: DepartementService, public toastr: ToastrService,
    private router: Router, public fb: FormBuilder,
    private matDialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<AddDepartementComponent>,
    private fileSaver: FileSaverService) { }

  ngOnInit() {

    this.getData();

    this.crudApi.getAll().subscribe(
      response => {
        this.departements = response;
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
    this.matDialog.open(AddDepartementComponent, dialogConfig);

  }
  getData() {
    this.crudApi.getAll().subscribe(
      response => { this.crudApi.listData = response; }
    );

  }
  removeData(id: number) {
    if (window.confirm('هل أنت متأكد من أنك تريد حذف هذه المصلحة ؟')) {
      this.crudApi.deleteData(id)
        .subscribe(
          data => {
            console.log(data);
            this.toastr.warning(' تم حذف البيانات بنجاح');
            this.getData();
          },
          error => console.log(error));
    }
  }
  selectData(item: Departement) {
    this.crudApi.choixmenu = "M";
    this.crudApi.dataForm = this.fb.group(Object.assign({}, item));
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.disableClose = true;
    dialogConfig.width = "50%";

    this.matDialog.open(AddDepartementComponent, dialogConfig);
  }

  public openPDF(): void {
    let DATA: any = document.getElementById('htmlData');
    html2canvas(DATA).then((canvas) => {
      let fileWidth = 208;
      let fileHeight = (canvas.height * fileWidth) / canvas.width;
      const FILEURI = canvas.toDataURL('image/png');
      let PDF = new jsPDF('p', 'mm', 'a4');
      let position = 10;
      PDF.addImage(FILEURI, 'PNG', 0, position, fileWidth, fileHeight);
      PDF.save('جدول المصلحة.pdf');
    });
  }

  public downloadFileCSV() {

    const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    const EXCEL_EXTENSION = '.xlsx';

    const worksheet = XLSX.utils.json_to_sheet(this.departements);
    const workbook = {
      Sheets: {
        'testingSheet': worksheet
      },
      SheetNames: ['testingSheet']
    }
    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const blobData = new Blob([excelBuffer], { type: EXCEL_TYPE });
    this.fileSaver.save(blobData, "جدول المصالح")
  }

  search(key: string) {
    const results: Departement[] = [];
    if (key.trim() === '') {
      this.crudApi.getAll().subscribe((data: Departement[]) => {
        this.crudApi.listData = data;
      });
    } else {
      for (const rec of this.crudApi.listData) {
        if (rec.libDep.toLowerCase().indexOf(key.toLowerCase()) !== -1) {
          results.push(rec);
        }
      }
      this.crudApi.listData = results;
    }
  }

  exportPdf() {
    this.crudApi.exportPdf().subscribe(response => {
      const blob = new Blob([response], { type: 'application/pdf' });

      const data = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = data;
      link.download = 'جدول المصالح.pdf';
      link.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true, view: window }));

      setTimeout(function () {
        window.URL.revokeObjectURL(data);
        link.remove();
      }, 100);
    })

  }

}
