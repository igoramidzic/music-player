import { Component, OnInit } from '@angular/core';
import {RecentlyListenedService} from '../../../../services/recently-listened.service';

@Component({
  selector: 'app-recently-listened',
  templateUrl: './recently-listened.component.html',
  styleUrls: ['./recently-listened.component.scss']
})
export class RecentlyListenedComponent implements OnInit {

  constructor(public recentlyListenedService: RecentlyListenedService) { }

  ngOnInit() {
  }

}
