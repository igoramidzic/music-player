import {Component, OnInit, ViewChild} from '@angular/core';
import {AudioService} from '../../services/audio.service';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss']
})
export class PlayerComponent implements OnInit {

  constructor(private audioService: AudioService) { }

  ngOnInit() {
  }

  onToggleAudio () {
    this.audioService.toggleAudio();
  }

  onSeekBack () {
    // ..
  }

  onSeekForward () {
    // ..
  }

  onFavorite () {
    // ..
  }

  onToggleShuffle () {
    // ..
  }

}
