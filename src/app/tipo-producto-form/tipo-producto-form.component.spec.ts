import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TipoProductoFormComponent } from './tipo-producto-form.component';

describe('TipoProductoFormComponent', () => {
  let component: TipoProductoFormComponent;
  let fixture: ComponentFixture<TipoProductoFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TipoProductoFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TipoProductoFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
