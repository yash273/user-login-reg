import { Component, DoCheck, OnChanges, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { NgxMaterialTimepickerTheme } from 'ngx-material-timepicker';
import { bodyRegion, goals, measurements, routine, type } from 'src/app/const/assessment';
import { numRegx } from 'src/app/regex-rules/regex';
import { AssessmentService } from '../assessment.service';
import { ChartConfiguration, ChartEvent, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { Router } from '@angular/router';

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

  newData! : number[]

  constructor(
    private formBuilder: FormBuilder,
    private assmService: AssessmentService,
    private router: Router
  ) { }

  ngOnInit(): void {

    this.createAssessment();
    this.types = this.getType();
  }

  createAssessment() {
    this.assessmentForm = this.formBuilder.group({
      template: ['test', [Validators.required]],
      bodyRegion: ['', [Validators.required]],
      description: ['test', [Validators.required]],
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
      about: ['test', [Validators.required]],
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
      AssmDetails:
        this.formBuilder.array([
          this.createAssmDetails()
        ])
    })
  }

  createAssmDetails() {
    return this.formBuilder.group({
      type: ['', [Validators.required]],
      isPatientAssessment: [false, [Validators.required]],
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
      this.disableRoutineTime();
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
    this.setGoalsValidations();
    this.disableRoutineTime();
  }

  // submit
  onSubmit() {
    if (this.assessmentForm.invalid) {
      alert('invalid')
    } else {
      this.assmService.submit(this.assessmentForm);
      this.router.navigate(['/assessment/list']);
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

  setMinRangeTo() {
    const rangeFromValue: number = this.assessmentForm.get(this.categoryToAssmDetailsPath + this.currentAssmDetailIndex + '.rangeFrom')?.value;
    this.assessmentForm.get(this.categoryToAssmDetailsPath + this.currentAssmDetailIndex + '.rangeTo')?.setValidators([Validators.min(rangeFromValue + 1), Validators.required, Validators.pattern(numRegx), Validators.max(999)])
    this.assessmentForm.get(this.categoryToAssmDetailsPath + this.currentAssmDetailIndex + '.rangeTo')?.updateValueAndValidity();
  }

  rangeValidator(): ValidatorFn {

    return (control: AbstractControl): { [key: string]: any } | null => {
      const minValue = this.assessmentForm.get(this.categoryToAssmDetailsPath + this.currentAssmDetailIndex + '.rangeFrom')?.value;
      const maxValue = this.assessmentForm.get(this.categoryToAssmDetailsPath + this.currentAssmDetailIndex + '.rangeTo')?.value;
      const value = this.assessmentForm.get(this.categoryToAssmDetailsPath + this.currentAssmDetailIndex + '.goals.simple.value')?.value;
      if (value !== null && (isNaN(value) || value < minValue || value > maxValue)) {
        return { range: true };
      }
      return null;
    };
  }


  setRangeValidator() {
    this.assessmentForm.get(this.categoryToAssmDetailsPath + this.currentAssmDetailIndex + '.goals.simple.value')?.setValidators([Validators.required, Validators.pattern(numRegx), this.rangeValidator()])
    this.assessmentForm.get(this.categoryToAssmDetailsPath + this.currentAssmDetailIndex + '.goals.simple.value')?.updateValueAndValidity();
  }

  setRefRegionValidation() {
    if (this.assessmentDetailsControl.measureType == false) {
      this.assessmentForm.get(this.categoryToAssmDetailsPath + this.currentAssmDetailIndex + '.refRegion')?.setValidators([Validators.required]);
      this.assessmentForm.get(this.categoryToAssmDetailsPath + this.currentAssmDetailIndex + '.refRegion')?.updateValueAndValidity();
      return true
    } else {
      this.assessmentForm.get(this.categoryToAssmDetailsPath + this.currentAssmDetailIndex + '.refRegion')?.setValidators(null);
      this.assessmentForm.get(this.categoryToAssmDetailsPath + this.currentAssmDetailIndex + '.refRegion')?.updateValueAndValidity();
      // this.setGoalsValidations()
      return false
    }
  }

  setValidatorsAndValue(controlPath: string, validators: ValidatorFn[] | null, value: any, clearValue: boolean): void {
    const control = this.assessmentForm.get(controlPath);
    if (control) {
      control.setValidators(validators);
      if (clearValue) {
        control.setValue(value);
      }
      control.updateValueAndValidity();
    }
  }

  setGoalsValidations() {

    const value = this.assessmentForm.get(this.categoryToAssmDetailsPath + this.currentAssmDetailIndex + '.measurements')?.value;

    // Clear validators and values for all controls
    this.setValidatorsAndValue(this.categoryToAssmDetailsPath + this.currentAssmDetailIndex + '.goals.errorRate.selection', null, '', true);
    this.setValidatorsAndValue(this.categoryToAssmDetailsPath + this.currentAssmDetailIndex + '.goals.errorRate.value', null, '', true);
    this.setValidatorsAndValue(this.categoryToAssmDetailsPath + this.currentAssmDetailIndex + '.goals.difference.selection', null, '', true);
    this.setValidatorsAndValue(this.categoryToAssmDetailsPath + this.currentAssmDetailIndex + '.goals.difference.value', null, '', true);
    this.setValidatorsAndValue(this.categoryToAssmDetailsPath + this.currentAssmDetailIndex + '.goals.comparison.selection', null, '', true);
    this.setValidatorsAndValue(this.categoryToAssmDetailsPath + this.currentAssmDetailIndex + '.goals.comparison.value', null, '', true);

    if (value.includes('Error Rate')) {
      // Set validators without setting the value
      this.setValidatorsAndValue(this.categoryToAssmDetailsPath + this.currentAssmDetailIndex + '.goals.errorRate.selection', [Validators.required], '', false);
      this.setValidatorsAndValue(this.categoryToAssmDetailsPath + this.currentAssmDetailIndex + '.goals.errorRate.value', [Validators.required, Validators.pattern(numRegx)], '', false);
    }
    if (value.includes('Difference')) {
      // Set validators without setting the value
      this.setValidatorsAndValue(this.categoryToAssmDetailsPath + this.currentAssmDetailIndex + '.goals.difference.selection', [Validators.required], '', false);
      this.setValidatorsAndValue(this.categoryToAssmDetailsPath + this.currentAssmDetailIndex + '.goals.difference.value', [Validators.required, Validators.pattern(numRegx), this.rangeValidatorDiff()], '', false);
    }
    if (value.includes('Comparison')) {
      // Set validators without setting the value
      this.setValidatorsAndValue(this.categoryToAssmDetailsPath + this.currentAssmDetailIndex + '.goals.comparison.selection', [Validators.required], '', false);
      this.setValidatorsAndValue(this.categoryToAssmDetailsPath + this.currentAssmDetailIndex + '.goals.comparison.value', [Validators.required, Validators.pattern(numRegx)], '', false);
    }
  }

  isPatientAssessment() {
    // debugger
    const value = this.assessmentForm.get(this.categoryToAssmDetailsPath + this.currentAssmDetailIndex + '.isPatientAssessment')?.value;
    if (value == true) {
      return true
    } else {
      return false
    }
  }

  rangeValidatorDiff(): ValidatorFn {

    return (control: AbstractControl): { [key: string]: any } | null => {
      const minValue = this.assessmentForm.get(this.categoryToAssmDetailsPath + this.currentAssmDetailIndex + '.rangeFrom')?.value;
      const maxValue = this.assessmentForm.get(this.categoryToAssmDetailsPath + this.currentAssmDetailIndex + '.rangeTo')?.value;
      const value = this.assessmentForm.get(this.categoryToAssmDetailsPath + this.currentAssmDetailIndex + '.goals.difference.value')?.value;
      if (value !== null && (isNaN(value) || value < minValue || value > maxValue)) {
        return { range: true };
      }
      return null;
    };
  }

  disableRoutineTime() {
    this.assessmentForm.get(this.categoryToAssmDetailsPath + this.currentAssmDetailIndex + '.routine')?.disable();
    this.assessmentForm.get(this.categoryToAssmDetailsPath + this.currentAssmDetailIndex + '.times')?.disable();
    if (this.selectedType) {
      this.assessmentForm.get(this.categoryToAssmDetailsPath + this.currentAssmDetailIndex + '.routine')?.enable();
      this.assessmentForm.get(this.categoryToAssmDetailsPath + this.currentAssmDetailIndex + '.times')?.enable();
    }
  }

  openGraph() {
    // this.assmService.openGraph(this.assessmentForm);
    if (this.assessmentForm.invalid) {
      alert('invalid ongraph')
    } else {

    }
  }



  public lineChartType: ChartType = 'line';
  public lineChartData: ChartConfiguration['data'] = {
    datasets: [
      {
        data: this.newData,
        label: 'Series A',
        backgroundColor: 'rgba(148,159,177,0.2)',
        borderColor: 'rgba(148,159,177,1)',
        pointBackgroundColor: 'rgba(148,159,177,1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(148,159,177,0.8)',
        fill: 'origin',
      },
      {
        data: [28, 48, 40, 19, 86, 27, 90],
        label: 'Series B',
        backgroundColor: 'rgba(77,83,96,0.2)',
        borderColor: 'rgba(77,83,96,1)',
        pointBackgroundColor: 'rgba(77,83,96,1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(77,83,96,1)',
        fill: 'origin',
      },
      {
        data: [180, 480, 770, 90, 1000, 270, 400],
        label: 'Series C',
        yAxisID: 'y1',
        backgroundColor: 'rgba(255,0,0,0.3)',
        borderColor: 'red',
        pointBackgroundColor: 'rgba(148,159,177,1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(148,159,177,0.8)',
        fill: 'origin',
      },
      {
        data: [50, 40, 60, 70, 45, 55, 30],
        label: 'New Dataset',
        backgroundColor: 'rgba(123,45,67,0.2)',
        borderColor: 'rgba(123,45,67,1)',
        pointBackgroundColor: 'rgba(123,45,67,1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(123,45,67,0.8)',
        fill: 'origin',
      }
    ],
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July']
  };




  // @ViewChild(BaseChartDirective) chart?: BaseChartDirective;
  // public chartClicked({ event, active }: { event?: ChartEvent, active?: {}[] }): void {
  //   console.log(event, active);
  // }

  // public chartHovered({ event, active }: { event?: ChartEvent, active?: {}[] }): void {
  //   console.log(event, active);
  // }

  public lineChartOptions: ChartConfiguration['options'] = {
    elements: {
      line: {
        tension: 0.5
      }
    },
    scales: {
      // We use this empty structure as a placeholder for dynamic theming.
      y:
      {
        position: 'left',
      },
      y1: {
        position: 'right',
        grid: {
          color: 'rgba(255,0,0,0.3)',
        },
        ticks: {
          color: 'red'
        }
      }
    },

  }
}
