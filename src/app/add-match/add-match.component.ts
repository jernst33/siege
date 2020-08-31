import { Component, OnInit } from '@angular/core';
import {MapModel} from '../map.model';
import {MapService} from '../map.service';
import {MatSelectChange} from '@angular/material';
import {SiteModel} from '../site.model';
import {SiteService} from '../site.service';
import {AttackerService} from '../attacker.service';
import {DefenderService} from '../defender.service';
import {AttackerModel} from '../attacker.model';
import {DefenderModel} from '../defender.model';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Match} from '../match.model';
import {Round} from '../round.model';

@Component({
  selector: 'app-add-match',
  templateUrl: './add-match.component.html',
  styleUrls: ['./add-match.component.scss']
})
export class AddMatchComponent implements OnInit {

  maps: MapModel[] = [];
  selectedMap: MapModel;
  sites: SiteModel[] = [];
  attackers: AttackerModel[] = [];
  defenders: DefenderModel[] = [];
  addMatchForm: FormGroup;
  role: string;
  match: Match;
  rounds: FormArray

  constructor(private mapService: MapService,
              private siteService: SiteService,
              private attackerService: AttackerService,
              private defenderService: DefenderService,
              private fb: FormBuilder) {}

  ngOnInit() {
    console.log('Loaded the component successfully');
    this.addMatchForm = this.fb.group({
      map: '',
      rounds: this.fb.array([ this.createRound() ])
    });
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
    this.selectedMap = $event.value;
    this.sites = this.siteService.getSitesInMap($event.value.id);
  }

  onFormSubmit(value: any) {

  }

  addRound(): void {
    this.rounds = this.addMatchForm.get('rounds') as FormArray;
    this.rounds.push(this.createRound());
  }

  private createRound(): FormGroup {
    return this.fb.group({
      role: [null, Validators.required],
      site: [null, Validators.required],
      kills: [null, Validators.required],
      deaths: [null, Validators.required],
      assists: [null, Validators.required],
      result: [null, Validators.required],
    });
  }
}
