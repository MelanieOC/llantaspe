import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { ExcelService } from 'src/app/services/excel.service';
import Swal from 'sweetalert2';
import html2canvas from 'html2canvas';
import { DatabaseService } from 'src/app/services/database.service';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  formSubmitAttempt: boolean = false
  reportForm = this.formBuilder.group({
    from: [null, Validators.required],
    to: [null, Validators.required]
  });

  loadingExcel: boolean = false
  initDate: Date
  endDate: Date

  months = [
    { id: 1, name: 'Enero', endDay: 31 },
    { id: 2, name: 'Febrero', endDay: 28 },
    { id: 3, name: 'Marzo', endDay: 31 },
    { id: 4, name: 'Abril', endDay: 30 },
    { id: 5, name: 'Mayo', endDay: 31 },
    { id: 6, name: 'Junio', endDay: 30 },
    { id: 7, name: 'Julio', endDay: 31 },
    { id: 8, name: 'Agosto', endDay: 31 },
    { id: 9, name: 'Setiembre', endDay: 30 },
    { id: 10, name: 'Octubre', endDay: 31 },
    { id: 11, name: 'Noviembre', endDay: 30 },
    { id: 12, name: 'Diciembre', endDay: 31 }
  ]

  dataPie: { name: string; value: number }[] = []

  dataMeasures = []

  dataBar: { name: string; value: number }[] = []

  dataCountry: { name: string; value: number }[] = []

  dataWords: { text: string; weight: number, tooltip?: string }[] = [];

  dataMedia: { name: string; value: number }[] = []

  loadMedia: boolean = false
  loadCountry: boolean = false
  loadBar: boolean = false
  loadPie: boolean = false
  loadWord: boolean = false

  constructor(
    private formBuilder: FormBuilder,
    private excelService: ExcelService,
    private dbs: DatabaseService
  ) { }

  ngOnInit(): void {

    this.initGraphs()
  }

  initGraphs() {
    let today = new Date()
    let month = today.getMonth()
    let year = today.getFullYear()
    let day = today.getDate()
    this.initDate = day < 15 ? new Date(year, month, 1) : new Date(year, month, 1)

    this.reportForm.get('from').setValue(this.initDate)
    this.reportForm.get('to').setValue(today)
    this.onSubmit()

  }

  getDateFormat(date) {
    let month = ('0' + (date.getMonth() + 1)).slice(-2)
    let day = ('0' + date.getDate()).slice(-2)
    return `${date.getFullYear()}-${month}-${day}`
  }

  onSubmit() {
    this.loadPie = false
    this.loadWord = false
    this.loadMedia = false
    this.loadBar = false
    this.loadCountry = false
    let report = this.reportForm.value
    this.initDate = report['from']
    this.endDate = report['to']

    const formData = new FormData();
    formData.append('key', 'llantas.pe');

    this.dbs.getDataCloud(formData).subscribe(resp => {
      let resultArray = Object.keys(resp).map(dt => resp[dt]);
      this.dataWords = resultArray.map(wd => {
        return {
          text: wd.medida,
          weight: wd.total > 2 ? wd.total - 1 : wd.total,
          tooltip: wd.medida + ' ' + wd.total
        }
      })
      this.loadWord = true
    }, error => {
      console.log(error)
      this.loadWord = true
    })

    const formData2 = new FormData();
    formData2.append('key', 'llantas.pe');
    formData2.append('fecha_inicio', this.getDateFormat(report['from']));
    formData2.append('fecha_fin', this.getDateFormat(report['to']));

    this.dbs.getDataMesuare(formData2).subscribe(resp => {
      let resultArray = Object.keys(resp).map(dt => resp[dt]);
      this.dataMeasures = resultArray.map(md => {
        return {
          name: md.medida,
          value: Number(md.total)
        }
      })

      let all = resultArray.reduce((a, b) => a + Number(b.total), 0)

      let dataP = resultArray.map(md => {
        return {
          name: md.medida.replace('llantas/', '').split('.')[0],
          value: Number(md.total)
        }
      }).sort((a, b) => b.value - a.value).slice(0, 19)

      let total = dataP.reduce((a, b) => a + b.value, 0)

      this.dataPie = dataP.concat([{ name: 'Otros', value: all - total }])

      this.loadPie = true
    }, error => {
      console.log(error)
      this.loadPie = true
    })

    this.dbs.getDataCountries(formData2).subscribe(resp => {
      let resultArray = Object.keys(resp).map(dt => resp[dt]);
      this.dataCountry = resultArray.map(ct => {
        return {
          name: ct.pais,
          value: ct.total
        }
      })
      this.loadCountry = true
    }, error => {
      console.log(error)
      this.loadCountry = true
    })

    this.dbs.getDataDevice(formData2).subscribe(resp => {
      let resultArray = Object.keys(resp).map(dt => resp[dt]);
      this.dataMedia = resultArray.map(dv => {
        return {
          name: dv.dispositivo,
          value: dv.total
        }
      })
      this.loadMedia = true
    }, error => {
      console.log(error)
      this.loadMedia = true
    })

    this.dbs.getDataIps(formData2).subscribe(resp => {
      let resultArray = Object.keys(resp).map(dt => resp[dt]);
      this.dataBar = resultArray.map(ip => {
        return {
          name: ip.ip,
          value: ip.total
        }
      })
      this.loadBar = true
    }, error => {
      console.log(error)
      this.loadBar = true
    })

  }

  generateExcel() {
    if (!this.loadingExcel) {
      this.loadingExcel = true
      Swal.fire({
        text: 'Por favor espere...',
        customClass: {
          title: 'my-swal-title-class',
          content: 'my-swal-content-class',
        },
        allowOutsideClick: false
      });

      Swal.showLoading();
      let promises = []
      let images = []
      let graphs = [
        { name: 'graph1', page: 0 },
        { name: 'graph2', page: 1 },
        { name: 'graph3', page: 2 },
        { name: 'graph4', page: 3 },
        { name: 'graph5', page: 4 }
      ]


      setTimeout(() => {
        graphs.forEach(gr => {
          let data = document.getElementById(gr.name);
          if (data) {
            promises.push(
              html2canvas(data).then(canvas => {
                const contentDataURL = canvas.toDataURL('image/png')
                images.push({
                  name: gr.name,
                  sheet: gr.page,
                  base: contentDataURL,
                  width: canvas.style.width,
                  height: canvas.style.height
                })
              })
            )
          }

        })
        Promise.all(promises).then(() => {
          console.log(images)
          this.excel(images)
          Swal.close();
          this.loadingExcel = false
        })
      }, 1500)

    }


  }


  excel(images) {
    let report = this.reportForm.value
    const init = `${report['from'].getDate()}/${report['from'].getMonth() + 1}/${report['from'].getFullYear()}`
    const end = `${report['to'].getDate()}/${report['to'].getMonth() + 1}/${report['to'].getFullYear()}`

    let nameFile = `Reporte_${init}-${end}`

    let sheets = ['Medidas_consultadas', 'los_10_mas', 'Ranking_paises', 'Dispositivos', 'Medidas_buscadas']
    let header = []
    let rows = []

    //Primera
    if (this.dataMeasures.length) {
      header.push({ name: 'ID', width: 10, sheet: 0 })
      header.push({ name: 'MEDIDA', width: 20, sheet: 0 })
      header.push({ name: 'VISITAS', width: 20, sheet: 0 })

      this.dataMeasures.forEach((rc, ind) => {
        let data = [ind + 1, rc.name, rc.value]
        rows.push({ rowData: data, sheet: 0 })
      })
    }

    //Segundo
    if (this.dataBar.length) {
      header.push({ name: 'ID', width: 10, sheet: 1 })
      header.push({ name: 'MEDIDA', width: 20, sheet: 1 })
      header.push({ name: 'VISITAS', width: 20, sheet: 1 })

      this.dataBar.forEach((rc, ind) => {
        let data = [ind + 1, rc.name, rc.value]
        rows.push({ rowData: data, sheet: 1 })
      })
    }

    //Tercero
    if (this.dataCountry.length) {
      header.push({ name: 'ID', width: 10, sheet: 2 })
      header.push({ name: 'PAÍS', width: 20, sheet: 2 })
      header.push({ name: 'VISITAS', width: 20, sheet: 2 })

      this.dataCountry.forEach((rc, ind) => {
        let data = [ind + 1, rc.name, rc.value]
        rows.push({ rowData: data, sheet: 2 })
      })
    }


    //Cuarto
    if (this.dataMedia.length) {
      header.push({ name: 'ID', width: 10, sheet: 3 })
      header.push({ name: 'DISPOSITIVOS', width: 20, sheet: 3 })
      header.push({ name: 'VISITAS', width: 20, sheet: 3 })

      this.dataMedia.forEach((rc, ind) => {
        let data = [ind + 1, rc.name, rc.value]
        rows.push({ rowData: data, sheet: 3 })
      })
    }


    //Quinto
    if (this.dataWords.length) {
      header.push({ name: 'ID', width: 10, sheet: 4 })
      header.push({ name: 'MEDIDA', width: 20, sheet: 4 })
      header.push({ name: 'BUSCADO', width: 20, sheet: 4 })

      this.dataWords.forEach((rc, ind) => {
        let data = [ind + 1, rc.text, rc.weight]
        rows.push({ rowData: data, sheet: 4 })
      })
    }


    let sendData = {
      data: rows
    }

    this.excelService.downloadWithImage(nameFile, header, sendData, false, images, sheets)

  }


}
