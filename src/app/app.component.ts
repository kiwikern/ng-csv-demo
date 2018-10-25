import { Component, OnInit, ViewChild } from '@angular/core';
import { CsvReaderService } from './csv-reader.service';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith, tap } from 'rxjs/operators';
import { MatAutocompleteTrigger, MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'ng-csv-test';
  options = ['Nausea', 'Cough', 'Headaches'];
  myControl = new FormControl();
  filteredOptions: Observable<string[]>;
  selectedOptions: string[] = [];

  @ViewChild('trigger', {read: MatAutocompleteTrigger}) trigger: MatAutocompleteTrigger;

  constructor(private service: CsvReaderService,
              private snackBar: MatSnackBar) {
  }

  ngOnInit() {
    this.service.getCsvData()
      .subscribe(data => this.title = data);
    this.filteredOptions = this.myControl.valueChanges
      .pipe(
        startWith(''),
        map(name => name ? name.toLowerCase() : name),
        map(name => name ? this.options.filter(n => n.toLowerCase().includes(name)) : this.options.slice())
      );
  }

  removeChip(index: number) {
    this.selectedOptions.splice(index, 1);
  }

  optionSelected(event) {
    this.selectedOptions.push(event.option.value);
    this.myControl.reset();
  }

  reset() {
    const snackbar = this.snackBar.open('Are you sure?', 'Yes', {duration: 3000});
    snackbar.onAction().subscribe(() => this.selectedOptions = []);
  }

}
