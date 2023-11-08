import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
} from '@nestjs/common';
import { HistoryService } from './history.service';
import { CreateHistoryDto } from './dto/create-history.dto';
import { UpdateHistoryDto } from './dto/update-history.dto';
import { Roles } from 'src/decorators/roles.decorator';
import { RolesGuard } from 'src/guards/roles.guard';

@Controller('histories')
@UseGuards(RolesGuard)
export class HistoryController {
  constructor(private readonly historyService: HistoryService) {}

  @Post()
  @Roles('doctor', 'Doctor')
  create(@Body() createHistoryDto: CreateHistoryDto) {
    return this.historyService.create(createHistoryDto);
  }

  @Get()
  @Roles('doctor', 'patient', 'Doctor', 'Patient')
  findAll(@Req() req: any) {
    if (req.user.type === 'patient') {
      return this.historyService.findHistoriesForPatient(req.user.sub);
    }
    return this.historyService.findAll();
  }

  @Get(':id')
  @Roles('doctor', 'patient', 'Doctor', 'Patient')
  findOne(@Req() req: any, @Param('id') id: string) {
    if (req.user.type === 'patient') {
      return this.historyService.findHistoryForPatient(req.user.sub, id);
    }
    return this.historyService.findOne(id);
  }

  @Patch(':id')
  @Roles('doctor', 'Doctor')
  update(@Param('id') id: string, @Body() updateHistoryDto: UpdateHistoryDto) {
    return this.historyService.update(id, updateHistoryDto);
  }

  @Delete(':id')
  @Roles('doctor', 'Doctor')
  remove(@Param('id') id: string) {
    return this.historyService.remove(id);
  }
}
