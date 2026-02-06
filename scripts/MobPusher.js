import { system, EntityComponentTypes } from '@minecraft/server';
import { Config } from './Config.js';

export class MobPusher {
    static pushEntity(entity, playerPos) {
        const entityPos = entity.location;
        const dx = entityPos.x - playerPos.x;
        const dy = entityPos.y - playerPos.y;
        const dz = entityPos.z - playerPos.z;
        const length = Math.sqrt(dx * dx + dy * dy + dz * dz);

        if (length === 0) return false;

        try {
            const force = 1.5;
            const impulse = {
                x: (dx / length) * force,
                y: 0.5,
                z: (dz / length) * force
            };

            entity.applyImpulse(impulse);
            return true;
        } catch (e) {
            return false;
        }
    }

    static getDistance(pos1, pos2) {
        return Math.sqrt(
            Math.pow(pos2.x - pos1.x, 2) +
            Math.pow(pos2.y - pos1.y, 2) +
            Math.pow(pos2.z - pos1.z, 2)
        );
    }

    static pushMobsAway(player, playerData) {
        const currentTick = system.currentTick;
        if (!playerData.canPush(currentTick)) return;

        playerData.updatePushTick(currentTick);

        const dimension = player.dimension;
        const playerPos = player.location;
        let pushedCount = 0;

        for (const mobType of playerData.selectedMobs) {
            const entities = dimension.getEntities({ type: mobType });

            for (const entity of entities) {
                const distance = this.getDistance(playerPos, entity.location);
                if (distance < Config.PUSH_DISTANCE) {
                    if (this.pushEntity(entity, playerPos)) {
                        pushedCount++;
                    }
                }
            }
        }

        if (pushedCount > 0) {
            this.playEffects(player);
        }
    }

    static playEffects(player) {
        player.dimension.spawnParticle(Config.PARTICLE_TYPE, player.location);
        player.playSound(Config.SOUND_TYPE, { volume: 0.5 });
    }
}
