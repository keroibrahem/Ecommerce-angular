import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormControlOptions, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../core/services/auth.service';
import { Router } from '@angular/router';
// import { ComponentModule } from 'src/app/Components/component.module'; // Adjust the import path as necessary
@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, HttpClientModule],
  providers: [AuthService],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})

export class RegisterComponent {

  showPassword: boolean = false;
  showConfirmPassword: boolean = false;
  isloading: boolean = false;
  constructor(private authService: AuthService, private router: Router) {
    // Initialize the form with default values or any other setup if needed
  }

  

  registerForm:FormGroup= new FormGroup({
    username: new FormControl('',[Validators.required, Validators.minLength(3), Validators.maxLength(20)]),
    name: new FormControl('',[Validators.required, Validators.minLength(2), Validators.maxLength(100)]),
    age: new FormControl('',[Validators.required, Validators.min(0)]),
    email: new FormControl('',[Validators.required, Validators.email]),
    password: new FormControl('',[Validators.required, Validators.minLength(6),Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d).+$')]),
    confirmPassword: new FormControl('',[Validators.required, Validators.minLength(6),Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d).+$')]),
    phone: new FormControl('',[Validators.required,Validators.pattern('^01[0-2,5]{1}[0-9]{8}$')])
  },{ validators:[ this.confirmPasswordValidator] } as FormControlOptions
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
    const userData= {
      username: this.registerForm.value.username,
      name: this.registerForm.value.name,
      age: this.registerForm.value.age,
      email: this.registerForm.value.email,
      password: this.registerForm.value.password,
      phone: this.registerForm.value.phone
    };
    if (this.registerForm.valid) {
      this.authService.register(userData).subscribe({
        next: (response) => {
          console.log('Registration successful');
          // Optionally, you can reset the form or navigate to another page
          this.registerForm.reset();
          this.isloading = false;
          this.router.navigate(['/login']);
          
        },
        error: (error) => {
          console.error('Registration failed', error);
          // Handle the error appropriately, e.g., show a message to the user
        }
      });
    } else {
      console.log('Form is invalid');
      this.isloading = false;
    }
  }
}


