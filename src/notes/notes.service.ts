import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Note, NoteDocument } from './entities/note.entity';

@Injectable()
export class NotesService {
  constructor(@InjectModel(Note.name) private noteModel: Model<NoteDocument>) {}

  getUserNotes(userId: string, movieId: string) {
    return this.noteModel.findOne({ $and: [{ userId, movieId }] }).exec();
  }

  createNote(userId: string, movieId: string, note: string) {
    const filter = { $and: [{ userId, movieId }] };
    const update = { note };
    const options = {
      new: true,
      upsert: true,
    };

    return this.noteModel.findOneAndUpdate(filter, update, options).exec();
  }
}
