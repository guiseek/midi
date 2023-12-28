import { RecordData, RecordedData, State } from "./interfaces";
import { c, selectStorageValue, stringify } from "./utilities";
import { Command } from "./enums";
import {
  Store,
  getMIDIData,
  normalizeRecords,
  scheduleOutputRecords,
} from "./core";
import "./style.css";

let currentRecords: RecordData[] = [];

const store = new Store<State>({
  recording: false,
  recorded: [],
  devices: [],
});

const button = c("button", {
  innerText: "Gravar",
  disabled: true,
  type: "button",
  onclick() {
    if (button.innerText === "Gravar") {
      store.set("recording", true);
      button.innerText = "Parar";
      currentRecords = [];
    } else {
      store.set("recording", false);
      button.innerText = "Gravar";
      const normalized = normalizeRecords(currentRecords);
      localStorage.setItem(new Date().toISOString(), stringify(normalized));

      while (recorded.options.length > 0) {
        recorded.options.remove(recorded.options.length - 1);
      }

      Object.keys(localStorage).map((id, index) => {
        recorded.add(new Option(id, `${index}`));
      });
    }
  },
});

const recorded = c("select", {
  multiple: true,
  id: "recordedSelect",
  ondblclick() {
    const selectedRecord = selectStorageValue<RecordedData[]>(
      recorded.selectedIndex
    );

    const output = store.get("output");
    if (output) scheduleOutputRecords(output, selectedRecord);
  },
});

Object.keys(localStorage).map((id, index) => {
  recorded.add(new Option(id, `${index}`));
});

function onMidiMessage<E>(event: E) {
  const e = event as MIDIMessageEvent;
  if (store.get("recording")) {
    const data = getMIDIData(e.data);
    const timestamp = new Date().getTime();

    if (data.command === Command.NoteOn || data.command === Command.NoteOff) {
      currentRecords.push({ timestamp, data });
    }
  }
}

navigator.requestMIDIAccess({ software: true, sysex: true }).then((access) => {
  store.set("access", access);

  const output = access.outputs.values().next();
  store.set("output", output.value);

  const devices = Array.from(access.inputs.values());
  store.set("devices", devices);

  const select = c("select", {
    id: "deviceSelect",
    required: true,
    async onchange() {
      const device = devices.find((d) => d.id === select.value);
      store.set("device", device);
      button.disabled = !device;
      if (device) {
        await device.open();
        device.onmidimessage = onMidiMessage;
      }
    },
  });
  select.add(new Option("- Selecione um dispositivo -"));

  for (const { name, manufacturer, id } of devices) {
    select.add(new Option(`${name} - ${manufacturer}`, id));
  }

  app.append(select, button, recorded);
});
