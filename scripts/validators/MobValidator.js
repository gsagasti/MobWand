import { Config } from '../config/Config.js';

export class MobValidator {
    static isHostile(mobTypeId) {
        return Config.HOSTILE_MOBS.includes(mobTypeId);
    }


    // converts mob type ID to display name ("minecraft:zombie_villager" to "Zombie Villager")
    static getMobDisplayName(typeId) {
        const name = typeId.replace('minecraft:', '');
        return name.split('_').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
    }

    static getMobIcon(typeId) {
        return Config.MOB_ITEMS[typeId] || '';
    }
}
