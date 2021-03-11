import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  private url: string = 'https://reporte.llantas.pe';

  constructor(
    private http: HttpClient
  ) { }

  login(data){
    return this.http.post(`https://llantas.sistemaselsol.com/reporte/api/soap/login.php`, data);
  }

  getDataCloud(data){
    return this.http.post(`${this.url}/api/soap/medidatagcloud.php`, data);
  }

  getDataMesuare(data){
    return this.http.post(`${this.url}/api/soap/medida.php`, data);
  }

  getDataCountries(data){
    return this.http.post(`${this.url}/api/soap/paises.php`, data);
  }

  getDataDevice(data){
    return this.http.post(`${this.url}/api/soap/dispositivos.php`, data);
  }

  getDataIps(data){
    return this.http.post(`${this.url}/api/soap/ips.php`, data);
  }

  getReportByDay(data){
    return this.http.post(`${this.url}/api/soap/reporte_diario.php`, data);
  }

  getReportByMonth(data){
    return this.http.post(`${this.url}/api/soap/reporte_mensual.php`, data);
  }

  getReportByIp(data){
    return this.http.post(`${this.url}/api/soap/ip_consulta.php`, data);
  }

}
