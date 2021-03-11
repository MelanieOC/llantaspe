import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DatabaseService } from 'src/app/services/database.service';
import { MediaqueryService } from 'src/app/services/mediaquery.service';

@Component({
  selector: 'app-modal-bar',
  templateUrl: './modal-bar.component.html',
  styleUrls: ['./modal-bar.component.scss']
})
export class ModalBarComponent implements OnInit {

  dataSource;

  expandedElement = null;

  loader: boolean = true
  private mediaService = new MediaqueryService('(min-width: 760px)');
  isDesktop: boolean;

  columns = [
    { name: 'Fecha', slug: 'date' },
    { name: 'País/Región', slug: 'country' },
    { name: 'Dispositivo', slug: 'device' },
    { name: 'Navegador', slug: 'nav' },
    { name: 'Sistema', slug: 'sistem' },
    { name: 'Medida', slug: 'measure' }
  ]


  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dbs: DatabaseService
  ) { }

  ngOnInit(): void {
    this.getData()
  }

  getDateFormat(date) {
    let month = ('0' + (date.getMonth() + 1)).slice(-2)
    let day = ('0' + date.getDate()).slice(-2)
    return `${date.getFullYear()}-${month}-${day}`
  }

  getData() {
    const formData = new FormData();
    formData.append('key', 'llantas.pe');
    formData.append('ip', this.data.data.name);
    formData.append('fecha_inicio', this.getDateFormat(this.data.fechaInicio));
    formData.append('fecha_fin', this.getDateFormat(this.data.fechaFin));

    this.dbs.getReportByIp(formData).subscribe(resp => {

      let resultArray2 = Object.keys(resp).map(dt => resp[dt]);

      this.dataSource = resultArray2.map(wd => {
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
