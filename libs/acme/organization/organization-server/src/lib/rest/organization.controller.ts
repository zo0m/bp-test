import {
    Controller,
    Get,
    Post,
    Patch,
    Delete,
    Body,
    Param,
    Query,
    ParseUUIDPipe,
    HttpCode,
    HttpStatus,
} from '@nestjs/common';
import { OrganizationService } from '@acme/organization/server/organization-server';
import { PaginationQueryDto } from '@core/server/rest';
import { CreateOrganizationDto, UpdateOrganizationDto } from './dto';

@Controller('organizations')
export class OrganizationController {
    constructor(private readonly organizationService: OrganizationService) {}

    @Get()
    findAll(@Query() query: PaginationQueryDto) {
        return this.organizationService.findAll(query);
    }

    @Get(':id')
    findOne(@Param('id', ParseUUIDPipe) id: string) {
        return this.organizationService.findOne(id);
    }
}
