import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class YoutubeService {
  private apiKey = 'AIzaSyAnBRedmGaKDo-f73XxolmSVzuaIjkTKM0';
  private apiUrl = 'https://www.googleapis.com/youtube/v3/videos';

  constructor(private http: HttpClient) { }

  private getVideoStats(videoId: string): Observable<any> {
    const url = `${this.apiUrl}?part=statistics&id=${videoId}&key=${this.apiKey}`;
    return this.http.get<any>(url).pipe(
      map(response => {
        const statistics = response.items[0].statistics;
        return {
          viewCount: statistics.viewCount,
          likeCount: statistics.likeCount
        };
      })
    );
  }

  getViewCount(videoId: string): Observable<number> {
    return this.getVideoStats(videoId).pipe(map(response => response.viewCount));
  }

  getLikeCount(videoId: string): Observable<number> {
    return this.getVideoStats(videoId).pipe(map(response => response.likeCount));
  }
}
