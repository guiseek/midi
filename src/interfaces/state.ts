import { RecordedData } from "./record-data";

export interface State {
  recording: boolean;
  recorded: RecordedData[];
  selected?: RecordedData;
  devices: MIDIInput[];
  access?: MIDIAccess;
  output?: MIDIOutput;
  device?: MIDIInput;
}
