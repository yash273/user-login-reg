import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray, ValidatorFn, AbstractControl } from '@angular/forms';
import { MatOption } from '@angular/material/core';
import { MatSelect } from '@angular/material/select';
import { Router, ActivatedRoute } from '@angular/router';
import { Chart, registerables } from 'chart.js';
import { NgxMaterialTimepickerTheme } from 'ngx-material-timepicker';
import { bodyRegion, measurements, goals, routine, type } from 'src/app/const/assessment';
import { AssessmentData } from 'src/app/interfaces/assessment';
import { numRegx } from 'src/app/regex-rules/regex';
import { AssessmentService } from '../assessment.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {

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
  public chart: any;
  allSelected = false;
  @ViewChild('select') select!: MatSelect;

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
  aId!: number;
  pData!: AssessmentData

  constructor(
    private formBuilder: FormBuilder,
    private assmService: AssessmentService,
    private router: Router,
    private route: ActivatedRoute,
  ) {
    Chart.register(...registerables);
    this.route.params.subscribe((res) => {
      this.aId = parseInt(res['aId'], 10);
    });
  }

  ngOnInit(): void {
    this.createAssessment();
    this.types = this.getType();
    this.pData = this.assmService.getAssmData(this.aId);
    this.patchFormValues();
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

  createMeasurement(measurement?: any) {
    return this.formBuilder.group({
      about: [measurement?.about || '', [Validators.required]],
      time: [measurement?.time || '', [Validators.required]]
    })
  }

  createCategory(category?: any) {
    const categoryForm = this.formBuilder.group({
      catName: [category?.catName || '', [Validators.required]],
      assessment: this.formBuilder.array([])
    });

    const assessmentFormArray = categoryForm.get('assessment') as FormArray;
    if (Array.isArray(category?.assessment) && category.assessment.length > 0) {
      category.assessment.forEach((assessmentItem: any) => {
        const assessmentFormGroup = this.createAssessments(assessmentItem);
        assessmentFormArray.push(assessmentFormGroup);
      });
    } else {
      const assessmentFormGroup = this.createAssessments();
      assessmentFormArray.push(assessmentFormGroup);
    }

    return categoryForm;
  }



  createAssessments(asm?: any) {
    return this.formBuilder.group({
      AssmName: [asm?.AssmName || '', [Validators.required]],
      AssmDetails:
        this.formBuilder.array([
          this.createAssmDetails(asm?.AssmDetails[0])
        ])
    })
  }
  chartData: any
  createAssmDetails(ad?: any) {
    return this.formBuilder.group({
      type: [ad?.type || '', [Validators.required]],
      isPatientAssessment: [ad?.isPatientAssessment || false, [Validators.required]],
      unit: [ad?.unit || '', [Validators.required]],
      rangeFrom: [ad?.rangeFrom || '', [Validators.required, Validators.pattern(numRegx), Validators.min(10), Validators.max(999)]],
      rangeTo: [ad?.rangeTo || '', [Validators.required, Validators.pattern(numRegx), Validators.max(999)]],
      measureType: [ad?.measureType || false, [Validators.required]],
      measureRegion: [ad?.measureRegion || '', [Validators.required]],
      refRegion: [ad?.refRegion || ''],
      measurements: [ad?.measurements || [this.measurements[0]], [Validators.required]],
      goals: this.formBuilder.group({
        simple: this.formBuilder.group({
          selection: [ad?.goals.simple.selection || '', [Validators.required]],
          value: [ad?.goals.simple.value || '', [Validators.required, Validators.pattern(numRegx),]]
        }),
        errorRate: this.formBuilder.group({
          selection: [ad?.goals.errorRate.selection || ''],
          value: [ad?.goals.errorRate.value || '']
        }),
        difference: this.formBuilder.group({
          selection: [ad?.goals.difference.selection || ''],
          value: [ad?.goals.difference.value || '']
        }),
        comparison: this.formBuilder.group({
          selection: [ad?.goals.comparison.selection || ''],
          value: [ad?.goals.comparison.value || '']
        })
      }),
      routine: [ad?.routine || '', [Validators.required]],
      times: ['', [Validators.required]],
      chartData: [ad?.chartData || '']
    },
    );
  }

  patchFormValues() {
    const newValues = this.pData

    this.assessmentForm.patchValue({
      template: newValues.template,
      bodyRegion: newValues.bodyRegion,
      description: newValues.description
    });

    const measurementsFormArray = this.assessmentForm.get('measurements') as FormArray;
    measurementsFormArray.clear();
    newValues.measurements.forEach((measurement) => {
      measurementsFormArray.push(this.createMeasurement(measurement));
    });

    const categoryFormArray = this.assessmentForm.get('category') as FormArray;
    categoryFormArray.clear();
    newValues.category.forEach((category) => {
      categoryFormArray.push(this.createCategory(category));
    });

    // this.openGraph()
  }

  categoryValid(index: number) {
    const isTempValid = this.assessmentForm.get('template')?.valid;
    const isBRValid = this.assessmentForm.get('bodyRegion')?.valid;
    const isDescValid = this.assessmentForm.get('description')?.valid;
    const isMeasValid = this.assessmentForm.get('measurements')?.valid;

    if (isTempValid && isBRValid && isDescValid && isMeasValid) {
      this.categoryControls.at(index).get('catName')?.enable();
      this.assessmentForm.get('category.' + this.currentCategoryIndex + '.assessment.' + index + '.AssmName')?.enable();
      return true
    }
    else {
      this.categoryControls.at(index).get('catName')?.disable();
      this.assessmentForm.get('category.' + this.currentCategoryIndex + '.assessment.' + index + '.AssmName')?.disable();
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
    this.openGraph();
  }

  removeAssessment(currentCategoryIndex: number, index: number) {
    this.getAssessmentControls(currentCategoryIndex).removeAt(index);
    this.currentAssessmentIndex = 0;
    this.openGraph();
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
      this.openGraph();
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

  // show selected measurement in mat-select-trigger
  getSelectedMeasurementsText(): string {
    const selectedMeasurements = this.assessmentForm.get('category.' + this.currentCategoryIndex + '.assessment.' + this.currentAssessmentIndex + '.AssmDetails.' + this.currentAssmDetailIndex + '.measurements')?.value;
    const totalOptions = this.measurements.length;

    if (selectedMeasurements.length === totalOptions) {
      return 'All selected';
    }
    return selectedMeasurements.join(', ');
  }

  getSelectedMeasurementsTextForTwo(): string {
    const selectedMeasurements = this.assessmentForm.get('category.' + this.currentCategoryIndex + '.assessment.' + this.currentAssessmentIndex + '.AssmDetails.' + this.currentAssmDetailIndex + '.measurements')?.value;
    if (selectedMeasurements.length > 1) {
      return 'All selected';
    }
    return selectedMeasurements
  }

  setMinRangeTo() {
    const rangeFromValue: number = this.assessmentForm.get('category.' + this.currentCategoryIndex + '.assessment.' + this.currentAssessmentIndex + '.AssmDetails.' + this.currentAssmDetailIndex + '.rangeFrom')?.value;
    this.assessmentForm.get('category.' + this.currentCategoryIndex + '.assessment.' + this.currentAssessmentIndex + '.AssmDetails.' + this.currentAssmDetailIndex + '.rangeTo')?.setValidators([Validators.min(rangeFromValue + 1), Validators.required, Validators.pattern(numRegx), Validators.max(999)])
    this.assessmentForm.get('category.' + this.currentCategoryIndex + '.assessment.' + this.currentAssessmentIndex + '.AssmDetails.' + this.currentAssmDetailIndex + '.rangeTo')?.updateValueAndValidity();
  }

  rangeValidator(): ValidatorFn {

    return (control: AbstractControl): { [key: string]: any } | null => {
      const minValue = this.assessmentForm.get('category.' + this.currentCategoryIndex + '.assessment.' + this.currentAssessmentIndex + '.AssmDetails.' + this.currentAssmDetailIndex + '.rangeFrom')?.value;
      const maxValue = this.assessmentForm.get('category.' + this.currentCategoryIndex + '.assessment.' + this.currentAssessmentIndex + '.AssmDetails.' + this.currentAssmDetailIndex + '.rangeTo')?.value;
      const value = this.assessmentForm.get('category.' + this.currentCategoryIndex + '.assessment.' + this.currentAssessmentIndex + '.AssmDetails.' + this.currentAssmDetailIndex + '.goals.simple.value')?.value;
      if (value !== null && (isNaN(value) || value < minValue || value > maxValue)) {
        return { range: true };
      }
      return null;
    };
  }

  setRangeValidator() {
    this.assessmentForm.get('category.' + this.currentCategoryIndex + '.assessment.' + this.currentAssessmentIndex + '.AssmDetails.' + this.currentAssmDetailIndex + '.goals.simple.value')?.setValidators([Validators.required, Validators.pattern(numRegx), this.rangeValidator()])
    this.assessmentForm.get('category.' + this.currentCategoryIndex + '.assessment.' + this.currentAssessmentIndex + '.AssmDetails.' + this.currentAssmDetailIndex + '.goals.simple.value')?.updateValueAndValidity();
  }

  setRefRegionValidation() {
    if (this.assessmentDetailsControl.measureType == false) {
      this.assessmentForm.get('category.' + this.currentCategoryIndex + '.assessment.' + this.currentAssessmentIndex + '.AssmDetails.' + this.currentAssmDetailIndex + '.refRegion')?.setValidators([Validators.required]);
      this.assessmentForm.get('category.' + this.currentCategoryIndex + '.assessment.' + this.currentAssessmentIndex + '.AssmDetails.' + this.currentAssmDetailIndex + '.refRegion')?.updateValueAndValidity();
      return true
    } else {
      this.assessmentForm.get('category.' + this.currentCategoryIndex + '.assessment.' + this.currentAssessmentIndex + '.AssmDetails.' + this.currentAssmDetailIndex + '.refRegion')?.setValidators(null);
      this.assessmentForm.get('category.' + this.currentCategoryIndex + '.assessment.' + this.currentAssessmentIndex + '.AssmDetails.' + this.currentAssmDetailIndex + '.refRegion')?.updateValueAndValidity();
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

    const value = this.assessmentForm.get('category.' + this.currentCategoryIndex + '.assessment.' + this.currentAssessmentIndex + '.AssmDetails.' + this.currentAssmDetailIndex + '.measurements')?.value;
    // Clear validators and values for all controls
    this.setValidatorsAndValue('category.' + this.currentCategoryIndex + '.assessment.' + this.currentAssessmentIndex + '.AssmDetails.' + this.currentAssmDetailIndex + '.goals.errorRate.selection', null, '', true);
    this.setValidatorsAndValue('category.' + this.currentCategoryIndex + '.assessment.' + this.currentAssessmentIndex + '.AssmDetails.' + this.currentAssmDetailIndex + '.goals.errorRate.value', null, '', true);
    this.setValidatorsAndValue('category.' + this.currentCategoryIndex + '.assessment.' + this.currentAssessmentIndex + '.AssmDetails.' + this.currentAssmDetailIndex + '.goals.difference.selection', null, '', true);
    this.setValidatorsAndValue('category.' + this.currentCategoryIndex + '.assessment.' + this.currentAssessmentIndex + '.AssmDetails.' + this.currentAssmDetailIndex + '.goals.difference.value', null, '', true);
    this.setValidatorsAndValue('category.' + this.currentCategoryIndex + '.assessment.' + this.currentAssessmentIndex + '.AssmDetails.' + this.currentAssmDetailIndex + '.goals.comparison.selection', null, '', true);
    this.setValidatorsAndValue('category.' + this.currentCategoryIndex + '.assessment.' + this.currentAssessmentIndex + '.AssmDetails.' + this.currentAssmDetailIndex + '.goals.comparison.value', null, '', true);

    if (value.includes('Error Rate')) {
      // Set validators without setting the value
      this.setValidatorsAndValue('category.' + this.currentCategoryIndex + '.assessment.' + this.currentAssessmentIndex + '.AssmDetails.' + this.currentAssmDetailIndex + '.goals.errorRate.selection', [Validators.required], '', false);
      this.setValidatorsAndValue('category.' + this.currentCategoryIndex + '.assessment.' + this.currentAssessmentIndex + '.AssmDetails.' + this.currentAssmDetailIndex + '.goals.errorRate.value', [Validators.required, Validators.pattern(numRegx)], '', false);
    }
    if (value.includes('Difference')) {
      // Set validators without setting the value
      this.setValidatorsAndValue('category.' + this.currentCategoryIndex + '.assessment.' + this.currentAssessmentIndex + '.AssmDetails.' + this.currentAssmDetailIndex + '.goals.difference.selection', [Validators.required], '', false);
      this.setValidatorsAndValue('category.' + this.currentCategoryIndex + '.assessment.' + this.currentAssessmentIndex + '.AssmDetails.' + this.currentAssmDetailIndex + '.goals.difference.value', [Validators.required, Validators.pattern(numRegx), this.rangeValidatorDiff()], '', false);
    }
    if (value.includes('Comparison')) {
      // Set validators without setting the value
      this.setValidatorsAndValue('category.' + this.currentCategoryIndex + '.assessment.' + this.currentAssessmentIndex + '.AssmDetails.' + this.currentAssmDetailIndex + '.goals.comparison.selection', [Validators.required], '', false);
      this.setValidatorsAndValue('category.' + this.currentCategoryIndex + '.assessment.' + this.currentAssessmentIndex + '.AssmDetails.' + this.currentAssmDetailIndex + '.goals.comparison.value', [Validators.required, Validators.pattern(numRegx)], '', false);
    }
    this.openGraph();
  }

  isPatientAssessment() {
    const value = this.assessmentForm.get('category.' + this.currentCategoryIndex + '.assessment.' + this.currentAssessmentIndex + '.AssmDetails.' + this.currentAssmDetailIndex + '.isPatientAssessment')?.value;
    if (value == true) {
      return true
    } else {
      return false
    }
  }

  rangeValidatorDiff(): ValidatorFn {

    return (control: AbstractControl): { [key: string]: any } | null => {
      const minValue = this.assessmentForm.get('category.' + this.currentCategoryIndex + '.assessment.' + this.currentAssessmentIndex + '.AssmDetails.' + this.currentAssmDetailIndex + '.rangeFrom')?.value;
      const maxValue = this.assessmentForm.get('category.' + this.currentCategoryIndex + '.assessment.' + this.currentAssessmentIndex + '.AssmDetails.' + this.currentAssmDetailIndex + '.rangeTo')?.value;
      const value = this.assessmentForm.get('category.' + this.currentCategoryIndex + '.assessment.' + this.currentAssessmentIndex + '.AssmDetails.' + this.currentAssmDetailIndex + '.goals.difference.value')?.value;
      if (value !== null && (isNaN(value) || value < minValue || value > maxValue)) {
        return { range: true };
      }
      return null;
    };
  }

  disableRoutineTime() {
    this.assessmentForm.get('category.' + this.currentCategoryIndex + '.assessment.' + this.currentAssessmentIndex + '.AssmDetails.' + this.currentAssmDetailIndex + '.routine')?.disable();
    this.assessmentForm.get('category.' + this.currentCategoryIndex + '.assessment.' + this.currentAssessmentIndex + '.AssmDetails.' + this.currentAssmDetailIndex + '.times')?.disable();
    if (this.selectedType) {
      this.assessmentForm.get('category.' + this.currentCategoryIndex + '.assessment.' + this.currentAssessmentIndex + '.AssmDetails.' + this.currentAssmDetailIndex + '.routine')?.enable();
      this.assessmentForm.get('category.' + this.currentCategoryIndex + '.assessment.' + this.currentAssessmentIndex + '.AssmDetails.' + this.currentAssmDetailIndex + '.times')?.enable();
    }
  }

  openGraph() {

    if (this.assessmentForm.invalid) {
    } else {
      if (this.chart) {
        this.chart.clear();
        this.chart.destroy();
      }
      let measurements = this.assessmentForm.get('category.' + this.currentCategoryIndex + '.assessment.' + this.currentAssessmentIndex + '.AssmDetails.' + this.currentAssmDetailIndex + '.measurements')?.value;
      const numOfDatasets = measurements.length;
      const datasets = [];
      const labels = this.assessmentForm.get('category.' + this.currentCategoryIndex + '.assessment.' + this.currentAssessmentIndex + '.AssmDetails.' + this.currentAssmDetailIndex + '.routine')?.value;
      const labelsLength = labels.length;
      const minRange = this.assessmentForm.get('category.' + this.currentCategoryIndex + '.assessment.' + this.currentAssessmentIndex + '.AssmDetails.' + this.currentAssmDetailIndex + '.rangeFrom')?.value;
      const maxRange = this.assessmentForm.get('category.' + this.currentCategoryIndex + '.assessment.' + this.currentAssessmentIndex + '.AssmDetails.' + this.currentAssmDetailIndex + '.rangeTo')?.value;
      console.log(minRange, ":minRange", "::", maxRange, ":maxRange")

      for (let i = 0; i < numOfDatasets; i++) {
        const label = measurements[i];

        // Skip dataset generation if the label is undefined
        if (typeof label === 'undefined') {
          continue;
        }

        // const data = this.generateRandomData(minRange, maxRange, labelsLength);
        // const backgroundColor = i === numOfDatasets - 1 ? 'pink' : 'blue';

        const data = this.generateRandomData(minRange, maxRange, labelsLength);
        const backgroundColor = this.generateRandomColor(); // Generate a random background color
        const borderColor = this.generateRandomColor(); // Generate a random line color

        datasets.push({
          label: label,
          data: data,
          backgroundColor: backgroundColor,
          borderColor: borderColor
        });
      }

      this.chart = new Chart("MyChart", {
        type: 'line',
        data: {
          labels: labels,
          datasets: datasets
        },
        options: {
          aspectRatio: 2.5
        }
      });

      this.assessmentForm.get('category.' + this.currentCategoryIndex + '.assessment.' + this.currentAssessmentIndex + '.AssmDetails.' + this.currentAssmDetailIndex + '.chartData')?.setValue(this.chart.data)
      this.assessmentForm.get('category.' + this.currentCategoryIndex + '.assessment.' + this.currentAssessmentIndex + '.AssmDetails.' + this.currentAssmDetailIndex + '.chartData')?.updateValueAndValidity();
    }
  }

  // Generate a random number within a given range
  generateRandomNumber(min: number, max: number): number {
    return Math.random() * (max - min) + min;
  }

  generateRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  // ...




  // Generate random data within a given range
  generateRandomData(min: number, max: number, count: number): number[] {
    const data: number[] = [];
    for (let i = 0; i < count; i++) {
      const randomValue = this.generateRandomNumber(min, max);
      data.push(randomValue);
    }
    return data;
  }

  // daily select all
  toggleAllSelection() {

    if (this.allSelected) {
      this.select.options.forEach((item: MatOption) => item.select());
    } else {
      this.select.options.forEach((item: MatOption) => item.deselect());
    }
  }

  optionClick() {
    let newStatus = true;
    this.select.options.forEach((item: MatOption) => {
      if (!item.selected) {
        newStatus = false;
      }
    });
    this.allSelected = newStatus;
  }


  // submit
  onSubmit() {
    if (this.assessmentForm.invalid) {
      alert('invalid')
    } else {
      alert('hello')
      // this.assmService.saveData(this.assessmentForm.value);
      // this.router.navigate(['/assessment/list']);
    }
  }


}
