import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { SourceExecution } from 'src/app/models/sourceExecution';
import { TypeDecision } from 'src/app/models/typeDecision';
import { ArreteService } from 'src/app/services/arrete.service';
import { SourceExecutionService } from 'src/app/services/source-execution.service';
import { TypeDecisionService } from 'src/app/services/type-decision.service';

@Component({
  selector: 'app-execution-arrete',
  templateUrl: './execution-arrete.component.html',
  styleUrls: ['./execution-arrete.component.css']
})
export class ExecutionArreteComponent implements OnInit {

  SourceExecutionList: SourceExecution[];
  source: any = {};
  TypeDecisionList: TypeDecision[];
  typeDecision: any = {};

  constructor(public crudApi: ArreteService, public sourceService: SourceExecutionService,
    public typeDesService: TypeDecisionService,
    public fb: FormBuilder, public toastr: ToastrService,
    public dialogRef: MatDialogRef<ExecutionArreteComponent>,
    private router: Router) { }

  ngOnInit() {
    //charger la liste de source d'execution
    this.sourceService.getAll().subscribe(
      response => { this.SourceExecutionList = response; console.log(response); }
    );
    //charger la liste de source de type de decision
    this.typeDesService.getAll().subscribe(
      response => { this.TypeDecisionList = response; }
    );
  }
  infoForm() {
    this.crudApi.dataForm = this.fb.group({
      idArrete: null,
      dateExecution: [new Date(), [Validators.required]],
      numExecution: ['', [Validators.required]],
      typeDecision_Id: [0, [Validators.required]],
      sourceExecution_Id: [0, [Validators.required]],
      commentairesExecution: ['', [Validators.required]],

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
        this.toastr.success(' تم التنفيذ بنجاح');
        this.crudApi.getAll().subscribe(
          Response => {
            this.crudApi.listData = Response;
            console.log("Response :: ", Response);
          }
        );
      });
    this.router.navigate(['/acceuil/arretes']);
  }

  onSelectSourceExecution(sourceExecution_Id: number) {
    this.sourceService.getData(sourceExecution_Id).subscribe(
      response => {
        this.source = response;
      }
    );
  }
  onSelectTypeDecision(typeDecision_Id: number) {
    this.typeDesService.getData(typeDecision_Id).subscribe(
      response => {
        this.typeDecision = response;
      }
    );
  }

}
