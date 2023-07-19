import { Component, OnInit } from '@angular/core';
import { colorOptions } from 'src/shared/constants/colors';
import { ThemeService } from 'src/shared/services/theme.service';



@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  colorOptions = colorOptions;

  constructor(
    private themeService: ThemeService
  ) { }

  ngOnInit(): void {
  }

  changeBackgroundColor(color: string) {
    this.themeService.updateBackgroundColor(color);
  }

}
