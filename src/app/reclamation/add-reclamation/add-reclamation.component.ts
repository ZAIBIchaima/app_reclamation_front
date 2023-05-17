import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ReclamationService } from 'src/app/services/reclamation.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';

@Component({
  selector: 'app-add-reclamation',
  templateUrl: './add-reclamation.component.html',
  styleUrls: ['./add-reclamation.component.css']
})
export class AddReclamationComponent implements OnInit {

  userCreation: number;
  userLastmodified: number;

  dateUserCreation: Date;
  dateUserLastmodified: Date;

  constructor(public crudApi: ReclamationService, public fb: FormBuilder, public toastr: ToastrService,
    private router: Router, @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<AddReclamationComponent>,
    private tokenStorage: TokenStorageService) {
  }

  ngOnInit() {
    this.userCreation = this.tokenStorage.getUser().id;
    this.userLastmodified = this.tokenStorage.getUser().id;
    //this.dateUserCreation = new Date;
    console.log("User Cration id :: ", this.userCreation);
    if (this.crudApi.choixmenu == "A") {

      this.infoForm();
    };

  }

  infoForm() {
    this.crudApi.dataForm = this.fb.group({
      id: null,
      numReclamation: ['', [Validators.required]],
      dateReclamation: [new Date().toISOString().substring(0, 10), [Validators.required]],
      prenomNomSourceReclamation: ['', [Validators.required]],
      adresseSourceReclamation: ['', [Validators.required]],
      prenomNomSourceDestinataire: ['', [Validators.required]],
      adresseSourceDestinataire: ['', [Validators.required]],
      adresseLocal: ['', [Validators.required]],
      objetifReclamation: ['', [Validators.required]],
      observation: ['', [Validators.required]],
      refReclamation: ['', [Validators.required]],
      userCreation: this.userCreation,
      userLastmodified: this.userLastmodified,
      dateUserCreation: [new Date],
      dateUserLastmodified: [null]
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
      this.updateData();
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
          this.toastr.error('رمز الشكوى موجود بالفعل');

        }
      );
    this.router.navigate(['/acceuil/reclamations']);
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
            console.log("Response :: ", Response);
          }
        );
      },
        (error) => {
          console.log(error);
          const errorMessage = error.error.message;
          this.toastr.error('رمز الشكوى موجود بالفعل');

        }
      );
    this.router.navigate(['/acceuil/reclamations']);
    //location.reload();
  }


}
