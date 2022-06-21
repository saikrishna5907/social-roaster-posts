import { Module } from '@nestjs/common';
import { BaseService } from './base/base.service';

@Module({
    imports: [],
    providers: [BaseService]
})
export class SharedModule {

}
