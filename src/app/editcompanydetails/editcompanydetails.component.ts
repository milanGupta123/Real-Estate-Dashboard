import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-editcompanydetails',
  templateUrl: './editcompanydetails.component.html',
  styleUrls: ['./editcompanydetails.component.css'],
})
export class EditcompanydetailsComponent implements OnInit {
  singlecompanylist: any;

  constructor(
    private store: AngularFirestore,
    private router: ActivatedRoute,
    private _router: Router,
    private _snackBar:MatSnackBar
  ) {}
  element: any;
  id: any;
  addNewPin: any = [];
  companyid: any;
  dataid: any;

  ngOnInit(): void {
    this.router.params.subscribe((res) => {
      this.dataid = res['id'];
      console.log(this.dataid, 'id coming with data');
    });
    this.getAll();
  }

  getAll() {
    this.store
      .collection('company')
      .doc(this.dataid)
      .get()
      .subscribe((res: any) => {
        console.log(res.data(), 'data coming for tha data');
        this.singlecompanylist = res.data();
        console.log(this.singlecompanylist, 'datdat');
      });
  }

  SubmitUpdateForm(e: any) {
    console.log(e, 'updated data is here');

    this.addNewPin = {
      ['availability2']: e.availability2,
      ['depositTerm']: e.depositTerm,
      ['registered']: e.registered,
      ['carpet']: e.carpet,
      ['super']: e.super,
      ['seatsNumber']: e.seatsNumber,
      ['cabins']: e.cabins,
      ['washRooms']: e.washRooms,
      ['meetingRoom']: e.meetingRoom,
      ['pantry']: e.pantry,
      ['reception']: e.reception,
      ['availableFrom']: e.availableFrom,
      ['tenantName']: e.tenantName,
      ['tenantContact']: e.tenantContact,
      ['tenantEmailid']: e.tenantEmailid,
      ['companyName']: e.companyName,
      ['adminName']: e.adminName,
      ['companyServices']: e.companyServices,
      ['Website']: e.Website,
      ['rentRevpermate']: e.rentRevpermate,
      ['availability']: e.availability,
    };

    console.log('editpin', this.addNewPin);
    console.log('Single pin data and routing', this.addNewPin);
    this.store.collection('company').doc(this.dataid).set(this.addNewPin);
    this._snackBar.open('Data Updated Successfully!','✔', {
      horizontalPosition: 'right',
      verticalPosition: 'top',
      panelClass: 'notify-success',
      duration: 3000,
    });
    this._router.navigateByUrl('/company-list');
  }
}
