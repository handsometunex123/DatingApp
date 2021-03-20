import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, NgForm, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AccountService } from '../_services/account.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  maxDate: Date;
  registerForm: FormGroup;
  validationErrors: string[] = [];

  @Output() cancelRegister = new EventEmitter<boolean>();
  constructor(private accountService: AccountService,
    private fb: FormBuilder,
    private toastr: ToastrService,
    private router: Router) { }

  ngOnInit(): void {
    this.initializeForm();
    this.maxDate = new Date();
    this.maxDate.setFullYear(this.maxDate.getFullYear() - 18)
  }

  initializeForm() {
    this.registerForm = this.fb.group({
      gender: ['male'],
      username: ['', Validators.required],
      knownAs: ['', Validators.required],
      dateOfBirth: ['', Validators.required],
      city: ['', Validators.required],
      country: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(8)]],
      confirmPassword: ['', [Validators.required, this.matchValues('password')]]
    })
    this.registerForm.controls.password.valueChanges.subscribe(() => {
      this.registerForm.controls.confirmPassword.updateValueAndValidity();
    })
  }

  matchValues(matchTo: string): ValidatorFn {
    return (control: AbstractControl) => {
      return control?.value === control?.parent?.controls[matchTo].value
        ? null : { isMatching: true }
    }
  }
  get _gender() { return this.registerForm.get("gender") }
  get _city() { return this.registerForm.get("city") }
  get _country() { return this.registerForm.get("country") }
  get _knownAs() { return this.registerForm.get("knownAs") }
  get _dateOfBirth() { return this.registerForm.get("dateOfBirth") }
  get _username() { return this.registerForm.get("username") }
  get _password() { return this.registerForm.get("password") }
  get _confirmPassword() { return this.registerForm.get("confirmPassword") }


  register() {
    console.log(this.registerForm.value);
    this.accountService.register(this.registerForm.value).subscribe(response => {
      this.router.navigateByUrl('/members')
      this.toastr.success('Registration successful', 'Welcome');
    }, error => {
      this.validationErrors = error;
    })
  }

  cancel() {
    console.log('cancelled');
    this.cancelRegister.emit(false);
  }

}
