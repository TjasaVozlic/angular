import { Component, ElementRef, EventEmitter, Input, Output, Renderer2 } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { ServiceDataService } from '../../services/service-data.service';
import {Service} from '../../model/service';
import { FileService } from '../../services/file.service';
import { Observable } from 'rxjs';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { UserDataService } from '../../services/user-data.service';
import { UserData } from '../../model/user-data';

@Component({
  selector: 'app-front-page',
  templateUrl: './front-page.component.html',
  styleUrl: './front-page.component.css'
})
export class FrontPageComponent {
  
  servicesList : Service[] = [];
  ServiceObj: Service =
                  {id :'',
                  provider :'',
                  cost: 0,
                  duration: 0,
                  dateTimes: [
                  ],   
                  imageSrc : '',
                  name : '',
                  type : ''};
  id: string = '';
  provider: string = '';
  cost: number = 0;   
  imageSrc : string = '';
  userData: UserData = {uid : '',name: '', phoneNumber: '', email: ''}
  filteredServices: Service[] = [];
  selectedService : Boolean = false;
  isModalOpen = false;
  bookedService: Service =
                  {id :'',
                  provider :'',
                  cost: 0,
                  duration: 0,
                  dateTimes: [
                  ],   
                  imageSrc : '',
                  name : '',
                  type : ''};
  constructor(
    private auth: AuthService,
    private userService: UserDataService,
    private data: ServiceDataService,
    private fileService: FileService,
    private fireStore: AngularFirestore,

  ) {
    this.getAllServices();
    if(this.isLoggedIn()){
    // Example usage
    this.userService.getUserData(this.auth.authToken).subscribe((doc) => {
      if (this.auth.authToken && doc.exists) {
        this.userData = doc.data() as UserData; // Explicitly specify the type
        console.log(this.userData);
        console.log(this.auth.authToken);
        console.log(this.userData.name);

        // Now you can use userData in your application
      } else {
        console.log('User data not found');
      }
    })}
    ;
  }

  ngOnInit(): void {
  }

  register()
  {
    this.auth.logout();
  }

  getAllServices() {

    this.data.getAllServices().subscribe(res => {

      this.servicesList = res.map((e: any) => {
        const data = e.payload.doc.data();
        data.id = e.payload.doc.id;
        return data;
      })

    }, err => {
      alert('Error while fetching service data');
    })

  }

  resetForm() {
    this.id = '';
    this.provider = '';
    this.cost = 0;

  }

  addService() {
    if (this.provider == '' || this.cost == 0) {
      alert('Fill all input fields');
      return;
    }

    this.ServiceObj.id = '';
    this.ServiceObj.provider = this.provider;
    this.ServiceObj.cost = this.cost;

    this.data.addService(this.ServiceObj);
    this.resetForm();

  }

  filterByType(type: string): void {
    this.selectedService = true;
    this.filteredServices = this.servicesList.filter(service => service.type === type);
  }

  updateService() {

  }

  deleteService(service: Service) {
    if (window.confirm('Are you sure you want to delete ' + service.provider + '?')) {
      this.data.deleteService(service);
    }
  }
  
  getFile(imageSrc: string): Observable<any> {
    return this.fireStore.collection('/Upload', ref => ref.where('imageSrc', '==', imageSrc)).snapshotChanges();
  }
  isLoggedIn():boolean
  {
    return this.auth.isLoggedIn()
  }

  bookService(service: Service) {
    this.bookedService = service;
    this.isModalOpen = true;
    console.log('Service in bookService:', service);
    console.log('isModalOpen:', this.isModalOpen);

  }

}
