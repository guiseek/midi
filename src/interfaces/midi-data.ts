import { Command } from "../enums";

export interface MIDIData {
  command: Command;
  note: number;
  velocity: number;
}
