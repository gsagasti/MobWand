import { world, system, EntityComponentTypes } from '@minecraft/server';
import { WandValidator } from './WandValidator.js';

export class EventHandler {
    constructor(manager) {
        this.manager = manager;

        this.onEntityInteract();
        this.onItemUse();
        this.onPlayerSpawn();
        this.onPlayerLeave();
        this.onScriptEvent();
    }

    onEntityInteract() {
        world.beforeEvents.playerInteractWithEntity.subscribe(event => {
            const player = event.player;
            const item = event.itemStack;
            if (!WandValidator.isValid(item)) return;

            event.cancel = true;
            system.run(() => {
                this.manager.addMobToSelection(player, event.target.typeId);
            });
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
