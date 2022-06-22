import { Component, HostListener, OnInit } from '@angular/core';
import { FirebaseServiceService } from './core/firebase-service.service';
import { DataService } from './service/data.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'MyInvoice';
  isSignedIn = false;
  login = true;
  signup = false;
  name = "Sign up";

  registrationForm!: FormGroup;

  constructor(public firebaseService : FirebaseServiceService, private data:DataService, private fb: FormBuilder){}

  ngOnInit(){    
    this.registrationForm = this.fb.group({
      email: ['',[
        Validators.required,
        Validators.email
      ]],
      password: ['',[
        Validators.required,
        Validators.minLength(8)
      ]],
    })

    
    this.data.currentStatus.subscribe(status => this.isSignedIn = status)
    if(localStorage.getItem('user') !== null)
    this.data.changeStatus(true)
    else
    this.data.changeStatus(false)
  }

  btn(){
    if(this.name === "Sign up"){
      this.login = false;
      this.signup = true;
      this.name = "Login"
    }else{
      this.login = true;
      this.signup = false;
      this.name = "Sign up"
    }
   
  }
  

  async onSignUp(email: string, password: string){
    console.log(this.email.invalid);
    const formValue = this.registrationForm.value;
    await this.firebaseService.singup(formValue.email, formValue.password)
    if(this.firebaseService.isLoggedIn)
    this.data.changeStatus(true)
  }

  async onSignIn(email: string, password: string){
    await this.firebaseService.singin(email,password)
    if(this.firebaseService.isLoggedIn)
    this.data.changeStatus(true)
  }
  
  @HostListener('FormSubmitCustomEvent', ['$event'])
  onCustomEventCaptured(event: any) {
    console.log('Event Received', event.detail);
  }

  handleLogout(){
    this.data.changeStatus(false)
    console.log(this.isSignedIn)
  }

  get email(){
    return this.registrationForm.get('email')!.value;
  }

  
  get password(){
    return this.registrationForm.get('password')!.value;
  }
}
 