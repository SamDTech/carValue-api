import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Report } from './report.entity';
import { Repository } from 'typeorm';
import { CreateReportDto } from './dtos/create-report.dto';
import { User } from '../users/user.entity';
import { ApproveReportDto } from './dtos/approve-report.dto';

@Injectable()
export class ReportsService {
  constructor(@InjectRepository(Report) private report: Repository<Report>) {}

  create(reportDto: CreateReportDto, user: User) {
    const report = this.report.create(reportDto);
    report.user = user;

    return this.report.save(report);
  }

  async changeApproval(id: string, approved: boolean) {
    const report = await this.report.findOne(id);

    if (!report) {
      throw new NotFoundException('report not found');
    }

    report.approved = approved

    return this.report.save(report)
  }
}
