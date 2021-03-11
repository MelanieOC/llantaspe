import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DatabaseService } from '../services/database.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  dataFormGroup: FormGroup;

  hidePass: boolean = true;
  load: boolean = false
  constructor(
    private fb: FormBuilder,
    public router: Router,
    private dbs: DatabaseService
  ) { }

  ngOnInit(): void {
    this.dataFormGroup = this.fb.group({
      email: [null, [Validators.required, Validators.email]],
      pass: [null, [Validators.required]]
    });
  }

  login() {
    this.load = true
    let data = this.dataFormGroup.value
    const formData = new FormData();
    formData.append('key', 'llantas.pe');
    formData.append('correo', data.email);
    formData.append('contrasenia', data.pass);

    this.dbs.login(formData).subscribe(resp => {
      console.log(resp)
      if (resp == 'error') {
        Swal.fire({
          title: 'Error',
          text: 'Usuario y/o contraseña incorrecta',
          icon: 'error',
          heightAuto: false
        })
      } else {
        this.router.navigate(['/main'])
      }
      this.load = false
    })
    //this.router.navigate(['/main'])
  }

}
