import { Component, OnInit } from '@angular/core';
import {AuthService} from '../auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  isAuth: boolean;
  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.authService.authChange.subscribe(auth => {
      this.isAuth = auth;
    });
  }
}
