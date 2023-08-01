import { Component, ViewChild, ElementRef } from '@angular/core';
import { CarouselItem } from './carousel.item.model';

import { CarouselStateService } from './carousel-state.service';
import { YoutubeService } from 'src/app/youtube.service';


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
      viewCount: "11,400,000",
      url: 'https://www.youtube.com/shorts/_WvHX-5zL70',
      videoID: "_WvHX-5zL70",
      likes: "650,000",
    },
    {
      image: 'assets/Swinging.png',
      title: 'Swinging Explosives',
      viewCount: "8,600,000",
      url: 'https://www.youtube.com/shorts/-31OhFf11kA',
      videoID: "-31OhFf11kA",
      likes: "400,000",
    },
    {
      image: 'assets/Carl.png',
      title: 'Carl: The Killer of Tanks',
      viewCount: "1,200,000",
      url: 'https://www.youtube.com/shorts/olzzWXpM-tM',
      videoID: "olzzWXpM-tM",
      likes: "90,000",
    },
    {
      image: 'assets/Howitzer.png',
      title: 'Installing a Howitzer on a Cargo Plane',
      viewCount: "1,000,000",
      url: 'https://www.youtube.com/watch?v=HSfdwcUJOHM&ab_channel=NotWhatYouThink',
      videoID: "HSfdwcUJOHM",
      likes: "15,000",
    },
    {
      image: 'assets/BubbleBath.png',
      title: 'Firefighter Bubble Bath',
      viewCount: "400,000",
      url: 'https://www.youtube.com/shorts/QdsHI6TsV_s',
      videoID: "QdsHI6TsV_s",
      likes: "32,000",
    },
    {
      image: 'assets/Aircraft Carriers.png',
      title: 'Why US Navy Has Two Types of Carriers',
      viewCount: "300,000",
      url: 'https://www.youtube.com/watch?v=7RgoBRDKkpI&t=5s&ab_channel=NotWhatYouThink',
      videoID: "7RgoBRDKkpI",
      likes: "10,000",
    },
    {
      image: 'assets/BunkersOnSled.png',
      title: 'Bunkers on Sled are Bonkers!',
      viewCount: "330,000",
      url: 'https://www.youtube.com/shorts/-DQWuAkYHj0',
      videoID: "-DQWuAkYHj0",
      likes: "18,000",
    },
    {
      image: 'assets/IceClimbing.png',
      title: 'Clinging to a Wall of Ice',
      viewCount: "535,000",
      url: 'https://www.youtube.com/shorts/vcgV2_vyW7Y',
      videoID: "vcgV2_vyW7Y",
      likes: "33,000",
    },
    {
      image: 'assets/RobotArm.png',
      title: 'Moving Your Arm With Your Brain',
      viewCount: "730,000",
      url: 'https://www.youtube.com/shorts/F8RYyYPy3ds',
      videoID: "F8RYyYPy3ds",
      likes: "75,000",
    },
    {
      image: 'assets/BlowingUpSuits.png',
      title: 'Blowing Up a Suit For Science',
      viewCount: "1,100,000",
      url: 'https://www.youtube.com/shorts/wZdcIhBVxdI',
      videoID: "wZdcIhBVxdI",
      likes: "71,000",
    },
    {
      image: 'assets/CrashingPlanes.png',
      title: 'Crashing Airplanes For Science',
      viewCount: "2,400,000",
      url: 'https://www.youtube.com/shorts/sf41cui7N_8',
      videoID: "sf41cui7N_8",
      likes: "130,000",
    },
  ];

  @ViewChild('carouselContainer') carouselContainer: ElementRef;
  @ViewChild('carousel') carousel: ElementRef;
  @ViewChild('cellsRange') cellsRange: ElementRef;
  @ViewChild('prevButton') prevButton: ElementRef;
  @ViewChild('nextButton') nextButton: ElementRef;
  @ViewChild('orientationRadios') orientationRadios: ElementRef;
  @ViewChild('scene') scene: ElementRef;
  @ViewChild('title') title: ElementRef;

  selectedIndex: number = 2;
  cellCount: number;
  cellWidth: number;
  cellHeight: number;
  isHorizontal: boolean = true;
  rotateFn: string = this.isHorizontal ? 'rotateY' : 'rotateX';
  radius: number;
  theta: number;
  isAnimating: boolean;
  isLoaded: boolean = false;

  constructor(private carouselStateService: CarouselStateService, private youtubeService: YoutubeService) {
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

  private updateVideoStats(videoId: string): void {
    // Check if the video stats are already in cache
    if (this.youtubeService.videoStatsCache.hasOwnProperty(videoId)) {
      const videoStats = this.youtubeService.videoStatsCache[videoId];
      const item = this.carouselItems.find(obj => obj.videoID === videoId);
      if (item) {
        item.viewCount = Number(videoStats.viewCount).toLocaleString();
        item.likes = Number(videoStats.likeCount).toLocaleString();
      }
    } else {
      // Fetch the video stats from the API and update the cache
      this.youtubeService.getVideoStats(videoId).subscribe(videoStats => {
        const item = this.carouselItems.find(obj => obj.videoID === videoId);
        if (item) {
          item.viewCount = Number(videoStats.viewCount).toLocaleString();
          item.likes = Number(videoStats.likeCount).toLocaleString();
        }
      });
    }
  }

  ngOnInit(): void {
    this.selectedIndex = this.carouselStateService.getSelectedItemIndex();

    for (const item of this.carouselItems) {
      this.updateVideoStats(item.videoID);
    }
  }

  ngAfterViewInit() {
    const fadeInState = this.carouselStateService.getFadeInState();
    const carouselContainer = this.carouselContainer.nativeElement;
    const carousel = this.carousel.nativeElement;
    const title = this.title.nativeElement;

    if (this.carousel && this.carousel.nativeElement) {
      this.cellWidth = this.carousel.nativeElement.offsetWidth;
      this.cellHeight = this.carousel.nativeElement.offsetHeight;
    }

    if (this.cellsRange && this.cellsRange.nativeElement) {
      this.cellsRange.nativeElement.addEventListener('change', () => this.changeCarousel());
      this.cellsRange.nativeElement.addEventListener('input', () => this.changeCarousel());
    }

    this.changeCarousel();

    if (fadeInState == false) {
      carouselContainer.style.transition = '';
      carouselContainer.style.opacity = '1';
      this.carouselStateService.setFadeInState(true);
    } else {
      carouselContainer.classList.add('no-transition');
      carouselContainer.style.transition = 'none';
      carouselContainer.style.opacity = '1';
    }
    setTimeout(() => {
      carousel.classList.add('one-second-transform');
      this.isLoaded = true;
    }, 500);
  }

  onPrevButtonClick() {
    if (this.isAnimating) {
      return;
    }

    this.isAnimating = true;
    this.selectedIndex = (this.selectedIndex - 1 + this.carouselItems.length) % this.carouselItems.length;
    console.log(this.selectedIndex);
    this.carouselStateService.setSelectedItemIndex(this.selectedIndex);
    const carousel = this.carousel.nativeElement;

    // If the index is at the beginning of the array, silently shift it to the end
    if (this.selectedIndex === 1) {
      setTimeout(() => {
        this.selectedIndex = this.carouselItems.length - 3;
        console.log(this.selectedIndex);
        carousel.style.transition = 'none';
        this.rotateCarousel();
        this.removeTransitionEffect(); // Disable opacity fade during silent shift
        setTimeout(() => {
          carousel.style.transition = '';
          this.isAnimating = false;
          this.restoreTransitionEffect(); // Restore opacity fade after the shift
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
    this.carouselStateService.setSelectedItemIndex(this.selectedIndex);
    const carousel = this.carousel.nativeElement;

    // If the index is at the end of the array, silently shift it to the beginning
    if (this.selectedIndex === this.carouselItems.length - 2) {
      setTimeout(() => {
        this.selectedIndex = 2;
        console.log(this.selectedIndex);
        carousel.style.transition = 'none';
        this.rotateCarousel();
        this.removeTransitionEffect(); // Disable opacity fade during silent shift
        setTimeout(() => {
          carousel.style.transition = '';
          this.isAnimating = false;
          this.restoreTransitionEffect(); // Restore opacity fade after the shift
        }, 10);
      }, 900);
    } else {
      setTimeout(() => {
        this.isAnimating = false;
      }, 900);
    }
    this.rotateCarousel();
  }

  removeTransitionEffect() {
    const cells = this.carousel.nativeElement.querySelectorAll('.carousel__cell');
    const carousel = this.carousel.nativeElement;

    for (let i = 0; i < cells.length; i++) {
      const cell = cells[i];
      const img = cell.querySelector('img');
      const text = cell.querySelector('div');

      // Remove transition effect by setting transition property to 'none'
      carousel.classList.add('no-transition');
      img.style.transition = 'none';
      text.style.transition = 'none';
    }
  }

  restoreTransitionEffect() {
    const cells = this.carousel.nativeElement.querySelectorAll('.carousel__cell');
    const carousel = this.carousel.nativeElement;

    for (let i = 0; i < cells.length; i++) {
      const cell = cells[i];
      const img = cell.querySelector('img');
      const text = cell.querySelector('div');

      // Restore transition effect by clearing the transition property
      carousel.classList.remove('no-transition');
      img.style.transition = '';
      text.style.transition = '';
    }
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
    const fadeInState = this.carouselStateService.getFadeInState();

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

      // Calculate the opacity based on the distance
      const opacity = distance === 0 ? 1 : (distance === 1 ? 0.6 : 0);
      if (fadeInState == false) {
        if (distance <= 2) {
          //   img.style.transition = 'opacity 0.5s ease-out'; // Adjust the duration and easing as needed
            text.style.transition = 'opacity 0.5s ease-out'; // Adjust the duration and easing as needed
          } else {
          //   img.style.transition = 'none';
            text.style.transition = 'none';
          }
      } else {
        setTimeout (() => {
          if (distance <= 2) {
            //   img.style.transition = 'opacity 0.5s ease-out'; // Adjust the duration and easing as needed
              text.style.transition = 'opacity 0.5s ease-out'; // Adjust the duration and easing as needed
            } else {
            //   img.style.transition = 'none';
              text.style.transition = 'none';
            }
        }, 500)
      }

      // Set the opacity of the image and text
      img.style.opacity = opacity.toString();
      text.style.opacity = opacity.toString();
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
