import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ArreteService } from 'src/app/services/arrete.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';

@Component({
  selector: 'app-add-arrete',
  templateUrl: './add-arrete.component.html',
  styleUrls: ['./add-arrete.component.css']
})
export class AddArreteComponent implements OnInit {

  userCreation: number;
  userLastmodified: number;

  constructor(public crudApi: ArreteService,
    public fb: FormBuilder, public toastr: ToastrService,
    private router: Router, private tokenStorage: TokenStorageService,
    public dialogRef: MatDialogRef<AddArreteComponent>,) { }

  get f() { return this.crudApi.dataForm.controls; }

  ngOnInit() {
    this.userCreation = this.tokenStorage.getUser().id;
    this.userLastmodified = this.tokenStorage.getUser().id;
    if (this.crudApi.choixmenu == "A") { this.infoForm() };
  }
  infoForm() {
    this.crudApi.dataForm = this.fb.group({
      idArrete: null,
      numArrete: [0, [Validators.required]],
      refArrete: ['', [Validators.required]],
      dateArrete: [new Date, [Validators.required]],
      descriptionArrete: ['', [Validators.required]],
      objetArrete: ['', [Validators.required]],
      refNumCourt: ['', [Validators.required]],
      dateExecution: [new Date, [Validators.required]],
      dateCourt: [new Date, [Validators.required]],
      userCreation: this.userCreation,
      userLastmodified: this.userLastmodified,

    });
  }

  ResetForm() {
    this.crudApi.dataForm.reset();
  }
  onSubmit() {
    if (this.crudApi.choixmenu == "A") {
      this.addData();
    }
    else {

      this.updateData()
    }

  }
  addData() {
    this.crudApi.createData(this.crudApi.dataForm.value).
      subscribe(data => {
        this.toastr.success('تم الاضافة بنجاح');
        this.crudApi.getAll().subscribe(
          response => { this.crudApi.listData = response; }
        );
      });
    this.router.navigate(['/acceuil/arretes']);
    //location.reload();
  }
  updateData() {
    this.crudApi.dataForm.value.userLastmodified = this.userLastmodified;
    this.crudApi.updatedata(this.crudApi.dataForm.value.idArrete, this.crudApi.dataForm.value).
      subscribe(data => {
        this.dialogRef.close();
        this.toastr.success(' تم التغيير بنجاح');
        this.crudApi.getAll().subscribe(
          Response => {
            this.crudApi.listData = Response;
          }
        );

      });
    this.router.navigate(['/acceuil/arretes']);
    //location.reload();
  }



}
