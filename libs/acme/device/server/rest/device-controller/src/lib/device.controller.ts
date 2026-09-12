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
import {
    DeviceService,
    DeviceDeactivateUseCase,
    DeviceReplaceUseCase,
    DeviceMoveUseCase,
    DeviceGenerateQrCodeUseCase,
} from '@acme/device/server/device-service';
import { PaginationQueryDto } from '@core/server/rest';
import { CreateDeviceDto, UpdateDeviceDto } from './dto';

@Controller('devices')
export class DeviceController {
    constructor(
        private readonly deviceService: DeviceService,
        private readonly deviceDeactivateUseCase: DeviceDeactivateUseCase,
        private readonly deviceReplaceUseCase: DeviceReplaceUseCase,
        private readonly deviceMoveUseCase: DeviceMoveUseCase,
        private readonly deviceGenerateQrCodeUseCase: DeviceGenerateQrCodeUseCase,
    ) {}

    @Get()
    findAll(@Query() query: PaginationQueryDto) {
        return this.deviceService.findAll(query);
    }

    @Post()
    create(@Body() dto: CreateDeviceDto) {
        return this.deviceService.create(dto);
    }

    @Get(':id')
    findOne(@Param('id', ParseUUIDPipe) id: string) {
        return this.deviceService.findOne(id);
    }

    @Patch(':id')
    update(@Param('id', ParseUUIDPipe) id: string, @Body() dto: UpdateDeviceDto) {
        return this.deviceService.update(id, dto);
    }

    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    remove(@Param('id', ParseUUIDPipe) id: string) {
        return this.deviceService.remove(id);
    }

    /** Deactivate — Take the device out of service */
    @Post(':id/deactivate')
    deactivate(@Param('id', ParseUUIDPipe) id: string) {
        return this.deviceDeactivateUseCase.execute(id);
    }

    /** Replace — Swap this device for another unit */
    @Post(':id/replace')
    replace(@Param('id', ParseUUIDPipe) id: string, @Body() dto: Record<string, unknown>) {
        return this.deviceReplaceUseCase.execute(id, dto as never);
    }

    /** Move — Relocate the device */
    @Post(':id/move')
    move(@Param('id', ParseUUIDPipe) id: string, @Body() dto: Record<string, unknown>) {
        return this.deviceMoveUseCase.execute(id, dto as never);
    }

    /** Generate QR Code — Produce a scannable asset label */
    @Get(':id/generate-qr-code')
    generateQrCode(@Param('id', ParseUUIDPipe) id: string) {
        return this.deviceGenerateQrCodeUseCase.execute(id);
    }
}
