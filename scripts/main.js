import { MobWandManager } from './managers/MobWandManager.js';
import { EventHandler } from './handlers/EventHandler.js';

const manager = new MobWandManager();
new EventHandler(manager);
