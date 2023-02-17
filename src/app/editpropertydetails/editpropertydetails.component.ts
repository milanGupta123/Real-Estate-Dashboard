import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { BreakpointObserver } from '@angular/cdk/layout';
import { StepperOrientation } from '@angular/material/stepper';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';
// import { Router } from '@angular/router';

@Component({
  selector: 'app-editpropertydetails',
  templateUrl: './editpropertydetails.component.html',
  styleUrls: ['./editpropertydetails.component.css'],
})
export class EditpropertydetailsComponent implements OnInit {
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
  dataid: string;
  singlepropertylist: any = {
    propertyDetail: {
      step1: {},
      step2: { city: '', Apartmentsociety: '' },
      step3: {
        equipment: [],
        othersroom: [],
        firesafity: [],
        carpertArea: {},
        builtupArea: {},
        squarebuiltupArea: {},
      },
      step4: { images:[]},
      step5: { tex: [], Brokarageoption: [], Maintenance: {} },
    },
  };
  underparking: number = 0;
  Openparking: number = 0;
  updateddata: unknown;
  addpricingbox = false;

  constructor(
    private _formBuilder: FormBuilder,
    breakpointObserver: BreakpointObserver,
    private af: AngularFireStorage,
    private store: AngularFirestore,
    private router: Router,
    private Router: ActivatedRoute,
    private _snackBar: MatSnackBar
  ) {
    this.stepperOrientation = breakpointObserver
      .observe('(min-width: 800px)')
      .pipe(map(({ matches }) => (matches ? 'horizontal' : 'vertical')));
  }

  ngOnInit(): void {
    this.Router.params.subscribe((res) => {
      this.dataid = res['id'];
      console.log(this.dataid, 'id coming with data');
    });

    this.getAll();
  }

  propertyDetails: any = {
    step1: {},
    step2: {},
    step3: {
      equipment: [],
      othersroom: [],
      firesafity: [],
      carpertArea: {},
      builtupArea: {},
      squarebuiltupArea: {},
    },
    step4: {},
    step5: { tex: [], Brokarageoption: [], Maintenance: {} },
  };

  one() {
    console.log(this.singlepropertylist.propertyDetail);
    if (this.singlepropertylist.propertyDetail.step1.Looking == 'Sell') {
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
      this.display = true;
      this.RentLease = false;
    } else {
      this.RentLease = true;
      this.display = false;
    }
    if (
      this.singlepropertylist.propertyDetail.step1.propertycategory ==
      'Residential'
    ) {
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

      if (this.singlepropertylist.propertyDetail.step1.type == 'Retail') {
        this.retail();
        if (
          this.singlepropertylist.propertyDetail.step1.subtype ==
          'Commercial Shop'
        ) {
          this.commersialshop();
        } else {
          this.commersialshop();
        }
      } else if (
        this.singlepropertylist.propertyDetail.step1.type == 'Office'
      ) {
        this.office();
      } else if (
        this.singlepropertylist.propertyDetail.step1.type == 'Plot/Land'
      ) {
        this.plot();
      } else if (
        this.singlepropertylist.propertyDetail.step1.type == 'Storage'
      ) {
        this.storage();
      } else if (
        this.singlepropertylist.propertyDetail.step1.type == 'Industry'
      ) {
        this.industry();
      } else if (
        this.singlepropertylist.propertyDetail.step1.type == 'Hospitality'
      ) {
        this.hospitality();
      } else if (this.singlepropertylist.propertyDetail.step1.type == 'Other') {
        this.other();
      }
    }
    setTimeout(() => this.three(), 0);

    if (
      this.singlepropertylist.propertyDetail.step3.funishring == 'Furnished'
    ) {
      this.choosefurnished();
    }
    if (
      this.singlepropertylist.propertyDetail.step3.funishring ==
      'Semi-furnished'
    ) {
      this.choosefurnished();
    }
    if (
      this.singlepropertylist.propertyDetail.step3.availitystatus ==
      'Ready to move'
    ) {
      this.ready();
    } else {
      this.under();
    }
    if (this.singlepropertylist.propertyDetail.step5.Pre_released == 'Yes') {
      this.yes();
      this.addoptions();
    } else {
      this.no();
    }
    if (this.singlepropertylist.propertyDetail.step5.Brokarage == 'Yes') {
      this.brokerageoption();
      this.inputfieldbroker();
    }
  }

  propertystatus(e: any) {
    console.log(e);
    this.propertyDetails.step3.propertystatus = e.target.value;
    console.log(this.propertyDetails);
  }

  three() {
    document.querySelectorAll('.radioinput7').forEach((res: any) => {
      console.log(this.singlepropertylist);
      if (
        this.singlepropertylist.propertyDetail.step3.Addroom == res.textContent
      ) {
        res.style.backgroundColor = '#0078db';
      }
    });
    console.log(document.querySelectorAll('.bathrms'));
    document.querySelectorAll('.bathrms').forEach((res: any) => {
      console.log(this.singlepropertylist);
      if (
        this.singlepropertylist.propertyDetail.step3.addbathroom ==
        res.textContent
      ) {
        res.style.backgroundColor = '#0078db';
      }
    });
    document.querySelectorAll('.radioinput9').forEach((res: any) => {
      if (
        this.singlepropertylist.propertyDetail.step3.addbalconies ==
        res.textContent
      ) {
        res.style.backgroundColor = '#0078db';
      }
    });

    document.querySelectorAll('.radioinput10').forEach((res: any) => {
      if (
        this.singlepropertylist.propertyDetail.step3.othersroom.indexOf(
          res.textContent
        ) != -1
      ) {
        res.style.backgroundColor = '#0078db';
      }
    });

    document.querySelectorAll('.radioinput20').forEach((res: any) => {
      if (
        this.singlepropertylist.propertyDetail.step3.pantry == res.textContent
      ) {
        res.style.backgroundColor = '#0078db';
      }
    });

    document.querySelectorAll('.radioinput21').forEach((res: any) => {
      if (
        this.singlepropertylist.propertyDetail.step3.liftType == res.textContent
      ) {
        res.style.backgroundColor = '#0078db';
      }
    });

    document.querySelectorAll('.radioinput11').forEach((res: any) => {
      if (
        this.singlepropertylist.propertyDetail.step3.funishring ==
        res.textContent
      ) {
        res.style.backgroundColor = '#0078db';
      }
    });

    console.log('+++++++++++++++++++++++');
    document.querySelectorAll('.radioinput01').forEach((res: any) => {
      if (
        this.singlepropertylist.propertyDetail.step3.firesafety.indexOf(
          res.textContent
        ) != -1
      ) {
        res.style.backgroundColor = '#0078db';
      }
    });

    document.querySelectorAll('.radioinput12').forEach((res: any) => {
      if (
        this.singlepropertylist.propertyDetail.step3.availitystatus ==
        res.textContent
      ) {
        res.style.backgroundColor = '#0078db';
      }
    });

    document.querySelectorAll('.radioinput13').forEach((res: any) => {
      if (
        this.singlepropertylist.propertyDetail.step3.availitystatus ==
        res.textContent
      ) {
        res.style.backgroundColor = '#0078db';
      }
    });

    document.querySelectorAll('.radioinput14').forEach((res: any) => {
      if (
        this.singlepropertylist.propertyDetail.step5.ownership ==
        res.textContent
      ) {
        res.style.backgroundColor = '#0078db';
      }
    });

    document.querySelectorAll('.radioinput22').forEach((res: any) => {
      if (
        this.singlepropertylist.propertyDetail.step5.SecurityDeposite ==
        res.textContent
      ) {
        res.style.backgroundColor = '#0078db';
      }
    });

    document.querySelectorAll('.radioinput23').forEach((res: any) => {
      if (
        this.singlepropertylist.propertyDetail.step5.Brokarage ==
        res.textContent
      ) {
        res.style.backgroundColor = '#0078db';
      }
    });

    document.querySelectorAll('.radioinput24').forEach((res: any) => {
      if (
        this.singlepropertylist.propertyDetail.step5.FireNOC == res.textContent
      ) {
        res.style.backgroundColor = '#0078db';
      }
    });

    document.querySelectorAll('.radioinput25').forEach((res: any) => {
      if (
        this.singlepropertylist.propertyDetail.step5.OccurancyCertified ==
        res.textContent
      ) {
        res.style.backgroundColor = '#0078db';
      }
    });

    document.querySelectorAll('.radioinput15').forEach((res: any) => {
      if (
        this.singlepropertylist.propertyDetail.step5.Pre_released ==
        res.textContent
      ) {
        res.style.backgroundColor = '#0078db';
      }
    });
    // -----------step1----------

    document.querySelectorAll('.radioinput2').forEach((res: any) => {
      if (
        this.singlepropertylist.propertyDetail.step1.Looking == res.textContent
      ) {
        res.style.backgroundColor = '#0078db';
      }
    });

    document.querySelectorAll('.radioinput4').forEach((res: any) => {
      if (
        this.singlepropertylist.propertyDetail.step1.type == res.textContent
      ) {
        res.style.backgroundColor = '#0078db';
      }
    });

    document.querySelectorAll('.radioinput5').forEach((res: any) => {
      if (
        this.singlepropertylist.propertyDetail.step1.subtype == res.textContent
      ) {
        res.style.backgroundColor = '#0078db';
      }
    });

    document.querySelectorAll('.radioinput6').forEach((res: any) => {
      if (
        this.singlepropertylist.propertyDetail.step1.childsubtype ==
        res.textContent
      ) {
        res.style.backgroundColor = '#0078db';
      }
    });
    this.light = this.singlepropertylist.propertyDetail.step3.light;
    this.Ac = this.singlepropertylist.propertyDetail.step3.Ac;
    this.Fans = this.singlepropertylist.propertyDetail.step3.Fans;
    this.TV = this.singlepropertylist.propertyDetail.step3.TV;
    this.Beds = this.singlepropertylist.propertyDetail.step3.Beds;
    this.Geyser = this.singlepropertylist.propertyDetail.step3.Geyser;
    this.Wardrobe = this.singlepropertylist.propertyDetail.step3.Wardrobe;
    this.openparking = this.singlepropertylist.propertyDetail.step3.Openparking;

    this.parking = this.singlepropertylist.propertyDetail.step3.underparking;
  }

  addpricing() {
    this.addpricingbox = !this.addpricingbox;
  }
  yescon = false;
  yes() {
    this.yescon = true;
  }
  getData(k: any) {}

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
      d.target.parentElement.style.backgroundColor = '#0078db';
      console.log(d.target.parentElement);
    } else {
      this.RentLease = true;
      this.display = false;
      document
        .querySelectorAll('.radioinput2')
        .forEach((e: any) => (e.style.backgroundColor = 'white'));
      d.target.parentElement.style.backgroundColor = '#0078db';
    }
    this.propertyDetails.step1.Looking = d.target.textContent;
    console.log(this.propertyDetails);
  }
  RentLease = false;
  bathroombox = false;
  hidebedroom = false;
  resdiv = false;
  res(e: any) {
    console.log(e.target.value);
    if (e.target.value == 'Residential') {
      this.resdiv = true;
      this.bathroombox = true;
      this.hidebedroom = true;
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
      this.bathroombox = false;
      this.hidebedroom = false;
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
      f.target.parentElement.style.backgroundColor = '#0078db';
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
      g.target.parentElement.style.backgroundColor = '#0078db';
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
      h.target.parentElement.style.backgroundColor = '#0078db';
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
      g.target.parentElement.style.backgroundColor = '#0078db';
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
      h.target.parentElement.style.backgroundColor = '#0078db';
    });
  }

  funishring(h: any) {
    console.log(h.target.textContent);
    this.propertyDetails.step3.funishring = h.target.textContent;
    console.log(this.propertyDetails);
    document.querySelectorAll('.radioinput11').forEach((eg: any) => {
      eg.style.backgroundColor = 'white';
      h.target.parentElement.style.backgroundColor = '#0078db';
    });
  }

  Drypantry(h: any) {
    console.log(h.target.textContent);
    this.propertyDetails.step3.pantry = h.target.textContent;
    console.log(this.propertyDetails);
    document.querySelectorAll('.radioinput20').forEach((eg: any) => {
      eg.style.backgroundColor = 'white';
      h.target.parentElement.style.backgroundColor = '#0078db';
    });
  }
  Wetpantry(h: any) {
    console.log(h.target.textContent);
    this.propertyDetails.step3.pantry = h.target.textContent;
    console.log(this.propertyDetails);
    document.querySelectorAll('.radioinput20').forEach((eg: any) => {
      eg.style.backgroundColor = 'white';
      h.target.parentElement.style.backgroundColor = '#0078db';
    });
  }
  Highspeedlift(h: any) {
    console.log(h.target.textContent);
    this.propertyDetails.step3.liftType = h.target.textContent;
    console.log(this.propertyDetails);
    document.querySelectorAll('.radioinput21').forEach((eg: any) => {
      eg.style.backgroundColor = 'white';
      h.target.parentElement.style.backgroundColor = '#0078db';
    });
  }
  Servicelift(h: any) {
    console.log(h.target.textContent);
    this.propertyDetails.step3.liftType = h.target.textContent;
    console.log(this.propertyDetails);
    document.querySelectorAll('.radioinput21').forEach((eg: any) => {
      eg.style.backgroundColor = 'white';
      h.target.parentElement.style.backgroundColor = '#0078db';
    });
  }
  Powerlift(h: any) {
    console.log(h.target.textContent);
    this.propertyDetails.step3.liftType = h.target.textContent;
    console.log(this.propertyDetails);
    document.querySelectorAll('.radioinput21').forEach((eg: any) => {
      eg.style.backgroundColor = 'white';
      h.target.parentElement.style.backgroundColor = '#0078db';
    });
  }

  bathroom(f: any) {
    console.log(f.target.textContent);
    this.propertyDetails.step3.addbathroom = f.target.textContent;
    console.log(this.propertyDetails);
    document.querySelectorAll('.radioinput8').forEach((ef: any) => {
      ef.style.backgroundColor = 'white';
      f.target.parentElement.style.backgroundColor = '#0078db';
    });
  }

  balconies(i: any) {
    console.log(i.target.textContent);
    this.propertyDetails.step3.addbalconies = i.target.textContent;
    console.log(this.propertyDetails);
    document.querySelectorAll('.radioinput9').forEach((ei: any) => {
      ei.style.backgroundColor = 'white';
      i.target.parentElement.style.backgroundColor = '#0078db';
    });
  }

  inputbalconiestype = false;
  ggg = true;
  inputbalconies() {
    this.inputbalconiestype = true;
    this.ggg = false;
  }

  otherbalcony: number = 0;

  addBalconie(d: any) {
    console.log(d);
    this.propertyDetails.step3.addbalconies = d.otherbalcony;
    this.otherbalcony = d.otherbalcony;
    this.inputbalconiestype = false;
    this.ggg = true;
  }

  otherbathrooms: number = 0;

  addBathroom(d: any) {
    console.log(d);
    this.propertyDetails.step3.addbathroom = d.otherbathrooms;
    this.otherbathrooms = d.otherbathrooms;
    this.inputwashroomtype = false;
    this.fffff = true;
  }

  otherbedrooms: number = 0;

  addBedroom(d: any) {
    console.log(d);
    this.propertyDetails.step3.Addroom = d.otherbedrooms;
    this.otherbedrooms = d.otherbedrooms;
    this.addroominput = false;
    this.ddddd = true;
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
      e.target.parentElement.style.backgroundColor = '#0078db';
    });
  }

  ageproperty(e: any) {
    console.log(e.target.textContent);
    this.propertyDetails.step3.availitysubtype = e.target.textContent;
    console.log(this.propertyDetails);
    document.querySelectorAll('.radioinput13').forEach((ei: any) => {
      ei.style.backgroundColor = 'white';
      e.target.parentElement.style.backgroundColor = '#0078db';
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
      h.target.parentElement.style.backgroundColor = '#0078db';
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
    console.log(e);
    this.propertyDetails.step3.OnFloorDetails = e.target.value;
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
    this.propertyDetails.step3.Areadetail2 = e.target.value;
    console.log(this.propertyDetails);
  }

  AreaDetails(e: any) {
    console.log(e.target.value);
    this.propertyDetails.step3.AreaDetail = e.target.value;
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
  // areaoption(e: any) {
  //   this.propertyDetails.step3.areadetails = e.target.value;
  //   console.log(this.propertyDetails.step3);
  // }

  // carpetArea(e: any) {
  //   this.propertyDetails.step3.carpetArea = e.target.value;
  //   console.log(this.propertyDetails);
  // }
  //-----------------step4----------------
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

  // ----------------------step 5---------------

  ownershipitem(e: any) {
    console.log(e.target.textContent);
    this.propertyDetails.step5.ownership = e.target.textContent;
    console.log(this.propertyDetails);
    document.querySelectorAll('.radioinput14').forEach((ei: any) => {
      ei.style.backgroundColor = 'white';
      e.target.parentElement.style.backgroundColor = '#0078db';
    });
  }
  yesvalue(e: any) {
    console.log(e.target.textContent);
    this.propertyDetails.step5.Pre_released = e.target.textContent;
    console.log(this.propertyDetails);
    document.querySelectorAll('.radioinput15').forEach((ei: any) => {
      ei.style.backgroundColor = 'white';
      e.target.parentElement.style.backgroundColor = '#0078db';
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
      e.target.parentElement.style.backgroundColor = '#0078db';
    });
  }

  yesBrocage(e: any) {
    console.log(e.target.textContent);
    this.propertyDetails.step5.Brokarage = e.target.textContent;
    console.log(this.propertyDetails);
    document.querySelectorAll('.radioinput23').forEach((ei: any) => {
      ei.style.backgroundColor = 'white';
      e.target.parentElement.style.backgroundColor = '#0078db';
    });
  }
  Fixedbrokerage(e: any) {
    console.log(e.target.textContent);
    this.propertyDetails.step5.fixedbrokerage = e.target.textContent;
    console.log(this.propertyDetails);
    document.querySelectorAll('.fixed').forEach((ei: any) => {
      ei.style.backgroundColor = 'white';
      e.target.parentElement.style.backgroundColor = '  #0078db';
    });
  }

  fireNoc(e: any) {
    console.log(e.target.textContent);
    this.propertyDetails.step5.FireNOC = e.target.textContent;
    console.log(this.propertyDetails);
    document.querySelectorAll('.radioinput24').forEach((ei: any) => {
      ei.style.backgroundColor = 'white';
      e.target.parentElement.style.backgroundColor = '#0078db';
    });
  }

  OccurancyCertified(e: any) {
    console.log(e.target.textContent);
    this.propertyDetails.step5.OccurancyCertified = e.target.textContent;
    console.log(this.propertyDetails);
    document.querySelectorAll('.radioinput25').forEach((ei: any) => {
      ei.style.backgroundColor = 'white';
      e.target.parentElement.style.backgroundColor = '#0078db';
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
  brokerage = false;
  brokerageoption() {
    this.brokerage = true;
  }

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
  nooptn() {
    this.brokerage = false;
    this.inputfieldbro = false;
  }

  // imgArr: any = [];
  // index: any;
  // inpChange(e: any) {
  //   var reader = new FileReader();
  //   reader.readAsDataURL(e.target.files[0]);
  //   reader.onload = (_event) => {
  //     this.imgArr.push(reader.result);
  //   };
  // }
  // removeSelectedFile(index: any) {
  //   console.log('index', index, 1);
  //   this.imgArr.splice(index, 1);
  // }
  // uploadimg() {
  //   this.propertyDetails.step4.images = this.imgArr;
  //   console.log(this.propertyDetails);
  // }
  uploadimg(uu: any) {
    this.propertyDetails.step4.imgArr.push(uu);
    console.log(uu);
  }

  getAll() {
    this.store
      .collection('propertyDetail')
      .doc(this.dataid)
      .get()
      .subscribe((res: any) => {
        console.log(res.data(), 'data coming for tha data');
        this.singlepropertylist = res.data();
        this.propertyDetails = res.data().propertyDetail;
        this.one();
        console.log(this.singlepropertylist, 'datdat');
        if (this.singlepropertylist.propertyDetail.step5.Maintenance) {
          this.addpricingbox = !this.addpricingbox;
        }
        if (this.singlepropertylist.propertyDetail.step3.builtupArea) {
          this.carpetareacontainer = true;
        }
        if (this.singlepropertylist.propertyDetail.step3.squarebuiltupArea) {
          this.builtupareacontainer = true;
        }
      });
  }

  updatebasicDetails() {
    console.log(this.propertyDetails);

    this.store
      .collection('propertyDetail')
      .doc(this.dataid)
      .set({ propertyDetail: this.propertyDetails });
    this._snackBar.open('Data Updated Successfully!', '✔', {
      horizontalPosition: 'right',
      verticalPosition: 'top',
      panelClass: 'notify-success',
      duration: 3000,
    });

    this.router.navigateByUrl('/property-list');
  }
}
