import { AccountService } from './_services/account.service';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from './_models/user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'The Dating App';
  users: Observable<any>;
  constructor(private http: HttpClient, private accountService: AccountService ){}


  ngOnInit() {
    this.getUsers();
    this.setCurrentUser();
  }

  getUsers(){
    this.users = this.http.get('https://localhost:5001/api/users');
  }


  setCurrentUser(){
    const user: User = JSON.parse(localStorage.getItem('user'));
    this.accountService.setCurrentUser(user);
  }


}
