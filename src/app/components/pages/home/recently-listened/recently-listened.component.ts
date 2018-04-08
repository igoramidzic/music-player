import { Component, OnInit } from '@angular/core';
import {RecentlyListenedItem} from '../../../../models/recently-listened-item';
import {RecentlyListenedService} from '../../../../services/recently-listened.service';

@Component({
  selector: 'app-recently-listened',
  templateUrl: './recently-listened.component.html',
  styleUrls: ['./recently-listened.component.scss']
})
export class RecentlyListenedComponent implements OnInit {

  recentlyListenedItems: RecentlyListenedItem[];

  constructor(private recentlyListenedService: RecentlyListenedService) { }

  ngOnInit() {
    this.recentlyListenedService.getRecentlyPlayedList()
      .subscribe((res: {items}) => {
        this.recentlyListenedItems = res.items.map(value => {
          return {
            imgURL: value.track.album.images[0].url,
            name: value.track.name,
            artist: value.track.artists[0].name
          };
        });
      })
  }

}
