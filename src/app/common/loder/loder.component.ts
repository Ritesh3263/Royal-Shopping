import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'loder',
  templateUrl: './loder.component.html'
})
export class LoderComponent implements OnInit {

  @Input() show:boolean=false;
  constructor() { }

  ngOnInit() {
  }

}
