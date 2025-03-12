import { Injectable } from "@angular/core";
import { HttpRequest,HttpEvent,HttpHandler,HttpInterceptor } from "@angular/common/http";
import { Observable } from "rxjs";


@Injectable()

export class CustomInterceptor implements HttpInterceptor{
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
      

        const localToken = localStorage.getItem('Token');
        const localUsername = localStorage.getItem('Username');
        if(localToken && localUsername){
            const trimmedToken = localToken.trim();
            const clonedRequest = req.clone({
                headers:req.headers
                .set('Authorization', trimmedToken)
                .set('x-username',localUsername)});
                return next.handle(clonedRequest);
        }
       
        return next.handle(req);
    }

}