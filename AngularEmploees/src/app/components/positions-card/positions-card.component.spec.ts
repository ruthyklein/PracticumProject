import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PositionsCardComponent } from './positions-card.component';

describe('PositionsCardComponent', () => {
  let component: PositionsCardComponent;
  let fixture: ComponentFixture<PositionsCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PositionsCardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PositionsCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
