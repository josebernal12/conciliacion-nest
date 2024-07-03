import { Module } from '@nestjs/common';
import { ConciliationService } from './conciliation.service';
import { ConciliationController } from './conciliation.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Conciliation, ConciliationSchema } from './entities/conciliation.entity';

@Module({
  controllers: [ConciliationController],
  providers: [ConciliationService],
  imports: [
    MongooseModule.forFeature([{ name: Conciliation.name, schema: ConciliationSchema }])
  ]
})
export class ConciliationModule { }
