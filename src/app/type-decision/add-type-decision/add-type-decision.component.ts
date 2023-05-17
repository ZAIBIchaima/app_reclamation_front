import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import { TypeDecisionService } from 'src/app/services/type-decision.service';

@Component({
  selector: 'app-add-type-decision',
  templateUrl: './add-type-decision.component.html',
  styleUrls: ['./add-type-decision.component.css']
})
export class AddTypeDecisionComponent implements OnInit {

  userCreation: number;
  userLastmodified: number;

  constructor(public crudApi: TypeDecisionService, public fb: FormBuilder, public toastr: ToastrService,
    private router: Router, @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<AddTypeDecisionComponent>,
    private tokenStorage: TokenStorageService) {
  }

  ngOnInit() {
    this.userCreation = this.tokenStorage.getUser().id;
    this.userLastmodified = this.tokenStorage.getUser().id;
    if (this.crudApi.choixmenu == "A") { this.infoForm() };
  }
  infoForm() {
    this.crudApi.dataForm = this.fb.group({
      id: null,
      nomType: ['', [Validators.required]],
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
      });
    this.router.navigate(['/acceuil/types_decision']);
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
      });
    this.router.navigate(['/acceuil/types_decision']);
  }


}
