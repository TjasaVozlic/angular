
import { Injectable } from '@angular/core';
import {AngularFirestore} from '@angular/fire/compat/firestore'
import { Service } from '../model/service';
import { UserData } from '../model/user-data';

@Injectable({
  providedIn: 'root'
})
export class UserDataService {
  email: string = '';
  name: string = '';
  mobile: string = '';
  uid: string = '';
  friendcount: number = 0;
  image: string = '';
 
 
  constructor(private afs: AngularFirestore, private firestore: AngularFirestore) { }

  addUsers(service: UserData)
  {
    return this.afs.collection('/users').add(service);
  }

  getAllUsers()
  {
    return this.afs.collection('/users').snapshotChanges();
  }

  deleteUsers(service: UserData)
  {
    return this.afs.doc('/users/' + service.uid).delete();
  }

  updateService(service: UserData)
  {
    this.deleteUsers(service);
    this.addUsers(service)
  }

  getToken(user :UserData)
  {
    return this.afs.doc('/users/' + user.uid)
  }

  getUserData(uid: string) {
    return this.firestore.collection('users').doc(uid).get();
  }
  
}
