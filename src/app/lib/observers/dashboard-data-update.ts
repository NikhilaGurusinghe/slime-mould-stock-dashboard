export type DashboardDataUpdate =
  | { type: "state-history-updated" }
  | { type: "portfolio-history-updated" };

export type DashboardDataUpdateListener = (update: DashboardDataUpdate) => void;

export type UnregisterListenerCallback = () => boolean;

const listeners = new Set<DashboardDataUpdateListener>();

export function subscribeToDataUpdates(newListener: DashboardDataUpdateListener): UnregisterListenerCallback {
  listeners.add(newListener);
  // returning callback to unregister the listener
  return () => listeners.delete(newListener);
}

export function publishDataUpdate(update: DashboardDataUpdate) {
  for (const listener of listeners) {
    // passing the event along to every single listener
    listener(update);
  }
}

