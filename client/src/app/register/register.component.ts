import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AccountService } from '../_services/account.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  model: any = {}
  @ViewChild('registerForm') registerForm: NgForm;
  @Output() cancelRegister = new EventEmitter<boolean>();
  constructor(private accountService: AccountService, private toastr: ToastrService) { }

  ngOnInit(): void {

  }

  register() {
    if (this.model.username && this.model.password) {
      this.accountService.register(this.model).subscribe(response => {
        console.log(response);
        this.toastr.success('Registration successful', 'Welcome');
        this.cancel();
      }, error => {
        console.log(error);
        this.toastr.error(error.error);
      })
    } else {
      this.toastr.error('Confirm all inputs has been filled');
    }

    console.log(this.model);
  }

  cancel() {
    console.log('cancelled');
    this.cancelRegister.emit(false);
  }

}
