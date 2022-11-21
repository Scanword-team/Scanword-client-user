import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScanwordsPageComponent } from './scanwords-page.component';

describe('ScanwordsPageComponent', () => {
  let component: ScanwordsPageComponent;
  let fixture: ComponentFixture<ScanwordsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ScanwordsPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ScanwordsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
