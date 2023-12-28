import { MIDIData } from "./midi-data";

export interface RecordData {
  timestamp: number;
  data: MIDIData;
}

export interface RecordedData extends RecordData {
  relative: number;
}
