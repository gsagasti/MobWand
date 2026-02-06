import { world } from '@minecraft/server';

export class DataStorage {
    static getKey(playerId) {
        return `mobwand_${playerId}`;
    }

    static save(player, playerData) {
        try {
            const key = this.getKey(player.id);
            world.setDynamicProperty(key, JSON.stringify(playerData.toJSON()));
        } catch (e) {}
    }

    static load(player, playerData) {
        try {
            const key = this.getKey(player.id);
            const data = world.getDynamicProperty(key);
            if (data) {
                playerData.fromJSON(JSON.parse(data));
            }
        } catch (e) {}
    }
}
