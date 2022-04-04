import { NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormArray, AbstractControl } from '@angular/forms';
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

  constructor( private formBuilder: FormBuilder, private route1: Router, private route: ActivatedRoute ) {
    this.route.params.subscribe((res) => {
      this.mode = res['mode'];
      console.log(this.mode);
      if(this.mode === 'edit'){
        this.patchFormValue() 
      }
    })
  }

  patchFormValue() {
    let users = JSON.parse(localStorage.getItem(this.FORM_CONSTANT)!);
    if (users) {
    this.formdetails.patchValue(users);
  }
  }

  ngOnInit(): void {
    this.formdetails = this.formBuilder.group({
      details: this.formBuilder.array([])
    });
    this.addDetail();
  }

  get details() {
    return this.formdetails.controls["details"] as FormArray;
  }

  addDetail() {
    this.detailForm  = this.formBuilder.group({
      question: ['', [Validators.required]],
      answer_type: ['', [Validators.required]],
      answer1: ['', [Validators.required]],
      answer2: ['', [Validators.required]]
    }, { 
      // validator: ConfirmedValidator('answer_type', 'answer1', 'answer2')
    });
    this.details.push(this.detailForm );
  }

  deleteDetail(detailIndex: number) {
    this.details.removeAt(detailIndex);
  }

  onSubmit() {
    // if (this.formdetails.valid) {


        if (localStorage.getItem(this.FORM_CONSTANT)) {
          localStorage.removeItem(this.FORM_CONSTANT);  
        }
        localStorage.setItem(this.FORM_CONSTANT, JSON.stringify(this.formdetails.value));
        this.route1.navigate(['/']);
    // }
 
  }

  types : Type[] = [
    { id : 1, Value : 'Short Text' },
    { id : 2, Value : 'Long Text' },
    { id : 3, Value : 'Radio Button' }
  ];

}
