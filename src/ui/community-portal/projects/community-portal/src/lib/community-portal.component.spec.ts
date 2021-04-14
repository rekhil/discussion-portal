import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommunityPortalComponent } from './community-portal.component';

describe('CommunityPortalComponent', () => {
  let component: CommunityPortalComponent;
  let fixture: ComponentFixture<CommunityPortalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CommunityPortalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CommunityPortalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
