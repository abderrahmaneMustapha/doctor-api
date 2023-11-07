import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { History } from './entities/history.entity';
import { CreateHistoryDto } from './dto/create-history.dto';
import { UpdateHistoryDto } from './dto/update-history.dto';

@Injectable()
export class HistoryService {
  constructor(
    @InjectRepository(History)
    private HistoryRepository: Repository<History>,
  ) {}

  async create(createHistoryDto: CreateHistoryDto): Promise<History> {
    const History = this.HistoryRepository.create(createHistoryDto);
    return await this.HistoryRepository.save(History);
  }

  async findAll(): Promise<History[]> {
    return await this.HistoryRepository.find();
  }

  async findOne(id: string): Promise<History> {
    const History = await this.HistoryRepository.findOne({ where: { id } });
    if (!History) {
      throw new NotFoundException(`History with ID ${id} not found`);
    }
    return History;
  }

  async update(
    id: string,
    updateHistoryDto: UpdateHistoryDto,
  ): Promise<History> {
    const History = await this.HistoryRepository.preload({
      id,
      ...updateHistoryDto,
    });

    if (!History) {
      throw new NotFoundException(`History with ID ${id} not found`);
    }

    return await this.HistoryRepository.save(History);
  }

  async remove(id: string): Promise<void> {
    const result = await this.HistoryRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`History with ID ${id} not found`);
    }
  }
}
