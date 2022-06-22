import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth'
import { user } from 'rxfire/auth';

@Injectable({
  providedIn: 'root'
})
export class FirebaseServiceService {
  isLoggedIn = false
  constructor(public firebaseAuth : AngularFireAuth) { }

  async singin(email: string, password: string){
    await this.firebaseAuth.signInWithEmailAndPassword(email,password)
    .then(r =>{
      this.isLoggedIn = true
      localStorage.setItem('user', JSON.stringify(r.user))
    })
  }

  async singup(email: string, password: string){
    await this.firebaseAuth.createUserWithEmailAndPassword(email,password)
    .then(r =>{
      this.isLoggedIn = true
      localStorage.setItem('user', JSON.stringify(r.user))
    })
  }

  logout(){
    this.firebaseAuth.signOut()
    localStorage.removeItem('user')
  }
}
