import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FloatingHearts } from './floating-hearts';

describe('FloatingHearts', () => {
  let component: FloatingHearts;
  let fixture: ComponentFixture<FloatingHearts>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FloatingHearts],
    }).compileComponents();

    fixture = TestBed.createComponent(FloatingHearts);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
