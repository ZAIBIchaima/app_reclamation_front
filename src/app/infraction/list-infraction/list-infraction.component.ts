import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { MatDialog, MatDialogConfig, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Infraction } from 'src/app/models/infraction';
import { InfractionService } from 'src/app/services/infraction.service';
import { AddInfractionComponent } from '../add-infraction/add-infraction.component';

@Component({
  selector: 'app-list-infraction',
  templateUrl: './list-infraction.component.html',
  styleUrls: ['./list-infraction.component.css']
})
export class ListInfractionComponent implements OnInit {

  infraction: Infraction;
  control: FormControl = new FormControl('');
  p: number = 1;

  constructor(public crudApi: InfractionService, public toastr: ToastrService,
    private router: Router, public fb: FormBuilder,
    private matDialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<AddInfractionComponent>,) { }

  ngOnInit() {

    this.getData();
  }
  addarticle() {
    this.crudApi.choixmenu = "A";
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.disableClose = true;
    dialogConfig.width = "50%";
    //dialogConfig.data="gdddd";
    this.matDialog.open(AddInfractionComponent, dialogConfig);

  }
  getData() {
    this.crudApi.getAll().subscribe(
      response => { this.crudApi.listData = response; }
    );

  }
  removeData(id: number) {
    if (window.confirm('Are sure you want to delete this infraction ?')) {
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
  selectData(item: Infraction) {
    this.crudApi.choixmenu = "M";
    this.crudApi.dataForm = this.fb.group(Object.assign({}, item));
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.disableClose = true;
    dialogConfig.width = "50%";

    this.matDialog.open(AddInfractionComponent, dialogConfig);
  }


}
