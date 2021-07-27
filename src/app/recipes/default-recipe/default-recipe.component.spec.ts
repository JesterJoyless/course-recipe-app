import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DefaultRecipeComponent } from './default-recipe.component';

describe('DefaultRecipeComponent', () => {
  let component: DefaultRecipeComponent;
  let fixture: ComponentFixture<DefaultRecipeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DefaultRecipeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DefaultRecipeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
