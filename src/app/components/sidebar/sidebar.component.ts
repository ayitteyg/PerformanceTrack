
import { Component, EventEmitter, OnInit, Output, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-sidebar',
  standalone: false,
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})

export class SidebarComponent implements OnInit {
  isCollapsed = false;
  user:any;
  username: string | null = null;
  employee_name:string |null=null;
  searchQuery: string = '';
  isLoggedIn: boolean = false;
  isCaptain:boolean=false;
  isSupervisor:boolean=false;
  isManager:boolean=false;
  isnoRole:boolean=false;
 

  private router = inject(Router);
  private authService = inject(AuthService);

  @Output() sidebarToggled = new EventEmitter<boolean>();


  ngOnInit() {
    const user = this.authService.getUser();
    this.isLoggedIn = this.authService.isLoggedIn();
if (user) {
      this.username = user.username;
      this.employee_name = user.employee_name
      this.username = user.username;
      this.isCaptain=user.isCaptain;
      this.isSupervisor=user.isSupervisor;
      this.isManager=user.isManager;
      this.isnoRole=user.isnoRole;
      this.employee_name = user.employee_name
    }

    console.log('Logged in:', this.isLoggedIn, '| User:', this.username);
  }

    
 


  toggleSidebar() {
    this.isCollapsed = !this.isCollapsed;
    this.sidebarToggled.emit(this.isCollapsed);
  }
}
