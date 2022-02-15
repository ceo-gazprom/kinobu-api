import { Injectable, Inject } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import type { AxiosRequestConfig } from 'axios';
import { TELEGRAM_CONFIG } from './telegram.constants';
import type { ITelegramConfig, ITelegramService } from './interfaces';

// @Injectable()
// export class TelegramService implements ITelegramService {
//   private telegramUrl: string;

//   constructor(
//     @Inject(TELEGRAM_CONFIG) private readonly telegramConfig: ITelegramConfig,
//     private readonly http: HttpService,
//   ) {
//     this.telegramUrl = `https://api.telegram.org/bot${this.telegramConfig.telegramBotToken}/`;
//   }

//   // private request<T>(endpoint: string, data: T) {
//   //   return this.http.post(this.telegramUrl + endpoint, data).pipe(
//   //     map((res) => {
//   //       if (!res.data.ok) {
//   //         throw new Telegram.TelegramException(
//   //           res.data.description,
//   //           res.data.error_code.toString(),
//   //         );
//   //       }
//   //       return res.data.result;
//   //     }),
//   //     catchError((error: Error) => {
//   //       throw new Telegram.TelegramException(error.message);
//   //     }),
//   //   );
//   // }

//   /**
//    *
//    * @param text
//    */
//   // public sendMessage(text: string): Promise<void> {}
// }
