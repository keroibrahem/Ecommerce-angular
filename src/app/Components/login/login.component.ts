import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormControlOptions, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, CommonModule, HttpClientModule,RouterModule],
  providers: [AuthService],
  standalone: true,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  
  showPassword: boolean = false;
  showConfirmPassword: boolean = false;
  isloading: boolean = false;
  constructor(private authService: AuthService, private router: Router) {
    // Initialize the form with default values or any other setup if needed
  }

  
  logform:FormGroup= new FormGroup({
    
    email: new FormControl('',[Validators.required, Validators.email]),
    password: new FormControl('',[Validators.required, Validators.minLength(6),Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d).+$')]),
  }
);

  confirmPasswordValidator(group: FormGroup): void {

    const control = group.get('confirmPassword');
    const passwordControl = group.get('password');
    if (control?.value === null ) {
      control?.setErrors({ required: true });
      
    }
    if (passwordControl?.value === null) {
      passwordControl.setErrors({ required: true });
     
    }
    if (control?.value !== passwordControl?.value) {
      control?.setErrors({ notMatching: true });
      
    }
   
  }

  onSubmit(): void {
  this.isloading = true;
  // const userData = {
  //   email: this.logform.value.email,
  //   password: this.logform.value.password
  // };
  if (this.logform.valid) {
    this.authService.login(this.logform.value.email, this.logform.value.password).subscribe({
      next: (user: any) => {
        if (user) {
          const fakeToken = btoa(user.email + ':' + new Date().getTime());
          localStorage.setItem('token', fakeToken);
          localStorage.setItem('userid', user.id);
          this.logform.reset();
          this.isloading = false;
          this.router.navigate(['/home']);
        } else {
          this.isloading = false;
          alert('Invalid email or password');
        }
      },
      error: (e) => {
        console.error('Login failed', e);
        this.isloading = false;
      }
    });
  } else {
    console.log('Form is invalid');
    this.isloading = false;
  }
}

}