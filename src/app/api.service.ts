import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import config from '../../auth_config.json';
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

  getOrganizationsUserIsPartOf(userId: string): Observable<any> {
    return this.http.get(`${config.apiUri}/api/organization/self/${userId}`);
  }

  getTeamSchedule(year: number): Observable<IGame[]> {
    return this.http.get<IGame[]>(`${config.apiUri}/api/games/${year}`);
  }

  getROPG() {
    return this.http.get(`${config.apiUri}/api/external`);
  }

  postSecInfo(sub: string, form: any): Observable<any> {
    var obj = {
      sec_credentials : form
    }
    return this.http.post(`${config.apiUri}/api/users/${sub}/sec-profile`, obj);
  }

  postCreateConnection(data: any): Observable<any>{
    var obj = {
      data: data
    }
    return this.http.post(`${config.apiUri}/api/connections/create`, obj);
  }

  getClients(): Observable<any> {
    return this.http.get(`${config.apiUri}/api/clients`);
  }
  getConnections(orgId: string): Observable<any> {
    if (orgId) {
      return this.http.get(`${config.apiUri}/api/organizations/${orgId}/connections`);
    } else {
      return this.http.get(`${config.apiUri}/api/connections`);
    }

  }

  deleteConnection(id: number): Observable<any> {
    return this.http.delete(`${config.apiUri}/api/connections/${id}`);
  }

  getOrgMembers(orgId: string) : Observable<any> {
    return this.http.get(`${config.apiUri}/api/organization/${orgId}/members`);
  }

  postCreateM2m(userId: string) : Observable<any>{
    return this.http.post(`${config.apiUri}/api/m2m/${userId}`, {});
  }
}
