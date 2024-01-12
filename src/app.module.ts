import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ChatController } from './chat/chat.controller';

@Module({
  imports: [],
  controllers: [AppController, ChatController],
  providers: [AppService],
})
export class AppModule {}
