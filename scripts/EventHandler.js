import { world, system, EntityComponentTypes } from '@minecraft/server';
import { WandValidator } from './WandValidator.js';

export class EventHandler {
    constructor(manager) {
        this.manager = manager;

        this.onEntityHit();
        this.onItemUse();
        this.onPlayerSpawn();
        this.onPlayerLeave();
        this.onScriptEvent();
    }

    onEntityHit() {
        world.afterEvents.entityHitEntity.subscribe(event => {
            const player = event.damagingEntity;
            if (player.typeId !== 'minecraft:player') return;

            const inventory = player.getComponent(EntityComponentTypes.Inventory);
            const item = inventory?.container?.getItem(player.selectedSlotIndex);
            if (!WandValidator.isValid(item)) return;

            this.manager.addMobToSelection(player, event.hitEntity.typeId);
        });
    }

    onItemUse() {
        world.afterEvents.itemUse.subscribe(event => {
            const player = event.source;
            if (!WandValidator.isValid(event.itemStack)) return;

            if (player.isSneaking) {
                this.manager.showUI(player);
            }
        });
    }

    onPlayerSpawn() {
        world.afterEvents.playerSpawn.subscribe(event => {
            if (event.initialSpawn) {
                this.manager.loadPlayerData(event.player);
            }
        });
    }

    onPlayerLeave() {
        world.afterEvents.playerLeave.subscribe(event => {
            this.manager.savePlayerData(event.player);
        });
    }

    onScriptEvent() {
        system.afterEvents.scriptEventReceive.subscribe(event => {
            if (event.id !== 'mobwand:give') return;

            const player = event.sourceEntity;
            if (player?.typeId !== 'minecraft:player') return;

            this.manager.giveWand(player);
        }, { namespaces: ['mobwand'] });
    }
}
