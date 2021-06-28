import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BuatTransaksiPage } from './buat-transaksi.page';

describe('BuatTransaksiPage', () => {
  let component: BuatTransaksiPage;
  let fixture: ComponentFixture<BuatTransaksiPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BuatTransaksiPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BuatTransaksiPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
