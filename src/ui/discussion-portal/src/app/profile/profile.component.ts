import { Component, OnInit } from '@angular/core';
import { LoginService } from '../login/services/login.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  userDetails;
  constructor(private loginService:LoginService) { }

  ngOnInit(): void {
    this.loginService.getUser(this.loginService.userData).subscribe((data)=>{
      this.userDetails = data;
    })
  }
}
