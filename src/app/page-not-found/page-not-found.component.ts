import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { BreakpointObserver } from '@angular/cdk/layout';
import { StepperOrientation } from '@angular/material/stepper';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-page-not-found',
  templateUrl: './page-not-found.component.html',
  styleUrls: ['./page-not-found.component.css'],
})
export class PageNotFoundComponent implements OnInit {
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
    private router: Router
  ) {
    this.stepperOrientation = breakpointObserver
      .observe('(min-width: 800px)')
      .pipe(map(({ matches }) => (matches ? 'horizontal' : 'vertical')));
  }

  ngOnInit(): void {}
  propertyDetails: any = {
    step1: {},
    step2: {},
    step3: { equipment: [] },
    step4: {},
    step5: { tex: [] },
  };

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

    console.log(d.target.textContent);
    if (d.target.textContent == 'Sell') {
      this.display = true;
      this.RentLease = false;
      document
        .querySelectorAll('.radioinput2')
        .forEach((e: any) => (e.style.backgroundColor = 'white'));
      d.target.parentElement.style.backgroundColor = '#f0f9ff';
    } else {
      this.RentLease = true;
      this.display = false;
      document
        .querySelectorAll('.radioinput2')
        .forEach((e: any) => (e.style.backgroundColor = 'white'));
      d.target.parentElement.style.backgroundColor = '#f0f9ff';
    }
    this.propertyDetails.step1.Looking = d.target.textContent;
    console.log(this.propertyDetails);
  }
  RentLease = false;

  resdiv = false;
  res(e: any) {
    console.log(e.target.value);
    if (e.target.value == 'Residential') {
      this.resdiv = true;
      this.comdiv = false;
      this.retailcontainer = false;
      this.officecontainer = false;
      this.plotcontainer = false;
      this.storagecontainer = false;
      this.industrycontainer = false;
      this.hospitalitycontainer = false;
    } else {
      this.comdiv = true;
      this.resdiv = false;
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
      ef.style.backgroundColor = 'white';
      f.target.parentElement.style.backgroundColor = '#f0f9ff';
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
  }

  retailcontainer = false;
  retail() {
    this.retailcontainer = true;
    this.officecontainer = false;
    this.plotcontainer = false;
    this.storagecontainer = false;
    this.industrycontainer = false;
    this.hospitalitycontainer = false;
  }

  plotcontainer = false;
  plot() {
    this.plotcontainer = true;
    this.officecontainer = false;
    this.retailcontainer = false;
    this.storagecontainer = false;
    this.industrycontainer = false;
    this.hospitalitycontainer = false;
  }

  storagecontainer = false;
  storage() {
    this.storagecontainer = true;
    this.officecontainer = false;
    this.retailcontainer = false;
    this.plotcontainer = false;
    this.industrycontainer = false;
    this.hospitalitycontainer = false;
  }
  industrycontainer = false;
  industry() {
    this.industrycontainer = true;
    this.officecontainer = false;
    this.retailcontainer = false;
    this.plotcontainer = false;
    this.storagecontainer = false;
    this.hospitalitycontainer = false;
  }
  hospitalitycontainer = false;
  hospitality() {
    this.hospitalitycontainer = true;
    this.officecontainer = false;
    this.retailcontainer = false;
    this.plotcontainer = false;
    this.storagecontainer = false;
    this.industrycontainer = false;
  }
  other() {
    this.hospitalitycontainer = false;
    this.officecontainer = false;
    this.retailcontainer = false;
    this.plotcontainer = false;
    this.storagecontainer = false;
    this.industrycontainer = false;
  }

  hiddenoffice(g: any) {
    console.log(g.target.textContent);
    this.propertyDetails.step1.subtype = g.target.textContent;
    console.log(this.propertyDetails);
    document.querySelectorAll('.radioinput5').forEach((eg: any) => {
      eg.style.backgroundColor = 'white';
      g.target.parentElement.style.backgroundColor = '#f0f9ff';
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
      eh.style.backgroundColor = 'white';
      h.target.parentElement.style.backgroundColor = '#f0f9ff';
    });
  }

  // ------step2-------------

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

  // -----------step3-----------

  bedroom1(g: any) {
    console.log(g.target.textContent);
    this.propertyDetails.step3.Addroom = g.target.textContent;
    console.log(this.propertyDetails);
    document.querySelectorAll('.radioinput7').forEach((eg: any) => {
      eg.style.backgroundColor = 'white';
      g.target.parentElement.style.backgroundColor = '#f0f9ff';
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

  extraroom(h: any) {
    console.log(h.target.textContent);
    this.propertyDetails.step3.otherroom = h.target.textContent;
    console.log(this.propertyDetails);
    document.querySelectorAll('.radioinput10').forEach((eg: any) => {
      eg.style.backgroundColor = 'white';
      h.target.parentElement.style.backgroundColor = '#f0f9ff';
    });
  }

  funishring(h: any) {
    console.log(h.target.textContent);
    this.propertyDetails.step3.funishring = h.target.textContent;
    console.log(this.propertyDetails);
    document.querySelectorAll('.radioinput11').forEach((eg: any) => {
      eg.style.backgroundColor = 'white';
      h.target.parentElement.style.backgroundColor = '#f0f9ff';
    });
  }

  Drypantry(h: any) {
    console.log(h.target.textContent);
    this.propertyDetails.step3.pantry = h.target.textContent;
    console.log(this.propertyDetails);
    document.querySelectorAll('.radioinput20').forEach((eg: any) => {
      eg.style.backgroundColor = 'white';
      h.target.parentElement.style.backgroundColor = '#f0f9ff';
    });
  }
  Wetpantry(h: any) {
    console.log(h.target.textContent);
    this.propertyDetails.step3.pantry = h.target.textContent;
    console.log(this.propertyDetails);
    document.querySelectorAll('.radioinput20').forEach((eg: any) => {
      eg.style.backgroundColor = 'white';
      h.target.parentElement.style.backgroundColor = '#f0f9ff';
    });
  }
  Highspeedlift(h: any) {
    console.log(h.target.textContent);
    this.propertyDetails.step3.liftType = h.target.textContent;
    console.log(this.propertyDetails);
    document.querySelectorAll('.radioinput21').forEach((eg: any) => {
      eg.style.backgroundColor = 'white';
      h.target.parentElement.style.backgroundColor = '#f0f9ff';
    });
  }
  Servicelift(h: any) {
    console.log(h.target.textContent);
    this.propertyDetails.step3.liftType = h.target.textContent;
    console.log(this.propertyDetails);
    document.querySelectorAll('.radioinput21').forEach((eg: any) => {
      eg.style.backgroundColor = 'white';
      h.target.parentElement.style.backgroundColor = '#f0f9ff';
    });
  }
  Powerlift(h: any) {
    console.log(h.target.textContent);
    this.propertyDetails.step3.liftType = h.target.textContent;
    console.log(this.propertyDetails);
    document.querySelectorAll('.radioinput21').forEach((eg: any) => {
      eg.style.backgroundColor = 'white';
      h.target.parentElement.style.backgroundColor = '#f0f9ff';
    });
  }

  bathroom(f: any) {
    console.log(f.target.textContent);
    this.propertyDetails.step3.addbathroom = f.target.textContent;
    console.log(this.propertyDetails);
    document.querySelectorAll('.radioinput8').forEach((ef: any) => {
      ef.style.backgroundColor = 'white';
      f.target.parentElement.style.backgroundColor = '#f0f9ff';
    });
  }

  balconies(i: any) {
    console.log(i.target.textContent);
    this.propertyDetails.step3.addbalconies = i.target.textContent;
    console.log(this.propertyDetails);
    document.querySelectorAll('.radioinput9').forEach((ei: any) => {
      ei.style.backgroundColor = 'white';
      i.target.parentElement.style.backgroundColor = '#f0f9ff';
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

  OpendecParking() {
    this.parking == 0 ? null : this.openparking--;
    this.propertyDetails.step3.underparking = this.openparking;
    console.log(this.propertyDetails);
  }

  OpenincParking() {
    this.parking == 20 ? null : this.openparking++;
    this.propertyDetails.step3.Openparking = this.openparking;
    console.log(this.propertyDetails);
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

  undercon(e: any) {
    console.log(e.target.textContent);
    this.propertyDetails.step3.availitystatus = e.target.textContent;
    console.log(this.propertyDetails);
    document.querySelectorAll('.radioinput12').forEach((ei: any) => {
      ei.style.backgroundColor = 'white';
      e.target.parentElement.style.backgroundColor = '#f0f9ff';
    });
  }

  ageproperty(e: any) {
    console.log(e.target.textContent);
    this.propertyDetails.step3.availitysubtype = e.target.textContent;
    console.log(this.propertyDetails);
    document.querySelectorAll('.radioinput13').forEach((ei: any) => {
      ei.style.backgroundColor = 'white';
      e.target.parentElement.style.backgroundColor = '#f0f9ff';
    });
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

  Gayser: number = 0;

  decGayser() {
    this.Gayser == 0 ? null : this.Gayser--;
    this.propertyDetails.step3.Gayser = this.Gayser;
    console.log(this.propertyDetails);
  }

  incGayser() {
    this.Gayser == 100 ? null : this.Gayser++;
    this.propertyDetails.step3.Gayser = this.Gayser;
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

  actype: any;
  AcType(e: any) {
    // console.log(e)
    this.propertyDetails.step3.AcType = e.target.value;
    console.log(this.propertyDetails.step3);
  }

  firesafity(h: any) {
    console.log(h.target.textContent);
    this.propertyDetails.step3.firesafity = h.target.textContent;
    console.log(this.propertyDetails);
    document.querySelectorAll('.radioinput10').forEach((eg: any) => {
      eg.style.backgroundColor = 'white';
      h.target.parentElement.style.backgroundColor = '#f0f9ff';
    });
  }

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

  floorDetails(e: any) {
    console.log(e.target.value);
    this.propertyDetails.step3.FloorDetail = e.target.value;
    console.log(this.propertyDetails);
  }

  OnFloorDetails: any;
  Onfloordetails(e: any) {
    console.log(e)
    this.propertyDetails.step3.OnFloorDetails = e.target.value;
    console.log(this.propertyDetails);
  }

  UnderConstructionYear: any;
  OnYearexpected(e: any) {
    console.log(e)
    this.propertyDetails.step3.UnderConstructionYear = e.target.value;
    console.log(this.propertyDetails);
  }
  UnderConstructionMonth: any;
  onMonthsexcepted(e: any) {
    console.log(e)
    this.propertyDetails.step3.UnderConstructionMonth = e.target.value;
    console.log(this.propertyDetails);
  }

 
  Areadetails2(e: any) {
    console.log(e)
    this.propertyDetails.step3.Areadetail2 = e.target.value;
    console.log(this.propertyDetails);
  }

  AreaDetails(e: any) {
    console.log(e.target.value);
    this.propertyDetails.step3.AreaDetail = e.target.value;
    console.log(this.propertyDetails);
  }





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
  //-----------------step4----------------
  // path:any;

  // upload($event: any) {
  //       this.path = $event.target.files[0]

  //     }

  // uploadImage() {
  //       console.log(this.path)
  //       this.af.upload("/files" + Math.random() + this.path, this.path)

  //       alert("Data Added Sucessfully");
  //     }

  // ----------------------step 5---------------

  ownershipitem(e: any) {
    console.log(e.target.textContent);
    this.propertyDetails.step5.ownership = e.target.textContent;
    console.log(this.propertyDetails);
    document.querySelectorAll('.radioinput14').forEach((ei: any) => {
      ei.style.backgroundColor = 'white';
      e.target.parentElement.style.backgroundColor = '#f0f9ff';
    });
  }
  yesvalue(e: any) {
    console.log(e.target.textContent);
    this.propertyDetails.step5.Pre_released = e.target.textContent;
    console.log(this.propertyDetails);
    document.querySelectorAll('.radioinput15').forEach((ei: any) => {
      ei.style.backgroundColor = 'white';
      e.target.parentElement.style.backgroundColor = '#f0f9ff';
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
      ei.style.backgroundColor = 'white';
      e.target.parentElement.style.backgroundColor = '#f0f9ff';
    });
  }

  yesBrocage(e: any) {
    console.log(e.target.textContent);
    this.propertyDetails.step5.Brokarage = e.target.textContent;
    console.log(this.propertyDetails);
    document.querySelectorAll('.radioinput23').forEach((ei: any) => {
      ei.style.backgroundColor = 'white';
      e.target.parentElement.style.backgroundColor = '#f0f9ff';
    });
  }

  fireNoc(e: any) {
    console.log(e.target.textContent);
    this.propertyDetails.step5.FireNOC = e.target.textContent;
    console.log(this.propertyDetails);
    document.querySelectorAll('.radioinput24').forEach((ei: any) => {
      ei.style.backgroundColor = 'white';
      e.target.parentElement.style.backgroundColor = '#f0f9ff';
    });
  }

  OccurancyCertified(e: any) {
    console.log(e.target.textContent);
    this.propertyDetails.step5.OccurancyCertified = e.target.textContent;
    console.log(this.propertyDetails);
    document.querySelectorAll('.radioinput25').forEach((ei: any) => {
      ei.style.backgroundColor = 'white';
      e.target.parentElement.style.backgroundColor = '#f0f9ff';
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
    this.propertyDetails.step5.Maintenance = e.target.value;
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

  // ----------------------submit Data-----------
  addbasicDetails() {
    console.log(this.propertyDetails);
    this.store
      .collection('propertyDetail')
      .add({ propertyDetail: this.propertyDetails })
      .then(() => {
        console.log('added');
        alert('Data Added Sucessfully');
        this.router.navigateByUrl('/property-list');
      });
  }


  getData(data: any) {

  }

}
