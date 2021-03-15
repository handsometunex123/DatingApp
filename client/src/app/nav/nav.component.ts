import { AccountService } from './../_services/account.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';
import { User } from '../_models/user';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  model: any = {}
  @ViewChild('loginForm') loginForm: NgForm;
  constructor(public accountService: AccountService) { }

  ngOnInit(): void {
    
  }

  login(){
    console.log(this.model)
    if(this.loginForm.form.valid){
      this.accountService.login(this.model).subscribe((res)=>{
        console.log(res)
      }, error => {
        console.log(error.error);
      });
      
    }   
    
  }

  logout(){
    this.accountService.logout();
  }



}
