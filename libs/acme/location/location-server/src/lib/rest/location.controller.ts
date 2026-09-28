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
import { LocationService } from '@acme/location/server/location-server';
import { PaginationQueryDto } from '@core/server/rest';
import { CreateLocationDto, UpdateLocationDto } from './dto';

@Controller('locations')
export class LocationController {
    constructor(private readonly locationService: LocationService) {}

    @Get()
    findAll(@Query() query: PaginationQueryDto) {
        return this.locationService.findAll(query);
    }

    @Get(':id')
    findOne(@Param('id', ParseUUIDPipe) id: string) {
        return this.locationService.findOne(id);
    }
}
