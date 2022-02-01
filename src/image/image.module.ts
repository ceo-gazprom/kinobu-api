import { Module } from '@nestjs/common';
import type { Provider } from '@nestjs/common';
import { StorageModule } from '../storage';
import { IMAGE_SERVICE } from './image.constants';
import { ImageService } from './image.service';

const providers: Provider[] = [
  {
    provide: IMAGE_SERVICE,
    useClass: ImageService,
  },
];
@Module({
  imports: [StorageModule],
  providers: [...providers],
  exports: [...providers],
})
export class ImageModule {}
