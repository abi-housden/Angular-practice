import { Component, input } from '@angular/core';
import { NoteDetails } from '../note-details.interface';

@Component({
  selector: 'app-notes',
  imports: [],
  template: `
    
    @for (note of notes(); track note.id) {
    <div class="note">
      <h4>{{ note.title }}</h4>
      <p>{{ note.contents }}</p>
      <br>
    </div>
    }
  `,
  styleUrl: './notes.css'
})
export class Notes {

  notes = input.required<NoteDetails[]>();

}
