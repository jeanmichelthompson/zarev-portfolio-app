import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CarouselStateService {
  private isFadedIn: boolean = false;

  constructor() {}

  getFadeInState(): boolean {
    return this.isFadedIn;
  }

  setFadeInState(state: boolean): void {
    this.isFadedIn = state;
  }
}
