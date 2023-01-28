import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ReclamationService } from 'src/app/services/reclamation.service';

@Component({
  selector: 'app-add-reclamation',
  templateUrl: './add-reclamation.component.html',
  styleUrls: ['./add-reclamation.component.css']
})
export class AddReclamationComponent implements OnInit {

  value = new Date();

  constructor(public crudApi: ReclamationService, public fb: FormBuilder, public toastr: ToastrService,
    private router: Router,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<AddReclamationComponent>,

  ) { }
  get f() { return this.crudApi.dataForm.controls; }
  ngOnInit() {
    if (this.crudApi.choixmenu == "A") { this.infoForm() };
  }

  infoForm() {
    this.crudApi.dataForm = this.fb.group({
      idReclamation: null,
      numReclamation: ['', [Validators.required]],
      dateReclamation: ['', [Validators.required]],
      prenom_nomSourceReclamation: ['', [Validators.required]],
      adresseSourceReclamation: ['', [Validators.required]],
      prenom_nomSourceDestinataire: ['', [Validators.required]],
      adresseSourceDestinataire: ['', [Validators.required]],
      adresseLocal: ['', [Validators.required]],
      objetifReclamation: ['', [Validators.required]],
      observation: ['', [Validators.required]],
      dateCreation: ['', [Validators.required]],
      dateDernierModification: ['', [Validators.required]],

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
        this.toastr.success('Validation Faite avec Success');
        this.router.navigate(['/acceuil/reclamations']);
      });
    //location.reload();
  }

  updateData() {
    this.crudApi.updatedata(this.crudApi.dataForm.value.idReclamation, this.crudApi.dataForm.value).
      subscribe(data => {
        this.dialogRef.close();
        this.toastr.success('Modification Faite avec Success');
        this.router.navigate(['/acceuil/reclamations']);
      });
    location.reload();
  }

}
