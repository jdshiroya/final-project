import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { finalize, Observable } from 'rxjs';
import { LoaderService } from './loader.service';

@Injectable({
  providedIn: 'root'
})
export class InterseptorService implements HttpInterceptor{

  constructor(public load : LoaderService) { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.load.isLoading.next(true);
    return next.handle(req).pipe(
      finalize(
        () => {
          this.load.isLoading.next(false);
        }
      )
    );
  }
}
