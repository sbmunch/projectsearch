import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-page-selector',
  templateUrl: './page-selector.component.html',
  styleUrls: ['./page-selector.component.css']
})
export class PageSelectorComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  
  pageNR: number = 1;
  @Output() pageNRoutput = new EventEmitter<number>();
  
  onClickedPageButtonI(): void {
	  this.pageNRoutput.emit(++this.pageNR);

  }
  onClickedPageButtonD(): void {
	if (this.pageNR > 1) {
		this.pageNRoutput.emit(--this.pageNR);
	}
  }

}
