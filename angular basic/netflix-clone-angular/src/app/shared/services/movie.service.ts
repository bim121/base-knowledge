import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

const options = {
  params: {
    include_adult: 'false',
    include_video: 'true',
    language: 'en-US',
    page: '1',
    sort_by: 'popularity.desc'
  },
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5ZGNmYjRjMzBlZWEyM2UyMmIzMGY2ZTY2NmMyZmQ1NyIsInN1YiI6IjY1ZjA1Zjk5ZTE5ZGU5MDE0YmI4MTg3YSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.LnqcC6aEAum1xkl2UIafpq3VgNUSeZ0QuFJIagmvhDk'
  }
}

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  http = inject(HttpClient);

  getMovies() {
    return this.http.get<any>('https://api.themoviedb.org/3/discover/movie?api_key=9dcfb4c30eea23e22b30f6e666c2fd57', options)
  }

  getTvShows() {
    return this.http.get('https://api.themoviedb.org/3/discover/tv?api_key=9dcfb4c30eea23e22b30f6e666c2fd57', options)
  }

  getBannerImage(id: number) {
    return this.http.get(`https://api.themoviedb.org/3/movie/${id}/images?api_key=9dcfb4c30eea23e22b30f6e666c2fd57`, options)
  }

  getBannerVideo(id: number) {
    return this.http.get(`https://api.themoviedb.org/3/movie/${id}/videos?api_key=9dcfb4c30eea23e22b30f6e666c2fd57`, options);
  }

  getBannerDetail(id: number) {
    return this.http.get(`https://api.themoviedb.org/3/movie/${id}?api_key=9dcfb4c30eea23e22b30f6e666c2fd57`, options);
  }

  getNowPlayingMovies() {
    return this.http.get('https://api.themoviedb.org/3/movie/now_playing?api_key=9dcfb4c30eea23e22b30f6e666c2fd57', options)
  }

  getPopularMovies() {
    return this.http.get('https://api.themoviedb.org/3/movie/popular?api_key=9dcfb4c30eea23e22b30f6e666c2fd57', options)
  }

  getTopRated() {
    return this.http.get('https://api.themoviedb.org/3/movie/top_rated?api_key=9dcfb4c30eea23e22b30f6e666c2fd57', options)
  }

  getUpcomingMovies() {
    return this.http.get('https://api.themoviedb.org/3/movie/upcoming?api_key=9dcfb4c30eea23e22b30f6e666c2fd57', options)
  }
}
