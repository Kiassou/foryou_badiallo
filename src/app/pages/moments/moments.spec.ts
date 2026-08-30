import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Moments } from './moments';

describe('Moments', () => {
  let component: Moments;
  let fixture: ComponentFixture<Moments>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Moments],
    }).compileComponents();

    fixture = TestBed.createComponent(Moments);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
