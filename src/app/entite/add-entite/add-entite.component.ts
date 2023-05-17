import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { EntiteService } from 'src/app/services/entite.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';

@Component({
  selector: 'app-add-entite',
  templateUrl: './add-entite.component.html',
  styleUrls: ['./add-entite.component.css']
})
export class AddEntiteComponent implements OnInit {

  userCreation: number;
  userLastmodified: number;

  constructor(public crudApi: EntiteService,
    public fb: FormBuilder, public toastr: ToastrService,
    private router: Router, public dialogRef: MatDialogRef<AddEntiteComponent>,
    private tokenStorage: TokenStorageService
  ) { }

  ngOnInit() {
    this.userCreation = this.tokenStorage.getUser().id;
    this.userLastmodified = this.tokenStorage.getUser().id;
    if (this.crudApi.choixmenu == "A") { this.infoForm() };
  }

  infoForm() {
    this.crudApi.dataForm = this.fb.group({
      id: null,
      nom: ['', [Validators.required]],
      email: ['', [Validators.required]],
      adresse: ['', [Validators.required]],
      contact: ['', [Validators.required]],
      commentaires: ['', [Validators.required]],
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
        this.dialogRef.close();
        this.toastr.success('تم الاضافة بنجاح');
        this.crudApi.getAll().subscribe(
          response => { this.crudApi.listData = response; }
        );
      },
        (error) => {
          console.log(error);
          const errorMessage = error.error.message;
          this.toastr.error('البريد الإلكتروني موجود بالفعل');

        }
      );
    this.router.navigate(['/acceuil/entites']);
  }
  updateData() {
    this.crudApi.dataForm.value.userLastmodified = this.userLastmodified;
    this.crudApi.updatedata(this.crudApi.dataForm.value.id, this.crudApi.dataForm.value).
      subscribe(data => {
        this.dialogRef.close();
        this.toastr.success(' تم التغيير بنجاح');
        this.crudApi.getAll().subscribe(
          Response => {
            this.crudApi.listData = Response;
          }
        );

      },
        (error) => {
          console.log(error);
          const errorMessage = error.error.message;
          this.toastr.error('البريد الإلكتروني موجود بالفعل');

        }
      );
    this.router.navigate(['/acceuil/entites']);
  }



}
