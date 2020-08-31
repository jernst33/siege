import { Component, OnInit } from '@angular/core';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MapModel} from '../map.model';
import {AttackerModel} from '../attacker.model';
import {DefenderModel} from '../defender.model';
import {MapService} from '../map.service';
import {SiteService} from '../site.service';
import {AttackerService} from '../attacker.service';
import {DefenderService} from '../defender.service';
import {MatSelectChange} from '@angular/material';
import {SiteModel} from '../site.model';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {AuthService} from '../auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-sample',
  templateUrl: './sample.component.html',
  styleUrls: ['./sample.component.scss']
})
export class SampleComponent implements OnInit {

  matchForm: FormGroup;
  rounds: FormArray;
  isTrue = false;
  maps: MapModel[] = [];
  attackers: AttackerModel[] = [];
  defenders: DefenderModel[] = [];
  selectedMap: string;
  sites: SiteModel[];
  buttonsHidden: boolean = true;
  url = 'https://us-central1-siege-a99a4.cloudfunctions.net/createMatch';
  userId: string;

  constructor(private formBuilder: FormBuilder,
              private mapService: MapService,
              private siteService: SiteService,
              private attackerService: AttackerService,
              private defenderService: DefenderService,
              private http: HttpClient,
              private authService: AuthService,
              private router: Router) {}

  ngOnInit() {
    this.authService.user$.subscribe(auth => {
      this.userId = auth.uid;
    });
    this.getStaticData();
    this.matchForm = this.formBuilder.group({
      map: '',
      rounds: this.formBuilder.array([])
    });
  }

  createRound(): FormGroup {
    return this.formBuilder.group({
      role: ['', Validators.required],
      site: ['', Validators.required],
      operator: ['', Validators.required],
      kills: ['', Validators.required],
      deaths: ['', Validators.required],
      assists: ['', Validators.required],
      result: ['', Validators.required],
    });
  }

  addRound(): void {
    this.rounds = this.matchForm.get('rounds') as FormArray;
    this.rounds.push(this.createRound());
  }

  removeRound() {
    this.rounds = this.matchForm.get('rounds') as FormArray;
    this.rounds.removeAt(this.rounds.length - 1);
  }

  clearRounds() {
    this.rounds = this.matchForm.get('rounds') as FormArray;
    this.rounds.clear();
  }

  printResults() {
    console.log(this.matchForm.value);
  }

  private getStaticData() {
    this.mapService.getMaps().subscribe(maps => {
      this.maps = maps.map(m => {
        return {
          id: m.payload.doc.id,
          ...m.payload.doc.data()
        } as MapModel;
      });
    });
    this.attackerService.getAttackers().subscribe(attackers => {
      this.attackers = attackers.map(m => {
        return {
          id: m.payload.doc.id,
          ...m.payload.doc.data()
        } as AttackerModel;
      });
    });
    this.defenderService.getDefenders().subscribe(defenders => {
      this.defenders = defenders.map(m => {
        return {
          id: m.payload.doc.id,
          ...m.payload.doc.data()
        } as DefenderModel;
      });
    });
  }

  getSites($event: MatSelectChange) {
    this.clearRounds();
    this.selectedMap = $event.value.name;
    this.sites = this.siteService.getSitesInMap($event.value.id);
    this.addRound();
    this.buttonsHidden = false;
  }

  testAPI() {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      })
    };
    const data = {
      userId: this.userId,
      map: this.matchForm.value.map,
      rounds: this.matchForm.value.rounds
    };

    return this.http.post(this.url, data, httpOptions)
      .subscribe(res => {
        console.log(res);
        this.router.navigate(['dashboard']);
      });
  }

}
