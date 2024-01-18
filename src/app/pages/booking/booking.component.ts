import { Component, Input } from '@angular/core';
import { Service } from '../../model/service';
import { FrontPageComponent } from '../front-page/front-page.component';
import { ServiceDataService } from '../../services/service-data.service';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrl: './booking.component.css'
})
export class BookingComponent {
  
 @Input() booked: Service =                  
 {id :'',
 provider :'',
 cost: 0,
 duration: 0,
 dateTimes: [
 ],   
 imageSrc : '',
 name : '',
 type : ''};
 isButtonClicked: boolean = false;
 ;
 constructor(private dataService: ServiceDataService)
 {
  
 }
 submitBooking(service: Service, date: string, time: string) {
  // Assuming you want to remove a specific element from dateTimes array
  alert("Booking submited!")
  const indexToRemove = service.dateTimes.findIndex(dateTime => dateTime.date === date && dateTime.time === time);

  if (indexToRemove !== -1) {
    // Remove the specific element from dateTimes array
    service.dateTimes.splice(indexToRemove, 1);
  }

  // Assuming this.dataService.updateService() is a function that updates the service
  // Make sure to replace it with your actual implementation
  this.dataService.updateService(service)
}

 toggleButtonState() {
  this.isButtonClicked = !this.isButtonClicked;
}
}
