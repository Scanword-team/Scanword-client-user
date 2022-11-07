import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScanwordMenuComponent } from './scanword-menu.component';

describe('ScanwordMenuComponent', () => {
  let component: ScanwordMenuComponent;
  let fixture: ComponentFixture<ScanwordMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ScanwordMenuComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ScanwordMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
