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
import { InspectionService } from '@acme/inspection/server/inspection-server';
import { PaginationQueryDto } from '@core/server/rest';
import { CreateInspectionDto, UpdateInspectionDto } from './dto';

@Controller('inspections')
export class InspectionController {
    constructor(private readonly inspectionService: InspectionService) {}

    @Get()
    findAll(@Query() query: PaginationQueryDto) {
        return this.inspectionService.findAll(query);
    }

    @Post()
    create(@Body() dto: CreateInspectionDto) {
        return this.inspectionService.create(dto);
    }

    @Get(':id')
    findOne(@Param('id', ParseUUIDPipe) id: string) {
        return this.inspectionService.findOne(id);
    }

    /** Transition */
    @Post(':id/transition')
    transition(@Param('id', ParseUUIDPipe) id: string) {
        return this.inspectionService.transition(id);
    }
}
