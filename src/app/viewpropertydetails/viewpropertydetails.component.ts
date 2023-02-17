import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
// import { ActivatedRoute } from '@angular/router';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { style } from '@angular/animations';

@Component({
  selector: 'app-viewpropertydetails',
  templateUrl: './viewpropertydetails.component.html',
  styleUrls: ['./viewpropertydetails.component.css'],
})
export class ViewpropertydetailsComponent implements OnInit {
  constructor(
    private store: AngularFirestore,
    private router: ActivatedRoute
  ) {}

  data: any;
  editElement: any;
  element: any = [];
  userDetails: any;
  filterData: any = [];
  loading: boolean = true;

  dataid: any;

  ngOnInit(): void {
    this.router.params.subscribe((res) => {
      this.dataid = res['id'];
      console.log(this.dataid);
    });
    this.getAll();
  }

  // -------------------Get Data---------------

  propertyDetail: any;
  propertyData: any;
  getAll(): void {
    // console.log
    this.store
      .collection('propertyDetail')
      .doc(this.dataid)
      .get()
      .subscribe((res: any) => {
        this.propertyData = res.data().propertyDetail;
        console.log(this.propertyData);
      });
  }
}
