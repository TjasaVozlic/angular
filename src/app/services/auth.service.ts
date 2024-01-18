import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { GoogleAuthProvider, GithubAuthProvider, FacebookAuthProvider} from '@angular/fire/auth'
import { Router, RouterFeature } from '@angular/router';
import { UserData } from '../model/user-data';
import { AppComponent } from '../app.component';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public authToken: string = "";
  public isLogged : boolean = false;
  
  constructor(private firestore : AngularFirestore, private fireauth: AngularFireAuth, private router: Router) {
    // Subscribe to changes in authentication state to update the currentUserUid
    this.fireauth.authState.subscribe((user) => {
      if (user) {
        this.authToken = user.uid;
      } else {
        this.authToken = "";
      }
    });
  }
  // login method
  login(email : string, password : string) {
    this.fireauth.signInWithEmailAndPassword(email,password).then( res => {
      const userUid = res.user?.uid;
    // Set the authToken property using the nullish coalescing operator
      this.authToken = userUid ?? '';
      localStorage.setItem('token', this.authToken); // Store the user's UID
      console.log('AuthToken set in localStorage:', this.authToken);
        if(res.user?.emailVerified == true) {
          this.isLogged = true;
          console.log("Is logged" + this.isLogged)
          this.router.navigate(['/front-page']);
        } else {
          this.isLogged = true;
          //this.router.navigate(['/varify-email']);
          this.router.navigate(['/front-page']);

        }

    }, err => {
        alert(err.message);
        this.router.navigate(['/login']);
    })
  }

  // register method
  register(email : string, password : string, name:string, phoneNumber: string){
    this.fireauth.createUserWithEmailAndPassword(email, password).then( res => {
      const userUid = res.user?.uid;
      const userData = {
        uid : userUid,
        email: email,
        name: name,
        phoneNumber: phoneNumber,
        // Add more fields as needed
      };
      this.firestore.collection('users').doc(userUid).set(userData)
      alert('Registration Successful');
      this.sendEmailForVarification(res.user);
      this.router.navigate(['/login']);
    }, err => {
      alert(err.message);
      this.router.navigate(['/register']);
    })
  }

  // sign out
  logout() {
    this.fireauth.signOut().then( () => {
      localStorage.removeItem('token');
      this.router.navigate(['/login']);
    }, err => {
      alert(err.message);
    })
  }

  // forgot password
  forgotPassword(email : string) {
      this.fireauth.sendPasswordResetEmail(email).then(() => {
        this.router.navigate(['/varify-email']);
      }, err => {
        alert('Something went wrong');
      })
  }

  // email varification
  sendEmailForVarification(user : any) {
    console.log(user);
    user.sendEmailVerification().then((res : any) => {
      this.router.navigate(['/varify-email']);
    }, (err : any) => {
      alert('Something went wrong. Not able to send mail to your email.')
    })
  }

  //sign in with google
  googleSignIn() {
    return this.fireauth.signInWithPopup(new GoogleAuthProvider).then(res => {

      this.router.navigate(['/dashboard']);
      localStorage.setItem('token',JSON.stringify(res.user?.uid));

    }, err => {
      alert(err.message);
    })
  }

  isLoggedIn():boolean{
    return this.authToken != "";
  }

}