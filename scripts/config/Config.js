export class Config {
    static WAND_ID = 'minecraft:stick';
    static WAND_NAME = '§6§lMobWand';
    static WAND_LORE = '§7Right-click mobs to control them';
    static MAX_MOBS = 10;
    static PUSH_DISTANCE = 10;
    static PUSH_COOLDOWN = 60;
    static PARTICLE_TYPE = 'minecraft:villager_happy';
    static SOUND_TYPE = 'random.orb';

    static HOSTILE_MOBS = [
        'minecraft:zombie', 'minecraft:skeleton', 'minecraft:creeper', 'minecraft:spider',
        'minecraft:cave_spider', 'minecraft:enderman', 'minecraft:blaze', 'minecraft:ghast',
        'minecraft:magma_cube', 'minecraft:silverfish', 'minecraft:witch', 'minecraft:wither_skeleton',
        'minecraft:husk', 'minecraft:stray', 'minecraft:phantom', 'minecraft:drowned',
        'minecraft:pillager', 'minecraft:vindicator', 'minecraft:evoker', 'minecraft:ravager',
        'minecraft:vex', 'minecraft:zombie_villager', 'minecraft:endermite', 'minecraft:guardian',
        'minecraft:elder_guardian', 'minecraft:shulker', 'minecraft:piglin', 'minecraft:piglin_brute',
        'minecraft:hoglin', 'minecraft:zoglin', 'minecraft:warden', 'minecraft:slime',
        'minecraft:breeze', 'minecraft:bogged', 'minecraft:creaking'
    ];

    static MOB_ITEMS = {
        'minecraft:zombie': 'textures/items/rotten_flesh',
        'minecraft:skeleton': 'textures/items/bone',
        'minecraft:creeper': 'textures/items/gunpowder',
        'minecraft:spider': 'textures/items/spider_eye',
        'minecraft:cave_spider': 'textures/items/spider_eye',
        'minecraft:enderman': 'textures/items/ender_pearl',
        'minecraft:blaze': 'textures/items/blaze_rod',
        'minecraft:ghast': 'textures/items/ghast_tear',
        'minecraft:magma_cube': 'textures/items/magma_cream',
        'minecraft:silverfish': 'textures/items/stone',
        'minecraft:witch': 'textures/items/glowstone_dust',
        'minecraft:wither_skeleton': 'textures/items/coal',
        'minecraft:husk': 'textures/items/rotten_flesh',
        'minecraft:stray': 'textures/items/arrow',
        'minecraft:phantom': 'textures/items/phantom_membrane',
        'minecraft:drowned': 'textures/items/trident',
        'minecraft:pillager': 'textures/items/arrow',
        'minecraft:vindicator': 'textures/items/iron_axe',
        'minecraft:evoker': 'textures/items/totem',
        'minecraft:ravager': 'textures/items/saddle',
        'minecraft:vex': 'textures/items/iron_sword',
        'minecraft:zombie_villager': 'textures/items/golden_apple',
        'minecraft:endermite': 'textures/items/ender_pearl',
        'minecraft:guardian': 'textures/items/prismarine_shard',
        'minecraft:elder_guardian': 'textures/items/prismarine_crystals',
        'minecraft:shulker': 'textures/items/shulker_shell',
        'minecraft:piglin': 'textures/items/gold_ingot',
        'minecraft:piglin_brute': 'textures/items/gold_ingot',
        'minecraft:hoglin': 'textures/items/porkchop_raw',
        'minecraft:zoglin': 'textures/items/beef_raw',
        'minecraft:warden': 'textures/items/recovery_compass_16',
        'minecraft:slime': 'textures/items/slimeball',
        'minecraft:breeze': 'textures/items/breeze_rod',
        'minecraft:bogged': 'textures/items/arrow',
        'minecraft:creaking': 'textures/items/resin_brick'
    };
}
