import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MarkCompComponent } from './mark-comp.component';

describe('MarkCompComponent', () => {
  let component: MarkCompComponent;
  let fixture: ComponentFixture<MarkCompComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MarkCompComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MarkCompComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
