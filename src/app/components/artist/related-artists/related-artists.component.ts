import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-related-artists',
  templateUrl: './related-artists.component.html',
  styleUrls: ['./related-artists.component.scss']
})
export class RelatedArtistsComponent implements OnInit {

  @Input('relatedArtists') relatedArtists;

  constructor() { }

  ngOnInit() {
  }

}
