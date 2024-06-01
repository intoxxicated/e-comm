import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SellerProductDeleteDialogComponent } from './seller-product-delete-dialog.component';

describe('SellerProductDeleteDialogComponent', () => {
  let component: SellerProductDeleteDialogComponent;
  let fixture: ComponentFixture<SellerProductDeleteDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SellerProductDeleteDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SellerProductDeleteDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
