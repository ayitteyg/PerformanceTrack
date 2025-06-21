import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';


@Component({
  selector: 'app-navbar',
  standalone: false,
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})

export class NavbarComponent implements OnInit {
  username: string | null = null;
  member_name:string |null=null;
  searchQuery: string = '';
  isLoggedIn: boolean = false;
  isCaptain:boolean=false;
  isSupervisor:boolean=false;
  isManager:boolean=false;
  isnoRole:boolean=false;
  user:any;


  private router = inject(Router);
  private authService = inject(AuthService);

  ngOnInit() {
    const user = this.authService.getUser();
    this.isLoggedIn = this.authService.isLoggedIn();

    if (user) {
      this.username = user.username;
      this.member_name = user.member_name
      this.username = user.username;
      this.isCaptain=user.isCaptain;
      this.isSupervisor=user.isSupervisor;
      this.isManager=user.isManager;
      this.isnoRole=user.isnoRole;
      this.member_name = user.member_name
    }

    console.log('Logged in:', this.isLoggedIn, '| User:', this.username);
  }

  onSearchChange() {
    console.log(this.searchQuery);
  }

  goTohome() {
    this.router.navigateByUrl('/home');
  }

  notificationCount: number = 3; // Replace with actual data
  goToNotifications() {
    console.log('Notifications clicked');
  }

  logout() {
    this.authService.logout();
    this.isLoggedIn = false;
    this.router.navigate(['/login']);
  }
}







