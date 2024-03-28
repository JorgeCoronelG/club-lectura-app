import { Pipe, PipeTransform } from '@angular/core';
import { environment } from '../../../../environments/environment';

@Pipe({
  name: 'url',
  standalone: true
})
export class UrlPipe implements PipeTransform {
  transform(path: string): string {
    return `${environment.serverUrl}${path}`;
  }
}
