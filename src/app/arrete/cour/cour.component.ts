import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ArreteService } from 'src/app/services/arrete.service';

@Component({
  selector: 'app-cour',
  templateUrl: './cour.component.html',
  styleUrls: ['./cour.component.css']
})
export class CourComponent implements OnInit {

  constructor(public crudApi: ArreteService,
    public fb: FormBuilder,
    public toastr: ToastrService,
    public dialogRef: MatDialogRef<CourComponent>,
    private router: Router) { }

  ngOnInit() {

  }
  infoForm() {
    this.crudApi.dataForm = this.fb.group({
      idArrete: null,
      numBoMinistre: ['', [Validators.required]],
      dateNumBoMinistre: [new Date, [Validators.required]],
      commentairesMinistre: ['', [Validators.required]],
    });
  }

  ResetForm() {
    this.crudApi.dataForm.reset();
  }
  onSubmit() {
    this.updateData()
  }

  updateData() {
    this.crudApi.updatedata(this.crudApi.dataForm.value.idArrete, this.crudApi.dataForm.value).
      subscribe(data => {
        this.dialogRef.close();
        this.toastr.success(' تم الاحالة بنجاح');
        this.crudApi.getAll().subscribe(
          Response => {
            this.crudApi.listData = Response;
            console.log("Response :: ", Response);
          }
        );
      });
    this.router.navigate(['/acceuil/arretes']);
  }
  exportPdf() {
    this.crudApi.courtPdf(this.crudApi.dataForm.value.idArrete).subscribe(response => {
      const blob = new Blob([response], { type: 'application/pdf' });

      const data = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = data;
      link.download = 'احالة على العدالة .pdf';
      link.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true, view: window }));

      setTimeout(function () {
        window.URL.revokeObjectURL(data);
        link.remove();
      }, 100);
    })

  }

}
