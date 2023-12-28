import { RecordData, RecordedData } from "../interfaces";

export function normalizeRecords(records: RecordData[]) {
  const { timestamp } = records[0];
  const recorded: RecordedData[] = [];
  for (const record of records) {
    const relative = record.timestamp - timestamp;
    recorded.push({ ...record, relative });
  }

  return recorded;
}
