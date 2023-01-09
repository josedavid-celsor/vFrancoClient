import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CartaProductoComponent } from './carta-producto.component';

describe('CartaProductoComponent', () => {
  let component: CartaProductoComponent;
  let fixture: ComponentFixture<CartaProductoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CartaProductoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CartaProductoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
