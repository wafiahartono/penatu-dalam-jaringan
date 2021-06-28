import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MasukPage } from './masuk.page';

describe('MasukPage', () => {
  let component: MasukPage;
  let fixture: ComponentFixture<MasukPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MasukPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MasukPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
