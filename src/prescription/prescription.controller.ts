import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { PrescriptionService } from './prescription.service';
import { CreatePrescriptionDto } from './dto/create-prescription.dto';
import { UpdatePrescriptionDto } from './dto/update-prescription.dto';
import { RolesGuard } from 'src/guards/roles.guard';
import { Roles } from 'src/decorators/roles.decorator';

@Controller('prescriptions')
@UseGuards(RolesGuard)
export class PrescriptionController {
  constructor(private readonly prescriptionService: PrescriptionService) {}

  @Post()
  @Roles('admin', 'doctor', 'Admin', 'Doctor')
  create(@Body() createPrescriptionDto: CreatePrescriptionDto) {
    return this.prescriptionService.create(createPrescriptionDto);
  }

  @Get()
  @Roles('admin', 'doctor', 'Admin', 'Doctor')
  findAll() {
    return this.prescriptionService.findAll();
  }

  @Get(':id')
  @Roles('admin', 'doctor', 'Admin', 'Doctor')
  findOne(@Param('id') id: string) {
    return this.prescriptionService.findOne(id);
  }

  @Patch(':id')
  @Roles('admin', 'doctor', 'Admin', 'Doctor')
  update(
    @Param('id') id: string,
    @Body() updatePrescriptionDto: UpdatePrescriptionDto,
  ) {
    return this.prescriptionService.update(id, updatePrescriptionDto);
  }

  @Delete(':id')
  @Roles('admin', 'doctor', 'Admin', 'Doctor')
  remove(@Param('id') id: string) {
    return this.prescriptionService.remove(id);
  }
}
