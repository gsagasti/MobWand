import { world, system, EntityComponentTypes } from '@minecraft/server';
import { PlayerData } from '../data/PlayerData.js';
import { MobValidator } from '../validators/MobValidator.js';
import { WandValidator } from '../validators/WandValidator.js';
import { MobPusher } from '../services/MobPusher.js';
import { UIManager } from './UIManager.js';
import { StorageData } from '../data/StorageData.js';
import { Config } from '../config/Config.js';

export class MobWandManager {
    constructor() {
        this.playerDataMap = new Map();
        this.startUpdateLoop();
    }

    getPlayerData(playerId) {
        if (!this.playerDataMap.has(playerId)) {
            this.playerDataMap.set(playerId, new PlayerData(playerId));
        }
        return this.playerDataMap.get(playerId);
    }

    addMobToSelection(player, mobTypeId) {
        if (!MobValidator.isHostile(mobTypeId)) {
            player.sendMessage('§cOnly hostile mobs can be selected!');
            return;
        }

        const pData = this.getPlayerData(player.id);

        if (pData.hasMob(mobTypeId)) {
            player.sendMessage('§cYou already have this mob type selected!');
            return;
        }

        if (pData.isFull()) {
            player.sendMessage(`§cMaximum mob limit reached (${Config.MAX_MOBS})!`);
            return;
        }

        pData.addMob(mobTypeId);
        StorageData.save(player, pData);
        player.sendMessage(`§aMob added: ${MobValidator.getMobDisplayName(mobTypeId)}`);

        this.pushMobTypeImmediately(player, mobTypeId);
    }
     // immediately pushes all nearby entities of the specified type (used when adding a mob)
    pushMobTypeImmediately(player, mobTypeId) {
        const dimension = player.dimension;
        const playerPos = player.location;
        const entities = dimension.getEntities({ type: mobTypeId });
        let pushedCount = 0;

        for (const entity of entities) {
            const distance = MobPusher.getDistance(playerPos, entity.location);
            if (distance < Config.PUSH_DISTANCE) {
                if (MobPusher.pushEntity(entity, playerPos)) {
                    pushedCount++;
                }
            }
        }

        if (pushedCount > 0) {
            MobPusher.playEffects(player);
        }
    }

    removeMobFromSelection(player, mobTypeId) {
        const pData = this.getPlayerData(player.id);
        if (pData.removeMob(mobTypeId)) {
            StorageData.save(player, pData);
            player.sendMessage(`§eMob removed: ${MobValidator.getMobDisplayName(mobTypeId)}`);
        }
    }

    showUI(player) {
        const pData = this.getPlayerData(player.id);
        UIManager.show(player, pData, (p, mobType) => this.removeMobFromSelection(p, mobType));
    }

    giveWand(player) {
        const inventory = player.getComponent(EntityComponentTypes.Inventory);
        const wand = WandValidator.create();
        inventory.container.addItem(wand);
        player.sendMessage('§aMobWand received!');
    }

    loadPlayerData(player) {
        const pData = this.getPlayerData(player.id);
        StorageData.load(player, pData);
    }

    savePlayerData(player) {
        const pData = this.getPlayerData(player.id);
        StorageData.save(player, pData);
    }

     // main update loop, handles wand state and mob pushing
    update() {
        for (const player of world.getAllPlayers()) {
            const pData = this.getPlayerData(player.id);
            const inventory = player.getComponent(EntityComponentTypes.Inventory);
            const currentItem = inventory?.container?.getItem(player.selectedSlotIndex);

            const isHoldingWand = WandValidator.isValid(currentItem);
            pData.updateWandState(isHoldingWand);

            if (isHoldingWand && !pData.isEmpty()) {
                MobPusher.pushMobsAway(player, pData);
            }
        }
    }

    startUpdateLoop() {
        system.runInterval(() => this.update(), 1);
    }
}
