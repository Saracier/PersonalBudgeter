import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NavigationComponent } from './navigation.component';
import { RouterTestingModule } from '@angular/router/testing';
import { By } from '@angular/platform-browser';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

describe('NavigationComponent', () => {
  let component: NavigationComponent;
  let fixture: ComponentFixture<NavigationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NavigationComponent],
      imports: [RouterTestingModule, MatIconModule, MatButtonModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NavigationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have correct router links', () => {
    const links = fixture.debugElement.queryAll(
      By.css('.container--sidebar__links a')
    );
    expect(links[0].nativeElement.getAttribute('href')).toBe('/');
    expect(links[1].nativeElement.getAttribute('href')).toBe('/Historia');
    expect(links[2].nativeElement.getAttribute('href')).toBe('/Statystyki');

    const specialLinks = fixture.debugElement.queryAll(
      By.css('.container--sidebar__special a')
    );
    expect(specialLinks[0].nativeElement.getAttribute('href')).toBe(
      '/Ustawienia'
    );
  });
});
