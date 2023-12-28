import { RecordedData } from "../interfaces";
import { schedule } from "../utilities";

export function scheduleOutputRecords(
  output: MIDIOutput,
  records: RecordedData[]
) {
  for (const { data, relative } of records) {
    schedule(() => {
      const { command, note, velocity } = data;
      output.send([command, note, velocity], relative);
    }, relative);
  }
}
