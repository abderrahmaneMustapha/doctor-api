import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Doctor } from './entities/doctor.entity';
import { CreateDoctorDto } from './dto/create-doctor.dto';
import { UpdateDoctorDto } from './dto/update-doctor.dto';

@Injectable()
export class DoctorService {
  constructor(
    @InjectRepository(Doctor)
    private doctorRepository: Repository<Doctor>,
  ) {}

  async create(createDoctorDto: CreateDoctorDto): Promise<Doctor> {
    // Assign the type for the single-table inheritance
    const doctor = this.doctorRepository.create({
      ...createDoctorDto,
    });
    return await this.doctorRepository.save(doctor);
  }

  async findAll(): Promise<Doctor[]> {
    return this.doctorRepository.find();
  }

  async findOne(id: string): Promise<Doctor> {
    return this.doctorRepository.findOneOrFail({
      where: { id },
    });
  }

  async update(id: string, updateDoctorDto: UpdateDoctorDto): Promise<Doctor> {
    const doctor = await this.doctorRepository.preload({
      id: id,
      ...updateDoctorDto,
    });

    if (!doctor) {
      throw new NotFoundException(`Doctor with ID ${id} not found`);
    }

    return await this.doctorRepository.save(doctor);
  }

  async remove(id: string): Promise<void> {
    await this.doctorRepository.delete(id);
  }
}
