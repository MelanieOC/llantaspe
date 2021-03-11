import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { DatabaseService } from 'src/app/services/database.service';

@Component({
  selector: 'app-report-ip',
  templateUrl: './report-ip.component.html',
  styleUrls: ['./report-ip.component.scss']
})
export class ReportIpComponent implements OnInit {

  loader: boolean = false
  data: any = []
  columns = [
    { name: 'Fecha', slug: 'date' },
    { name: 'IP', slug: 'ip' },
    { name: 'País/Región', slug: 'country' },
    { name: 'Dispositivo', slug: 'device' },
    { name: 'Navegador', slug: 'nav' },
    { name: 'Sistema', slug: 'sistem' },
    { name: 'Medida', slug: 'measure' }
  ]

  reportForm = this.formBuilder.group({
    search: ['190.117.120.249', Validators.required],
    from: [null, Validators.required],
    to: [null, Validators.required]
  });

  constructor(
    private formBuilder: FormBuilder,
    private dbs: DatabaseService
  ) { }

  ngOnInit(): void {

  }

  getDateFormat(date) {
    let month = ('0' + (date.getMonth() + 1)).slice(-2)
    let day = ('0' + date.getDate()).slice(-2)
    return `${date.getFullYear()}-${month}-${day}`
  }

  onSubmit() {
    this.loader = true
    let data = this.reportForm.value
    const formData = new FormData();
    formData.append('key', 'llantas.pe');
    formData.append('ip', data.search);
    formData.append('fecha_inicio', this.getDateFormat(data.from));
    formData.append('fecha_fin', this.getDateFormat(data.to));

    this.dbs.getReportByIp(formData).subscribe(resp => {

      let resultArray2 = Object.keys(resp).map(dt => resp[dt]);

      this.data = resultArray2.map(wd => {
        return {
          ip: wd.ip,
          date: wd.fecha,
          country: wd.pais + '/' + wd.region,
          device: wd.dispositivo,
          nav: wd.navegador,
          sistem: wd.sistema,
          measure: wd.medida.replace('llantas/', '').split('.')[0]
        }
      })
      this.loader = false
    }, error => {
      console.log(error)
      this.loader = false
    })
  }

}
