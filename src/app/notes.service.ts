import { Injectable } from '@angular/core';
import { NoteDetails } from './note-details.interface';

@Injectable({
  providedIn: 'root'
})
export class NotesService {

  private readonly STORAGE_KEY = 'savednotes';

  async getAllNotes(): Promise<NoteDetails[]> {
    const data = localStorage.getItem(this.STORAGE_KEY)
    return data ? JSON.parse(data) : [];
  }

  async submitNote(title: string, contents: string) {

    console.log(
      `Note received: Title: ${title}, Contents: ${contents}`,
    );

    // Retrieve existing notes from local storage
    const existingNotes: NoteDetails[] = await this.getAllNotes() || [];

    // Create a new note object witht the form data
    const newNote: NoteDetails = {
      "id": existingNotes.length + 1,
      "title": title,
      "contents": contents
    }

    // Add the new note to the existing notes array
    existingNotes.push(newNote);

    // Save the updated notes array back to local storage
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(existingNotes));

  }
  
}
