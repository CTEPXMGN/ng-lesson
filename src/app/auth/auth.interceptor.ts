import { HttpHandlerFn, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { inject } from '@angular/core';
import { Auth } from './auth';
import { catchError, switchMap, throwError } from 'rxjs';

let isResfreshing = false;

export const authTokenInterceptorPath: HttpInterceptorFn = (
  req: HttpRequest<any>,
  next: HttpHandlerFn
) => {
  const authService = inject(Auth);
  const token = authService.token;

  if (!token) return next(req);

  if (isResfreshing) {
    return refreshAndProceed(authService, req, next);
  }

  return next(addToken(req, token)).pipe(
    catchError((err) => {
      if (err.status === 403) {
        return refreshAndProceed(authService, req, next);
      }

      return throwError(err);
    })
  );
};

const refreshAndProceed = (authService: Auth, req: HttpRequest<any>, next: HttpHandlerFn) => {
  if (!isResfreshing) {
    isResfreshing = true;
    return authService.refreshAuthToken().pipe(
      switchMap((res) => {
        isResfreshing = false;
        return next(addToken(req, res.access_token));
      })
    );
  }

  return next(addToken(req, authService.token!));
};

const addToken = (req: HttpRequest<any>, token: string) => {
  return req.clone({
    setHeaders: {
      Authorization: `Bearer ${token}`,
    },
  });
};
