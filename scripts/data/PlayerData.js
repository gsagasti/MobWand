import { Config } from '../config/Config.js';

export class PlayerData {
    constructor(playerId) {
        this.playerId = playerId;
        this.selectedMobs = [];
        this.lastPushTick = 0;
        this.isHoldingWand = false;
    }

    addMob(mobTypeId) {
        if (this.selectedMobs.includes(mobTypeId)) return false;
        if (this.selectedMobs.length >= Config.MAX_MOBS) return false;

        this.selectedMobs.push(mobTypeId);
        return true;
    }

    removeMob(mobTypeId) {
        const index = this.selectedMobs.indexOf(mobTypeId);
        if (index === -1) return false;

        this.selectedMobs.splice(index, 1);
        return true;
    }

    hasMob(mobTypeId) {
        return this.selectedMobs.includes(mobTypeId);
    }

    isFull() {
        return this.selectedMobs.length >= Config.MAX_MOBS;
    }

    isEmpty() {
        return this.selectedMobs.length === 0;
    }

    canPush(currentTick) {
        return currentTick - this.lastPushTick >= Config.PUSH_COOLDOWN;
    }

    updatePushTick(tick) {
        this.lastPushTick = tick;
    }

    onWandEquipped() {
        this.lastPushTick = 0;
    }

    updateWandState(isHolding) {
        const justEquipped = !this.isHoldingWand && isHolding;
        this.isHoldingWand = isHolding;

        if (justEquipped) {
            this.onWandEquipped();
        }
    }

    // serialize pData for storage
    toJSON() {
        return { selectedMobs: this.selectedMobs };
    }

    fromJSON(data) {
        this.selectedMobs = data.selectedMobs || [];
    }
}
