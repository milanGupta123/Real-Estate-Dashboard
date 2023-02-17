import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
interface SideNavToggle {
  screenWidth: number;
  collapsed: boolean;
}
export interface PeriodicElement {

  availability2: string;
  depositTerm: string;
  registered: string;
  carpet: string;
  super: string;
  seatsNumber: string;
  cabins: string;
  washRooms: string;
  meetingRoom: string;
  pantry: string;
  reception: string;
  availableFrom: string;
  Action: boolean;
}


@Component({
  selector: 'app-addcompany',
  templateUrl: './addcompany.component.html',
  styleUrls: ['./addcompany.component.css']
})
export class AddcompanyComponent implements OnInit {

  [x: string]: any;
  constructor(private store: AngularFirestore, private router:Router,  private _snackBar:MatSnackBar) { }
  data: any;
  element: any = [];
  editElement: any;
  companyid
    : any;

  editMode: boolean = false;

  @ViewChild('paginator')
  paginator!: MatPaginator;

  ngOnInit(): void {
    this.getAll();
  }

  dataSource = this.element;

  getAll(): void {
    this.store
      .collection('company')
      .snapshotChanges()
      .subscribe((res) => {
        this.element = [];
        res.map((data: any) => {
          this.element.push({
            ...data.payload.doc.data(),
            companyid
              : data.payload.doc.id,
          });
        });
      });
  }




  //  ------------add and Update--------------------

  // this['Action'].nativeElement.value = element.Action;


  addData(data: any) {
    this.store
      .collection('company')
      .add(data)
      .then(() => {
        console.log('added')
        this._snackBar.open('Data Added Successfully!','✔', {
          horizontalPosition: 'right',
          verticalPosition: 'top',
          panelClass: 'notify-success',
          duration: 3000,
        });

        this.router.navigateByUrl('/company-list');
      })

  }




  isSideNavCollapsed = false;
  screenWidth = 0;


 onToggleSideNav(data: SideNavToggle):void{
    this.screenWidth = data.screenWidth;
    this.isSideNavCollapsed = data.collapsed;
 }






}
