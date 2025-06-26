import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../core/auth/login/services/auth.service';

interface MenuItem {
  label: string;
  link: string;
}

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  menuItems: MenuItem[] = [];
  
  userProfile: string | null = null;

  constructor(private authService: AuthService) {}  

  ngOnInit(): void {
    this.userProfile = this.authService.getPerfil();
  }

  logout(): void {
    this.authService.logout();
  }
}
