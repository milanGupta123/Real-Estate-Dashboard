import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  user: any;
  pass: any;
  showPassword: boolean = false;
  constructor(private router: Router) {}

  ngOnInit(): void {}
  public togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }
  login() {
    // alert('hey')
    // if (this.user === "mailto:admin@uxdlab.us" && this.pass === "Admin@123") {
    if (this.user === 'admin@milan.com' && this.pass === 'admin@123') {
      // this.router.navigate(['/dashboard']);
      this.router.navigateByUrl('dashboard');
    }
  }
}

// alert('hey'+this.user +''+ this.pass)
