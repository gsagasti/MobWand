import { MobWandManager } from './MobWandManager.js';
import { EventHandler } from './EventHandler.js';

const manager = new MobWandManager();
new EventHandler(manager);
