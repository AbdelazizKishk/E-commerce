import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailscategoriesComponent } from './detailscategories.component';

describe('DetailscategoriesComponent', () => {
  let component: DetailscategoriesComponent;
  let fixture: ComponentFixture<DetailscategoriesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetailscategoriesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailscategoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
