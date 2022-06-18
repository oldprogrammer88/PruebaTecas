import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router) { }

  nombre: string = "";

  ngOnInit(): void {
    this.nombre = this.authService.getGivenName();
  }

  closeSession() {
    this.authService.removeToken();
    this.router.navigateByUrl("login");
  }
}
