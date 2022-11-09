export class Schedule {
    constructor(team: string, games: Game[], show?: boolean) {
        this.team = team;
        this.games = games;
        this.show = show ? show : false;
    }
    team: string;
    show: boolean
    games: Game[];
}

export class Game {
    constructor(game: IGame) {
        this.week = game.week;
        this.date = game.start_date;
        this.venue = game.venue;
        this.away_team = game.away_team;
        this.home_team = game.home_team;

        if (game.home_conference === 'SEC' && game.away_conference === 'SEC') {
            this.in_conference = true;
        }
        else if (game.home_conference === 'SEC' && game.away_conference !== 'SEC') {
            this.sec_home = true;
        } else if (game.home_conference !== 'SEC' && game.away_conference === 'SEC') {
            this.sec_away = true;
        }
        this.away_points = game.away_points;
        this.home_points = game.home_points;
    }
    venue: string;
    week: number;
    away_team: string;
    home_team: string;
    date: string;
    in_conference?: boolean;
    sec_home?: boolean;
    sec_away?: boolean;
    home_points: number;
    away_points: number;

}

export interface IGame {
    id: number;
    season: number;
    week: number;
    season_type: string;
    start_date: string;
    start_time_tbd: boolean;
    neutral_site: boolean;
    conference_game: boolean;
    attendance: number;
    venue_id: number;
    venue: string;
    home_id: number;
    home_team: string;
    home_conference: string;
    home_points: number;
    home_line_scores: number;
    home_post_win_prob: number;
    home_pregame_elo: number;
    home_postgame_elo: number;
    away_id: number;
    away_team: string;
    away_conference: string;
    away_points: number;
    away_line_scores: number;
    away_post_win_prob: number;
    away_pregame_elo: number;
    away_postgame_elo: number;
    excitement_index: number;
    highlights: string;
    notes: string;
}