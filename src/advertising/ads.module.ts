import { Module } from '@nestjs/common';
import { Provider } from '@nestjs/common';
import { ADVERTISING_SERVICE } from './ads.constants';
import { AdvertisingService } from './advertising.service';

const externalProviders: Provider[] = [
  {
    provide: ADVERTISING_SERVICE,
    useClass: AdvertisingService,
  },
];
@Module({
  providers: [...externalProviders],
  exports: [...externalProviders],
})
export class AdsModel {}
