import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, ReactiveFormsModule, Validators }
  from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { MatDialog, MatDialogConfig, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router, ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Observable } from "rxjs";
import { Role } from 'src/app/models/role';
import { UserService } from 'src/app/services/user.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import { RoleService } from 'src/app/services/role.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})

export class AddUserComponent {
  userCreation: number;
  userLastmodified: number;
  isValid: boolean = true;
  articleService: any;
  Date: any;
  ListRole: Role[];
  totalInvent: number = 0;
  constructor(public service: UserService,
    private dialog: MatDialog,
    public dialogRef: MatDialogRef<AddUserComponent>,
    public fb: FormBuilder,
    private toastr: ToastrService,
    private router: Router,
    private currentRoute: ActivatedRoute,
    // private EmployeService: EmployeService,
    // private DepartementService: DepartementService,
    private RoleService: RoleService,
    private tokenStorage: TokenStorageService,
  ) { }
  get f() { return this.service.formData.controls }
  ngOnInit() {
    this.userCreation = this.tokenStorage.getUser().id;
    this.userLastmodified = this.tokenStorage.getUser().id;
    if (this.service.choixmenu == "A") { this.infoForm() };
    this.RoleService.getAllR().subscribe(
      response => { this.ListRole = response }
    );


  }



  infoForm() {
    this.service.formData = this.fb.group({
      id: null,
      username: ['', [Validators.required]],
      email: ['', [Validators.required]],
      password: ['', [Validators.required]],
      roles: [],
      userCreation: this.userCreation,
      userLastmodified: this.userLastmodified,
    });
  }

  ResetForm() {
    this.service.formData.reset();
  }
  reloadpage() {
    window.location.reload();
  }
  onSubmit() {

    if (this.service.choixmenu == "A") {
      this.addData();
    }
    else {
      this.updateData();
    }
  }


  addData() {
    this.service.createData(this.service.formData.value).
      subscribe(data => {
        this.service.getAll().subscribe(
          response => {
            this.service.listData = response;
            this.router.navigate(['/acceuil/users']).then(() => {
              //window.location.reload();
            });

          }
        );

      });

  }
  updateData() {
    this.service.formData.value.userLastmodified = this.userLastmodified;
    this.service.updatedata(this.service.formData.value.id, this.service.formData.value).
      subscribe(data => {
        //this.dialogRef.close();

        this.service.getAll().subscribe(
          response => {
            this.service.listData = response;
            this.router.navigate(['/acceuil/users']).then(() => {
              //window.location.reload();
            });
          }
        );

      });



  }

}
