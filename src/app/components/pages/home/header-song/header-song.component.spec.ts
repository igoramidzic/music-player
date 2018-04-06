import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderSongComponent } from './header-song.component';

describe('HeaderSongComponent', () => {
  let component: HeaderSongComponent;
  let fixture: ComponentFixture<HeaderSongComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HeaderSongComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderSongComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
