import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Departement } from 'src/app/models/departement';
import { DepartementService } from 'src/app/services/departement.service';
import { EmployeService } from 'src/app/services/employe.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';

@Component({
  selector: 'app-add-employe',
  templateUrl: './add-employe.component.html',
  styleUrls: ['./add-employe.component.css']
})
export class AddEmployeComponent implements OnInit {

  DepartementsList: Departement[];
  departement: any = {};
  userCreation: number;
  userLastmodified: number;
  codeEmploye: string = '';
  ScategorieList: any;

  errorMessage = '';

  constructor(public crudApi: EmployeService,
    public departementService: DepartementService,
    public fb: FormBuilder, public toastr: ToastrService,
    private router: Router, public dialogRef: MatDialogRef<AddEmployeComponent>,
    private tokenStorage: TokenStorageService
  ) { }

  get f() { return this.crudApi.dataForm.controls; }

  ngOnInit() {
    this.userCreation = this.tokenStorage.getUser().id;
    this.userLastmodified = this.tokenStorage.getUser().id;
    if (this.crudApi.choixmenu == "A") { this.infoForm() };

    this.departementService.getAll().subscribe(
      response => { this.DepartementsList = response; }
    );


  }
  infoForm() {
    this.crudApi.dataForm = this.fb.group({
      id: null,
      nomPrenom: ['', [Validators.required]],
      email: ['', [Validators.required]],
      fonction: ['', [Validators.required]],
      adresse: ['', [Validators.required]],
      contact: ['', [Validators.required]],
      libDep: ['', [Validators.required]],
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
          this.errorMessage = errorMessage;
          this.toastr.error('البريد الإلكتروني موجود بالفعل');

        }
      );
    this.router.navigate(['/acceuil/employes']);
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
          this.errorMessage = errorMessage;
          this.toastr.error('البريد الإلكتروني موجود بالفعل');

        }
      );
    this.router.navigate(['/acceuil/employes']);
  }

  onSelectDepartement(nom: String) {
    this.departementService.getDepByNom(nom).subscribe(
      response => {
        this.departement = response;
        console.log("response", this.departement.libDep);
      }
    );
  }



}
