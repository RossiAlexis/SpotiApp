import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class SpotifyService {

  constructor(private http: HttpClient) { }


  public getQuery(query: string) {
    const url = `https://api.spotify.com/v1/${query}`;
    const header = new HttpHeaders({
      Authorization: 'Bearer BQDBnfhkz731-amTXW06qfxZRflQJDJKgqegABrMqLfBVwHSYej6llSwVNeU8Q_QQtJlVR-S43Xxnf4ytWw'
    });

    return this.http.get<any>(url, { headers: header});
  }



  public getNewReleases() {

    return this.getQuery('browse/new-releases').pipe( map(data => {
      return data.albums.items;
    })
      );
  }

  public getArtists(termino: string) {

   return this.getQuery(`search?q=${termino}&type=artist&limit=10`).pipe( map(data => {
      return data.artists.items;
    }));
  }
  public getArtist(id: string) {
    return this.getQuery(`artists/${id}`);
  }

   public getTopTracks(id: string) {
    return this.getQuery(`artists/${id}/top-tracks?country=us`)
    .pipe(map(data => data.tracks));
  }
}


