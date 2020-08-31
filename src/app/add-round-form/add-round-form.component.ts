import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AttackerModel} from '../attacker.model';
import {DefenderModel} from '../defender.model';
import {SiteModel} from '../site.model';

@Component({
  selector: 'app-add-round-form',
  templateUrl: './add-round-form.component.html',
  styleUrls: ['./add-round-form.component.scss']
})
export class AddRoundFormComponent implements OnInit {

  @Input() roundNumber: number;
  @Input() selectedMap: string;
  @Input() attackers: AttackerModel[];
  @Input() defenders: DefenderModel[];
  @Input() sites: SiteModel[];

  addRoundForm: FormGroup;
  constructor(private fb: FormBuilder) {
    this.addRoundForm = fb.group({
      role: [null, Validators.required],
      site: [null, Validators.required],
      kills: [null, Validators.required],
      deaths: [null, Validators.required],
      assists: [null, Validators.required],
      result: [null, Validators.required],
    });
  }

  ngOnInit() {
  }

  onClick() {
    console.log(this.addRoundForm.value);
  }
}
