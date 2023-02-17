import { Component, OnInit, ViewChild } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';

export interface PeriodicElement {
  tenantName: string;
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

const ELEMENT_DATA: PeriodicElement[] = [];
@Component({
  selector: 'app-company-list',
  templateUrl: './company-list.component.html',
  styleUrls: ['./company-list.component.css'],
})
export class CompanyListComponent implements OnInit {
  element: any;
  companyid: any;
  filterData: any = [];
  loading: boolean = true;
  constructor(private store: AngularFirestore,  private _snackBar:MatSnackBar) {}

  displayedColumns: string[] = [
    'tenantName',
    'availability2',
    'depositTerm',
    'registered',
    // 'carpet',
    // 'super',
    // 'seatsNumber',
    // 'cabins',
    // 'washRooms',
    // 'meetingRoom',
    // 'pantry',
    // 'reception',
    // 'availableFrom',
    'Action',
  ];
  dataSource = new MatTableDataSource(ELEMENT_DATA);
  @ViewChild('paginator') paginator!: MatPaginator;

  ngOnInit(): void {
    this.getAll();
  }

  // -------------------Get Data---------------

  getAll(): void {
    this.store
      .collection('company')
      .snapshotChanges()
      .subscribe((res) => {
        this.element = [];
        res.map((data: any) => {
          this.element.push({
            ...data.payload.doc.data(),
            companyid: data.payload.doc.id,
          });
          console.log(this.element)
        });
        this.filterData = [...this.element];
        this.element = new MatTableDataSource(this.element);
        this.element.paginator = this.paginator;
        this.loading = false;
      });
  }

  // ----------------------Delele Data------

  async deleteuserData(element: any) {
    console.log(element);
    await this.store.collection('company').doc(element).delete();
    this._snackBar.open('Pin Deleted Successfully!', 'ok', {
      horizontalPosition: 'right',
      panelClass: 'notify-error',
      verticalPosition: 'top',
      duration: 3000,
    });
  }

  applyFilter(event: Event) {
    const filterValues = (event.target as HTMLInputElement).value;
    let filteredData = this.filterData.filter((e: any) => {
      return e.tenantName
        .trim()
        .toLocaleLowerCase()
        .match(filterValues.trim().toLocaleLowerCase());
    });
    this.element = new MatTableDataSource(filteredData);
    if (this.element.paginator) {
      this.element.paginator.firstPage();
    }
  }
}
