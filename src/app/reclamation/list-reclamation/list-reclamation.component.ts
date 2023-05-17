import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Reclamation } from 'src/app/models/reclamation';
import { ReclamationService } from 'src/app/services/reclamation.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import { AddReclamationComponent } from '../add-reclamation/add-reclamation.component';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef, MatDialogConfig } from '@angular/material/dialog'
import { EtatReclamationService } from 'src/app/services/etat-reclamation.service';
import { EtatReclamation } from 'src/app/models/etatReclamation';

import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import * as XLSX from 'xlsx';
import { FileSaverService } from 'ngx-filesaver';

@Component({
  selector: 'app-list-reclamation',
  templateUrl: './list-reclamation.component.html',
  styleUrls: ['./list-reclamation.component.css']
})
export class ListReclamationComponent implements OnInit {

  reclamation: Reclamation;
  p: number = 1;
  reclamations: [];

  //Search
  dateReclamationStart: Date;
  dateReclamationEnd: Date;
  numReclamation: number;
  prenomNomSourceReclamation: string;
  refReclamation: string;
  prenomNomSourceDestinataire: string;

  constructor(public crudApi: ReclamationService, public toastr: ToastrService,
    public fb: FormBuilder, private matDialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any, public dialogRef: MatDialogRef<AddReclamationComponent>,
    private fileSaver: FileSaverService) { }

  ngOnInit() {
    this.getData();
  }
  addarticle() {

    this.crudApi.choixmenu = "A";
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.disableClose = true;
    dialogConfig.width = "50%";
    this.matDialog.open(AddReclamationComponent, dialogConfig);
  }
  getData() {
    this.crudApi.getAll().subscribe(
      response => {
        this.crudApi.listData = response;
        this.reclamations = response;
        console.log("getAll", this.crudApi.listData);
      }
    );

  }
  removeData(id: number) {
    if (window.confirm('هل أنت متأكد من أنك تريد حذف هذه الشكوى ؟')) {
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
  selectData(item: Reclamation) {
    this.crudApi.choixmenu = "M";
    this.crudApi.dataForm = this.fb.group(Object.assign({}, item));
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.disableClose = true;
    dialogConfig.width = "50%";

    this.matDialog.open(AddReclamationComponent, dialogConfig);
  }
  exportPdf() {
    this.crudApi.exportPdf().subscribe(response => {
      const blob = new Blob([response], { type: 'application/pdf' });
      // if (window.navigator && window.navigator.msSaveOrOpenBlob) {
      //   window.navigator.msSaveOrOpenBlob(blob);
      //   return;
      // }
      const data = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = data;
      link.download = 'جدول الشكاوي.pdf';
      link.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true, view: window }));

      setTimeout(function () {
        window.URL.revokeObjectURL(data);
        link.remove();
      }, 100);
    })

  }

  exportCSV() {
    this.crudApi.exportCSV().subscribe(response => {
      const blob = new Blob([response], { type: 'application/application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      // if (window.navigator && window.navigator.msSaveOrOpenBlob) {
      //   window.navigator.msSaveOrOpenBlob(blob);
      //   return;
      // }
      const data = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = data;
      link.download = 'reclamations.xlsx';
      link.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true, view: window }));

      setTimeout(function () {
        window.URL.revokeObjectURL(data);
        link.remove();
      }, 100);
    })

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
      PDF.save('جدول الشكاوي.pdf');
    });
  }

  public downloadFileCSV() {

    const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    const EXCEL_EXTENSION = '.xlsx';

    const worksheet = XLSX.utils.json_to_sheet(this.reclamations);
    const workbook = {
      Sheets: {
        'testingSheet': worksheet
      },
      SheetNames: ['testingSheet']
    }
    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const blobData = new Blob([excelBuffer], { type: EXCEL_TYPE });
    this.fileSaver.save(blobData, "  جدول الشكاوي")
  }

  search(key: string) {
    const results: Reclamation[] = [];
    if (key.trim() === '') {
      this.crudApi.getAll().subscribe((data: Reclamation[]) => {
        this.crudApi.listData = data;
      });
    } else {
      for (const rec of this.crudApi.listData) {
        if (rec.refReclamation.toLowerCase().indexOf(key.toLowerCase()) !== -1) {
          results.push(rec);
        }
      }
      this.crudApi.listData = results;
    }
  }

  getBetweenTwoDate() {
    this.crudApi.getBetweenTwoDate(this.dateReclamationStart, this.dateReclamationEnd,
      this.refReclamation).subscribe(
        response => {
          this.crudApi.listData = response;
        }
      );
  }

  getReclamationByNumAndNom() {
    this.crudApi.getReclamationByNumAndNom(this.refReclamation, this.prenomNomSourceReclamation,
    ).subscribe(
      response => {
        this.crudApi.listData = response;
        console.log("Filter by numInfraction and source", response);
      }
    );

  }


}

