import { EmitterVisitorContext } from '@angular/compiler';
import { Directive, HostListener, EventEmitter, Output, Host } from '@angular/core';
import { observable, Subject, interval, Observable } from 'rxjs';
import { takeUntil, tap, filter } from 'rxjs/operators';

@Directive({
  selector: '[appHoldable]'
})
export class HoldableDirective {

  @Output() holdTime: EventEmitter<number> = new EventEmitter();

  state: Subject<string> = new Subject();

  cancel!: Observable<string>;

  constructor() { 
    this.cancel = this.state.pipe(
      filter(v => v === 'cancel'),
      tap(v => {
        console.log('stopped holding')
        this.holdTime.emit(0)
      })
    )
  }

  @HostListener('mouseup', ['$event'])
  @HostListener('mouseleave', ['$event'])
  onExit(){
    this.state.next('cancel')
  }

  @HostListener('mousedown', ['$event'])
  onHold(){
    console.log('started holding')

    this.state.next('start')

    const n = 100;

    interval(n).pipe(
      takeUntil(this.cancel),
      tap(v => {
        this.holdTime.emit(v * n)
      }),
    )
    .subscribe();
  }
  
}
