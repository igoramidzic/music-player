import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FeaturedForYouComponent } from './featured-for-you.component';

describe('FeaturedForYouComponent', () => {
  let component: FeaturedForYouComponent;
  let fixture: ComponentFixture<FeaturedForYouComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FeaturedForYouComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FeaturedForYouComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
