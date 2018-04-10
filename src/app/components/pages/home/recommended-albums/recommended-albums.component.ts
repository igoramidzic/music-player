import { Component, OnInit } from '@angular/core';
import {RecommendedAlbumsService} from '../../../../services/recommended-albums.service';

@Component({
  selector: 'app-recommended-albums',
  templateUrl: './recommended-albums.component.html',
  styleUrls: ['./recommended-albums.component.scss']
})

export class RecommendedAlbumsComponent implements OnInit {

  constructor(private recommendedAlbumsService: RecommendedAlbumsService) { }

  ngOnInit() {
  }

}
