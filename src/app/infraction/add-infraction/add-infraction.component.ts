import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Employee } from 'src/app/models/Employee';
import { Reclamation } from 'src/app/models/reclamation';
import { EmployeService } from 'src/app/services/employe.service';
import { InfractionService } from 'src/app/services/infraction.service';
import { ReclamationService } from 'src/app/services/reclamation.service';

@Component({
  selector: 'app-add-infraction',
  templateUrl: './add-infraction.component.html',
  styleUrls: ['./add-infraction.component.css']
})
export class AddInfractionComponent implements OnInit {

  ReclamationsList: Reclamation[];
  rec: any = {};
  EmployeesList: Employee[];
  emp: any = {};

  constructor(public crudApi: InfractionService, public reclamationService: ReclamationService,
    public empService: EmployeService,
    public fb: FormBuilder, public toastr: ToastrService,
    private router: Router) { }

  get f() { return this.crudApi.dataForm.controls; }

  ngOnInit() {

    if (this.crudApi.choixmenu == "A") { this.infoForm() };

    this.reclamationService.getAll().subscribe(
      response => { this.ReclamationsList = response; console.log(response); }
    );
    this.empService.getAll().subscribe(
      response => { this.EmployeesList = response; }
    );

  }
  infoForm() {
    this.crudApi.dataForm = this.fb.group({
      idInfraction: null,
      numInfraction: [0, [Validators.required]],
      dateInfraction: [new Date(), [Validators.required]],
      heureInfraction: ['', [Validators.required]],
      cinSourceInfraction: ['', [Validators.required, Validators.minLength(8)]],
      descriptionInfraction: ['', [Validators.required]],
      niveauTraveaux: ['', [Validators.required]],
      degats: ['', [Validators.required]],
      descriptions: ['', [Validators.required]],
      code_reclamation: [0, [Validators.required]],
      idF: [0, [Validators.required]],
      numReclamation: [0, [Validators.required]],
      nom: ['', [Validators.required]],
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
        this.router.navigate(['/reclamation/acceuil/infractions']);
        console.log(data);
      });
    location.reload();
  }
  updateData() {
    this.crudApi.updatedata(this.crudApi.dataForm.value.idInfraction, this.crudApi.dataForm.value).
      subscribe(data => {
        this.toastr.success('Modification Faite avec Success');
        this.router.navigate(['/reclamation/acceuil/infractions']);
      });
    location.reload();
  }

  onSelectReclamation(numReclamation: number) {
    this.reclamationService.getData(numReclamation).subscribe(
      response => {
        this.rec = response;
      }
    );
  }
  onSelectEmployee(nom: number) {
    this.empService.getData(nom).subscribe(
      response => {
        this.emp = response;
      }
    );
  }


}
