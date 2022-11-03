import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-field',
  templateUrl: './field.component.html',
  styleUrls: ['./field.component.css']
})
export class FieldComponent implements OnInit {
  
  
  text = [
    ['+','+3','+4','+5','+6','+7'],
    ['+1','б','и','с','а','у'],
    ['+2','и','и','и','в','с'],
    ['г','т','с','е','т','т'],
    ['о','в','у','з','о','ю'],
    ['т','а','с','а','р','г']
  ]

  text0 = this.text[0]

  
  constructor() { }

  getNumber(line: string) {
    line = line.substring(1,line.length)
    return parseInt(line)
  }
  ngOnInit(): void {
  }

}
