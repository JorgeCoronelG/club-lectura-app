import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MaterialModule } from '@core/material/material.module';

@Component({
  selector: 'vex-toolbar-search',
  templateUrl: './toolbar-search.component.html',
  styleUrls: ['./toolbar-search.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [MaterialModule]
})
export class ToolbarSearchComponent implements OnInit {
  isOpen: boolean = false;

  @ViewChild('input', { read: ElementRef, static: true }) input?: ElementRef;

  constructor(private cd: ChangeDetectorRef) {}

  ngOnInit() {}

  open() {
    this.isOpen = true;
    this.cd.markForCheck();

    setTimeout(() => {
      this.input?.nativeElement.focus();
    }, 100);
  }

  close() {
    this.isOpen = false;
    this.cd.markForCheck();
  }
}
