import { ActionFormData } from '@minecraft/server-ui';
import { MobValidator } from './MobValidator.js';

export class UIManager {
    static show(player, playerData, onRemove) {
        if (playerData.isEmpty()) {
            player.sendMessage('§eNo mobs selected yet!');
            return;
        }

        const form = new ActionFormData();
        form.title('§6§lMobWand Selection');
        form.body('§7Right-click to remove a mob from selection');

        for (const mobType of playerData.selectedMobs) {
            const displayName = MobValidator.getMobDisplayName(mobType);
            const icon = MobValidator.getMobIcon(mobType);
            form.button(`${displayName}\n§7Click to remove`, icon);
        }

        form.show(player).then(response => {
            if (response.canceled || response.selection === undefined) return;

            const selectedMobType = playerData.selectedMobs[response.selection];
            if (selectedMobType) {
                onRemove(player, selectedMobType);
            }
        });
    }
}
