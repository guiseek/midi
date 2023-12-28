export function schedule(handler: TimerHandler, timeout = 0) {
  window.setTimeout(handler, timeout);
}
