import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CorreoVerificacionComponent } from './correo-verificacion.component';

describe('CorreoVerificacionComponent', () => {
  let component: CorreoVerificacionComponent;
  let fixture: ComponentFixture<CorreoVerificacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CorreoVerificacionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CorreoVerificacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
