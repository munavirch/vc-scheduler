import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfigEndpointComponent } from './config-endpoint.component';

describe('ConfigEndpointComponent', () => {
  let component: ConfigEndpointComponent;
  let fixture: ComponentFixture<ConfigEndpointComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfigEndpointComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfigEndpointComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
