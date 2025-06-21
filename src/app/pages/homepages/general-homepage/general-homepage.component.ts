import { Component, ElementRef, EventEmitter, HostListener, OnInit, Output, ViewChild, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-general-homepage',
  standalone: false,
  templateUrl: './general-homepage.component.html',
  styleUrls: ['./general-homepage.component.css']
})
export class GeneralHomepageComponent implements OnInit {

  private location = inject(Location);

  activePage: string = 'home'; // Default page

  isSidebarCollapsed = false;
  isCollapsed = false;




  setActivePage(page: string) {
    this.activePage = page;

    // Dynamically update URL without reloading
    this.location.replaceState(`/general-homepage/${page}`);
    // Or this.location.go(`/general-homepage/${page}`); if you want it to be in browser history

    //when link is clicke(setActivePage), collapse sidebar
     this.isSidebarCollapsed = true;
     this.isCollapsed = true;
  }


  user: any;
  username: string | null = null;
  employee_name: string | null = null;
  searchQuery: string = '';
  isLoggedIn: boolean = false;
  isCaptain: boolean = false;
  isSupervisor: boolean = false;
  isManager: boolean = false;
  isnoRole: boolean = false;

  private router = inject(Router);
  private authService = inject(AuthService);

  @ViewChild('sidebar', { static: true }) sidebarElement!: ElementRef;
  @Output() sidebarToggled = new EventEmitter<boolean>();

    ngOnInit() {

        // Detect if the screen width is less than or equal to 768px (typical mobile breakpoint)
        if (window.innerWidth <= 768) {
          this.isSidebarCollapsed = true;
          this.isCollapsed = true;
        }


      this.user = this.authService.getUser(); // ✅ Fix: assign to this.user
      this.isLoggedIn = this.authService.isLoggedIn();

      if (this.user) {
        this.username = this.user.username;
        this.employee_name = this.user.employee_name;
        this.isCaptain = this.user.isCaptain;
        this.isSupervisor = this.user.isSupervisor;
        this.isManager = this.user.isManager;
        this.isnoRole = this.user.isnoRole;
      }
    }

  @HostListener('document:click', ['$event'])
  handleOutsideClick(event: MouseEvent) {
    if (this.isCollapsed === false && this.sidebarElement && !this.sidebarElement.nativeElement.contains(event.target)) {
      this.isCollapsed = true;
      this.sidebarToggled.emit(this.isCollapsed);
    }
  }

 //automatically collapse/expand when the user resizes the window:
  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    if (event.target.innerWidth <= 768) {
      this.isSidebarCollapsed = true;
      this.isCollapsed = true;
    } else {
      this.isSidebarCollapsed = false;
      this.isCollapsed = false;
    }
  }

  onSidebarToggled(collapsed: boolean) {
    this.isSidebarCollapsed = collapsed;
  }

  toggleSidebar() {
    this.isCollapsed = !this.isCollapsed;
    this.sidebarToggled.emit(this.isCollapsed);
  }

   logout() {
    this.authService.logout();
    this.isLoggedIn = false;
    this.router.navigate(['/login']);
  }
}
