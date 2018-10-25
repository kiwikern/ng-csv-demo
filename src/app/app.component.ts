import { Component, OnInit } from '@angular/core';
import { CsvReaderService } from './csv-reader.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'ng-csv-test';

  constructor(private service: CsvReaderService) {
  }

  ngOnInit() {
    this.service.getCsvData()
      .subscribe(data => this.title = data);
  }
}
