import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user';
import { MatDialog, MatDialogConfig, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, FormControl, ReactiveFormsModule, Validators }
  from '@angular/forms';

//import { ConfirmDialogComponent } from 'src/app/confirmDialog/confirm-dialog/confirm-dialog.component';
@Component({
  selector: 'app-list-user',
  templateUrl: './list-user.component.html',
  styleUrls: ['./list-user.component.css']
})
export class ListUserComponent {

  p: number = 1;
  userListe: any[] = [];
  SearchText: string;
  constructor(private service: UserService, private router: Router, private dialog: MatDialog,
    private toastr: ToastrService, public fb: FormBuilder,
  ) { }
  ngOnInit() {
    this.service.getAll().subscribe(
      response => { this.userListe = response; }
    );
    // this.reloadpage();

  }
  onDelete(id: number) {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cet utilisateur ?')) {
      this.service.deleteAll(id)
        .subscribe(
          data => {
            console.log(data);
            this.service.getAll().subscribe(
              response => { this.userListe = response; }
            );
            //this.reloadpage();
            this.toastr.warning(' données supprimées avec succès !');
          },
          error => console.log(error));
    }

  }
  reloadpage() {
    window.location.reload();
  }

  newComm() {
    this.service.choixmenu = "A"
    this.router.navigate(['/acceuil/user']);
  }

  onSelect(item: User) {

    this.service.formData = this.fb.group(Object.assign({}, item));
    this.service.formData.patchValue({

    });
    this.service.choixmenu = "M"
    this.router.navigate(['/acceuil/user']);
  }
}
