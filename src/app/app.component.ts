import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import { AuthService } from './Auth/auth/auth.service';
import { LoggingService } from './logging.service';
import * as fromApp from './store/app.reducer';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'Recipe-book';

  constructor(private authService:AuthService,
    private loggingService:LoggingService,
    private store:Store<fromApp.appState>
    ){}
  ngOnInit(){
   this.authService.autoLogin();
   this.loggingService.printLog('hello from AppComponent ngOninit')
  }
}
