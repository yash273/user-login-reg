import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { colorOptions } from '../constants/colors';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {

  backgroundColorSubject: BehaviorSubject<string> = new BehaviorSubject<string>(this.getStoredColor());
  backgroundColor$ = this.backgroundColorSubject as Observable<string>;
  colorCounts: { [color: string]: number } = {};

  ngOnInit() {
    this.colorWithCounts();
  }

  getStoredColor(): string {
    return localStorage.getItem('themeColor') || '';
  }

  storeColor(color: string) {
    localStorage.setItem('themeColor', color);
  }

  colorWithCounts() {
    for (const option of colorOptions) {
      this.colorCounts[option.color] = 0;
    }
  }

  getColorCount(color: string): number {
    return this.colorCounts[color] || 0;
  }

  updateBackgroundColor(color: string) {
    this.backgroundColorSubject.next(color);
    this.incrementColorCount(color);
    this.storeColor(color);
  }

  incrementColorCount(color: string) {
    this.colorCounts[color] = (this.colorCounts[color] || 0) + 1;
  }

}
