import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiscussionsTestComponent } from './discussions-test.component';

describe('DiscussionsTestComponent', () => {
  let component: DiscussionsTestComponent;
  let fixture: ComponentFixture<DiscussionsTestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DiscussionsTestComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DiscussionsTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
