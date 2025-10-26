import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JokeUpdateComponent } from './joke-update.component';

describe('JokeUpdateComponent', () => {
  let component: JokeUpdateComponent;
  let fixture: ComponentFixture<JokeUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JokeUpdateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JokeUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
