import { serializable } from '/lib/jsonc';

import ROT from 'rot-js';
export * from 'rot-js';
export { ROT as default };

serializable('ROT.Scheduler.Action')(ROT.Scheduler.Action);
serializable('ROT.Scheduler')(ROT.Scheduler);
serializable('ROT.EventQueue')(ROT.EventQueue);
