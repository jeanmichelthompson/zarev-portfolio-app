import { Component } from '@angular/core';
import { WorkItem } from './work.item.model';
import { YoutubeService } from '../youtube.service';


@Component({
  selector: 'app-work',
  templateUrl: './work.component.html',
  styleUrls: ['./work.component.css']
})
export class WorkComponent {
  constructor(private youtubeService: YoutubeService) {}

  workItems: WorkItem[] = [
    {
      image: 'assets/Christening.jpg',
      title: 'Why Navies Waste So Much Champagne',
      url: 'https://www.youtube.com/shorts/_WvHX-5zL70',
      videoID: "_WvHX-5zL70",
      likes: "655,000",
      viewCount: "10,500,000",
      date: "December 15, 2022",
      embed: "https://www.youtube.com/embed/_WvHX-5zL70",
    },
    {
      image: 'assets/Swinging.png',
      title: 'Swinging Explosives',
      url: 'https://www.youtube.com/shorts/-31OhFf11kA',
      videoID: "-31OhFf11kA",
      likes: "400,000",
      viewCount: "8,600,000",
      date: "March 27, 2023",
      embed: "https://www.youtube.com/embed/-31OhFf11kA",
    },
    {
      image: 'assets/CrashingPlanes.png',
      title: 'Crashing Airplanes For Science',
      url: 'https://www.youtube.com/shorts/sf41cui7N_8',
      videoID: "sf41cui7N_8",
      likes: "130,000",
      viewCount: "2,400,000",
      date: "March 21, 2023",
      embed: "https://www.youtube.com/embed/sf41cui7N_8",
    },
    {
      image: 'assets/Carl.png',
      title: 'Carl: The Killer of Tanks',
      url: 'https://www.youtube.com/shorts/olzzWXpM-tM',
      videoID: "olzzWXpM-tM",
      likes: "87,000",
      viewCount: "1,200,000",
      date: "February 21, 2023",
      embed: "https://www.youtube.com/embed/olzzWXpM-tM",
    },
    {
      image: 'assets/BlowingUpSuits.png',
      title: 'Blowing Up a Suit For Science',
      url: 'https://www.youtube.com/shorts/wZdcIhBVxdI',
      videoID: "wZdcIhBVxdI",
      likes: "71,000",
      viewCount: "1,100,000",
      date: "May 1, 2023",
      embed: "https://www.youtube.com/embed/wZdcIhBVxdI",
    },
    {
      image: 'assets/Howitzer.png',
      title: 'Why the US Air Force Installed a Howitzer on a Cargo Plane',
      url: 'https://www.youtube.com/watch?v=HSfdwcUJOHM&ab_channel=NotWhatYouThink',
      videoID: "HSfdwcUJOHM",
      likes: "15,000",
      viewCount: "1,000,000",
      date: "May 5, 2023",
      embed: "https://www.youtube.com/embed/HSfdwcUJOHM",
    },
    {
      image: 'assets/RobotArm.png',
      title: 'Moving Your Arm With Your Brain',
      url: 'https://www.youtube.com/shorts/F8RYyYPy3ds',
      videoID: "F8RYyYPy3ds",
      likes: "75,000",
      viewCount: "730,000",
      date: "April 27, 2023",
      embed: "https://www.youtube.com/embed/F8RYyYPy3ds",
    },
    {
      image: 'assets/IceClimbing.png',
      title: 'Clinging to a Wall of Ice',
      url: 'https://www.youtube.com/shorts/vcgV2_vyW7Y',
      videoID: "vcgV2_vyW7Y",
      likes: "33,000",
      viewCount: "535,000",
      date: "April 10, 2023",
      embed: "https://www.youtube.com/embed/vcgV2_vyW7Y",
    },
    {
      image: 'assets/BubbleBath.png',
      title: 'Firefighter Bubble Bath',
      url: 'https://www.youtube.com/shorts/QdsHI6TsV_s',
      videoID: "QdsHI6TsV_s",
      likes: "32,000",
      viewCount: "400,000",
      date: "April 19, 2023",
      embed: "https://www.youtube.com/embed/QdsHI6TsV_s",
    },
    {
      image: 'assets/BunkersOnSled.png',
      title: 'Bunkers on Sled are Bonkers!',
      url: 'https://www.youtube.com/shorts/-DQWuAkYHj0',
      videoID: "-DQWuAkYHj0",
      likes: "18,000",
      viewCount: "330,000",
      date: "February 28, 2023",
      embed: "https://www.youtube.com/embed/-DQWuAkYHj0",
    },
  ];

  private updateVideoStats(videoId: string): void {
    // Check if the video stats are already in cache
    if (this.youtubeService.videoStatsCache.hasOwnProperty(videoId)) {
      const videoStats = this.youtubeService.videoStatsCache[videoId];
      const item = this.workItems.find(obj => obj.videoID === videoId);
      if (item) {
        item.viewCount = Number(videoStats.viewCount).toLocaleString();
        item.likes = Number(videoStats.likeCount).toLocaleString();
        console.log('Item found in cache')
      }
    } else {
      // Fetch the video stats from the API and update the cache
      this.youtubeService.getVideoStats(videoId).subscribe(videoStats => {
        const item = this.workItems.find(obj => obj.videoID === videoId);
        if (item) {
          item.viewCount = Number(videoStats.viewCount).toLocaleString();
          item.likes = Number(videoStats.likeCount).toLocaleString();
          console.log('Item not found in cache')
        }
      });
    }
  }

  ngOnInit(): void {
    for (const item of this.workItems) {
      this.updateVideoStats(item.videoID);
    }
  }
}
