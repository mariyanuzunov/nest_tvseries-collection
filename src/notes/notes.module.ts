import { Module } from '@nestjs/common';
import { NotesService } from './notes.service';
import { NotesController } from './notes.controller';
import { Note, NoteSchema } from './entities/note.entity';
import { MongooseModule } from '@nestjs/mongoose';
import { TrimPipe } from 'src/shared/pipes/trim.pipe';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Note.name, schema: NoteSchema }]),
    TrimPipe,
  ],
  controllers: [NotesController],
  providers: [NotesService],
})
export class NotesModule {}
