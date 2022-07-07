import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EstudiarlistaComponent } from './estudiarlista.component';

describe('EstudiarlistaComponent', () => {
  let component: EstudiarlistaComponent;
  let fixture: ComponentFixture<EstudiarlistaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EstudiarlistaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EstudiarlistaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
