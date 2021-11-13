import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';

@Component({
  selector: 'app-document-options-popover',
  templateUrl: './document-options-popover.component.html',
  styleUrls: ['./document-options-popover.component.scss'],
})
export class DocumentOptionsPopoverComponent implements OnInit {
  constructor(public popoverController: PopoverController) { }

  ngOnInit() {}
  dismiss() { this.popoverController.dismiss(); }
}
