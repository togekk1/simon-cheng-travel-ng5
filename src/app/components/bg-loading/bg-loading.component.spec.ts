import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BgLoadingComponent } from './bg-loading.component';

describe('BgLoadingComponent', () => {
  let component: BgLoadingComponent;
  let fixture: ComponentFixture<BgLoadingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BgLoadingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BgLoadingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
