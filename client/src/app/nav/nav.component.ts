import { AccountService } from './../_services/account.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';
import { User } from '../_models/user';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  model: any = {}
  @ViewChild('loginForm') loginForm: NgForm;
  constructor(public accountService: AccountService, private router:Router, private toastr: ToastrService) { }

  ngOnInit(): void {
    
  }

  login(){
    console.log(this.model)
    if(this.loginForm.form.valid){
      this.accountService.login(this.model).subscribe((res)=>{
        console.log(res)
        this.router.navigate(["/members"])
      }, error => {
        console.log(error.error);
        this.toastr.error(error.error);
      });
      
    }   
    
  }

  logout(){
    this.router.navigate(["/"])
    this.accountService.logout();
  }



}
