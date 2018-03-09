import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecentlyListenedComponent } from './recently-listened.component';

describe('RecentlyListenedComponent', () => {
  let component: RecentlyListenedComponent;
  let fixture: ComponentFixture<RecentlyListenedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecentlyListenedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecentlyListenedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
