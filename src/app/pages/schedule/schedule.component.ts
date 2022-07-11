import { Component, OnInit } from '@angular/core';
import { AuthClientConfig, AuthService } from '@auth0/auth0-angular';
import { faThumbsDown } from '@fortawesome/free-solid-svg-icons';
import { catchError, of, switchMap } from 'rxjs';
import { ApiService } from 'src/app/api.service';
import {Game, Schedule} from '../../models/schedule';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.css'],
})
export class ScheduleComponent implements OnInit {
  games: Game[];
  schedules: Schedule[] = [];
  audience = this.configFactory.get()?.audience;
  hasApiError = false;
  org = undefined;

  constructor(
    private api: ApiService,
    private configFactory: AuthClientConfig,
    public authService: AuthService
  ) {}

  ngOnInit() {

    this.authService.getIdTokenClaims().pipe(
      switchMap(idToken => {
        if (idToken?.org_id) {
          return this.api.getOrganizationById(idToken?.org_id);
        }else {
          return of(null);
        }
      }),
      catchError(err => {
        throw(err);
      }),
      switchMap(org => {
          this.org = org;
          return this.api.getTeamSchedule((new Date()).getFullYear());
      })
    ).subscribe(schedule => {

      var games = schedule.map(x => new Game(x));

      if (this.org) {
        var teamGames = games.filter(game => game.home_team.toLowerCase() === this.org.name || game.away_team.toLowerCase() === this.org.name);
        this.schedules.push(new Schedule(this.org.name, teamGames, true));
      } else {
        var SECTeams = [
          'Alabama',
          'Arkansas',
          'Auburn',
          'LSU',
          'Kentucky',
          'Missouri',
          'Texas A&M',
          'Georgia',
          'Mississippi State',
          'Ole Miss',
          'Tennessee',
          'South Carolina',
          'Vanderbilt',
          'Florida'

        ]
        SECTeams.forEach(x => {
          var teamGames = games.filter(game => game.home_team.toLowerCase() === x.toLowerCase() || game.away_team.toLowerCase() === x.toLowerCase());
          this.schedules.push(new Schedule(x, teamGames));
        });

      }

    })
  }

  public getTeam(game: Game, team: string) {
    return game.away_team.toLowerCase() === team.toLowerCase() ? game.away_team : game.home_team;
  }
  public getOpponent(game: Game, team: string) {
    return game.away_team.toLowerCase() !== team.toLowerCase() ? game.away_team : game.home_team;
  }
}
