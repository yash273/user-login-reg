import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-icon-switch',
  templateUrl: './icon-switch.component.html',
  styleUrls: ['./icon-switch.component.scss']
})
export class IconSwitchComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  @Input() selection!: string;
}
