import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { ServiceDataService } from '../../services/service-data.service';
import {Service} from '../../model/service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {

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
  name: string = '';
  type: string = '';
  duration: number = 0;
  availableDates: Date[] = [
    new Date(2023, 11, 1, 12, 30, 0),
  ];

  constructor(private auth : AuthService, private data: ServiceDataService){}

  ngOnInit(): void {
      
  }
  bookedService: Service =                  
  {id :'',
                  provider :'',
                  cost: 0,
                  duration: 0,
                  dateTimes: [
                  ],   
                  imageSrc : '',
                  name : '',
                  type : ''};;

  handleBookService(service: Service) {
    this.bookedService = service;
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
    this.ServiceObj.type= this.type;

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



}
