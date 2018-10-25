import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CsvReaderService {

  constructor(private http: HttpClient) {
  }

  getCsvData() {
    return this.http.get('assets/symptom-data.csv',
      {responseType: 'text'});

  }
}
