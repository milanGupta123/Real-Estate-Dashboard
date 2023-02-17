import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { BreakpointObserver } from '@angular/cdk/layout';
import { StepperOrientation } from '@angular/material/stepper';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Country, State, City } from 'country-state-city';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { DomSanitizer } from '@angular/platform-browser';
import { DialogBoxComponent } from '../dialog-box/dialog-box.component';
import { isNgContainer } from '@angular/compiler';
@Component({
  selector: 'app-property-details',
  templateUrl: './property-details.component.html',
  styleUrls: ['./property-details.component.css'],
})
export class PropertyDetailsComponent implements OnInit {
  firstFormGroup = this._formBuilder.group({
    firstCtrl: ['', Validators.required],
  });
  secondFormGroup = this._formBuilder.group({
    secondCtrl: ['', Validators.required],
  });
  thirdFormGroup = this._formBuilder.group({
    thirdCtrl: ['', Validators.required],
  });
  forthFormGroup = this._formBuilder.group({
    forthctrl: ['', Validators.required],
  });
  fifthFormGroup = this._formBuilder.group({
    fifthctrl: ['', Validators.required],
  });
  stepperOrientation: Observable<StepperOrientation>;

  constructor(
    private _formBuilder: FormBuilder,
    breakpointObserver: BreakpointObserver,
    private af: AngularFireStorage,
    private store: AngularFirestore,
    private router: Router,
    private _snackBar: MatSnackBar, // public dialog: MatDialog
    private domSanitizer: DomSanitizer,
    private dialog: MatDialog
  ) {
    this.stepperOrientation = breakpointObserver
      .observe('(min-width: 800px)')
      .pipe(map(({ matches }) => (matches ? 'horizontal' : 'vertical')));
  }
  openDialog() {
    const dialogRef = this.dialog.open(DialogBoxComponent);

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }

  // @Component({
  //   selector: 'app-dialog-box',
  //   templateUrl: './dialog-box.component.html',
  //   styleUrls: ['./dialog-box.component.css']
  // })

  ngOnInit(): void {
    this.getAllCities();
    this.getAllCountries();
  }
  propertyDetails: any = {
    step1: {},
    step2: {},
    step3: {
      equipment: [],
      othersroom: [],
      firesafety: [],
      carpertArea: {},
      builtupArea: {},
      squarebuiltupArea: {},
    },
    step4: { images: [] },
    step5: { tex: [], Brokarageoption: [], Maintenance: {} },
  };
  allCities: any = [];

  getAllCities() {
    console.log(City.getCitiesOfCountry('IN'));
    this.allCities = City.getCitiesOfCountry('IN');
  }


  allCountry:any=[];

  getAllCountries(){
   console.log(Country.getAllCountries());
   this.allCountry = Country.getAllCountries();
  }


  addpricingbox = false;
  addpricing() {
    this.addpricingbox = !this.addpricingbox;
  }
  yescon = false;
  yes() {
    this.yescon = true;
  }

  nobtnfrm = true;
  no() {
    this.nobtnfrm = false;
    this.yescon = false;
  }

  intopt = false;
  addoptions() {
    this.intopt = !this.intopt;
  }

  display = false;

  Sell(d: any) {
    this.propertyDetails.step1 = {};

    this.hospitalitycontainer = false;
    this.officecontainer = false;
    this.retailcontainer = false;
    this.plotcontainer = false;
    this.storagecontainer = false;
    this.industrycontainer = false;
    this.comdiv = false;
    this.resdiv = false;
    this.commercialshopcontainer = false;
    this.undercontainer = false;
    this.readycontainer = false;

    console.log(d.target.textContent);
    if (d.target.textContent == 'Sell') {
      this.display = true;
      this.RentLease = false;
      document
        .querySelectorAll('.radioinput2')  
        .forEach((e: any) => (e.style.backgroundColor = 'black'));
      d.target.parentElement.style.backgroundColor = 'gray';
    } else {
      this.RentLease = true;
      this.display = false;
      document
        .querySelectorAll('.radioinput2')
        .forEach((e: any) => (e.style.backgroundColor = 'black'));
      d.target.parentElement.style.backgroundColor = ' gray';
    }
    this.propertyDetails.step1.Looking = d.target.textContent;
    console.log(this.propertyDetails);
  }
  RentLease = false;
  hidebedroom = false;
  resdiv = false;
  bathroombox = false;
  hidebacony= false;
  hideoptionalroom=false;
  hidefunishring=false;
  hidePower=false;
  res(e: any) {
    console.log(e.target.value);
    if (e.target.value == 'Residential') {
      this.resdiv = true;
      this.hidebedroom = true;
      this.hidebacony= true;
      this.bathroombox = true;
      this.hidefunishring=true;
      this.hideoptionalroom=true;
      this.hidePower=true;
      this.comdiv = false;
      this.retailcontainer = false;
      this.officecontainer = false;
      this.plotcontainer = false;
      this.storagecontainer = false;
      this.industrycontainer = false;
      this.hospitalitycontainer = false;
      this.undercontainer = false;
    this.readycontainer = false;
    } else {
      this.comdiv = true;
      this.resdiv = false;
      this.hidebedroom = false;
      this.hidePower= false;
      this.bathroombox = false;
      this.hidebacony= false;
      this.hideoptionalroom=false;
      this.hidefunishring=false;
    }

    // -----------dialog-----------
    if (this.propertyDetails.step1.propertycategory != undefined) {
      let confirm3 = confirm('Press a button!');

      if (confirm3) {
        this.propertyDetails.step1 = {
          Looking: this.propertyDetails.step1.Looking,
        };
        console.log(this.propertyDetails);
      } else {
        if (this.propertyDetails.step1.propertycategory == 'Residential') {
          this.resdiv = true;
          this.comdiv = false;
        } else {
          this.resdiv = false;
          this.comdiv = true;
        }
      }
    }
    this.propertyDetails.step1.propertycategory = e.target.value;
    console.log(this.propertyDetails);
  }

  comdiv = false;

  residentalOption(f: any) {
    console.log(f.target.textContent);
    this.propertyDetails.step1.type = f.target.textContent;
    console.log(this.propertyDetails);
    document.querySelectorAll('.radioinput4').forEach((ef: any) => {
      ef.style.backgroundColor = 'black';
      f.target.parentElement.style.backgroundColor = ' gray';
    });
  }

  officecontainer = false;
  office() {
    this.officecontainer = true;
    this.retailcontainer = false;
    this.plotcontainer = false;
    this.storagecontainer = false;
    this.industrycontainer = false;
    this.hospitalitycontainer = false;
    this.undercontainer = false;
    this.readycontainer = false;
  }

  retailcontainer = false;
  retail() {
    this.retailcontainer = true;
    this.officecontainer = false;
    this.plotcontainer = false;
    this.storagecontainer = false;
    this.industrycontainer = false;
    this.hospitalitycontainer = false;
    this.undercontainer = false;
    this.readycontainer = false;
  }

  plotcontainer = false;
  plot() {
    this.plotcontainer = true;
    this.officecontainer = false;
    this.retailcontainer = false;
    this.storagecontainer = false;
    this.industrycontainer = false;
    this.hospitalitycontainer = false;
    this.undercontainer = false;
    this.readycontainer = false;
  }

  storagecontainer = false;
  storage() {
    this.storagecontainer = true;
    this.officecontainer = false;
    this.retailcontainer = false;
    this.plotcontainer = false;
    this.industrycontainer = false;
    this.hospitalitycontainer = false;
    this.undercontainer = false;
    this.readycontainer = false;
  }
  industrycontainer = false;
  industry() {
    this.industrycontainer = true;
    this.officecontainer = false;
    this.retailcontainer = false;
    this.plotcontainer = false;
    this.storagecontainer = false;
    this.hospitalitycontainer = false;
    this.undercontainer = false;
    this.readycontainer = false;
  }
  hospitalitycontainer = false;
  hospitality() {
    this.hospitalitycontainer = true;
    this.officecontainer = false;
    this.retailcontainer = false;
    this.plotcontainer = false;
    this.storagecontainer = false;
    this.industrycontainer = false;
    this.undercontainer = false;
    this.readycontainer = false;
  }
  other() {
    this.hospitalitycontainer = false;
    this.officecontainer = false;
    this.retailcontainer = false;
    this.plotcontainer = false;
    this.storagecontainer = false;
    this.industrycontainer = false;
    this.undercontainer = false;
    this.readycontainer = false;
  }

  hiddenoffice(g: any) {
    console.log(g.target.textContent);
    this.propertyDetails.step1.subtype = g.target.textContent;
    console.log(this.propertyDetails);
    document.querySelectorAll('.radioinput5').forEach((eg: any) => {
      eg.style.backgroundColor = 'black';
      g.target.parentElement.style.backgroundColor = ' gray';
    });
  }

  commercialshopcontainer = false;
  commersialshop() {
    this.commercialshopcontainer = true;
  }

  retailOption(h: any) {
    console.log(h.target.textContent);
    this.propertyDetails.step1.childsubtype = h.target.textContent;
    console.log(this.propertyDetails);
    document.querySelectorAll('.radioinput6').forEach((eh: any) => {
      eh.style.backgroundColor = 'black';
      h.target.parentElement.style.backgroundColor = ' gray';
    });
  }


  ageproperty(e: any) {
    console.log(e.target.textContent);
    this.propertyDetails.step1.availitysubtype = e.target.textContent;
    console.log(this.propertyDetails);
    document.querySelectorAll('.radioinput13').forEach((ei: any) => {
      ei.style.backgroundColor = 'black';
      e.target.parentElement.style.backgroundColor = ' gray';
    });
  }

  readycontainer = false;
  ready() {
    this.readycontainer = true;
    this.undercontainer = false;
  }
  undercontainer = false;
  under() {
    this.undercontainer = true;
    this.readycontainer = false;
  }

  bareShell(){
    this.undercontainer = false;
    this.readycontainer = false;
  }
  coOffice(){
    this.undercontainer = false;
    this.readycontainer = false;
  }
  WarmShell(){
    this.undercontainer = false;
    this.readycontainer = false;
  }


  undercon(e: any) {
    console.log(e.target.textContent);
    this.propertyDetails.step1.availitystatus = e.target.textContent;
    console.log(this.propertyDetails);
    document.querySelectorAll('.radioinput12').forEach((ei: any) => {
      ei.style.backgroundColor = 'black';
      e.target.parentElement.style.backgroundColor = ' gray';
    });
  }

  //-----------------step1 end----------------

  // ------step2-------------
  inputfield0(e: any) {
    console.log(e.target.value);
    this.propertyDetails.step2.Country = e.target.value;
    console.log(this.propertyDetails);
  }

  inputfield1(e: any) {
    console.log(e.target.value);
    this.propertyDetails.step2.city = e.target.value;
    console.log(this.propertyDetails);
  }
  inputfield2(e: any) {
    console.log(e.target.value);
    this.propertyDetails.step2.Apartmentsociety = e.target.value;
    console.log(this.propertyDetails);
  }
  inputfield3(e: any) {
    console.log(e.target.value);
    this.propertyDetails.step2.Locality = e.target.value;
    console.log(this.propertyDetails);
  }
  inputfield4(e: any) {
    console.log(e.target.value);
    this.propertyDetails.step2.Sublocality = e.target.value;
    console.log(this.propertyDetails);
  }
  inputfield5(e: any) {
    console.log(e.target.value);
    this.propertyDetails.step2.Houseno = e.target.value;
    console.log(this.propertyDetails);
  }
  inputfield6(e: any) {
    console.log(e.target.value);
    this.propertyDetails.step2.Block = e.target.value;
    console.log(this.propertyDetails);
  }
  inputfield7(e: any) {
    console.log(e.target.value);
    this.propertyDetails.step2.Floor = e.target.value;
    console.log(this.propertyDetails);
  }

  //-----------------step2 end----------------

  // -----------step3-----------

  bedroom1(g: any) {
    console.log(g.target.textContent);
    this.propertyDetails.step3.Addroom = g.target.textContent;
    console.log(this.propertyDetails);
    document.querySelectorAll('.radioinput7').forEach((eg: any) => {
      eg.style.backgroundColor = 'black';
      g.target.parentElement.style.backgroundColor = ' gray';
    });
  }

  addroominput = false;
  ddddd = true;
  inputbedroom() {
    this.addroominput = true;
    this.ddddd = false;
  }

  inputwashroomtype = false;
  fffff = true;
  inputwashroom() {
    this.inputwashroomtype = true;
    this.fffff = false;
  }

  inputbalconiestype = false;
  ggg = true;
  inputbalconies() {
    this.inputbalconiestype = true;
    this.ggg = false;
  }

  carpetareacontainer = false;
  carpetarea() {
    this.carpetareacontainer = true;
  }

  builtupareacontainer = false;
  builtuparea() {
    this.builtupareacontainer = true;
  }

  furnishedoption = false;
  choosefurnished() {
    this.furnishedoption = true;
  }

  unfurnished() {
    this.furnishedoption = false;
  }

  // extraroom(h: any) {
  //   console.log(h.target.textContent);
  //   this.propertyDetails.step3.otherroom = h.target.textContent;
  //   console.log(this.propertyDetails);
  //   document.querySelectorAll('.radioinput10').forEach((eg: any) => {
  //     eg.style.backgroundColor = 'white';
  //     h.target.parentElement.style.backgroundColor = '#f0f9ff';
  //   });
  // }

  funishring(h: any) {
    console.log(h.target.textContent);
    this.propertyDetails.step3.funishring = h.target.textContent;
    console.log(this.propertyDetails);
    document.querySelectorAll('.radioinput11').forEach((eg: any) => {
      eg.style.backgroundColor = 'black';
      h.target.parentElement.style.backgroundColor = ' gray';
    });
  }

  Drypantry(h: any) {
    console.log(h.target.textContent);
    this.propertyDetails.step3.pantry = h.target.textContent;
    console.log(this.propertyDetails);
    document.querySelectorAll('.radioinput20').forEach((eg: any) => {
      eg.style.backgroundColor = 'black';
      h.target.parentElement.style.backgroundColor = ' gray';
    });
  }
  Wetpantry(h: any) {
    console.log(h.target.textContent);
    this.propertyDetails.step3.pantry = h.target.textContent;
    console.log(this.propertyDetails);
    document.querySelectorAll('.radioinput20').forEach((eg: any) => {
      eg.style.backgroundColor = 'black';
      h.target.parentElement.style.backgroundColor = ' gray';
    });
  }

  washroom(h: any) {
    console.log(h.target.textContent);
    this.propertyDetails.step3.washroom = h.target.textContent;
    console.log(this.propertyDetails);
    document.querySelectorAll('.radioinput29').forEach((eg: any) => {
      eg.style.backgroundColor = 'black';
      h.target.parentElement.style.backgroundColor = ' gray';
    });
  }

  conference(h: any) {
    console.log(h.target.textContent);
    this.propertyDetails.step3.conference = h.target.textContent;
    console.log(this.propertyDetails);
    document.querySelectorAll('.radioinput30').forEach((eg: any) => {
      eg.style.backgroundColor = 'black';
      h.target.parentElement.style.backgroundColor = ' gray';
    });
  }

  Reception(h: any) {
    console.log(h.target.textContent);
    this.propertyDetails.step3.Reception = h.target.textContent;
    console.log(this.propertyDetails);
    document.querySelectorAll('.radioinput31').forEach((eg: any) => {
      eg.style.backgroundColor = 'black';
      h.target.parentElement.style.backgroundColor = ' gray';
    });
  }
  Highspeedlift(h: any) {
    console.log(h.target.textContent);
    this.propertyDetails.step3.liftType = h.target.textContent;
    console.log(this.propertyDetails);
    document.querySelectorAll('.radioinput21').forEach((eg: any) => {
      eg.style.backgroundColor = 'black';
      h.target.parentElement.style.backgroundColor = ' gray';
    });
  }
  Servicelift(h: any) {
    console.log(h.target.textContent);
    this.propertyDetails.step3.liftType = h.target.textContent;
    console.log(this.propertyDetails);
    document.querySelectorAll('.radioinput21').forEach((eg: any) => {
      eg.style.backgroundColor = 'black';
      h.target.parentElement.style.backgroundColor = ' gray';
    });
  }
  Powerlift(h: any) {
    console.log(h.target.textContent);
    this.propertyDetails.step3.liftType = h.target.textContent;
    console.log(this.propertyDetails);
    document.querySelectorAll('.radioinput21').forEach((eg: any) => {
      eg.style.backgroundColor = 'black';
      h.target.parentElement.style.backgroundColor = ' gray';
    });
  }

  bathroom(f: any) {
    console.log(f.target.textContent);
    this.propertyDetails.step3.addbathroom = f.target.textContent;
    console.log(this.propertyDetails);
    document.querySelectorAll('.radioinput8').forEach((ef: any) => {
      ef.style.backgroundColor = 'black';
      f.target.parentElement.style.backgroundColor = ' gray';
    });
  }

  otherbalcony: number = 0;

  addBalconie(d: any) {
    console.log(d);
    this.propertyDetails.step3.addbalconies = d.otherbalcony;
    this.otherbalcony = d.otherbalcony;
    this.inputbalconiestype = false;
    this.ggg = true;
  }

  balconies(i: any) {
    console.log(i.target.textContent);
    this.propertyDetails.step3.addbalconies = i.target.textContent;
    console.log(this.propertyDetails);
    document.querySelectorAll('.radioinput9').forEach((ei: any) => {
      ei.style.backgroundColor = 'black';
      i.target.parentElement.style.backgroundColor = ' gray';
    });
  }

  parkingAbablity(e:any){
    console.log(e.target.textContent);
    this.propertyDetails.step3.ParkingAvailability = e.target.textContent;
    console.log(this.propertyDetails);
    document.querySelectorAll('.radioinput32').forEach((ei: any) => {
      ei.style.backgroundColor = 'black';
      e.target.parentElement.style.backgroundColor = ' gray';
    });
  }


  parking: number = 0;

  decParking() {
    this.parking == 0 ? null : this.parking--;
    this.propertyDetails.step3.underparking = this.parking;
    console.log(this.propertyDetails);
  }

  incParking() {
    this.parking == 20 ? null : this.parking++;
    this.propertyDetails.step3.underparking = this.parking;
    console.log(this.propertyDetails);
  }

  openparking: number = 0;

  DecParking() {
    this.openparking == 0 ? null : this.openparking--;
    this.propertyDetails.step3.Openparking = this.openparking;
    console.log(this.propertyDetails);
  }

  IncParking() {
    this.openparking == 20 ? null : this.openparking++;
    this.propertyDetails.step3.Openparking = this.openparking;
    console.log(this.propertyDetails);
  }



  Private: number = 0;

  decprivate() {
    this.Private == 0 ? null : this.Private--;
    this.propertyDetails.step3.Privatewashrom = this.Private;
    console.log(this.propertyDetails);
  }

  incPrivate() {
    this.Private == 20 ? null : this.Private++;
    this.propertyDetails.step3.Privatewashrom = this.Private;
    console.log(this.propertyDetails);
  }

  Shared: number = 0;

  decshared() {
    this.Shared == 0 ? null : this.Shared--;
    this.propertyDetails.step3.Sharedwashroom = this.Shared;
    console.log(this.propertyDetails);
  }

  incshared() {
    this.Shared == 20 ? null : this.Shared++;
    this.propertyDetails.step3.Sharedwashroom = this.Shared;
    console.log(this.propertyDetails);
  }



  light: number = 0;

  declight() {
    this.light == 0 ? null : this.light--;
    this.propertyDetails.step3.light = this.light;
    console.log(this.propertyDetails);
  }

  inclight() {
    this.light == 100 ? null : this.light++;
    this.propertyDetails.step3.light = this.light;
    console.log(this.propertyDetails);
  }

  Fans: number = 0;

  decfan() {
    this.Fans == 0 ? null : this.Fans--;
    this.propertyDetails.step3.Fans = this.Fans;
    console.log(this.propertyDetails);
  }

  incfan() {
    this.Fans == 100 ? null : this.Fans++;
    this.propertyDetails.step3.Fans = this.Fans;
    console.log(this.propertyDetails);
  }

  Ac: number = 0;

  decAc() {
    this.Ac == 0 ? null : this.Ac--;
    this.propertyDetails.step3.Ac = this.Ac;
    console.log(this.propertyDetails);
  }

  incAc() {
    this.Ac == 100 ? null : this.Ac++;
    this.propertyDetails.step3.Ac = this.Ac;
    console.log(this.propertyDetails);
  }
  TV: number = 0;

  decTV() {
    this.TV == 0 ? null : this.TV--;
    this.propertyDetails.step3.TV = this.TV;
    console.log(this.propertyDetails);
  }

  incTV() {
    this.TV == 100 ? null : this.TV++;
    this.propertyDetails.step3.TV = this.TV;
    console.log(this.propertyDetails);
  }

  Beds: number = 0;

  decBeds() {
    this.Beds == 0 ? null : this.Beds--;
    this.propertyDetails.step3.Beds = this.Beds;
    console.log(this.propertyDetails);
  }

  incBeds() {
    this.Beds == 100 ? null : this.Beds++;
    this.propertyDetails.step3.Beds = this.Beds;
    console.log(this.propertyDetails);
  }

  Wardrobe: number = 0;

  decWardrobe() {
    this.Wardrobe == 0 ? null : this.Wardrobe--;
    this.propertyDetails.step3.Wardrobe = this.Wardrobe;
    console.log(this.propertyDetails);
  }

  incWardrobe() {
    this.Wardrobe == 100 ? null : this.Wardrobe++;
    this.propertyDetails.step3.Wardrobe = this.Wardrobe;
    console.log(this.propertyDetails);
  }

  Geyser: number = 0;

  decGeyser() {
    this.Geyser == 0 ? null : this.Geyser--;
    this.propertyDetails.step3.Geyser = this.Geyser;
    console.log(this.propertyDetails);
  }

  incGeyser() {
    this.Geyser == 100 ? null : this.Geyser++;
    this.propertyDetails.step3.Geyser = this.Geyser;
    console.log(this.propertyDetails);
  }

  checkboxitem(e: any) {
    console.log(e.target.value);
    console.log(e.target.checked);
    if (e.target.checked) {
      this.propertyDetails.step3.equipment.push(e.target.value);
    } else {
      let ind = this.propertyDetails.step3.equipment.indexOf(e.target.value);
      console.log(ind);
      this.propertyDetails.step3.equipment.splice(ind, 1);
    }
    console.log(this.propertyDetails.step3);
  }

  otherbedrooms: number = 0;

  addBedroom(d: any) {
    console.log(d);
    this.propertyDetails.step3.Addroom = d.otherbedrooms;
    this.otherbedrooms = d.otherbedrooms;
    this.addroominput = false;
    this.ddddd = true;
  }

  //   document.querySelectorAll('.radioinput10').forEach((eg: any) => {
  //     eg.style.backgroundColor = 'white';
  //     h.target.parentElement.style.backgroundColor = '#f0f9ff';
  //   });
  // }
  otherbathrooms: number = 0;

  addBathroom(d: any) {
    console.log(d);
    this.propertyDetails.step3.addbathroom = d.otherbathrooms;
    this.otherbathrooms = d.otherbathrooms;
    this.inputwashroomtype = false;
    this.fffff = true;
  }

  extraroom(h: any) {
    console.log(h.target.textContent);
    if (h.target.textContent) {
      let index1 = this.propertyDetails.step3.othersroom.indexOf(
        h.target.textContent
      );
      if (index1 != -1) {
        this.propertyDetails.step3.othersroom.splice(index1, 1);
        h.target.parentElement.style.backgroundColor = 'black';
      } else {
        this.propertyDetails.step3.othersroom.push(h.target.textContent);
        h.target.parentElement.style.backgroundColor = 'gray';
      }
    }
    console.log(this.propertyDetails.step3);
  }

  parkingavailability= false;
  yesparking(){
    this.parkingavailability= true;
  }
  Noparking(){
    this.parkingavailability=false;
  }

  firesafety(h: any) {
    console.log(h.target.textContent);
    if (h.target.textContent) {
      let index1 = this.propertyDetails.step3.firesafety.indexOf(
        h.target.textContent
      );
      if (index1 != -1) {
        this.propertyDetails.step3.firesafety.splice(index1, 1);
        h.target.parentElement.style.backgroundColor = 'black';
      } else {
        this.propertyDetails.step3.firesafety.push(h.target.textContent);
        h.target.parentElement.style.backgroundColor = ' gray';
      }
    }
    console.log(this.propertyDetails.step3);
  }

  actype: any;
  AcType(e: any) {
    // console.log(e)
    this.propertyDetails.step3.AcType = e.target.value;
    console.log(this.propertyDetails.step3);
  }

  // firesafety(h: any) {
  //   console.log(h.target.textContent);
  //   this.propertyDetails.step3.firesafety = h.target.textContent;
  //   console.log(this.propertyDetails);
  //   document.querySelectorAll('.radioinput10').forEach((eg: any) => {
  //     eg.style.backgroundColor = 'white';
  //     h.target.parentElement.style.backgroundColor = '#f0f9ff';
  //   });
  // }

  officeinput(e: any) {
    console.log(e.target.value);
    this.propertyDetails.step3.minimumNoofSeats = e.target.value;
    console.log(this.propertyDetails);
  }
  officeinput1(e: any) {
    console.log(e.target.value);
    this.propertyDetails.step3.maximumnoOfSeats = e.target.value;
    console.log(this.propertyDetails);
  }
  officeinput2(e: any) {
    console.log(e.target.value);
    this.propertyDetails.step3.Cabins = e.target.value;
    console.log(this.propertyDetails);
  }

  meetingroom(e: any) {
    console.log(e.target.value);
    this.propertyDetails.step3.meetingroom = e.target.value;
    console.log(this.propertyDetails);
  }

  // conferenceroom(e: any) {
  //   console.log(e.target.value);
  //   this.propertyDetails.step3.conferenceroom = e.target.value;
  //   console.log(this.propertyDetails);
  // }

  // receptionarea(e: any) {
  //   console.log(e.target.value);
  //   this.propertyDetails.step3.receptionarea = e.target.value;
  //   console.log(this.propertyDetails);
  // }
  floorDetails(e: any) {
    console.log(e.target.value);
    this.propertyDetails.step3.FloorDetail = e.target.value;
    console.log(this.propertyDetails);
  }

  OnFloorDetails: any;
  Onfloordetails(e: any) {
    console.log(e);
    this.propertyDetails.step3.OnFloorDetails = e.target.value;
    console.log(this.propertyDetails);
  }

  propertystatus(e: any) {
    console.log(e);
    this.propertyDetails.step3.propertystatus = e.target.value;
    console.log(this.propertyDetails);
  }

  UnderConstructionYear: any;
  OnYearexpected(e: any) {
    console.log(e);
    this.propertyDetails.step3.UnderConstructionYear = e.target.value;
    console.log(this.propertyDetails);
  }
  UnderConstructionMonth: any;
  onMonthsexcepted(e: any) {
    console.log(e);
    this.propertyDetails.step3.UnderConstructionMonth = e.target.value;
    console.log(this.propertyDetails);
  }

  Areadetails2(e: any) {
    console.log(e);
    this.propertyDetails.step3.carpertArea.Units = e.target.value;
    console.log(this.propertyDetails);
  }

  AreaDetails(e: any) {
    console.log(e.target.value);
    this.propertyDetails.step3.carpertArea.Carpetarea = e.target.value;
    console.log(this.propertyDetails);
  }

  builtuparea2(e: any) {
    console.log(e);
    this.propertyDetails.step3.builtupArea.Units = e.target.value;
    console.log(this.propertyDetails);
  }

  Builtuparea(e: any) {
    console.log(e.target.value);
    this.propertyDetails.step3.builtupArea.builtuparea = e.target.value;
    console.log(this.propertyDetails);
  }

  superbuiltuparea2(e: any) {
    console.log(e);
    this.propertyDetails.step3.squarebuiltupArea.Units = e.target.value;
    console.log(this.propertyDetails);
  }

  superbuiltuparea(e: any) {
    console.log(e.target.value);
    this.propertyDetails.step3.squarebuiltupArea.superbuiltuparea =
      e.target.value;
    console.log(this.propertyDetails);
  }

  PropertyRating(e: any) {
    console.log(e.target.textContent);
    this.propertyDetails.step3.PropertyRating = e.target.textContent;
    console.log(this.propertyDetails);
    document.querySelectorAll('.radioinput34').forEach((ei: any) => {
      ei.style.backgroundColor = 'black';
      e.target.parentElement.style.backgroundColor = ' gray';
    });
  }
  //-----------------step3 end----------------

  // areaoption(e: any) {
  //   this.propertyDetails.step3.areadetails = e.target.value;
  //   console.log(this.propertyDetails.step3);
  // }

  // carpetArea(e: any) {
  //   this.propertyDetails.step3.carpetArea = e.target.value;
  //   console.log(this.propertyDetails);
  // }
  // -----------------new-step4---------------
  isHovering: boolean;
  files: File[] = [];
  toggleHover(event: boolean) {
    this.isHovering = event;
  }

  onDrop(files: FileList) {
    for (let i = 0; i < files.length; i++) {
      this.files.push(files.item(i));
    }
  }

  imgArr: any = [];
  index: any;
  inpChange(e: any) {
    var reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    reader.onload = (_event) => {
      this.imgArr.push({ name: e.target.files[0], localLink: reader.result });
    };
  }
  removeSelectedFile(index: any) {
    console.log('index', index, 1);
    this.imgArr.splice(index, 1);

    // this.storage.ref(downloadUrl).delete();
    this.af.refFromURL(index).delete();
    console.log(this.imgArr[0]);
  }

  uploadImage(event: any) {
    let file = event.target.files[0];
    let filePath = `propertyImage${Math.random()}`;
    let fileRef = this.af.ref(filePath);
    let task = this.af.upload(filePath, file);
    task
      .snapshotChanges()
      .pipe(
        finalize(() => {
          let downloadURL = fileRef.getDownloadURL();
          downloadURL.subscribe((url) => {
            this.imgArr.push(url);
            console.log(this.imgArr[0]);
          });
        })
      )
      .subscribe((url) => {
        if (url) {
          console.log(url);
        }
      });
  }

  uploadimg() {
    // this.propertyDetails.step4.images = this.imgArr;
    console.log(this.propertyDetails);
  }
  // getTaskValue(uu: any) {
  //   this.propertyDetails.step4.images.push(uu);
  //   console.log(uu);
  // }
  //-----------------step4end----------------

  // ----------------------step 5---------------

  ownershipitem(e: any) {
    console.log(e.target.textContent);
    this.propertyDetails.step5.ownership = e.target.textContent;
    console.log(this.propertyDetails);
    document.querySelectorAll('.radioinput14').forEach((ei: any) => {
      ei.style.backgroundColor = 'black';
      e.target.parentElement.style.backgroundColor = ' gray';
    });
  }
  yesvalue(e: any) {
    console.log(e.target.textContent);
    this.propertyDetails.step5.Pre_released = e.target.textContent;
    console.log(this.propertyDetails);
    document.querySelectorAll('.radioinput15').forEach((ei: any) => {
      ei.style.backgroundColor = 'black';
      e.target.parentElement.style.backgroundColor = ' gray';
    });
  }

  fixedbrokerage(e: any) {
    console.log(e.target.textContent);
    this.propertyDetails.step5.fixedbrokerage = e.target.textContent;
    console.log(this.propertyDetails);
    document.querySelectorAll('.bkr').forEach((ei: any) => {
      ei.style.backgroundColor = 'black';
      e.target.parentElement.style.backgroundColor = ' gray';
    });
  }

  descriptionfield(e: any) {
    console.log(e.target.value);
    this.propertyDetails.step5.description = e.target.value;
    console.log(this.propertyDetails);
  }

  expectPrice(e: any) {
    console.log(e.target.value);
    this.propertyDetails.step5.ExpectPrice = e.target.value;
    console.log(this.propertyDetails);
  }

  priceperSQ(e: any) {
    console.log(e.target.value);
    this.propertyDetails.step5.PricePerSQ = e.target.value;
    console.log(this.propertyDetails);
  }

  Monthsnumber(e: any) {
    console.log(e.target.value);
    this.propertyDetails.step5.MonthNumber = e.target.value;
    console.log(this.propertyDetails);
  }

  SecurityDeposite(e: any) {
    console.log(e.target.textContent);
    this.propertyDetails.step5.SecurityDeposite = e.target.textContent;
    console.log(this.propertyDetails);
    document.querySelectorAll('.radioinput22').forEach((ei: any) => {
      ei.style.backgroundColor = 'black';
      e.target.parentElement.style.backgroundColor = ' gray';
    });
  }

  yesBrocage(e: any) {
    console.log(e.target.textContent);
    this.propertyDetails.step5.Brokarage = e.target.textContent;
    console.log(this.propertyDetails);
    document.querySelectorAll('.radioinput23').forEach((ei: any) => {
      ei.style.backgroundColor = 'black';
      e.target.parentElement.style.backgroundColor = ' gray';
    });
  }
  brokerage = false;
  brokerageoption() {
    this.brokerage = true;
  }
  washroomcontainer = false;
  availablewash() {
    this.washroomcontainer = true;
  }
  notavailablewash() {
    this.washroomcontainer = false;
  }
  nooptn() {
    this.brokerage = false;
    this.inputfieldbro = false;
  }

  // fixedbrokerage(e: any) {
  //   console.log(e.target.textContent);
  //   this.propertyDetails.step5.fixedbrokerage = e.target.textContent;
  //   console.log(this.propertyDetails);
  //   document.querySelectorAll('.radioinput23').forEach((ei: any) => {
  //     ei.style.backgroundColor = 'black';
  //     e.target.parentElement.style.backgroundColor = ' gray';
  //   });
  // }

  brokerageinput(e: any) {
    console.log(e.target.value);
    this.propertyDetails.step5.brokerageinput = e.target.value;
    console.log(this.propertyDetails);
  }
  inputfieldbro = false;
  inputfieldbroker() {
    this.inputfieldbro = true;
  }

  brokeragenegiotiable(e: any) {
    console.log(e.target.value);
    console.log(e.target.checked);
    if (e.target.checked) {
      this.propertyDetails.step5.Brokarageoption.push(e.target.value);
    } else {
      let ind = this.propertyDetails.step5.Brokarageoption.indexOf(
        e.target.value
      );
      console.log(ind);
      this.propertyDetails.step5.Brokarageoption.splice(ind, 1);
    }
    console.log(this.propertyDetails);
  }

  fireNoc(e: any) {
    console.log(e.target.textContent);
    this.propertyDetails.step5.FireNOC = e.target.textContent;
    console.log(this.propertyDetails);
    document.querySelectorAll('.radioinput24').forEach((ei: any) => {
      ei.style.backgroundColor = 'black';
      e.target.parentElement.style.backgroundColor = ' gray';
    });
  }

  OccurancyCertified(e: any) {
    console.log(e.target.textContent);
    this.propertyDetails.step5.OccurancyCertified = e.target.textContent;
    console.log(this.propertyDetails);
    document.querySelectorAll('.radioinput25').forEach((ei: any) => {
      ei.style.backgroundColor = 'black';
      e.target.parentElement.style.backgroundColor = ' gray';
    });
  }

  OperationCertified(e: any) {
    console.log(e.target.textContent);
    this.propertyDetails.step5.OperationCertified = e.target.textContent;
    console.log(this.propertyDetails);
    document.querySelectorAll('.radioinput33').forEach((ei: any) => {
      ei.style.backgroundColor = 'black';
      e.target.parentElement.style.backgroundColor = ' gray';
    });
  }

  addprerelease(e: any) {
    console.log(e.target.value);
    this.propertyDetails.step5.Currentrent = e.target.value;
    console.log(this.propertyDetails);
  }
  addprerelease1(e: any) {
    console.log(e.target.value);
    this.propertyDetails.step5.Leasetenure = e.target.value;
    console.log(this.propertyDetails);
  }
  addprerelease2(e: any) {
    console.log(e.target.value);
    this.propertyDetails.step5.Annualrent = e.target.value;
    console.log(this.propertyDetails);
  }
  addprerelease3(e: any) {
    console.log(e.target.value);
    this.propertyDetails.step5.BusinessType = e.target.value;
    console.log(this.propertyDetails);
  }

  PreOfficeType: any;
  PreofficeType(e: any) {
    // console.log(e)
    this.propertyDetails.step5.PreOfficeType = e.target.value;
    console.log(this.propertyDetails);
  }

  taxpricecheck(e: any) {
    console.log(e.target.value);
    console.log(e.target.checked);
    if (e.target.checked) {
      this.propertyDetails.step5.tex.push(e.target.value);
    } else {
      let ind = this.propertyDetails.step5.tex.indexOf(e.target.value);
      console.log(ind);
      this.propertyDetails.step5.tex.splice(ind, 1);
    }
    console.log(this.propertyDetails);
  }

  Addmorepricingdetail1(e: any) {
    console.log(e.target.value);
    this.propertyDetails.step5.Maintenance.maintenance = e.target.value;
    console.log(this.propertyDetails);
  }
  Paymentperiod(e: any) {
    console.log(e.target.value);
    this.propertyDetails.step5.Maintenance.paymentperiod = e.target.value;
    console.log(this.propertyDetails);
  }
  Addmorepricingdetail2(e: any) {
    console.log(e.target.value);
    this.propertyDetails.step5.ExpectedRental = e.target.value;
    console.log(this.propertyDetails);
  }
  Addmorepricingdetail3(e: any) {
    console.log(e.target.value);
    this.propertyDetails.step5.BookingAmount = e.target.value;
    console.log(this.propertyDetails);
  }
  Addmorepricingdetail4(e: any) {
    console.log(e.target.value);
    this.propertyDetails.step5.AnnualDuesPayable = e.target.value;
    console.log(this.propertyDetails);
  }

  //-----------------step5 end----------------

  // ----------------------submit Data-----------

  addbasicDetails() {
    this.propertyDetails.step4.images = this.imgArr;
    console.log(this.propertyDetails);

    this.store
      .collection('propertyDetail')
      .add({ propertyDetail: this.propertyDetails })
      .then(() => {
        console.log('added');
        this._snackBar.open('Data Added Successfully!', '✔', {
          horizontalPosition: 'right',
          verticalPosition: 'top',
          panelClass: 'notify-success',
          duration: 3000,
        });
        this.router.navigateByUrl('/property-list');
      });
  }

  getData(data: any) {}
}

function subscribe(arg0: (url: any) => void) {
  throw new Error('Function not implemented.');
}
// function openDialog() {
//   throw new Error('Function not implemented.');
// }
