import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/service/data.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html'
})
export class ProfileComponent implements OnInit {

  loadingState = true;
  currentUserDetail: any;
  currentUserAddressDetail: any;

  constructor(
    private dataService: DataService
  ) { }

  ngOnInit() {
    this.dataService.currentUser.subscribe((currentUser) => {
      // if (Object.keys(currentUser).length > 0) {
      if (currentUser) {
        this.currentUserDetail = currentUser;
      }
    });
    this.dataService.currentUserAddress.subscribe((currentUseraddress) => {
      if (currentUseraddress) {
        this.currentUserAddressDetail = currentUseraddress;
        // console.log(this.currentUserAddressDetail);

      }
    });
  }

}
