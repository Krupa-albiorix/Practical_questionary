import { FormGroup } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormArray } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

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
  answerForm!: any;

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

  ngOnInit(): void { }

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
          answers: this.formBuilder.array([])
        });
        this.details.push(this.detailForm);
        if (element.answers.length) {
          for (let jindex = 0; jindex < element.answers.length; jindex++) {
            const jelement = element.answers[jindex];
            let fg = this.formBuilder.group({
              radio1: [jelement.radio1],
            });
            (<FormArray>(<FormGroup>(<FormArray>this.formdetails.controls['details'])
              .controls[index]).controls['answers']).push(fg);
          }
        }
      }
    }
  }

  addDetail() {
    console.log(this.details)
    this.detailForm = this.formBuilder.group({
      question: ['', [Validators.required]],
      answer_type: ['', [Validators.required]],
      answers: this.formBuilder.array([])
    });
    this.details.push(this.detailForm);
  }

  answers(detailIndex: number) {
    return this.details
      .at(detailIndex)
      .get("answers") as FormArray;
  }

  addAnswer(detailIndex: number, radio1? : any) {
    console.log(this.answers, 'answer')
    this.answerForm = this.formBuilder.group({
      radio1: ['']
    });
    this.answers(detailIndex).push(this.answerForm);
  }

  deleteAnswer(detailIndex: number, answerIndex: number) {
    this.answers(detailIndex).removeAt(answerIndex);
  }

  deleteDetail(detailIndex: number) {
    (<FormArray>this.formdetails.get('details')).removeAt(detailIndex);
  }

  onSubmit() {
    console.log(this.formdetails)
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
function i(i: any) {
  throw new Error('Function not implemented.');
}

