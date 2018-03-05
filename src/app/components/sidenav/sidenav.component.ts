import { Component, OnInit } from '@angular/core';
import {Ng2DeviceService} from 'ng2-device-detector';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {

  os: string;
  queue: { name: String, artist: String}[];

  constructor(private deviceService: Ng2DeviceService) { }

  ngOnInit() {
    this.os = this.deviceService.os;

    this.queue = [
      { name: 'Golden Sands', artist: 'Imagine Dragons' },
      { name: 'Neon Sound', artist: 'AVICII' },
      { name: 'Drop The Game', artist: 'Flume' },
      { name: 'On Hold', artist: 'the XX' },
    ]
  }

}
