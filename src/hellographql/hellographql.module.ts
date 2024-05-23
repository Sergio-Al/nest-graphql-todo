import { Module } from '@nestjs/common';
import { HellographqlResolver } from './hellographql.resolver';

@Module({
  providers: [HellographqlResolver],
})
export class HellographqlModule {}
