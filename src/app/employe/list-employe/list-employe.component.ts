import { Component, Inject, OnInit } from '@angular/core';

import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import * as XLSX from 'xlsx';
import { FileSaverService } from 'ngx-filesaver';
import { Employe } from 'src/app/models/employe';
import { EmployeService } from 'src/app/services/employe.service';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder } from '@angular/forms';
import { MatDialog, MatDialogConfig, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AddEmployeComponent } from '../add-employe/add-employe.component';

@Component({
  selector: 'app-list-employe',
  templateUrl: './list-employe.component.html',
  styleUrls: ['./list-employe.component.css']
})
export class ListEmployeComponent implements OnInit {

  employe: Employe;
  employes: [];
  p: number = 1;

  constructor(public crudApi: EmployeService, public toastr: ToastrService,
    public fb: FormBuilder,
    private matDialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<AddEmployeComponent>,
    private fileSaver: FileSaverService) { }

  ngOnInit() {

    this.getData();
  }
  getData() {
    this.crudApi.getAll().subscribe(
      response => {
        this.crudApi.listData = response;
        this.employes = response;
      }
    );

  }
  addarticle() {
    this.crudApi.choixmenu = "A";
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.disableClose = true;
    dialogConfig.width = "50%";
    this.matDialog.open(AddEmployeComponent, dialogConfig);

  }

  removeData(id: number) {
    if (window.confirm('هل انت متاكد من مسح الجهة ')) {
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
  selectData(item: Employe) {
    this.crudApi.choixmenu = "M";
    this.crudApi.dataForm = this.fb.group(Object.assign({}, item));
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.disableClose = true;
    dialogConfig.width = "50%";

    this.matDialog.open(AddEmployeComponent, dialogConfig);
  }


  exportPdf() {
    this.crudApi.exportPdf().subscribe(response => {
      const blob = new Blob([response], { type: 'application/pdf' });

      const data = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = data;
      link.download = 'جدول الاعوان.pdf';
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

    const worksheet = XLSX.utils.json_to_sheet(this.employes);
    const workbook = {
      Sheets: {
        'testingSheet': worksheet
      },
      SheetNames: ['testingSheet']
    }
    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const blobData = new Blob([excelBuffer], { type: EXCEL_TYPE });
    this.fileSaver.save(blobData, "جدول الاعوان")
  }

  search(key: string) {
    const results: Employe[] = [];
    if (key.trim() === '') {
      this.crudApi.getAll().subscribe((data: Employe[]) => {
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

}
