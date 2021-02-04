
import { Component, OnInit, ComponentFactoryResolver, ViewChild, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService, AuthResponseData } from './auth.service';
import { Observable,  Subscription } from 'rxjs';
import { AlertComponent } from 'src/app/shared/alert/alert.component';
import { PlaceholderDirective } from 'src/app/shared/placeholder.directive';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit, OnDestroy {

  isLoginMode = true;
  isLoading = false;
  error: String = null;
  @ViewChild(PlaceholderDirective) alertHost: PlaceholderDirective;
  private closeSub: Subscription;

  constructor(private authService: AuthService,
    private router: Router,
    private componentFactoryResolver: ComponentFactoryResolver, ) { }

  ngOnInit() {
  }

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }
  onSubmit(form: NgForm) {
    if (!form.valid) {
      return;
    }
    const email = form.value.email;
    const password = form.value.password;

    let authObs: Observable<AuthResponseData>;

    this.isLoading = true;

    if (this.isLoginMode) {
      authObs = this.authService.login(email, password)
    }
    else {
      authObs = this.authService.signUp(email, password)
    }
    authObs.subscribe(resData => {
      this.isLoading = false;
      console.log(resData);
      // this.router.navigate(['/recipes']);
    },
      errorMessage => {
        console.log(errorMessage);
        this.isLoading = false;
        this.error = errorMessage;
        this.showErrorAlert(errorMessage);

      });
    form.reset();
  }

  ngOnDestroy() {
    if (this.closeSub) {
      this.closeSub.unsubscribe();
    }
  }

  onHandleError() {
    this.error = null;
  }

  private showErrorAlert(message: string) {
    //  const alertCmp = new AlertComponent();
    const alertCmpFactory = this.componentFactoryResolver.resolveComponentFactory(AlertComponent);
    const hostViewContainerRef = this.alertHost.viewContainerRef;
    hostViewContainerRef.clear();

    const componentRef = hostViewContainerRef.createComponent(alertCmpFactory);

    componentRef.instance.message = message;
    this.closeSub = componentRef.instance.close.subscribe(() => {
      this.closeSub.unsubscribe();
      hostViewContainerRef.clear();
    });
  }

}








// import { Component, OnInit, ComponentFactoryResolver, ViewChild, OnDestroy } from '@angular/core';
// import { NgForm } from '@angular/forms';
// import { Router } from '@angular/router';
// import { Store } from '@ngrx/store';

// import { AuthService } from './auth.service';
// import { Subscription } from 'rxjs';
// import { AlertComponent } from 'src/app/shared/alert/alert.component';
// import { PlaceholderDirective } from 'src/app/shared/placeholder.directive';
// import * as fromApp from '../../store/app.reducer';
// import * as AuthActions from './store/auth.action';



// @Component({
//   selector: 'app-auth',
//   templateUrl: './auth.component.html',
//   styleUrls: ['./auth.component.css']
// })
// export class AuthComponent implements OnInit, OnDestroy {

//   isLoginMode = true;
//   isLoading = false;
//   error: String = null;
//   @ViewChild(PlaceholderDirective) alertHost: PlaceholderDirective;
//   private closeSub: Subscription;
//   private signupSub: Subscription;


//   constructor(private authService: AuthService,
//     private router: Router,
//     private componentFactoryResolver: ComponentFactoryResolver,
//     private store: Store<fromApp.appState>
//   ) { }

//   ngOnInit() {
//    this.signupSub = this.store.select('auth').subscribe(authState => {
//       this.isLoading = authState.loading;
//       this.error = authState.authError;
//       if (this.error) {
//         this.showErrorAlert(authState.authError);
//       }
//     });
//   }

//   onSwitchMode() {
//     this.isLoginMode = !this.isLoginMode;
//   }

//   onSubmit(form: NgForm) {
//     if (!form.valid) {
//       return;
//     }
//     const email = form.value.email;
//     const password = form.value.password;

//     if (this.isLoginMode) {
//       this.store.dispatch(
//         new AuthActions.LoginStart({ email: email, password: password })
//       );
//     }

//     else {
//       this.store.dispatch(
//         new AuthActions.SignupStart({ email: email, password: password })
//       );
//     }

//     form.reset();
//   }

//   ngOnDestroy() {
//     if (this.closeSub) {
//       this.closeSub.unsubscribe();
//     }
//     if (this.signupSub) {
//       this.signupSub.unsubscribe();
//     }
//   }

//   onHandleError() {
//     this.store.dispatch(new AuthActions.ClearError());
//   }

//   private showErrorAlert(message: string) {
//     const alertCmpFactory = this.componentFactoryResolver.resolveComponentFactory(AlertComponent);
//     const hostViewContainerRef = this.alertHost.viewContainerRef;
//     hostViewContainerRef.clear();

//     const componentRef = hostViewContainerRef.createComponent(alertCmpFactory);

//     componentRef.instance.message = message;
//     this.closeSub = componentRef.instance.close.subscribe(() => {
//       this.closeSub.unsubscribe();
//       hostViewContainerRef.clear();
//     });
//   }

// }










