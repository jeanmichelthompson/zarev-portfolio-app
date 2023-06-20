import { Component } from '@angular/core';
import { WorkItem } from './work.item.model';

@Component({
  selector: 'app-work',
  templateUrl: './work.component.html',
  styleUrls: ['./work.component.css']
})
export class WorkComponent {
  workItems: WorkItem[] = [
    {
      image: 'assets/Christening.jpg',
      title: 'Why Navies Waste So Much Champagne',
      viewCount: "10,500,000",
      url: 'https://www.youtube.com/shorts/_WvHX-5zL70',
      likes: "655,000",
      date: "December 15, 2022",
      embed: "https://www.youtube.com/embed/_WvHX-5zL70",
    },
    {
      image: 'assets/Swinging.png',
      title: 'Swinging Explosives',
      viewCount: "8,600,000",
      url: 'https://www.youtube.com/shorts/-31OhFf11kA',
      likes: "400,000",
      date: "March 27, 2023",
      embed: "https://www.youtube.com/embed/-31OhFf11kA",
    },
    {
      image: 'assets/CrashingPlanes.png',
      title: 'Crashing Airplanes For Science',
      viewCount: "2,400,000",
      url: 'https://www.youtube.com/shorts/sf41cui7N_8',
      likes: "130,000",
      date: "March 21, 2023",
      embed: "https://www.youtube.com/embed/sf41cui7N_8",
    },
    {
      image: 'assets/Carl.png',
      title: 'Carl: The Killer of Tanks',
      viewCount: "1,200,000",
      url: 'https://www.youtube.com/shorts/olzzWXpM-tM',
      likes: "87,000",
      date: "February 21, 2023",
      embed: "https://www.youtube.com/embed/olzzWXpM-tM",
    },
    {
      image: 'assets/BlowingUpSuits.png',
      title: 'Blowing Up a Suit For Science',
      viewCount: "1,100,000",
      url: 'https://www.youtube.com/shorts/wZdcIhBVxdI',
      likes: "71,000",
      date: "May 1, 2023",
      embed: "https://www.youtube.com/embed/wZdcIhBVxdI",
    },
    {
      image: 'assets/RobotArm.png',
      title: 'Moving Your Arm With Your Brain',
      viewCount: "730,000",
      url: 'https://www.youtube.com/shorts/F8RYyYPy3ds',
      likes: "75,000",
      date: "April 27, 2023",
      embed: "https://www.youtube.com/embed/F8RYyYPy3ds",
    },
    {
      image: 'assets/IceClimbing.png',
      title: 'Clinging to a Wall of Ice',
      viewCount: "535,000",
      url: 'https://www.youtube.com/shorts/vcgV2_vyW7Y',
      likes: "33,000",
      date: "April 10, 2023",
      embed: "https://www.youtube.com/embed/vcgV2_vyW7Y",
    },
    {
      image: 'assets/BubbleBath.png',
      title: 'Firefighter Bubble Bath',
      viewCount: "400,000",
      url: 'https://www.youtube.com/shorts/QdsHI6TsV_s',
      likes: "32,000",
      date: "April 19, 2023",
      embed: "https://www.youtube.com/embed/QdsHI6TsV_s",
    },
    {
      image: 'assets/BunkersOnSled.png',
      title: 'Bunkers on Sled are Bonkers!',
      viewCount: "330,000",
      url: 'https://www.youtube.com/shorts/-DQWuAkYHj0',
      likes: "18,000",
      date: "February 28, 2023",
      embed: "https://www.youtube.com/embed/-DQWuAkYHj0",
    },
  ];
}
