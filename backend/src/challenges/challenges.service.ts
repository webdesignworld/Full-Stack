
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Challenge, ChallengeDocument } from './schemas/challenge.schema';
import { CreateChallengeDto } from './dto/create-challenge.dto';
import { UpdateChallengeDto } from './dto/update-challenge.dto';

@Injectable()
export class ChallengesService {
  constructor(
    @InjectModel(Challenge.name)
    private readonly challengeModel: Model<ChallengeDocument>,
  ) {}

 
  async findAll(): Promise<Challenge[]> {
    return this.challengeModel.find().exec();
  }


  async findById(id: string): Promise<Challenge> {
    const challenge = await this.challengeModel.findById(id).exec();
    if (!challenge) {
      throw new NotFoundException(`Challenge with id "${id}" not found.`);
    }
    return challenge;
  }

 
  async create(createChallengeDto: CreateChallengeDto): Promise<Challenge> {
    const newChallenge = new this.challengeModel(createChallengeDto);
    return newChallenge.save();
  }

 
  async update(id: string, updateChallengeDto: UpdateChallengeDto): Promise<Challenge> {
    const updatedChallenge = await this.challengeModel
      .findByIdAndUpdate(id, updateChallengeDto, { new: true })
      .exec();
    if (!updatedChallenge) {
      throw new NotFoundException(`Challenge with id "${id}" not found.`);
    }
    return updatedChallenge;
  }

  async delete(id: string): Promise<void> {
    const result = await this.challengeModel.findByIdAndDelete(id).exec();
    if (!result) {
      throw new NotFoundException(`Challenge with id "${id}" not found.`);
    }
  }
}
