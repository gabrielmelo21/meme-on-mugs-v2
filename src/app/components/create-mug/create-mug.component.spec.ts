import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateMugComponent } from './create-mug.component';

describe('CreateMugComponent', () => {
  let component: CreateMugComponent;
  let fixture: ComponentFixture<CreateMugComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateMugComponent]
    });
    fixture = TestBed.createComponent(CreateMugComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
