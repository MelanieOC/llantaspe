import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  dataFormGroup: FormGroup;

  hidePass: boolean = true;

  constructor(
    private fb: FormBuilder,
    public router: Router
  ) { }

  ngOnInit(): void {
    this.dataFormGroup = this.fb.group({
      email: [null],
      pass: [null]
    });
  }

  login(){
    this.router.navigate(['/main'])
  }

}
