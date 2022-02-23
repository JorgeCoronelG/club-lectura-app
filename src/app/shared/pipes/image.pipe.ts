import { Pipe, PipeTransform } from '@angular/core';
import { EnvironmentService } from "../../core/services/environment.service";

@Pipe({
  name: 'image'
})
export class ImagePipe implements PipeTransform {

  constructor(private environmentService: EnvironmentService) {}

  transform(img: string | null): string {
    return `${this.environmentService.environment}/${img}`;
  }

}
