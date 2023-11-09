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
import { History } from './entities/history.entity';
import { Roles } from 'src/decorators/roles.decorator';
import { RolesGuard } from 'src/guards/roles.guard';
import {
  ApiBearerAuth,
  ApiBody,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

@ApiTags('histories')
@ApiBearerAuth()
@Controller('histories')
@UseGuards(RolesGuard)
export class HistoryController {
  constructor(private readonly historyService: HistoryService) {}

  @ApiOperation({
    summary: 'Create a patient history record, only accessible for doctors',
  })
  @ApiResponse({
    status: 201,
    description: 'The history record has been successfully created.',
    type: History,
  })
  @ApiBody({ type: CreateHistoryDto })
  @ApiUnauthorizedResponse({
    description: 'Unauthorized if token is missing or invalid',
  })
  @ApiForbiddenResponse({
    description: 'Forbidden if user does not have the "doctor" role',
  })
  @Post()
  @Roles('doctor', 'Doctor')
  create(@Body() createHistoryDto: CreateHistoryDto) {
    return this.historyService.create(createHistoryDto);
  }

  @ApiOperation({
    summary:
      'Get all patient history records, only accessible for doctors, patient can also access this to get their medical history',
  })
  @ApiResponse({
    status: 200,
    description: 'A list of history records.',
    type: [History],
  })
  @ApiForbiddenResponse({
    description: 'Forbidden if user does not have the correct role',
  })
  @Get()
  @Roles('doctor', 'patient', 'Doctor', 'Patient')
  findAll(@Req() req: any) {
    if (req.user.type === 'patient' || req.user.type === 'Patient') {
      return this.historyService.findHistoriesForPatient(req.user.sub);
    }
    return this.historyService.findAll();
  }

  @ApiOperation({
    summary:
      'Get a specific patient history record by ID, only accessible for doctors, patient can also access this to get their medical history',
  })
  @ApiResponse({
    status: 200,
    description: 'The history record with the given ID.',
    type: History,
  })
  @ApiNotFoundResponse({
    description: 'History record not found.',
  })
  @ApiForbiddenResponse({
    description: 'Forbidden if user does not have the correct role',
  })
  @Get(':id')
  @Roles('doctor', 'patient', 'Doctor', 'Patient')
  findOne(@Req() req: any, @Param('id') id: string) {
    if (req.user.type === 'patient' || req.user.type === 'Patient') {
      return this.historyService.findHistoryForPatient(req.user.sub, id);
    }
    return this.historyService.findOne(id);
  }

  @ApiOperation({
    summary:
      'Update a patient history record by ID, only accessible by doctors',
  })
  @ApiResponse({
    status: 200,
    description: 'The updated history record.',
    type: History,
  })
  @ApiNotFoundResponse({
    description: 'History record not found for the given ID.',
  })
  @ApiForbiddenResponse({
    description: 'Forbidden if user does not have the "doctor" role',
  })
  @ApiBody({ type: UpdateHistoryDto })
  @Patch(':id')
  @Roles('doctor', 'Doctor')
  update(@Param('id') id: string, @Body() updateHistoryDto: UpdateHistoryDto) {
    return this.historyService.update(id, updateHistoryDto);
  }

  @ApiOperation({
    summary:
      'Delete a patient history record by ID, only accessible by doctors',
  })
  @ApiResponse({
    status: 200,
    description: 'The history record has been successfully deleted.',
  })
  @ApiNotFoundResponse({
    description: 'History record not found for the given ID.',
  })
  @ApiForbiddenResponse({
    description: 'Forbidden if user does not have the "doctor" role',
  })
  @Delete(':id')
  @Roles('doctor', 'Doctor')
  remove(@Param('id') id: string) {
    return this.historyService.remove(id);
  }
}
