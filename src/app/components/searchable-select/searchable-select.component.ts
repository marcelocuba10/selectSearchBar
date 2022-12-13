import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule, SearchbarCustomEvent } from '@ionic/angular';

@Component({
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule],
  selector: 'app-searchable-select',
  templateUrl: './searchable-select.component.html',
  styleUrls: ['./searchable-select.component.scss'],
})
export class SearchableSelectComponent implements OnChanges {

  @Input() data: any[] = [];
  @Input() multiple = false;
  @Input() itemTextField = 'name';

  isOpen = false;
  selected: any[] = [];
  filtered: any[] = [];

  @Output() selectedChanged: EventEmitter<any> = new EventEmitter();

  constructor() { }

  ngOnChanges(changes: SimpleChanges): void {
    this.filtered = this.data;
  }

  open() {
    this.isOpen = true;
  }

  cancel() {
    this.isOpen = false;
  }

  select() {
    const selected = this.data.filter((item) => item.selected);
    this.selected = selected;
    this.selectedChanged.emit(selected);
    this.isOpen = false;
  }

  itemSelected() {

    if (!this.multiple) {
      if (this.selected.length) {
        this.selected[0].selected = false;
      }

      this.selected = this.data.filter((item) => item.selected);

      this.selectedChanged.emit(this.selected);
      this.isOpen = false;
    }
  }

  filter(event: SearchbarCustomEvent) {
    const filter = event.detail.value?.toLowerCase()!;
    console.log(filter);
    this.filtered = this.data.filter(item => item.firstName.toLocaleLowerCase().indexOf(filter) >= 0);
  }
}
