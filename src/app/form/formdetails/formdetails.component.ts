import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormArray, AbstractControl, FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
// import { ConfirmedValidator } from '../Validator/confirmed.validator';

interface Type {
  id: number;
  Value: string;
}

@Component({
  selector: 'app-formdetails',
  templateUrl: './formdetails.component.html',
  styleUrls: ['./formdetails.component.scss']
})
export class FormdetailsComponent implements OnInit {
  formdetails!: any;

  detailForm!: any;
  mode: any;
  user: any = {};
  FORM_CONSTANT = 'form_data';
  answer1: any;
  answer2: any;

  constructor(private formBuilder: FormBuilder, private route1: Router, private route: ActivatedRoute) {
    this.formdetails = this.formBuilder.group({
      details: this.formBuilder.array([])
    });
    this.route.params.subscribe((res) => {
      this.mode = res['mode'];
      console.log(this.mode);
      if (this.mode === 'edit') {
        this.patchFormValue()
      }
      else {
        this.addDetail();

      }
    })
  }

  patchFormValue() {
    let users = JSON.parse(localStorage.getItem(this.FORM_CONSTANT)!);
    console.log(users);
    if (users) {
      this.formdetails.patchValue(users);
      this.patchform();
    }
  }

  ngOnInit(): void {

  }

  get details() {
    return this.formdetails.controls["details"] as FormArray;
  }

  patchform() {
    const user = JSON.parse(localStorage.getItem(this.FORM_CONSTANT)!);
    if (user.details) {
      for (let index = 0; index < user.details.length; index++) {
        const element = user.details[index];
        console.log('element: ', element);
        this.detailForm = this.formBuilder.group({
          question: [element.question, [Validators.required]],
          answer_type: [element.answer_type, [Validators.required]],
          answer1: [element.answer1],
          answer2: [element.answer2]
        });
      this.details.push(this.detailForm);
      }
    }

  }

  addDetail() {
      this.detailForm = this.formBuilder.group({
        question: ['', [Validators.required]],
        answer_type: ['', [Validators.required]],
        answer1: [''],
        answer2: ['']
      });
      this.details.push(this.detailForm);
  

    this.detailForm.get('answer_type').valueChanges.subscribe( (id: number) => {
      if (id === 3) {
        this.detailForm.get('answer1').setValidators([Validators.required]);
        this.detailForm.get('answer2').setValidators([Validators.required]);
      } else {
        this.detailForm.get('answer1').setValidators(null);
        this.detailForm.get('answer2').setValidators(null);
      }
      this.detailForm.get('answer1').updateValueAndValidity();
      this.detailForm.get('answer2').updateValueAndValidity();
    });

  }


  deleteDetail(detailIndex: number) {
    this.details.removeAt(detailIndex);
  }

  onSubmit() {
    if (this.formdetails.valid) {
      if (localStorage.getItem(this.FORM_CONSTANT)) {
        localStorage.removeItem(this.FORM_CONSTANT);
      }
      localStorage.setItem(this.FORM_CONSTANT, JSON.stringify(this.formdetails.value));
      this.route1.navigate(['/']);
    }
  }

  reset() {
    this.formdetails.reset();
  }

  types: Type[] = [
    { id: 1, Value: 'Short Text' },
    { id: 2, Value: 'Long Text' },
    { id: 3, Value: 'Radio Button' }
  ];
}
