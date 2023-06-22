import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CarouselStateService {
  isFadedIn: boolean = false;
  selectedItemIndex: number = 2; // Default selected index

  constructor() {}

  getFadeInState(): boolean {
    return this.isFadedIn;
  }

  setFadeInState(state: boolean): void {
    this.isFadedIn = state;
  }

  getSelectedItemIndex(): number {
    return this.selectedItemIndex;
  }

  setSelectedItemIndex(index: number): void {
    this.selectedItemIndex = index;
  }
}
