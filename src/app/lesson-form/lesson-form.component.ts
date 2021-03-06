import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { validateUrl } from '../shared/validators/validateUrl';


@Component({
  selector: 'lesson-form',
  templateUrl: './lesson-form.component.html',
  styleUrls: ['./lesson-form.component.css']
})
export class LessonFormComponent implements OnInit, OnChanges {

  form: FormGroup;
  @Input()
  initialValue: any;

  constructor(private fb: FormBuilder) { 
    // initialize form from constructor so that afterwards we can detect changes in initial value and display lesson values in edit form.
    this.form = this.fb.group({
      description: ['placeholder', Validators.required],
      url: ['', Validators.required],
      videoUrl: ['', [Validators.required, validateUrl]],
      tags: ['', Validators.required],
      longDescription: ['']
    });

  }

  ngOnChanges(changes:SimpleChanges) {
    //make sure form is initialized and look for changes to initialValue input property
    if(this.form && changes['initialValue']) {
      this.form.patchValue(changes['initialValue'].currentValue)
    }
  }

  ngOnInit() {

  }

  isErrorVisible(field: string, error:string) {
    return this.form.controls[field].dirty //has been touched
      && this.form.controls[field].errors //if form is associated with the field
      && this.form.controls[field].errors[error]; //if the error includes the given error.
  }

  get value() {
    return this.form.value;
  }

  get valid() {
    return this.form.valid;
  }

  reset() {
    this.form.reset();
  }


}
