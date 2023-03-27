import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageReviwesComponent } from './manage-reviwes.component';

describe('ManageReviwesComponent', () => {
  let component: ManageReviwesComponent;
  let fixture: ComponentFixture<ManageReviwesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageReviwesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageReviwesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
