import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { AdminService } from './admin.service';
import { CreateAdminDto } from './dto/create-admin.dto';
import { RolesGuard } from 'src/guards/roles.guard';
import { Roles } from 'src/decorators/roles.decorator';
import {
  ApiBearerAuth,
  ApiBody,
  ApiForbiddenResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { Admin } from './entities/admin.entity';

@ApiTags('admins')
@ApiBearerAuth()
@Controller('admins')
@UseGuards(RolesGuard)
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @ApiOperation({ summary: 'Create a new admin' })
  @ApiResponse({
    status: 201,
    description: 'The admin has been successfully created.',
    type: Admin,
    schema: {
      example: {
        id: '123e4567-e89b-12d3-a456-426614174000',
        name: 'Jane Doe',
        email: 'jane.doe@example.com',
        type: 'admin',
      },
    },
  })
  @ApiBody({ type: CreateAdminDto })
  @ApiUnauthorizedResponse({
    description: 'Unauthorized if token is missing or invalid',
  })
  @ApiForbiddenResponse({
    description: 'Forbidden if user does not have the right role',
  })
  @Post()
  @Roles('admin', 'Admin')
  create(@Body() createAdminDto: CreateAdminDto) {
    return this.adminService.create(createAdminDto);
  }
}
