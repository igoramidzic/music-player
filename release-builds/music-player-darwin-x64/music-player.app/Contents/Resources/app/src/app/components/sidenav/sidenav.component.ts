import { Component, OnInit } from '@angular/core';
import {Ng2DeviceService} from 'ng2-device-detector';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {

  os: string;

  constructor(private deviceService: Ng2DeviceService) { }

  ngOnInit() {
    this.os = this.deviceService.os;
    console.log(this.os);
  }

}
