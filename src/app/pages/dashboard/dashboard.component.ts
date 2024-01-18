import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { ServiceDataService } from '../../services/service-data.service';
import {Service} from '../../model/service';
import { FileService } from '../../services/file.service';
import { Observable } from 'rxjs';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { UserDataService } from '../../services/user-data.service';
import { UserData } from '../../model/user-data';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {

  dateTimes: { date: string, time: string }[] = [];
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
  name: string = '';
  type: string = '';
  duration: number = 0;
  availableDates: Date[] = [
    new Date(2023, 11, 1, 12, 30, 0),
  ];


  constructor(
    private auth: AuthService,
    private userService: UserDataService,
    private data: ServiceDataService,
    private fileService: FileService,
    private fireStore: AngularFirestore
  ) {
    this.getAllServices();

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
    });
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
    this.ServiceObj.name = this.name;
    this.ServiceObj.duration = this.duration;
    this.ServiceObj.dateTimes = this.dateTimes;
    this.ServiceObj.type= this.type;
    this.ServiceObj.imageSrc= 'R.jpg';
    console.log(this.ServiceObj.dateTimes);
    this.data.addService(this.ServiceObj);
    this.resetForm();

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

  addDateTime() {
    this.dateTimes.push({ date: '', time: '' });
  }

  removeDateTime(index: number) {
    this.dateTimes.splice(index, 1);
  }
}
