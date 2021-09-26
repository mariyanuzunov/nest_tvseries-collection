import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Req,
  UseGuards,
} from '@nestjs/common';
import { NotesService } from './notes.service';
import { CreateNoteDto } from './dto/create-note.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { TrimPipe } from 'src/shared/pipes/trim.pipe';

@Controller('notes')
export class NotesController {
  constructor(private readonly notesService: NotesService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  createNote(@Req() req, @Body(TrimPipe) data: CreateNoteDto) {
    return this.notesService.createNote(req.user._id, data.movieId, data.note);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async getUserNotes(@Req() req, @Param('id') movieId: string) {
    const record = await this.notesService.getUserNotes(req.user._id, movieId);

    return { notes: record?.note };
  }
}
