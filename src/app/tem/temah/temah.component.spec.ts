import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TemahComponent } from './temah.component';

describe('TemahComponent', () => {
  let component: TemahComponent;
  let fixture: ComponentFixture<TemahComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TemahComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TemahComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
