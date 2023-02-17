import { Component, OnInit, ViewChild } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';

export interface PeriodicElement {
  Looking: string;
  id:string;
  propertycategory: string;
  city: string;
  ownership: string;
  Action: boolean;
}

const ELEMENT_DATA: PeriodicElement[] = [];

@Component({
  selector: 'app-property-list',
  templateUrl: './property-list.component.html',
  styleUrls: ['./property-list.component.css'],
})
export class PropertyListComponent implements OnInit {
  products: any;
  clss: string;
  msg: string;
  constructor(
    private store: AngularFirestore,
    private _snackBar: MatSnackBar
  ) {}

  data: any;
  editElement: any;
  element: any = [];
  userDetails: any;
  filterData: any = [];
  loading: boolean = true;

  displayedColumns: string[] = [
    'id',
    'Looking',
    'propertycategory',
    'city',
    'Houseno',
    'ownership',
    'Action',
  ];
  dataSource = new MatTableDataSource(ELEMENT_DATA);

  @ViewChild('paginator') paginator!: MatPaginator;
  ngOnInit(): void {
    this.getAll();
  }

  // -------------------Get Data---------------

  propertyDetail: any;

  getAll(): void {
    this.store
      .collection('propertyDetail')
      .snapshotChanges()
      .subscribe((res) => {
        this.element = [];
        res.map((data: any) => {
          this.element.push({
            ...data.payload.doc.data(),
            id: data.payload.doc.id,
          });
          console.log(this.element);
        });
        this.filterData = [...this.element];
        this.element = new MatTableDataSource(this.element);
        this.element.paginator = this.paginator;
        this.loading = false;
      });
  }


//   deleteSelectedData(element:any){

//   }


	
//  checkAllCheckBox() { 
//   this.element.forEach(element => element.checked = element.target.checked)
// }

// isAllCheckBoxChecked() {
//   return this.element.every(element => element.checked);
// }

// deleteProducts(): void {
//   const selectedProducts = this.element.filter(element => element.checked).map(element => element.id);
//   console.log (selectedProducts);
  
//   if(selectedProducts && selectedProducts.length > 0) {
//     this.element.deleteProducts(selectedProducts as number[]) 

//   } 
// }
  
	// isAllCheckBoxChecked() {
    // 	return this.propertyDetail.element.id(element=> element.checked);
    // }
    
    
    allcheck:boolean=false;
      chkbox(e:any){
          this.allcheck=!this.allcheck
          console.log(this.element.id);
      }

  // ----------------------Delele Data------
  async deleteuserData(element: any) {
    console.log(element.id);
    await this.store.collection('propertyDetail').doc(element.id).delete();
    this._snackBar.open('Data Deleted Successfully!', 'ok', {
      horizontalPosition: 'right',
      panelClass: 'notify-error',
      verticalPosition: 'top',
      duration: 3000,
    });
  }

  editMode: any;

  propertydetailsid: any;
  @ViewChild('tenant_Name') tenant_Name: any;
  @ViewChild('availability') availability: any;
  @ViewChild('lease_Expiry') lease_Expiry: any;
  @ViewChild('lease_Start') lease_Start: any;
  @ViewChild('occupied_Floor') occupied_Floor: any;

  async getData(data: any) {
    let userDetails = {
      tenant_Name: this.tenant_Name.nativeElement.value,
      availability: this.availability.nativeElement.value,
      lease_Expiry: this.lease_Expiry.nativeElement.value,
      lease_Start: this.lease_Start.nativeElement.value,
      occupied_Floor: this.occupied_Floor.nativeElement.value,
    };
    console.log('user data is', this.propertydetailsid);

    if (this.editMode) {
      this.store
        .collection('propertyDetail')
        .doc(this.propertydetailsid)
        .update(userDetails)
        .then(() => {
          console.log('data edited');
        })
        .catch((err) => console.log(err));
      this.editMode = false;
      this.tenant_Name.nativeElement.value = '';
      this.lease_Expiry.nativeElement.value = '';
      this.availability.nativeElement.value = '';
      this.lease_Start.nativeElement.value = '';
      this.occupied_Floor.nativeElement.value = '';
    } else {
      await this.store
        .collection('propertyDetail')
        .add(data)
        .then(() => {
          console.log('added');
          location.reload();
        });
    }
  }


  applyFilter(event: any) {
    let key = event.target.value.toLowerCase()
    const filterValues = (event.target as HTMLInputElement).value;
    let filteredData = this.filterData.filter((e: any) => {
      console.log(e.propertyDetail.step2.Houseno );

      if (e.propertyDetail.step2.Houseno.includes(key)  || e.propertyDetail.step2.city.toLowerCase().includes(key)  || e.propertyDetail.step3.squarebuiltupArea.superbuiltuparea.toLowerCase().includes(key) ) {
        return e
      }

    });
    
    this.element = new MatTableDataSource(filteredData);
    if (this.element.paginator) {
      this.element.paginator.firstPage();
    }
  }
}
