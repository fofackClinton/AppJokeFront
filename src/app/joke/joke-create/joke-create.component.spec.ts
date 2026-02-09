import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JokeCreateComponent } from './joke-create.component';

describe('JokeCreateComponent', () => {
  let component: JokeCreateComponent;
  let fixture: ComponentFixture<JokeCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JokeCreateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JokeCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
