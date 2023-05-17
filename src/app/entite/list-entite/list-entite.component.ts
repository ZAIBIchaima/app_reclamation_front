import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog, MatDialogConfig, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FileSaverService } from 'ngx-filesaver';
import * as XLSX from 'xlsx';
import { ToastrService } from 'ngx-toastr';
import { Entite } from 'src/app/models/entite';
import { EntiteService } from 'src/app/services/entite.service';
import { AddEntiteComponent } from '../add-entite/add-entite.component';

@Component({
  selector: 'app-list-entite',
  templateUrl: './list-entite.component.html',
  styleUrls: ['./list-entite.component.css']
})
export class ListEntiteComponent implements OnInit {

  entite: Entite;
  entites: [];
  p: number = 1;

  constructor(public crudApi: EntiteService,
    public toastr: ToastrService,
    public fb: FormBuilder,
    private matDialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<AddEntiteComponent>,
    private fileSaver: FileSaverService) { }

  ngOnInit() {

    this.getData();
  }
  getData() {
    this.crudApi.getAll().subscribe(
      response => {
        this.crudApi.listData = response;
        this.entites = response;
      }
    );

  }
  addarticle() {
    this.crudApi.choixmenu = "A";
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.disableClose = true;
    dialogConfig.width = "50%";
    this.matDialog.open(AddEntiteComponent, dialogConfig);

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
  selectData(item: Entite) {
    this.crudApi.choixmenu = "M";
    this.crudApi.dataForm = this.fb.group(Object.assign({}, item));
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.disableClose = true;
    dialogConfig.width = "50%";

    this.matDialog.open(AddEntiteComponent, dialogConfig);
  }

  exportPdf() {
    this.crudApi.exportPdf().subscribe(response => {
      const blob = new Blob([response], { type: 'application/pdf' });

      const data = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = data;
      link.download = 'جدول الجهات.pdf';
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

    const worksheet = XLSX.utils.json_to_sheet(this.entites);
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
    const results: Entite[] = [];
    if (key.trim() === '') {
      this.crudApi.getAll().subscribe((data: Entite[]) => {
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
