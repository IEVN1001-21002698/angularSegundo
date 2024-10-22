import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TemapComponent } from './temap.component';

describe('TemapComponent', () => {
  let component: TemapComponent;
  let fixture: ComponentFixture<TemapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TemapComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TemapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
