import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
export interface PeriodicElement {
  availability: string;
  tenant_Name: string;
  lease_Start: string;
  lease_Expiry: string;
  occupied_Floor: string;
}



@Component({
  selector: 'app-addproperty',
  templateUrl: './addproperty.component.html',
  styleUrls: ['./addproperty.component.css']
})
export class AddpropertyComponent implements OnInit {

 
  [x: string]: any;
  constructor(private store: AngularFirestore, private router: Router) { }
  data: any;
  element: any = [];
  editElement: any;
  propertyid: any;
  editMode: boolean = false;
  @ViewChild('paginator')
  paginator!: MatPaginator;

  ngOnInit(): void {
    this.getAll();
  }
  dataSource = this.element;

  getAll(): void {
    this.store
      .collection('property-details')
      .snapshotChanges()
      .subscribe((res) => {
        this.element = [];
        res.map((data: any) => {
          this.element.push({
            ...data.payload.doc.data(),
            propertyid
              : data.payload.doc.id,
          });
        });
      });
  }

  //  ------------add and Update--------------------
  @ViewChild('availability') availability!: ElementRef;
  @ViewChild('tenant_Name') tenant_Name: any;
  @ViewChild('lease_Start') lease_Start: any;
  @ViewChild('lease_Expiry') lease_Expiry: any;
  @ViewChild('occupied_Floor') occupied_Floor: any;

  selectedTeam = '';
  onSelected(): void {
    this.selectedTeam = this.availability.nativeElement.value;
  }

  getData(data: any) {
    this.store
      .collection('property-details')
      .add(data)
      .then(() => {
        console.log('added')
        alert("Data Added Sucessfully");
        this.router.navigateByUrl('/property-list');
      })
  }


  // ------------delete--------------------

  async deleteuserData(element: any) {
    await this.store.collection('property-details').doc(element).delete();
    alert('Record Deleted Successfully!');
  }

  applyFilter(event: Event) {
    const filterValues = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValues.trim().toLocaleLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
