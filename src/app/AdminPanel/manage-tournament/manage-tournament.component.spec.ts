import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageTournamentComponent } from './manage-tournament.component';

describe('ManageTournamentComponent', () => {
  let component: ManageTournamentComponent;
  let fixture: ComponentFixture<ManageTournamentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageTournamentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageTournamentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
