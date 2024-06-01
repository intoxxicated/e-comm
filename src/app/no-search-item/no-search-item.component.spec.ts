import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoSearchItemComponent } from './no-search-item.component';

describe('NoSearchItemComponent', () => {
  let component: NoSearchItemComponent;
  let fixture: ComponentFixture<NoSearchItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NoSearchItemComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NoSearchItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
