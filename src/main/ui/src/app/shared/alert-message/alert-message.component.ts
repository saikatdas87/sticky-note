import {Component, Input, OnInit} from '@angular/core';

export enum AlertType {
  Success= 'success',
  Failed= 'failed',
  Warning= 'warning'
}

@Component({
  selector: 'app-alert-message',
  templateUrl: './alert-message.component.html',
  styleUrls: ['./alert-message.component.scss']
})
export class AlertMessageComponent implements OnInit {

  @Input() message: string;
  @Input() alertType: AlertType;

  constructor() { }

  ngOnInit() {
    console.log('Initialized', this.message, this.alertType);
  }

}
