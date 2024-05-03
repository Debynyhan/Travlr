import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, lastValueFrom } from 'rxjs';

import { Trip } from '../models/trip';
import { User } from '../models/user';
import { AuthResponse } from '../models/authreponse';
import { BROWSER_STORAGE } from '../storage';

@Injectable({
  providedIn: 'root',
})
export class TripDataService {
  constructor(
    private http: HttpClient,
    @Inject(BROWSER_STORAGE) private storage: Storage
  ) {}
  private url = 'http://localhost:3000/api';

  public getTrips(): Observable<Trip[]> {
    // let url = 'http://localhost:3000/api/trips';

    return this.http.get<Trip[]>(this.url);
  }

  public getTrip(tripCode: string): Observable<Trip[]> {
    // let url = 'http://localhost:3000/api/trips';

    return this.http.get<Trip[]>(this.url + '/' + tripCode);
  }

  public addTrip(formData: Trip): Observable<Trip[]> {
    return this.http.post<Trip[]>(this.url, formData);
  }

  public updateTrip(formData: Trip): Observable<Trip> {
    return this.http.put<Trip>(this.url + '/' + formData.code, formData);
  }

  private handleError(error: any): Promise<any> {
    console.error('Something has gone wrong', error);
    return Promise.reject(error.message || error);
  }

  public login(user: User): Promise<AuthResponse> {
    return this.makeAuthApiCall('login', user);
  }
  public register(user: User): Promise<AuthResponse> {
    return this.makeAuthApiCall('register', user);
  }
  private async makeAuthApiCall(
    urlPath: string,
    user: User
  ): Promise<AuthResponse> {
    return await lastValueFrom(
      this.http.post<AuthResponse>(`${this.url}/${urlPath}`, user)
    ).catch(this.handleError);
  }

  //   private async makeAuthApiCall(
  //     urlPath: string,
  //     user: User
  //   ): Promise<AuthResponse> {
  //     const url: string = `${this.apiBaseUrl}/${urlPath}`;
  //     try {
  //       const response = await firstValueFrom(
  //         this.http.post<AuthResponse>(url, user)
  //       );
  //       return response;
  //     } catch (error) {
  //       return this.handleError(error);
  //     }
  //   }
}
