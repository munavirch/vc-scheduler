import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfigMailingMandatoryComponent } from './config-mailing-mandatory.component';

describe('ConfigMailingMandatoryComponent', () => {
  let component: ConfigMailingMandatoryComponent;
  let fixture: ComponentFixture<ConfigMailingMandatoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfigMailingMandatoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfigMailingMandatoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
