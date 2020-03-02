import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SpotifyService } from 'src/app/services/spotify.service';

@Component({
  selector: 'app-artist',
  templateUrl: './artist.component.html',
  styleUrls: ['./artist.component.scss']
})
export class ArtistComponent implements OnInit {


  artist: any = {};
  loading: boolean;
  topTracks: any[] = [];
  constructor( private activatedRoute: ActivatedRoute,
               private spotifyService: SpotifyService ) {

    this.activatedRoute.params.subscribe( params => {
      this.getArtist(params['id']);
      this.getTopTracks(params['id']);
    });

   }

  ngOnInit(): void {
  }

  getArtist(id: string) {
    this.loading = true;
    this.spotifyService.getArtist(id).subscribe( artist => {
      this.artist = artist;
      this.loading = false;
    });
  }

    getTopTracks(id: string) {
      this.spotifyService.getTopTracks(id).subscribe(topTracks => {
        this.topTracks = topTracks
      })
    }

}
