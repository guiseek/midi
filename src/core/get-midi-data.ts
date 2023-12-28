import { MIDIData } from "../interfaces";

export function getMIDIData([command, note, velocity]: Uint8Array): MIDIData {
  return { command, note, velocity };
}
