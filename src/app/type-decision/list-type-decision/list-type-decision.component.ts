import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog, MatDialogConfig, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { TypeDecisionService } from 'src/app/services/type-decision.service';
import { AddTypeDecisionComponent } from '../add-type-decision/add-type-decision.component';

import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import * as XLSX from 'xlsx';
import { FileSaverService } from 'ngx-filesaver';
import { TypeDecision } from 'src/app/models/typeDecision';

@Component({
  selector: 'app-list-type-decision',
  templateUrl: './list-type-decision.component.html',
  styleUrls: ['./list-type-decision.component.css']
})
export class ListTypeDecisionComponent implements OnInit {

  TypeDecision: [];
  page: number = 1;

  constructor(public crudApi: TypeDecisionService, public toastr: ToastrService, private router: Router,
    public fb: FormBuilder, private matDialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any, public dialogRef: MatDialogRef<AddTypeDecisionComponent>,
    private fileSaver: FileSaverService) { }

  ngOnInit(): void {
    this.getData();
  }
  getData() {
    this.crudApi.getAll().subscribe(
      response => {
        this.crudApi.listData = response;
        this.TypeDecision = response;
      }
    );
  }
  addarticle() {
    this.crudApi.choixmenu = "A";
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.disableClose = true;
    dialogConfig.width = "50%";
    this.matDialog.open(AddTypeDecisionComponent, dialogConfig);
  }
  removeData(id: number) {
    if (window.confirm('هل أنت متأكد من أنك تريد حذف هذا النوع  ؟')) {
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
  selectData(item: TypeDecision) {
    this.crudApi.choixmenu = "M";
    this.crudApi.dataForm = this.fb.group(Object.assign({}, item));
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.disableClose = true;
    dialogConfig.width = "50%";

    this.matDialog.open(AddTypeDecisionComponent, dialogConfig);
  }
  exportPdf() {
    this.crudApi.exportPdf().subscribe(response => {
      const blob = new Blob([response], { type: 'application/pdf' });

      const data = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = data;
      link.download = 'type decision.pdf';
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

    const worksheet = XLSX.utils.json_to_sheet(this.TypeDecision);
    const workbook = {
      Sheets: {
        'testingSheet': worksheet
      },
      SheetNames: ['testingSheet']
    }
    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const blobData = new Blob([excelBuffer], { type: EXCEL_TYPE });
    this.fileSaver.save(blobData, " نوع القرار")
  }


  search(key: string) {
    const results: TypeDecision[] = [];
    if (key.trim() === '') {
      this.crudApi.getAll().subscribe((data: TypeDecision[]) => {
        this.crudApi.listData = data;
      });
    } else {
      for (const rec of this.crudApi.listData) {
        if (rec.nomType.toLowerCase().indexOf(key.toLowerCase()) !== -1) {
          results.push(rec);
        }
      }
      this.crudApi.listData = results;
    }
  }


}
