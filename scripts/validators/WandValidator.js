import { ItemStack } from '@minecraft/server';
import { Config } from '../config/Config.js';

export class WandValidator {
    static isValid(item) {
        return item?.typeId === Config.WAND_ID && item?.nameTag === Config.WAND_NAME;
    }

    static create() {
        const item = new ItemStack(Config.WAND_ID, 1);
        item.nameTag = Config.WAND_NAME;
        item.setLore([Config.WAND_LORE]);
        return item;
    }
}
