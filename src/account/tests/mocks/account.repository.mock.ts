// import type { IAccountRepository, ICreateAccount } from '../../interfaces';
// import type { AccountEntity } from '../../entities';

// const AccountEntityMock: AccountEntity = {
//   id: 1959,
//   username: 'NormanBates',
//   email: 'normanbates@gmial.com',
//   phoneNumber: '16195550121',
//   // Todo: добавить нормальный хэш пароля
//   password: 'assadsd',
//   ip: '127.0.0.1',
//   // Todo: добавить нормальную дату
//   createdAt: new Date(),
//   updatedAt: new Date(),
//   confirmed: true,
// };

// export class AccountRepositoryMock {
//   createAccount(createAccount: ICreateAccount): Promise<AccountEntity> {
//     return Promise.resolve(AccountEntityMock);
//   }

//   async findByLogin(login: string): Promise<AccountEntity | undefined> {
//     let result: AccountEntity | undefined;
//     if (login === 'NormanBates' || 'normanbates@gmial.com' || '16195550121')
//       result = AccountEntityMock;
//     else {
//       result = undefined;
//     }

//     return Promise.resolve(result);
//   }
// }
