import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecommendedAlbumsComponent } from './recommended-albums.component';

describe('RecommendedAlbumsComponent', () => {
  let component: RecommendedAlbumsComponent;
  let fixture: ComponentFixture<RecommendedAlbumsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecommendedAlbumsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecommendedAlbumsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
