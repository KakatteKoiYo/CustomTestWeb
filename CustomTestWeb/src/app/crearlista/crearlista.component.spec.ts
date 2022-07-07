import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearlistaComponent } from './crearlista.component';

describe('CrearlistaComponent', () => {
  let component: CrearlistaComponent;
  let fixture: ComponentFixture<CrearlistaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrearlistaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CrearlistaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
