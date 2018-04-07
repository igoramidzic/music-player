import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BetaTagComponent } from './beta-tag.component';

describe('BetaTagComponent', () => {
  let component: BetaTagComponent;
  let fixture: ComponentFixture<BetaTagComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BetaTagComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BetaTagComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
