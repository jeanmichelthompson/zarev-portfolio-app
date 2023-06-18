import { Component, ViewChild, ElementRef } from '@angular/core';
import { CarouselItem } from './carousel.item.model';

@Component({
  selector: 'app-carousel-b',
  templateUrl: './carousel-b.component.html',
  styleUrls: ['./carousel-b.component.css']
})
export class CarouselBComponent {
  carouselItems: CarouselItem[] = [
    {
      image: 'assets/Christening.jpg',
      title: 'Why Navies Waste So Much Champagne',
      viewCount: "10,500,000",
      url: 'https://www.youtube.com/shorts/_WvHX-5zL70'
    },
    {
      image: 'assets/Swinging.png',
      title: 'Swinging Explosives',
      viewCount: "8,600,000",
      url: 'https://www.youtube.com/shorts/-31OhFf11kA'
    },
    {
      image: 'assets/Carl.png',
      title: 'Carl: The Killer of Tanks',
      viewCount: "1,200,000",
      url: 'https://www.youtube.com/shorts/olzzWXpM-tM'
    },
    {
      image: 'assets/BunkersOnSled.png',
      title: 'Bunkers on Sled are Bonkers!',
      viewCount: "330,000",
      url: 'https://www.youtube.com/shorts/-DQWuAkYHj0'
    },
    {
      image: 'assets/BubbleBath.png',
      title: 'Firefighter Bubble Bath',
      viewCount: "400,000",
      url: 'https://www.youtube.com/shorts/QdsHI6TsV_s'
    },
    {
      image: 'assets/IceClimbing.png',
      title: 'Clinging to a Wall of Ice',
      viewCount: "535,000",
      url: 'https://www.youtube.com/shorts/vcgV2_vyW7Y'
    },
    {
      image: 'assets/RobotArm.png',
      title: 'Moving Your Arm With Your Brain',
      viewCount: "730,000",
      url: 'https://www.youtube.com/shorts/F8RYyYPy3ds'
    },
    {
      image: 'assets/BlowingUpSuits.png',
      title: 'Blowing Up a Suit For Science',
      viewCount: "1,100,000",
      url: 'https://www.youtube.com/shorts/wZdcIhBVxdI'
    },
    {
      image: 'assets/CrashingPlanes.png',
      title: 'Crashing Airplanes For Science',
      viewCount: "2,400,000",
      url: 'https://www.youtube.com/shorts/sf41cui7N_8'
    },
  ];

  @ViewChild('carousel') carousel: ElementRef;
  @ViewChild('cellsRange') cellsRange: ElementRef;
  @ViewChild('prevButton') prevButton: ElementRef;
  @ViewChild('nextButton') nextButton: ElementRef;
  @ViewChild('orientationRadios') orientationRadios: ElementRef;
  @ViewChild('scene') scene: ElementRef;

  selectedIndex: number = 2;
  cellCount: number;
  cellWidth: number;
  cellHeight: number;
  isHorizontal: boolean = true;
  rotateFn: string = this.isHorizontal ? 'rotateY' : 'rotateX';
  radius: number;
  theta: number;
  isAnimating: boolean;

  constructor() {
    const firstItem = this.carouselItems[0];
    const secondItem = this.carouselItems[1];
    const secondToLastItem = this.carouselItems[this.carouselItems.length - 2];
    const lastItem = this.carouselItems[this.carouselItems.length - 1];

    const duplicatedItems: CarouselItem[] = [
      secondToLastItem,
      lastItem,
      ...this.carouselItems,
      firstItem,
      secondItem
    ];

    this.carouselItems = duplicatedItems;
  }

  ngAfterViewInit() {
    if (this.carousel && this.carousel.nativeElement) {
      this.cellWidth = this.carousel.nativeElement.offsetWidth;
      this.cellHeight = this.carousel.nativeElement.offsetHeight;
    }

    if (this.cellsRange && this.cellsRange.nativeElement) {
      this.cellsRange.nativeElement.addEventListener('change', () => this.changeCarousel());
      this.cellsRange.nativeElement.addEventListener('input', () => this.changeCarousel());
    }

    this.changeCarousel();
  }

  onPrevButtonClick() {
    if (this.isAnimating) {
      return;
    }

    this.isAnimating = true;
    this.selectedIndex = (this.selectedIndex - 1 + this.carouselItems.length) % this.carouselItems.length;
    console.log(this.selectedIndex);
    const carousel = this.carousel.nativeElement;

    // If the index is at the beginning of the array, silently shift it to the end
    if (this.selectedIndex === 1) {
      setTimeout(() => {
        this.selectedIndex = this.carouselItems.length - 3;
        console.log(this.selectedIndex);
        carousel.style.transition = 'none';
        this.rotateCarousel();
        setTimeout(() => {
          carousel.style.transition = '';
          this.isAnimating = false;
        }, 10);
      }, 900);
    } else {
      setTimeout(() => {
        this.isAnimating = false;
      }, 950);
    }
    this.rotateCarousel();
  }

  onNextButtonClick() {
    if (this.isAnimating) {
      return;
    }

    this.isAnimating = true;
    this.selectedIndex = (this.selectedIndex + 1) % this.carouselItems.length;
    console.log(this.selectedIndex);
    const carousel = this.carousel.nativeElement;

    // If the index is at the end of the array, silently shift it to the beginning
    if (this.selectedIndex === this.carouselItems.length - 2) {
      setTimeout(() => {
        this.selectedIndex = 2;
        console.log(this.selectedIndex);
        carousel.style.transition = 'none';
        this.rotateCarousel();
        setTimeout(() => {
          carousel.style.transition = '';
          this.isAnimating = false;
        }, 10);
      }, 900);
    } else {
      setTimeout(() => {
        this.isAnimating = false;
      }, 900);
    }
    this.rotateCarousel();
  }

  changeCarousel() {
    this.cellCount = this.carouselItems.length + 2;
    // Calculate the theta (angle between cells)
    this.theta = 360 / this.cellCount;
    // Calculate the circumference of the carousel
    const circumference = this.cellWidth * this.cellCount;
    // Calculate the radius based on the circumference
    this.radius = circumference / (2 * Math.PI);
    const cells = this.carousel.nativeElement.querySelectorAll('.carousel__cell');

    // Angle and translate the cells based on their index
    for (let i = 0; i < cells.length; i++) {
      const cell = cells[i];
      if (i < this.cellCount) {
        cell.style.opacity = 1;
        const cellAngle = this.theta * i;
        cell.style.transform = this.rotateFn + '(' + cellAngle + 'deg) translateZ(' + this.radius + 'px)';
      } else {
        cell.style.opacity = 0;
        cell.style.transform = 'none';
      }
    }

    this.rotateCarousel();
  }

  rotateCarousel() {
    const angle = this.theta * this.selectedIndex * -1;
    const carousel = this.carousel.nativeElement;

    if (this.carousel && this.carousel.nativeElement) {
      carousel.style.transform = 'translateZ(' + (-this.radius) + 'px) ' + this.rotateFn + '(' + angle + 'deg)';
    }

    const cells = this.carousel.nativeElement.querySelectorAll('.carousel__cell');
    const totalCells = this.carouselItems.length;
    for (let i = 0; i < cells.length; i++) {
      const cell = cells[i];
      const img = cell.querySelector('img');
      const text = cell.querySelector('div');

      // Calculate the distance between the current cell and the selected index
      const distance = Math.min(
        Math.abs(this.selectedIndex - i),
        Math.abs(this.selectedIndex - (i + totalCells)),
        Math.abs(this.selectedIndex + totalCells - i)
      );

      // Set the opacity of the image based on the distance
      if (distance === 0) {
        img.style.opacity = 1;
        text.style.opacity = 1;
      } else if (distance === 1) {
        img.style.opacity = 0.6;
        text.style.opacity = 0.6;
      } else {
        img.style.opacity = 0;
        text.style.opacity = 0;
      }
    }
  }

  onImageClick(eventTarget: EventTarget, url: string) {
    console.log("Function called");
    const imageElement = eventTarget as HTMLElement;
    const carousel = this.carousel.nativeElement;
    const centerImage = carousel.querySelector('.carousel__cell:nth-child(' + (this.selectedIndex + 1) + ') img');
    const centerImageRect = centerImage.getBoundingClientRect();
    const clickedImageRect = imageElement.getBoundingClientRect();

    const xDifference = clickedImageRect.x - centerImageRect.x;

    if (xDifference === 0 && this.isAnimating == false) {
      window.open(url, '_blank');
    } else if (xDifference < 0) {
      this.onPrevButtonClick();
    } else {
      this.onNextButtonClick();
    }
  }
}