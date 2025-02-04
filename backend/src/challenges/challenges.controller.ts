
import {
  Body,
  Controller,
  Get,
  Post,
  Param,
  Patch,
  Delete,
  HttpStatus,
  HttpCode,
  UseGuards,
} from '@nestjs/common';
import { ChallengesService } from './challenges.service';
import { CreateChallengeDto } from './dto/create-challenge.dto';
import { UpdateChallengeDto } from './dto/update-challenge.dto';
import { Roles } from '../auth/decorator/roles.decorator';
import { AuthGuard } from '../auth/guards/auth.guard';
import { AuthenticatedUser } from '../auth/decorator/authenticated-user.decorator';
import { RolesGuard } from '../auth/guards/roles.guard';

@Controller('challenges')
@UseGuards(AuthGuard, RolesGuard)

@Roles('manager')
export class ChallengesController {
  constructor(private readonly challengesService: ChallengesService) {}

  @Get()

  async getAllChallenges(@AuthenticatedUser() user: any) {
   
    return this.challengesService.findAll();
  }

  @Get(':id')
  async getChallengeById(
    @Param('id') id: string,
    @AuthenticatedUser() user: any, 
  ) {
    return this.challengesService.findById(id);
  }

  @Post()
  async createChallenge(
    @Body() createChallengeDto: CreateChallengeDto,
    @AuthenticatedUser() user: any,
  ) {
 
    return this.challengesService.create(createChallengeDto);
  }

  @Patch(':id')
  async updateChallenge(
    @Param('id') id: string,
    @Body() updateChallengeDto: UpdateChallengeDto,
    @AuthenticatedUser() user: any,
  ) {
    return this.challengesService.update(id, updateChallengeDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteChallenge(@Param('id') id: string) {
    await this.challengesService.delete(id);
    return;
  }
}
