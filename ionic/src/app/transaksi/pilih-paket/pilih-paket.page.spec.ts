import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PilihPaketPage } from './pilih-paket.page';

describe('PilihPaketPage', () => {
  let component: PilihPaketPage;
  let fixture: ComponentFixture<PilihPaketPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PilihPaketPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PilihPaketPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
