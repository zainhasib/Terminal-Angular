import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FetchService {

  constructor(private http: HttpClient) { }

  getProcessIdUrl(rows: string, cols: string): Observable<string> {
    let url = 'http://'+ window.location.hostname +':7000/terminals?cols=' + cols + '&rows=' + rows;
    return this.http.post<string>(url, {});
  }
}
