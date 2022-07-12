import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import config from '../../auth_config_prod.json';
import { Game, IGame } from './models/schedule';
import { Response } from 'express';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}

  ping$(): Observable<any> {
    console.log(config.apiUri);
    return this.http.get(`${config.apiUri}/api/external`);
  }

  getOrganizations(): Observable<any> {
    return this.http.get(`${config.apiUri}/api/organizations`);
  }

  getOrganizationById(orgId: string): Observable<any> {
    return this.http.get(`${config.apiUri}/api/organization/${orgId}`);
  }

  getTeamSchedule(year: number): Observable<IGame[]> {
    return this.http.get<IGame[]>(`${config.apiUri}/api/games/${year}`);
  }
}
