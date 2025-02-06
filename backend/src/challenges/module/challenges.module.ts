import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ChallengesController } from '../controller/challenges.controller';
import { ChallengesService } from '../service/challenges.service';
import { AuthModule } from '../../auth/module/auth.module';
import { Challenge, ChallengeSchema } from '../../schemas/challenge.schema';
import { Manager, ManagerSchema } from '../../auth/schema/manager.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Challenge.name, schema: ChallengeSchema },
      { name: Manager.name, schema: ManagerSchema },
    ]),
    AuthModule,
  ],
  controllers: [ChallengesController],
  providers: [ChallengesService],
})
export class ChallengesModule {}
