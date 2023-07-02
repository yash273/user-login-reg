import { Component, DoCheck, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { NgxMaterialTimepickerTheme } from 'ngx-material-timepicker';
import { bodyRegion, goals, measurements, routine, type } from 'src/app/const/assessment';
import { numRegx } from 'src/app/regex-rules/regex';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit {

  assessmentForm !: FormGroup;
  bodyRegion = bodyRegion;
  currentCategoryIndex: number = 0;
  currentAssessmentIndex: number = 0;
  currentAssmDetailIndex: number = 0;
  types!: string[];
  units!: string[];
  selectedType!: string | null
  measurements = measurements;
  measureType: boolean = false;
  goalsSelect = goals;
  routine = routine;
  assessmentDetailsControl: any;
  patiantMeasurements: any;
  assmDetailsDisplay: boolean = false;
  assmDisplay: boolean = false;
  prevAssmIndex: number = 0;
  categoryToAssessmentPath: string = 'category.' + this.currentCategoryIndex + '.assessment.';
  categoryToAssmDetailsPath: string = this.categoryToAssessmentPath + this.currentAssessmentIndex + '.AssmDetails.';
  rangeToValue: number = 11;
  customTheme: NgxMaterialTimepickerTheme = {
    container: {
      bodyBackgroundColor: '#eceef8',
      buttonColor: '#324191'
    },
    dial: {
      dialBackgroundColor: '#324191',
    },
    clockFace: {
      clockFaceBackgroundColor: '#b2b9e1',
      clockHandColor: '#26316d',
      clockFaceTimeInactiveColor: '#fff'
    }
  };

  constructor(
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit(): void {

    this.createAssessment();
    this.types = this.getType();
  }

  createAssessment() {
    this.assessmentForm = this.formBuilder.group({
      template: ['', [Validators.required]],
      bodyRegion: ['', [Validators.required]],
      description: ['', [Validators.required]],
      measurements: this.formBuilder.array([
        this.createMeasurement()
      ]),
      category: this.formBuilder.array([
        this.createCategory()
      ])
    });
  }

  createMeasurement() {
    return this.formBuilder.group({
      about: ['', [Validators.required]],
      time: ['', [Validators.required]]
    })
  }

  createCategory() {
    return this.formBuilder.group({
      catName: ['', [Validators.required]],
      assessment: this.formBuilder.array([
        this.createAssessments()
      ])
    })
  }

  createAssessments() {
    return this.formBuilder.group({
      AssmName: ['', [Validators.required]],
      AssmDetails: this.formBuilder.array([
        this.createAssmDetails()
      ])
    })
  }

  createAssmDetails() {
    return this.formBuilder.group({
      type: ['', [Validators.required]],
      unit: ['', [Validators.required]],
      rangeFrom: ['', [Validators.required, Validators.pattern(numRegx), Validators.min(10), Validators.max(999)]],
      rangeTo: ['', [Validators.required, Validators.pattern(numRegx), Validators.max(999)]],
      measureType: [false, [Validators.required]],
      measureRegion: ['', [Validators.required]],
      refRegion: [''],
      measurements: [[this.measurements[0]], [Validators.required]],
      goals: this.formBuilder.group({
        simple: this.formBuilder.group({
          selection: ['', [Validators.required]],
          value: ['', [Validators.required, Validators.pattern(numRegx),]]
        }),
        errorRate: this.formBuilder.group({
          selection: [''],
          value: ['']
        }),
        difference: this.formBuilder.group({
          selection: [''],
          value: ['']
        }),
        comparison: this.formBuilder.group({
          selection: [''],
          value: ['']
        })
      }),
      routine: ['', [Validators.required]],
      times: ['', [Validators.required]]
    },
    );
  }


  categoryValid(index: number) {
    const isTempValid = this.assessmentForm.get('template')?.valid;
    const isBRValid = this.assessmentForm.get('bodyRegion')?.valid;
    const isDescValid = this.assessmentForm.get('description')?.valid;
    const isMeasValid = this.assessmentForm.get('measurements')?.valid;

    if (isTempValid && isBRValid && isDescValid && isMeasValid) {
      this.categoryControls.at(index).get('catName')?.enable();
      this.assessmentForm.get(this.categoryToAssessmentPath + index + '.AssmName')?.enable();
      return true
    }
    else {
      this.categoryControls.at(index).get('catName')?.disable();
      this.assessmentForm.get(this.categoryToAssessmentPath + index + '.AssmName')?.disable();
      return true
    }
  }

  get assessmentform() {
    return this.assessmentForm.controls;
  }

  get measurementsControls() {
    return this.assessmentForm.get('measurements') as FormArray;
  }

  get categoryControls() {
    return this.assessmentForm.get('category') as FormArray;
  }

  getAssessmentControls(categoryIndex: number): FormArray {
    return this.categoryControls.at(categoryIndex).get('assessment') as FormArray;
  }

  getAssessmentDetailsControls(assmIndex: number): FormArray {
    if (assmIndex) {
      const AssmDetailsArray = this.getAssessmentControls(this.currentCategoryIndex).at(assmIndex).get('AssmDetails');
      this.assessmentDetailsControl = AssmDetailsArray?.value[0];
      this.patiantMeasurements = this.assessmentForm.value.measurements;

      return this.getAssessmentControls(this.currentCategoryIndex).at(assmIndex).get('AssmDetails') as FormArray;
    }
    const AssmDetailsArray = this.getAssessmentControls(this.currentCategoryIndex).at(0).get('AssmDetails');
    this.assessmentDetailsControl = AssmDetailsArray?.value[0];
    this.patiantMeasurements = this.assessmentForm.value.measurements;

    return this.getAssessmentControls(this.currentCategoryIndex).at(0).get('AssmDetails') as FormArray;
  }

  removeMeasurement(i: number) {
    this.measurementsControls.removeAt(i)
  }

  removeCategory(i: number) {
    this.categoryControls.removeAt(i);
    this.currentCategoryIndex = 0;
  }

  addMeasurement() {
    this.measurementsControls.push(this.createMeasurement())
  }

  addCategory() {
    this.categoryControls.push(this.createCategory())
    this.currentAssessmentIndex = 0
  }

  addAssessment(index: number) {
    this.getAssessmentControls(index).push(this.createAssessments());
  }

  removeAssessment(currentCategoryIndex: number, index: number) {
    this.getAssessmentControls(currentCategoryIndex).removeAt(index);
    this.currentAssessmentIndex = 0;
  }




  setCurrentCategoryIndex(index: number) {
    this.currentCategoryIndex = index;
    console.log("catIndex:", this.currentCategoryIndex)
  }

  setCurrentAssessmentIndex(index: number) {
    this.currentAssessmentIndex = index;
    console.log("assmIndex", this.currentAssessmentIndex, "catIndex:", this.currentCategoryIndex)
  }

  handleCatBlur(index: number): void {
    const catNameValue = this.categoryControls.at(index)?.get('catName')?.value;

    if (catNameValue && this.categoryControls.at(index)?.dirty) {
      this.setCurrentCategoryIndex(index);
      this.assmDisplay = true;
    }
  }

  handleAssmBlur(index: number): void {
    const assmNameValue = this.getAssessmentControls(this.currentCategoryIndex).at(index)?.get('AssmName')?.value;

    if (assmNameValue && this.getAssessmentControls(this.currentCategoryIndex).at(index)?.dirty) {
      this.setCurrentAssessmentIndex(index);
      this.assmDetailsDisplay = true;
    }
  }


  getType() {
    return Object.keys(type)
  }

  getUnitByTypes(sType: any) {
    return type[sType]
  }

  onTypeSelectionChange(i: number, k: number) {
    this.units = this.getUnitByTypes(this.selectedType);
    console.log(this.selectedType);
    this.prevAssmIndex = i;
    console.log(i);
    this.currentAssmDetailIndex = k;
    console.log(k, ':k')
  }

  // submit
  onSubmit() {
    if (this.assessmentForm.invalid) {
      alert('invalid')
    } else {
      console.log(this.assessmentForm.value);
    }
  }

  // show selected measurement in mat-select-trigger
  getSelectedMeasurementsText(): string {
    const selectedMeasurements = this.assessmentForm.get(this.categoryToAssmDetailsPath + this.currentAssmDetailIndex + '.measurements')?.value;
    const totalOptions = this.measurements.length;
  if (selectedMeasurements.length === totalOptions) {
    return 'All selected';
  }
  return selectedMeasurements.join(', '); 
  }

  getSelectedMeasurementsTextForTwo(): string {
    const selectedMeasurements = this.assessmentForm.get(this.categoryToAssmDetailsPath + this.currentAssmDetailIndex + '.measurements')?.value;
  if (selectedMeasurements.length > 1) {
    return 'All selected';
  }
  return selectedMeasurements
  }

  setValidation(){
    this.assessmentForm.get(this.categoryToAssmDetailsPath + this.currentAssmDetailIndex + '.goals.errorRate.selection')?.setValidators([Validators.required]);
    this.assessmentForm.get(this.categoryToAssmDetailsPath + this.currentAssmDetailIndex + '.goals.errorRate.selection')?.updateValueAndValidity();
    this.assessmentForm.get(this.categoryToAssmDetailsPath + this.currentAssmDetailIndex + '.goals.errorRate.value')?.setValidators([Validators.required]);
    this.assessmentForm.get(this.categoryToAssmDetailsPath + this.currentAssmDetailIndex + '.goals.errorRate.value')?.updateValueAndValidity();

  }
  
  removeValidation(){
    this.assessmentForm.get(this.categoryToAssmDetailsPath + this.currentAssmDetailIndex + '.goals.errorRate.selection')?.setValidators(null);
    this.assessmentForm.get(this.categoryToAssmDetailsPath + this.currentAssmDetailIndex + '.goals.errorRate.selection')?.updateValueAndValidity();
    this.assessmentForm.get(this.categoryToAssmDetailsPath + this.currentAssmDetailIndex + '.goals.errorRate.value')?.setValidators(null);
    this.assessmentForm.get(this.categoryToAssmDetailsPath + this.currentAssmDetailIndex + '.goals.errorRate.value')?.updateValueAndValidity();
  }

  setMinRangeTo(){
    const rangeFromValue: number = this.assessmentForm.get(this.categoryToAssmDetailsPath + this.currentAssmDetailIndex + '.rangeFrom')?.value;
    this.assessmentForm.get(this.categoryToAssmDetailsPath + this.currentAssmDetailIndex + '.rangeTo')?.setValidators([Validators.min(rangeFromValue + 1)])
    this.assessmentForm.get(this.categoryToAssmDetailsPath + this.currentAssmDetailIndex + '.rangeTo')?.updateValueAndValidity();
  }
}
