import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AutenticadorComponent } from './autenticador.component';

describe('AutenticadorComponent', () => {
  let component: AutenticadorComponent;
  let fixture: ComponentFixture<AutenticadorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AutenticadorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AutenticadorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
