import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SideNavComponent } from './side-nav/side-nav.component';
import { HeaderComponent } from './header/header.component';
import { UserModule } from './user/user.module';
import { LoginComponent } from './login/login.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { MainComponent } from './main/main.component';
import { CustomInterceptor } from './CustomInterceptor';
import { SignupComponent } from './signup/signup.component';
import { ProductComponent } from './product/product.component';


@NgModule({
  declarations: [
    AppComponent,
    SideNavComponent,
    HeaderComponent,
    LoginComponent, MainComponent, SignupComponent, ProductComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,ReactiveFormsModule,FormsModule,
    HttpClientModule,UserModule
  ],
  providers: [{
    provide:HTTP_INTERCEPTORS,useClass: CustomInterceptor, multi:true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
