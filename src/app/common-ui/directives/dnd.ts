import { Directive, EventEmitter, HostBinding, HostListener, Output } from '@angular/core';

@Directive({
  selector: '[dnd]',
})
export class Dnd {
  @Output() fileDropped: EventEmitter<File> = new EventEmitter<File>();

  @HostBinding('class.fileover') filerover = false;

  @HostListener('dragover', ['$event'])
  onDragOver(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();

    this.filerover = true;
  }

  @HostListener('drop', ['$event'])
  onDrop(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();

    this.filerover = false;

    this.fileDropped.emit(event.dataTransfer?.files[0]);
  }

  @HostListener('dragleave', ['$event'])
  onDragLeave(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();

    this.filerover = false;
  }
}
