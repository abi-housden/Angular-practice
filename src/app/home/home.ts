import { Component, inject } from '@angular/core';
import { Notes } from '../notes/notes';
import { NotesService } from '../notes.service';
import { NoteDetails } from '../note-details.interface';
import {FormControl, FormGroup, ReactiveFormsModule} from '@angular/forms';

@Component({
  selector: 'app-home',
  imports: [Notes, ReactiveFormsModule],
  template: `
    <section>
      <form [formGroup]="noteForm" (submit)="submitNote()">
        <label for="message">Add a note:</label><br>
        <input type="text" id="title" name="title" formControlName="title"><br>
        <textarea id="contents" name="contents" rows="5" cols="40" formControlName="contents"></textarea><br>
        <button class="primary" type="submit">Add</button>
      </form>
    </section>

    <section class="all-notes">
    <h2>All saved notes:</h2>
      <app-notes [notes]="savednotes"></app-notes>
    </section>
  `,
  styleUrls: ['./home.css'],
})

export class Home {

  savednotes!: NoteDetails[];
  notesService: NotesService = inject(NotesService);

  noteForm = new FormGroup({
    title: new FormControl(''),
    contents: new FormControl(''),
  });

  constructor() {
    this.getAllNotes2();
  }

  async getAllNotes2() {
    this.savednotes = await this.notesService.getAllNotes();
  }

  async submitNote() {
    // Wait for the note to be submitted to the service
    await this.notesService.submitNote(
      this.noteForm.value.title ?? '',
      this.noteForm.value.contents ?? '',
    );

    // Then refresh the list of notes and reset the form
    await this.getAllNotes2();
    this.noteForm.reset();
  }

}
