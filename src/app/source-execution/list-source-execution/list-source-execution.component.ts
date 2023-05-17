import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog, MatDialogConfig, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { SourceExecution } from 'src/app/models/sourceExecution';
import { SourceExecutionService } from 'src/app/services/source-execution.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import { AddSourceExecutionComponent } from '../add-source-execution/add-source-execution.component';

import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import * as XLSX from 'xlsx';
import { FileSaverService } from 'ngx-filesaver';

@Component({
  selector: 'app-list-source-execution',
  templateUrl: './list-source-execution.component.html',
  styleUrls: ['./list-source-execution.component.css']
})
export class ListSourceExecutionComponent implements OnInit {
  sourceExecution: [];
  page: number = 1;

  constructor(public crudApi: SourceExecutionService, public toastr: ToastrService, private router: Router,
    public fb: FormBuilder, private matDialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any, public dialogRef: MatDialogRef<AddSourceExecutionComponent>,
    private fileSaver: FileSaverService) { }

  ngOnInit(): void {
    this.getData();
  }
  getData() {
    this.crudApi.getAll().subscribe(
      response => {
        this.crudApi.listData = response;
        this.sourceExecution = response;
      }
    );
  }
  addarticle() {
    this.crudApi.choixmenu = "A";
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.disableClose = true;
    dialogConfig.width = "50%";
    this.matDialog.open(AddSourceExecutionComponent, dialogConfig);
  }
  removeData(id: number) {
    if (window.confirm('هل أنت متأكد من أنك تريد حذف هذه الجهة ؟')) {
      this.crudApi.deleteData(id)
        .subscribe(
          data => {
            console.log(data);
            this.toastr.warning('  تم حذف البيانات بنجاح');
            this.getData();
          },
          error => console.log(error));
    }
  }
  selectData(item: SourceExecution) {
    this.crudApi.choixmenu = "M";
    this.crudApi.dataForm = this.fb.group(Object.assign({}, item));
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.disableClose = true;
    dialogConfig.width = "50%";

    this.matDialog.open(AddSourceExecutionComponent, dialogConfig);
  }
  exportPdf() {
    this.crudApi.exportPdf().subscribe(response => {
      const blob = new Blob([response], { type: 'application/pdf' });

      const data = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = data;
      link.download = 'source execution.pdf';
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

    const worksheet = XLSX.utils.json_to_sheet(this.sourceExecution);
    const workbook = {
      Sheets: {
        'testingSheet': worksheet
      },
      SheetNames: ['testingSheet']
    }
    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const blobData = new Blob([excelBuffer], { type: EXCEL_TYPE });
    this.fileSaver.save(blobData, "جهة التنفيذ")
  }

  search(key: string) {
    const results: SourceExecution[] = [];
    if (key.trim() === '') {
      this.crudApi.getAll().subscribe((data: SourceExecution[]) => {
        this.crudApi.listData = data;
      });
    } else {
      for (const rec of this.crudApi.listData) {
        if (rec.nom.toLowerCase().indexOf(key.toLowerCase()) !== -1) {
          results.push(rec);
        }
      }
      this.crudApi.listData = results;
    }
  }


}
