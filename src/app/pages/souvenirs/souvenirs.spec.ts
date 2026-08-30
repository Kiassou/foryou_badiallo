import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Souvenirs } from './souvenirs';

describe('Souvenirs', () => {
  let component: Souvenirs;
  let fixture: ComponentFixture<Souvenirs>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Souvenirs],
    }).compileComponents();

    fixture = TestBed.createComponent(Souvenirs);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
