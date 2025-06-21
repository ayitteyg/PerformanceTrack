import { Component,  OnInit} from '@angular/core';
import { AuthService } from './services/auth.service';
import * as AOS from 'aos';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'frontend';

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.checkAuthentication();
     AOS.init({
      duration: 1200,
      once: true  
    });
  }


}
