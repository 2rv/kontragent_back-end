import { Injectable } from '@nestjs/common';
import { RevisionSelfRepository } from './revision-self.repository';

@Injectable()
export class RevisionSelfService {
  constructor(private revisionSelfRepository: RevisionSelfRepository) {}

  // async createRevision(
  //   createRevisionCompaniesDto: any[],
  //   company: CompanyEntity,
  //   creator: UserEntity,
  // ): Promise<void> {
  //   // подсчёт цены
  //   let price = 0;
  //   const onePeriodRevisionPrice = 500;
  //   const addPrice = (add: number) => (price += add);
  //   const culcRevisionPrice = (years: any[]) => {
  //     years.forEach((year) => {
  //       year.firstPeriod && addPrice(onePeriodRevisionPrice);
  //       year.secondPeriod && addPrice(onePeriodRevisionPrice);
  //       year.thirdPeriod && addPrice(onePeriodRevisionPrice);
  //       year.fourthPeriod && addPrice(onePeriodRevisionPrice);
  //     });
  //   };
  //   createRevisionCompaniesDto.forEach((revisionCompany) => {
  //     culcRevisionPrice(revisionCompany.year);
  //   });

  //   await this.companyBalanceService.createCompanyBalancePayment(
  //     company,
  //     price,
  //     PAYMENT_TYPE.REVISION,
  //   );
  //   // подсчёт цены
  //   const revision: RevisionEntity = new RevisionEntity();
  //   revision.company = company;
  //   revision.creator = creator;
  //   revision.status = REVISION_STATUS.NEW;
  //   revision.save();

  //   // this.revisionCompanyService.createRevisionCompanies(
  //   //   createRevisionCompaniesDto,
  //   //   revision,
  //   // );
  // }

  // async createSelfRevision(
  //   createRevisionOwnCompanyDto: any,
  //   company: CompanyEntity,
  //   creator: UserEntity,
  // ): Promise<void> {
  //   let price = 0;
  //   const onePeriodRevisionPrice = 500;
  //   const addPrice = (add: number) => (price += add);
  //   const culcRevisionPrice = (years: any[]) => {
  //     years.forEach((year) => {
  //       year.firstPeriod && addPrice(onePeriodRevisionPrice);
  //       year.secondPeriod && addPrice(onePeriodRevisionPrice);
  //       year.thirdPeriod && addPrice(onePeriodRevisionPrice);
  //       year.fourthPeriod && addPrice(onePeriodRevisionPrice);
  //     });
  //   };
  //   culcRevisionPrice(createRevisionOwnCompanyDto.year);

  //   await this.companyBalanceService.createCompanyBalancePayment(
  //     company,
  //     price,
  //     PAYMENT_TYPE.REVISION,
  //   );

  //   const revision: RevisionEntity = new RevisionEntity();
  //   revision.company = company;
  //   revision.creator = creator;
  //   revision.status = REVISION_STATUS.NEW;
  //   revision.save();

  //   // this.revisionCompanyService.createSelfRevisionCompany(
  //   //   createRevisionOwnCompanyDto,
  //   //   revision,
  //   //   company,
  //   // );
  // }
}
