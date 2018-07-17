import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfigMailingLocComponent } from './config-mailing-loc.component';

describe('ConfigMailingLocComponent', () => {
  let component: ConfigMailingLocComponent;
  let fixture: ComponentFixture<ConfigMailingLocComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfigMailingLocComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfigMailingLocComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
