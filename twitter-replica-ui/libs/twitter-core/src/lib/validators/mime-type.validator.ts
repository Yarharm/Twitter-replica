import { AbstractControl } from '@angular/forms';
import { Observable, Observer, of } from 'rxjs';

export const mimeTypeValidator = (
  control: AbstractControl
): Promise<{ [key: string]: any }> | Observable<{ [key: string]: any }> => {
  if (typeof control.value === 'string') {
    return of(null);
  }
  const file: File = control.value as File;
  const fileReader = new FileReader();
  const frObservable = new Observable(
    (observer: Observer<{ [key: string]: any }>) => {
      fileReader.addEventListener('loadend', () => {
        const arrBuff = new Uint8Array(
          fileReader.result as ArrayBuffer
        ).subarray(0, 4);
        let header = '';
        let isValid = false;
        for (const arrBuffVal of arrBuff) {
          header += arrBuffVal.toString(16);
        }
        switch (header) {
          case '89504e47': // png
            isValid = true;
            break;
          case 'ffd8ffe0':
          case 'ffd8ffe1':
          case 'ffd8ffe2':
          case 'ffd8ffe3':
          case 'ffd8ffe8':
            isValid = true; // jpeg
            break;
          default:
            isValid = false;
            break;
        }
        if (isValid) {
          observer.next(null);
        } else {
          observer.next({ invalidMimeType: true });
        }
        observer.complete();
      });
      fileReader.readAsArrayBuffer(file);
    }
  );
  return frObservable;
};
