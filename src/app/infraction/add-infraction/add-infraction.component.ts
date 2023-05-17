import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Employe } from 'src/app/models/employe';
import { Reclamation } from 'src/app/models/reclamation';
import { SourceExecution } from 'src/app/models/sourceExecution';
import { EmployeService } from 'src/app/services/employe.service';
import { EntiteService } from 'src/app/services/entite.service';
import { InfractionService } from 'src/app/services/infraction.service';
import { ReclamationService } from 'src/app/services/reclamation.service';
import { SourceExecutionService } from 'src/app/services/source-execution.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';

@Component({
  selector: 'app-add-infraction',
  templateUrl: './add-infraction.component.html',
  styleUrls: ['./add-infraction.component.css']
})
export class AddInfractionComponent implements OnInit {

  ReclamationsList: Reclamation[];
  rec: any = {};
  EmployeesList: Employe[];
  emp: any = {};
  codeEmploye: string = '';
  //source
  sourceExecution: string = '';
  source: any = {};
  SourceList: SourceExecution[];

  userCreation: number;
  userLastmodified: number;

  constructor(public crudApi: InfractionService,
    public reclamationService: ReclamationService,
    public empService: EmployeService,
    public fb: FormBuilder, public toastr: ToastrService,
    private router: Router, public dialogRef: MatDialogRef<AddInfractionComponent>,
    private tokenStorage: TokenStorageService,
    public sourceService: EntiteService
  ) { }

  ngOnInit() {
    this.userCreation = this.tokenStorage.getUser().id;
    this.userLastmodified = this.tokenStorage.getUser().id;

    if (this.crudApi.choixmenu == "A") { this.infoForm(); };

    //getReclamation
    this.reclamationService.getAll().subscribe(
      response => { this.ReclamationsList = response; console.log(response); }
    );
    //getEmploye
    this.empService.getAll().subscribe(
      response => { this.EmployeesList = response; }
    );
    //getSource
    this.sourceService.getAll().subscribe(
      response => { this.SourceList = response; }
    );
  }

  infoForm() {
    this.crudApi.dataForm = this.fb.group({
      idInfraction: null,
      numInfraction: [[Validators.required]],
      dateInfraction: [new Date(Date.now()), [Validators.required]],
      descriptionInfraction: ['', [Validators.required]],
      niveauTraveaux: ['', [Validators.required]],
      degats: ['', [Validators.required]],
      descriptions: ['', [Validators.required]],
      numReclamation: [0, [Validators.required]],
      codeEmploye: ['', [Validators.required]],
      source: ['', [Validators.required]],
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
      this.infoForm();
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
    this.router.navigate(['/acceuil/infractions']);
  }
  updateData() {
    this.crudApi.dataForm.value.userLastmodified = this.userLastmodified;
    this.crudApi.updatedata(this.crudApi.dataForm.value.idInfraction, this.crudApi.dataForm.value).
      subscribe(data => {
        this.dialogRef.close();
        this.toastr.success(' تم التغيير بنجاح');
        this.crudApi.getAll().subscribe(
          Response => {
            this.crudApi.listData = Response;
          }
        );
        //location.reload();
      });
    this.router.navigate(['/acceuil/infractions']);
  }

  onSelectReclamation(numReclamation: number) {
    this.reclamationService.getData(numReclamation).subscribe(
      response => {
        this.rec = response;
      }
    );
  }

  onSelectEmp(nom: String) {
    this.empService.getEmp(nom).subscribe(
      response => {
        this.emp = response;
        console.log("response", this.emp.nomPrenom);
      }
    );
  }

  onSelectSource(nom: String) {
    this.sourceService.getEntiteByNom(nom).subscribe(
      response => {
        this.source = response;
        console.log("response", this.source.nom);
      }
    );
  }




}
