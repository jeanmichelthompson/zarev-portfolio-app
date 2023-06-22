import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map, of } from 'rxjs';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class YoutubeService {
  private apiKey = environment.youtubeApiKey;
  private apiUrl = 'https://www.googleapis.com/youtube/v3/videos';
  public videoStatsCache: { [videoId: string]: any } = {};

  constructor(private http: HttpClient) { }

  public getVideoStats(videoId: string): Observable<any> {
    // Check if the video stats are already in cache
    if (this.videoStatsCache.hasOwnProperty(videoId)) {
      return of(this.videoStatsCache[videoId]);
    }

    const url = `${this.apiUrl}?part=statistics&id=${videoId}&key=${this.apiKey}`;
    return this.http.get<any>(url).pipe(
      map(response => {
        const statistics = response.items[0].statistics;
        const videoStats = {
          viewCount: statistics.viewCount,
          likeCount: statistics.likeCount
        };
        // Cache the video stats
        this.videoStatsCache[videoId] = videoStats;
        return videoStats;
      })
    );
  }

  // Potentially remove these if unnecessary
  getViewCount(videoId: string): Observable<number> {
    return this.getVideoStats(videoId).pipe(map(response => response.viewCount));
  }

  getLikeCount(videoId: string): Observable<number> {
    return this.getVideoStats(videoId).pipe(map(response => response.likeCount));
  }
}
