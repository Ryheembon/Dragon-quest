document.addEventListener('DOMContentLoaded', () => {
    // Game elements
    const storyText = document.getElementById('story-text');
    const choicesContainer = document.getElementById('choices');
    const sceneImage = document.getElementById('scene-image');
    const healthDisplay = document.getElementById('health');
    const goldDisplay = document.getElementById('gold');
    const itemsDisplay = document.getElementById('items');
    const inventoryItems = document.getElementById('inventory-items');
    const restartBtn = document.getElementById('restart-btn');
    const soundToggle = document.getElementById('sound-toggle');
    const loadingScreen = document.getElementById('loading-screen');
    const loadingBar = document.getElementById('loading-bar');
    const gameContainer = document.getElementById('game-container');
    const saveBtn = document.getElementById('save-btn');
    const loadBtn = document.getElementById('load-btn');

    // Game state
    let gameState = {
        health: 100,
        gold: 0,
        inventory: [],
        currentScene: 'start',
        soundOn: true,
        playerName: ""
    };

    // Scene images URLs (using placeholder images)
    const sceneImages = {
        start: 'https://images.unsplash.com/photo-1518709414768-a88981a4515d?q=80&w=1000',
        forest: 'https://images.unsplash.com/photo-1448375240586-882707db888b?q=80&w=1000',
        cave: 'https://images.unsplash.com/photo-1525558293962-d7a9f2fc8046?q=80&w=1000',
        village: 'https://images.unsplash.com/photo-1533757114113-02150e3383c3?q=80&w=1000',
        castle: 'https://images.unsplash.com/photo-1533757065985-0b632c8122f5?q=80&w=1000',
        mountain: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=1000',
        beach: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1000',
        battle: 'https://images.unsplash.com/photo-1626618012641-bfbca5a31239?q=80&w=1000',
        treasure: 'https://images.unsplash.com/photo-1536242918817-db5e13e5ad30?q=80&w=1000',
        dragon: 'https://images.unsplash.com/photo-1577493340887-b7bfff550145?q=80&w=1000',
        end: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=1000',
        // New scene images
        forestDeep: 'https://images.unsplash.com/photo-1502082553048-f009c37129b9?q=80&w=1000',
        forestShrine: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?q=80&w=1000',
        villageTavern: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?q=80&w=1000',
        villageMarket: 'https://images.unsplash.com/photo-1519055548599-6d4d129508c4?q=80&w=1000',
        villageElder: 'https://images.unsplash.com/photo-1508440767412-59ce0b206bbc?q=80&w=1000',
        caveEntrance: 'https://images.unsplash.com/photo-1504438190342-5951e134ffee?q=80&w=1000',
        caveTroll: 'https://images.unsplash.com/photo-1559128010-7c1ad6e1b6a5?q=80&w=1000',
        caveIceCrystal: 'https://images.unsplash.com/photo-1518128958364-65859d70aa41?q=80&w=1000',
        caveRight: 'https://images.unsplash.com/photo-1556244573-c3686c0f0e78?q=80&w=1000',
        mountainPath: 'https://images.unsplash.com/photo-1483728642387-6c3bdd6c93e5?q=80&w=1000',
        mountainCamp: 'https://images.unsplash.com/photo-1504851149312-7a075b496cc7?q=80&w=1000',
        mountainAlternate: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?q=80&w=1000',
        mountainScout: 'https://images.unsplash.com/photo-1515798408724-1140eddcce13?q=80&w=1000',
        dragonLair: 'https://images.unsplash.com/photo-1548142813-c348350df52b?q=80&w=1000',
        dragonSteal: 'https://images.unsplash.com/photo-1558244402-286dd748c593?q=80&w=1000',
        dragonFight: 'https://images.unsplash.com/photo-1567613814045-a5263064590a?q=80&w=1000',
        temple: 'https://images.unsplash.com/photo-1500044869648-a7f72889adba?q=80&w=1000',
        ruins: 'https://images.unsplash.com/photo-1500475691904-9bbfa42cd67b?q=80&w=1000',
        swamp: 'https://images.unsplash.com/photo-1516528562665-dbe7ba66b203?q=80&w=1000',
        magicTower: 'https://images.unsplash.com/photo-1484278786775-527ac0d0b608?q=80&w=1000',
        elderCouncil: 'https://images.unsplash.com/photo-1543805526-e456ae3c9c0a?q=80&w=1000',
        ritualSite: 'https://images.unsplash.com/photo-1564415051543-cb73a7104912?q=80&w=1000',
        gameOver: 'https://images.unsplash.com/photo-1499781350541-7783f6c6a0c8?q=80&w=1000'
    };

    // Sound effects
    const sounds = {
        click: new Audio('https://freesound.org/data/previews/522/522640_5356475-lq.mp3'),
        success: new Audio('https://freesound.org/data/previews/456/456965_9482924-lq.mp3'),
        damage: new Audio('https://freesound.org/data/previews/331/331912_3248244-lq.mp3'),
        gold: new Audio('https://freesound.org/data/previews/416/416710_5121236-lq.mp3'),
        gameOver: new Audio('https://freesound.org/data/previews/321/321102_5648379-lq.mp3')
    };

    // Game scenes
    const scenes = {
        start: {
            text: "Welcome to Mystic Quest! You find yourself at a crossroads in the enchanted land of Eldoria. The kingdom has been shrouded in mysterious darkness since the Dragon's Eye gem was stolen from the Temple of Light. Rumors say the thief was a dragon, but others whisper of darker forces at work. Your quest begins here. Which path will you choose?",
            choices: [
                { text: "Enter the mysterious forest", nextScene: "forest" },
                { text: "Head towards the village", nextScene: "village" },
                { text: "Explore the dark cave", nextScene: "cave" },
                { text: "Climb the distant mountain", nextScene: "mountain" },
                { text: "Investigate the ancient ruins", nextScene: "ruins" }
            ]
        },
        forest: {
            text: "The forest is thick with magic and mystery. As you walk deeper, you hear rustling in the bushes. Suddenly, a forest sprite appears and offers you a healing potion.",
            choices: [
                { text: "Accept the potion", nextScene: "forestAccept", item: "Healing Potion", effect: {health: 20} },
                { text: "Politely decline", nextScene: "forestDecline" },
                { text: "Ask about the Dragon's Eye", nextScene: "forestInquire" },
                { text: "Return to the crossroads", nextScene: "start" }
            ]
        },
        forestAccept: {
            text: "The sprite smiles and hands you a glowing vial. You carefully store it in your bag. 'This will heal your wounds in times of need,' the sprite says before disappearing into the forest.",
            choices: [
                { text: "Continue deeper into the forest", nextScene: "forestDeep" },
                { text: "Return to the crossroads", nextScene: "start" }
            ]
        },
        forestDecline: {
            text: "The sprite looks disappointed but nods understandingly. 'May your journey be safe,' it says before vanishing back into the foliage.",
            choices: [
                { text: "Continue deeper into the forest", nextScene: "forestDeep" },
                { text: "Return to the crossroads", nextScene: "start" }
            ]
        },
        forestInquire: {
            text: "The sprite's eyes widen at the mention of the Dragon's Eye. 'The gem you seek is guarded by the ancient dragon in the mountain caves. But beware, many have tried and failed to claim it.'",
            choices: [
                { text: "Ask for guidance", nextScene: "forestGuidance", item: "Forest Map", effect: {items: 1} },
                { text: "Thank the sprite and move on", nextScene: "forestDeep" },
                { text: "Return to the crossroads", nextScene: "start" }
            ]
        },
        forestGuidance: {
            text: "The sprite hands you an enchanted map. 'This will help you navigate the treacherous mountain paths. Good luck, brave one!' The sprite disappears in a shimmer of light.",
            choices: [
                { text: "Head to the mountains", nextScene: "mountain" },
                { text: "Continue exploring the forest", nextScene: "forestDeep" },
                { text: "Return to the crossroads", nextScene: "start" }
            ]
        },
        forestDeep: {
            text: "Deep in the forest, you discover an ancient shrine. Golden coins are scattered around it, offerings to the forest spirits. Do you take some of the gold?",
            choices: [
                { text: "Take the gold", nextScene: "forestGold", effect: {gold: 50, health: -10} },
                { text: "Leave the offerings alone", nextScene: "forestRespect", effect: {health: 10} },
                { text: "Pray at the shrine", nextScene: "forestPray", item: "Spirit Blessing", effect: {items: 1} },
                { text: "Return to the forest entrance", nextScene: "forest" }
            ]
        },
        forestGold: {
            text: "As you pocket the gold, you feel a sudden pain in your chest. The forest spirits are displeased with your greed. You've gained gold but lost some health.",
            choices: [
                { text: "Apologize to the spirits", nextScene: "forestApology", effect: {health: 5} },
                { text: "Leave the forest quickly", nextScene: "start" }
            ]
        },
        forestRespect: {
            text: "You respectfully leave the offerings untouched. As you turn to leave, you feel a warm energy flowing through you. The forest spirits have blessed you with vitality.",
            choices: [
                { text: "Continue to the mountain", nextScene: "mountain" },
                { text: "Visit the village", nextScene: "village" },
                { text: "Return to the crossroads", nextScene: "start" }
            ]
        },
        forestPray: {
            text: "You kneel at the shrine and offer a sincere prayer. A gentle breeze carries whispers of ancient wisdom to your ears. You feel a spiritual blessing that will protect you on your journey.",
            choices: [
                { text: "Continue to the mountain", nextScene: "mountain" },
                { text: "Visit the village", nextScene: "village" },
                { text: "Return to the crossroads", nextScene: "start" }
            ]
        },
        forestApology: {
            text: "You return the gold and offer a heartfelt apology. The pain subsides slightly, and you feel the forest's anger diminish. It's best to move on now.",
            choices: [
                { text: "Head to the mountain", nextScene: "mountain" },
                { text: "Go to the village", nextScene: "village" },
                { text: "Return to the crossroads", nextScene: "start" }
            ]
        },
        village: {
            text: "You arrive at a quaint village nestled in the valley. Villagers bustle about, and a market square teems with activity. An old merchant eyes you curiously from his stall.",
            choices: [
                { text: "Talk to the merchant", nextScene: "villageMerchant" },
                { text: "Visit the local tavern", nextScene: "villageTavern" },
                { text: "Speak with the village elder", nextScene: "villageElder" },
                { text: "Return to the crossroads", nextScene: "start" }
            ]
        },
        villageMerchant: {
            text: "'Ah, a traveler!' the merchant exclaims. 'I have rare items that might aid you on your journey. For a small price, of course.' He displays an array of curious artifacts.",
            choices: [
                { text: "Buy a sturdy shield (30 gold)", nextScene: "villageBuyShield", condition: {gold: 30}, item: "Shield", effect: {gold: -30, items: 1} },
                { text: "Purchase healing herbs (20 gold)", nextScene: "villageBuyHerbs", condition: {gold: 20}, item: "Healing Herbs", effect: {gold: -20, health: 30} },
                { text: "Ask about the Dragon's Eye", nextScene: "villageMerchantInfo" },
                { text: "Leave the market", nextScene: "village" }
            ]
        },
        villageBuyShield: {
            text: "You hand over the gold and receive a well-crafted shield. 'This will protect you from the fiercest of blows,' the merchant says with a grin.",
            choices: [
                { text: "Continue shopping", nextScene: "villageMerchant" },
                { text: "Explore the rest of the village", nextScene: "village" },
                { text: "Leave for the mountain", nextScene: "mountain" }
            ]
        },
        villageBuyHerbs: {
            text: "The merchant hands you a bundle of sweet-smelling herbs. 'Brew these in hot water when you're injured. They'll fix you right up!' You feel their healing power immediately.",
            choices: [
                { text: "Continue shopping", nextScene: "villageMerchant" },
                { text: "Explore the rest of the village", nextScene: "village" },
                { text: "Head back to the crossroads", nextScene: "start" }
            ]
        },
        villageMerchantInfo: {
            text: "The merchant's expression darkens. 'The Dragon's Eye? Many have sought it, few have returned. They say it's guarded by a fearsome dragon in the mountain caves. You'd be wise to prepare thoroughly before attempting such a quest.'",
            choices: [
                { text: "Ask how to prepare", nextScene: "villageMerchantAdvice" },
                { text: "Thank him and browse his wares", nextScene: "villageMerchant" },
                { text: "Leave the market", nextScene: "village" }
            ]
        },
        villageMerchantAdvice: {
            text: "'If you're serious about this quest, you'll need protection against dragon fire and sharp claws. My shield can help with the latter. For the former...' he pauses, 'seek the ice crystal in the dark cave. It might offer some resistance against the dragon's flames.'",
            choices: [
                { text: "Buy his shield (30 gold)", nextScene: "villageBuyShield", condition: {gold: 30}, item: "Shield", effect: {gold: -30, items: 1} },
                { text: "Thank him for the advice", nextScene: "village" },
                { text: "Head to the dark cave", nextScene: "cave" }
            ]
        },
        villageTavern: {
            text: "The tavern is warm and lively. Patrons laugh and share tales over mugs of ale. A group of adventurers in the corner catches your attention.",
            choices: [
                { text: "Join the adventurers", nextScene: "villageTavernAdventurers" },
                { text: "Listen to local gossip", nextScene: "villageTavernGossip" },
                { text: "Buy a round of drinks (10 gold)", nextScene: "villageTavernDrinks", condition: {gold: 10}, effect: {gold: -10} },
                { text: "Leave the tavern", nextScene: "village" }
            ]
        },
        villageTavernAdventurers: {
            text: "You approach the adventurers who welcome you to their table. They're discussing a recent expedition to the mountain caves. 'Lost two good men to traps and one to a cave troll,' a grizzled warrior says solemnly.",
            choices: [
                { text: "Ask about the Dragon's Eye", nextScene: "villageTavernDragonInfo" },
                { text: "Inquire about the cave trolls", nextScene: "villageTavernTrollInfo" },
                { text: "Thank them and return to the tavern", nextScene: "villageTavern" }
            ]
        },
        villageTavernDragonInfo: {
            text: "'The Dragon's Eye?' The warrior leans in. 'It's real alright. Saw it myself, glowing in the darkness of the deepest cave. But that dragon... it's not just some beast. It's ancient, cunning. You'll need more than just strength to defeat it.'",
            choices: [
                { text: "Ask what would help defeat it", nextScene: "villageTavernDragonAdvice", item: "Dragon Lore", effect: {items: 1} },
                { text: "Thank them for the information", nextScene: "villageTavern" },
                { text: "Leave for the mountain", nextScene: "mountain" }
            ]
        },
        villageTavernDragonAdvice: {
            text: "The warrior reaches into her pack and hands you a worn journal. 'Take this. It contains everything we've learned about the dragon. Its weaknesses, habits, everything.' You've gained valuable knowledge about your foe.",
            choices: [
                { text: "Thank them and buy a round (10 gold)", nextScene: "villageTavernThanks", condition: {gold: 10}, effect: {gold: -10} },
                { text: "Leave for the mountain now", nextScene: "mountain" },
                { text: "Return to the village", nextScene: "village" }
            ]
        },
        cave: {
            text: "The cave entrance looms before you, dark and foreboding. Cold air rushes out from the depths, carrying an eerie whisper. Your torch casts dancing shadows on the rough walls.",
            choices: [
                { text: "Enter cautiously", nextScene: "caveEntrance" },
                { text: "Search around the entrance", nextScene: "caveSearch", item: "Torch", effect: {items: 1} },
                { text: "Return to the crossroads", nextScene: "start" }
            ]
        },
        caveEntrance: {
            text: "As you venture deeper, the cave splits into two passages. The left path slopes downward into darkness, while the right path seems to glitter with some kind of mineral.",
            choices: [
                { text: "Take the left path", nextScene: "caveLeft" },
                { text: "Take the right path", nextScene: "caveRight" },
                { text: "Go back to the entrance", nextScene: "cave" }
            ]
        },
        caveSearch: {
            text: "Your search reveals an additional torch and some flint hidden under a rock. You add them to your inventory, ensuring you won't be left in darkness.",
            choices: [
                { text: "Enter the cave", nextScene: "caveEntrance" },
                { text: "Return to the crossroads", nextScene: "start" }
            ]
        },
        caveLeft: {
            text: "The path descends steeply. The air grows colder, and you hear the distant sound of flowing water. Suddenly, a low growl echoes from the shadows ahead.",
            choices: [
                { text: "Proceed with caution", nextScene: "caveTroll" },
                { text: "Hide and observe", nextScene: "caveObserve" },
                { text: "Retreat to the fork", nextScene: "caveEntrance" }
            ]
        },
        caveTroll: {
            text: "You come face to face with a cave troll! The massive creature roars, raising its club to attack. You must act quickly!",
            choices: [
                { text: "Fight the troll", nextScene: "caveTrollFight", effect: {health: -30} },
                { text: "Try to sneak past", nextScene: "caveTrollSneak", effect: {health: -15} },
                { text: "Use an item", nextScene: "caveTrollItem", condition: {items: 1} },
                { text: "Retreat hastily", nextScene: "caveEntrance", effect: {health: -10} }
            ]
        },
        caveTrollFight: {
            text: "You engage the troll in combat! Though you manage to defeat it, you sustain significant injuries in the process. Beyond the troll's lair, you discover a chamber with a glowing blue crystal - the Ice Crystal!",
            choices: [
                { text: "Take the Ice Crystal", nextScene: "caveIceCrystal", item: "Ice Crystal", effect: {items: 1} },
                { text: "Search the troll's lair", nextScene: "caveTrollLair", effect: {gold: 40} },
                { text: "Leave the way you came", nextScene: "caveEntrance" }
            ]
        },
        caveIceCrystal: {
            text: "As you grasp the Ice Crystal, a wave of cold energy flows through you. This powerful artifact will surely help against the dragon's fiery breath!",
            choices: [
                { text: "Head to the mountain", nextScene: "mountain" },
                { text: "Return to the village", nextScene: "village" },
                { text: "Explore the right path", nextScene: "caveRight" }
            ]
        },
        mountain: {
            text: "The mountain path winds upward, becoming steeper and more treacherous. Far above, dark clouds gather around the peak, occasionally lit by flashes of what might be lightning... or dragon fire.",
            choices: [
                { text: "Climb the main path", nextScene: "mountainPath" },
                { text: "Look for an alternate route", nextScene: "mountainAlternate" },
                { text: "Set up camp and rest", nextScene: "mountainCamp", effect: {health: 20} },
                { text: "Return to the crossroads", nextScene: "start" }
            ]
        },
        mountainPath: {
            text: "The climb is arduous. Loose rocks give way beneath your feet, and the wind howls around you. As you near the summit, you spot the entrance to a large cave. Scorch marks surround the opening.",
            choices: [
                { text: "Enter the dragon's lair", nextScene: "dragonLair" },
                { text: "Scout the area first", nextScene: "mountainScout" },
                { text: "Retreat down the mountain", nextScene: "mountain" }
            ]
        },
        dragonLair: {
            text: "The cave is vast and filled with the scent of sulfur. Piles of treasure gleam in the dim light, but your attention is drawn to the massive form sleeping atop the largest pile - the dragon itself, with a glowing crystal embedded in its forehead that must be the legendary Dragon's Eye.",
            choices: [
                { text: "Attempt to steal the gem silently", nextScene: "dragonSteal" },
                { text: "Challenge the dragon directly", nextScene: "dragonChallenge" },
                { text: "Use your items", nextScene: "dragonItems", condition: {items: 3} },
                { text: "Show the Serpent's Tongue", nextScene: "dragonTongue", condition: {items: 6} },
                { text: "Retreat while you can", nextScene: "mountainPath" }
            ]
        },
        dragonSteal: {
            text: "You creep carefully toward the sleeping dragon. Just as your fingers brush against the glowing gem, the dragon's eye snaps open! 'Thief!' it roars, flames licking at its jaws.",
            choices: [
                { text: "Fight for your life!", nextScene: "dragonFight", effect: {health: -50} },
                { text: "Use your items", nextScene: "dragonItems", condition: {items: 2} },
                { text: "Run for the exit", nextScene: "dragonEscape", effect: {health: -30} }
            ]
        },
        dragonItems: {
            text: "Drawing on all your gathered resources, you combine the Ice Crystal's power with your knowledge of dragon lore. The crystal glows intensely, projecting a shield of cold energy as you approach. The dragon recoils from the icy aura!",
            choices: [
                { text: "Negotiate with the dragon", nextScene: "dragonNegotiate" },
                { text: "Use this advantage to attack", nextScene: "dragonAdvantage", effect: {health: -20} }
            ]
        },
        dragonNegotiate: {
            text: "'Impressive, mortal,' the dragon rumbles. 'Few have come prepared as you have.' It regards you with newfound respect. 'What do you seek from Zoralth the Ancient?'",
            choices: [
                { text: "Request the Dragon's Eye", nextScene: "dragonRequest" },
                { text: "Ask for a portion of treasure", nextScene: "dragonTreasure", effect: {gold: 100} },
                { text: "Seek knowledge instead", nextScene: "dragonKnowledge" }
            ]
        },
        dragonRequest: {
            text: "The dragon considers your request. 'The Eye is part of me, but I sense your heart is true. I will offer you a choice: take a shard of the Eye, which holds much of its power but will allow me to live, or attempt to take it all and face my wrath.'",
            choices: [
                { text: "Accept the shard", nextScene: "dragonShard", item: "Dragon's Eye Shard", effect: {items: 1} },
                { text: "Demand the whole gem", nextScene: "dragonDemand", effect: {health: -70} }
            ]
        },
        dragonShard: {
            text: "The dragon carefully extracts a brilliant shard from the larger gem. 'Use it wisely,' it says as the crystal floats into your hands. 'It connects to all magical energies in Eldoria.'",
            choices: [
                { text: "Thank the dragon and leave", nextScene: "end" }
            ]
        },
        end: {
            text: "Congratulations! You have completed your quest with wisdom and courage. The Dragon's Eye Shard pulses with ancient magic in your possession, its power yours to command. Your name will be remembered in the legends of Eldoria!",
            choices: [
                { text: "Play Again", nextScene: "restart" }
            ]
        },
        villageElder: {
            text: "The village elder sits outside a modest hut adorned with mystical symbols. Her eyes, clouded with age, somehow seem to see right through you. 'I have been expecting someone to come seeking the truth about the Dragon's Eye,' she says softly.",
            choices: [
                { text: "Ask about the Dragon's Eye", nextScene: "villageElderInfo" },
                { text: "Inquire about her visions", nextScene: "villageElderVisions" },
                { text: "Request her blessing", nextScene: "villageElderBlessing", effect: {health: 15} },
                { text: "Return to the village", nextScene: "village" }
            ]
        },
        villageElderInfo: {
            text: "'The Dragon's Eye is not what you think,' the elder says with a grave expression. 'It is one of three ancient artifacts that maintain the balance of our world. The Dragon accused of stealing it is Zoralth, but he is a guardian, not a thief. Something else is at work here – darker forces seek to break the seals between worlds.'",
            choices: [
                { text: "Ask about the darker forces", nextScene: "villageElderDarkness" },
                { text: "Inquire about the other artifacts", nextScene: "villageElderArtifacts" },
                { text: "Thank her and leave", nextScene: "village" }
            ]
        },
        villageElderDarkness: {
            text: "The elder's voice drops to a whisper. 'The Void Cult seeks to summon their master from beyond the veil. They need the three artifacts - the Dragon's Eye, the Serpent's Tongue, and the Phoenix Feather. They already have the Feather. You must find the Eye before they do, and protect the Tongue which lies hidden in the Temple of Light.'",
            choices: [
                { text: "Ask where to find the Temple", nextScene: "villageElderTemple", item: "Temple Map", effect: {items: 1} },
                { text: "Inquire about the Void Cult", nextScene: "villageElderCult" },
                { text: "Head to the mountain to find Zoralth", nextScene: "mountain" }
            ]
        },
        villageElderTemple: {
            text: "The elder draws a map on a piece of parchment. 'The Temple of Light lies beyond the swamps to the east. Few know of its existence, and fewer still can find their way through the treacherous swamps. Take this map and guard it well. But be warned - the temple's guardians will not welcome you without proof of your intentions.'",
            choices: [
                { text: "Ask what proof you need", nextScene: "villageElderProof" },
                { text: "Thank her and head to the swamps", nextScene: "swamp" },
                { text: "Return to the village", nextScene: "village" }
            ]
        },
        villageElderProof: {
            text: "'Seek the Crystal of Truth in the Mage's Tower. It will reveal your heart's true intentions to the temple guardians. But the tower has been sealed for decades, and only a magical key can open its doors. The blacksmith's daughter - she knows more than she lets on about such magical artifacts.'",
            choices: [
                { text: "Seek out the blacksmith's daughter", nextScene: "villageBlacksmith" },
                { text: "Head to the Mage's Tower", nextScene: "magicTower" },
                { text: "Thank the elder and leave", nextScene: "village" }
            ]
        },
        villageBlacksmith: {
            text: "The blacksmith's forge glows with intense heat as you approach. A young woman with fiery red hair hammers at a piece of metal, sparks flying with each strike. She notices you and stops her work. 'The elder sent you, didn't she? About the tower key?' She sighs and wipes her brow.",
            choices: [
                { text: "Ask about the key", nextScene: "villageBlacksmithKey" },
                { text: "Ask how she knows about magic", nextScene: "villageBlacksmithMagic" },
                { text: "Leave and return to the village", nextScene: "village" }
            ]
        },
        villageBlacksmithKey: {
            text: "'The key was my mother's. She was a mage before she married my father. She hid it away before she... before the Void Cult took her.' Her eyes flash with anger. 'I can give you the key, but you must promise to stop them. They cannot be allowed to complete their ritual.'",
            choices: [
                { text: "Promise to stop the cult", nextScene: "villageBlacksmithPromise", item: "Magic Tower Key", effect: {items: 1} },
                { text: "Ask more about her mother", nextScene: "villageBlacksmithMother" },
                { text: "Thank her and return to the village", nextScene: "village" }
            ]
        },
        villageBlacksmithPromise: {
            text: "She reaches beneath her shirt and pulls out a crystal key hanging from a chain. 'This will open the tower door. The Crystal of Truth is on the highest floor. Be careful - my mother's protections still guard the tower, and they won't distinguish friend from foe.' She hands you the key with determined eyes.",
            choices: [
                { text: "Head to the Mage's Tower", nextScene: "magicTower" },
                { text: "Go to the Temple of Light", nextScene: "swamp" },
                { text: "Return to the village center", nextScene: "village" }
            ]
        },
        magicTower: {
            text: "The Mage's Tower stands tall against the twilight sky, its windows dark and uninviting. As you approach, you feel a magical pressure pushing against you. The door is sealed with arcane symbols that glow faintly blue. The crystal key in your hand pulses in response.",
            choices: [
                { text: "Use the key on the door", nextScene: "magicTowerEntrance", condition: {items: 4} },
                { text: "Examine the magical symbols", nextScene: "magicTowerSymbols" },
                { text: "Return to the village", nextScene: "village" }
            ]
        },
        magicTowerEntrance: {
            text: "The crystal key fits perfectly into an invisible keyhole. As you turn it, the arcane symbols flare brightly and the heavy door swings open silently. Inside, you see a spiral staircase illuminated by floating orbs of magical light that activate as you enter.",
            choices: [
                { text: "Climb the staircase", nextScene: "magicTowerStairs" },
                { text: "Examine the ground floor", nextScene: "magicTowerGround" },
                { text: "Leave the tower", nextScene: "magicTowerExit" }
            ]
        },
        magicTowerStairs: {
            text: "As you climb the winding stairs, you pass floors filled with abandoned magical implements, dusty tomes, and dormant artifacts. The protective enchantments recognize the key's magic and allow you passage. At the top floor, you find a single room with a pedestal at its center, holding a clear crystal that seems to contain swirling mist.",
            choices: [
                { text: "Take the Crystal of Truth", nextScene: "magicTowerCrystal", item: "Crystal of Truth", effect: {items: 1} },
                { text: "Examine the room further", nextScene: "magicTowerRoom" },
                { text: "Descend the stairs", nextScene: "magicTowerEntrance" }
            ]
        },
        magicTowerCrystal: {
            text: "As your fingers touch the Crystal of Truth, it glows brilliantly, responding to your intentions. Images flash within its depths - your journey, your purpose, your heart's desire to restore balance. The crystal attunes to you, becoming a testament to your true purpose that the Temple guardians will recognize.",
            choices: [
                { text: "Head to the Temple of Light", nextScene: "swamp" },
                { text: "Return to the village elder", nextScene: "villageElder" },
                { text: "Seek out Zoralth in the mountains", nextScene: "mountain" }
            ]
        },
        swamp: {
            text: "The eastern swamps are a maze of twisted trees rising from murky waters. Mist clings to the surface, obscuring your path. Strange sounds echo through the gloom - croaks, splashes, and occasionally what sounds like whispers. Without the elder's map, you would surely be lost.",
            choices: [
                { text: "Follow the map carefully", nextScene: "swampPath" },
                { text: "Take a detour toward strange lights", nextScene: "swampLights" },
                { text: "Return to safer ground", nextScene: "start" }
            ]
        },
        swampPath: {
            text: "The map guides you along barely visible paths of solid ground. Hours pass as you navigate the treacherous terrain. Suddenly, the mist parts to reveal ancient stone pillars rising from the swamp waters. They form a path leading to a small island on which stands a magnificent white temple glowing with soft golden light.",
            choices: [
                { text: "Approach the temple", nextScene: "templeEntrance" },
                { text: "Scout the area first", nextScene: "templeScout" },
                { text: "Return to the swamp entrance", nextScene: "swamp" }
            ]
        },
        templeEntrance: {
            text: "The Temple of Light is constructed of gleaming white stone that seems to radiate its own gentle illumination. Two robed guardians stand before massive golden doors, their faces serene but their eyes watchful. They raise their hands as you approach, signaling you to halt.",
            choices: [
                { text: "Show them the Crystal of Truth", nextScene: "templeWelcome", condition: {items: 5} },
                { text: "Explain your mission", nextScene: "templeExplain" },
                { text: "Retreat to the swamp", nextScene: "swampPath" }
            ]
        },
        templeWelcome: {
            text: "You hold up the Crystal of Truth, which pulses with brilliant light in the temple's presence. The guardians' expressions soften as they witness the crystal's reaction to you. 'The crystal has judged your heart true,' one says. 'Enter, seeker, and speak with the High Priestess about what you seek.'",
            choices: [
                { text: "Enter the temple", nextScene: "templeInterior" },
                { text: "Ask about the Serpent's Tongue", nextScene: "templeInquire" }
            ]
        },
        templeInterior: {
            text: "The temple interior is a vast hall supported by columns of white marble veined with gold. Light filters through crystal windows, creating patterns on the polished floor. At the far end, a woman in flowing white and gold robes stands before an altar. She turns to face you, her eyes ancient and wise.",
            choices: [
                { text: "Approach the High Priestess", nextScene: "templePriestess" },
                { text: "Examine the temple murals", nextScene: "templeMurals" },
                { text: "Look around for the artifact", nextScene: "templeSearch" }
            ]
        },
        templePriestess: {
            text: "'I am Sellara, High Priestess of Light,' the woman says in a melodious voice. 'You come at a time of great darkness. The balance falters, and the veil between worlds grows thin. You seek the Serpent's Tongue to prevent catastrophe, do you not?'",
            choices: [
                { text: "Confirm your mission", nextScene: "templeMission" },
                { text: "Ask how she knows", nextScene: "templeKnowledge" },
                { text: "Ask to see the artifact", nextScene: "templeArtifact" }
            ]
        },
        templeMission: {
            text: "'Your purpose is noble, but I fear you may be too late. The Void Cult's leader, Magister Vex, has already attempted to breach our defenses once. We moved the Serpent's Tongue to the Inner Sanctum, but our divinations show darkness approaching once more. We must prepare you if you are to face what comes.'",
            choices: [
                { text: "Ask about preparation", nextScene: "templePreparation" },
                { text: "Warn about an imminent attack", nextScene: "templeWarning" },
                { text: "Request to see the artifact immediately", nextScene: "templeUrgent" }
            ]
        },
        templePreparation: {
            text: "The High Priestess leads you to a chamber where sacred waters flow from a spring. 'Bathe in these waters. They will cleanse and strengthen your spirit for the trials ahead.' As you do so, a warm energy flows through you, clearing your mind and reinvigorating your body.",
            choices: [
                { text: "Thank her and ask to see the artifact", nextScene: "templeArtifact" },
                { text: "Ask about Magister Vex", nextScene: "templeVex" }
            ],
            effect: {health: 50}
        },
        templeArtifact: {
            text: "'Come,' the priestess says, leading you deeper into the temple. You descend a spiral staircase to the Inner Sanctum, a circular chamber with a pedestal at its center. On it lies a curved object that resembles a serpent's tongue, crafted from metal that shifts colors as you watch. But as you approach, a tremendous boom shakes the temple foundations.",
            choices: [
                { text: "Ask what's happening", nextScene: "templeAttack" },
                { text: "Grab the artifact quickly", nextScene: "templeGrab" }
            ]
        },
        templeAttack: {
            text: "The priestess's face pales. 'They are here! The Void Cult attacks sooner than we foresaw!' Another explosion rocks the temple. 'You must take the Serpent's Tongue and flee! Find Zoralth - together with the Dragon's Eye, you may yet stop the ritual. We will hold them off as long as we can!'",
            choices: [
                { text: "Take the artifact and run", nextScene: "templeEscape", item: "Serpent's Tongue", effect: {items: 1} },
                { text: "Stay and help defend the temple", nextScene: "templeDefend" }
            ]
        },
        templeEscape: {
            text: "With the Serpent's Tongue secured, you race back up the stairs. The temple is in chaos - cultists in dark robes battle the temple guardians while a tall figure in elaborate robes directs the assault. You manage to slip past the fighting and escape into the swamp, the sounds of battle fading behind you.",
            choices: [
                { text: "Head to the mountains to find Zoralth", nextScene: "mountain" },
                { text: "Return to the village for help", nextScene: "village" }
            ]
        },
        ruins: {
            text: "The ancient ruins stand silent under the open sky, crumbling walls and toppled columns telling of a civilization long forgotten. As you wander through the remnants of grand halls and courtyards, you notice strange symbols carved into the stone - similar to those mentioned in tales of the Void Cult.",
            choices: [
                { text: "Examine the symbols closer", nextScene: "ruinsSymbols" },
                { text: "Explore deeper into the ruins", nextScene: "ruinsDeep" },
                { text: "Search for valuable artifacts", nextScene: "ruinsTreasure" },
                { text: "Leave the ruins", nextScene: "start" }
            ]
        },
        ruinsSymbols: {
            text: "The symbols depict a ritual involving three artifacts arrayed around a central point, with figures channeling energy through them. Below this image is a warning in ancient text that you can partially decipher: 'When the three keys are united, the veil will tear, and that which waits beyond will enter our world.'",
            choices: [
                { text: "Make notes of the symbols", nextScene: "ruinsNotes", item: "Ritual Notes", effect: {items: 1} },
                { text: "Search for more information", nextScene: "ruinsSearch" },
                { text: "Leave the ruins", nextScene: "start" }
            ]
        },
        dragonTongue: {
            text: "You present the Serpent's Tongue, which glows in proximity to the sleeping dragon. The dragon's eye snaps open instantly, but upon seeing the artifact, its demeanor changes from aggression to grave concern. 'You possess the Tongue... Then the Temple has fallen, or soon will. Speak quickly, mortal.'",
            choices: [
                { text: "Explain about the Void Cult", nextScene: "dragonAlliance" },
                { text: "Ask about the Dragon's Eye", nextScene: "dragonExplain" },
                { text: "Demand the Eye for safekeeping", nextScene: "dragonDemand" }
            ]
        },
        dragonAlliance: {
            text: "'The Void Cult grows bolder than I feared,' Zoralth rumbles, rising to his full height. 'I did not steal the Eye as they claim - I am its guardian, as I have been for millennia. If they have the Phoenix Feather and now seek the Tongue and Eye, then they intend to complete the forbidden ritual to summon their dark master.'",
            choices: [
                { text: "Propose an alliance", nextScene: "dragonPact" },
                { text: "Ask how to stop the ritual", nextScene: "dragonPlan" }
            ]
        },
        dragonPact: {
            text: "Zoralth considers you with ancient eyes. 'An alliance... it has been ages since I trusted a human, but these are desperate times. Together, we might prevent catastrophe. I cannot leave the Eye unprotected, but I can grant you a portion of its power to aid your fight against the Void Cult.'",
            choices: [
                { text: "Accept the dragon's power", nextScene: "dragonPower", effect: {health: 30}, item: "Dragon's Blessing" },
                { text: "Suggest a different approach", nextScene: "dragonStrategy" }
            ]
        },
        dragonPower: {
            text: "The dragon touches his claw gently to your forehead. A surge of energy flows through you as a fragment of the Dragon's Eye's power transfers to your being. Your vision sharpens, your muscles strengthen, and you can feel a new awareness of magical energies around you. 'Now we must prepare for their coming.'",
            choices: [
                { text: "Plan the defense of the lair", nextScene: "dragonDefense" },
                { text: "Suggest taking the fight to them", nextScene: "dragonOffensive" }
            ]
        },
        dragonDefense: {
            text: "'A wise choice,' Zoralth nods. 'My lair has natural defenses we can enhance. The narrow approach will funnel their forces, and with my fire and your newfound power, we stand a chance.' You spend hours preparing traps and reinforcing the cavern entrance, waiting for the inevitable assault.",
            choices: [
                { text: "Rest before the battle", nextScene: "dragonRest", effect: {health: 20} },
                { text: "Keep watch", nextScene: "cultAttack" }
            ]
        },
        cultAttack: {
            text: "Night falls, and with it comes the attack. Dark-robed figures scale the mountain path, led by Magister Vex himself. They carry the Phoenix Feather - a brilliant plume that burns with eternal fire. 'They come,' Zoralth growls, flames licking at his jaws. 'Remember, we cannot let them unite the artifacts.'",
            choices: [
                { text: "Stand with Zoralth at the entrance", nextScene: "finalBattle" },
                { text: "Hide and ambush them", nextScene: "finalAmbush" }
            ]
        },
        finalBattle: {
            text: "The battle is fierce. Cult members fall to dragon fire and your attacks, but Magister Vex proves a formidable foe, wielding dark magic with terrible skill. Through the chaos, he manages to break past your defenses and reach for the Dragon's Eye. This is the moment that will determine Eldoria's fate!",
            choices: [
                { text: "Intercept Vex", nextScene: "finalIntercept", effect: {health: -40} },
                { text: "Use the Serpent's Tongue's power", nextScene: "finalArtifact", condition: {items: 6} }
            ]
        },
        finalIntercept: {
            text: "You throw yourself at Magister Vex, disrupting his spell. He snarls in rage and blasts you with dark energy, but you endure through the pain. Zoralth seizes the opportunity to strike, catching Vex with a sweeping tail blow. The Phoenix Feather falls from his grasp, and without it, the cult's power falters.",
            choices: [
                { text: "Grab the Phoenix Feather", nextScene: "finalFeather", item: "Phoenix Feather", effect: {items: 1} },
                { text: "Attack Vex while he's vulnerable", nextScene: "finalStrike" }
            ]
        },
        finalFeather: {
            text: "You seize the Phoenix Feather, completing your collection of the ancient artifacts. Their combined power surges through you, not to tear the veil but to repair it. Magister Vex howls in defeat as his connection to the void entity is severed. The remaining cultists flee or surrender as their leader's power collapses.",
            choices: [
                { text: "Celebrate your victory", nextScene: "victoryEnd" }
            ]
        },
        victoryEnd: {
            text: "With the Void Cult defeated and all three artifacts secured, balance returns to Eldoria. Zoralth agrees to continue guarding the Dragon's Eye, while the Serpent's Tongue is returned to the Temple of Light under new guardianship. You keep the Phoenix Feather as a symbol of your role as Eldoria's protector. Your name will be sung in legends for generations to come!",
            choices: [
                { text: "Play Again", nextScene: "restart" }
            ]
        }
    };

    // Preload images functionality
    let imagesLoaded = 0;
    const totalImages = Object.keys(sceneImages).length;

    function preloadImages() {
        // Start with a slight delay for the loading animation to be visible
        setTimeout(() => {
            for (const key in sceneImages) {
                const img = new Image();
                img.src = sceneImages[key];
                img.onload = () => {
                    imagesLoaded++;
                    // Update loading bar
                    const progress = (imagesLoaded / totalImages) * 100;
                    loadingBar.style.width = `${progress}%`;
                    
                    if (imagesLoaded === totalImages) {
                        setTimeout(() => {
                            loadingScreen.style.display = 'none';
                            gameContainer.style.display = 'block';
                            // Try to load saved game
                            if (localStorage.getItem('mysticQuestSave')) {
                                loadBtn.classList.add('pulse');
                            }
                        }, 500); // Small delay to show 100% before hiding
                    }
                };
                img.onerror = () => {
                    // Handle image load errors
                    imagesLoaded++;
                    const progress = (imagesLoaded / totalImages) * 100;
                    loadingBar.style.width = `${progress}%`;
                    
                    if (imagesLoaded === totalImages) {
                        setTimeout(() => {
                            loadingScreen.style.display = 'none';
                            gameContainer.style.display = 'block';
                        }, 500);
                    }
                };
            }
        }, 1000); // 1 second delay to show loading screen
    }

    // Save and load functionality
    function saveGame() {
        localStorage.setItem('mysticQuestSave', JSON.stringify(gameState));
        
        // Show save notification
        const notification = document.createElement('div');
        notification.className = 'save-notification';
        notification.innerHTML = '<i class="fas fa-save"></i> Game Saved!';
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.classList.add('fade-in');
        }, 10);
        
        setTimeout(() => {
            notification.classList.remove('fade-in');
            notification.classList.add('fade-out');
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 500);
        }, 2000);
    }

    function loadGame() {
        const savedGame = localStorage.getItem('mysticQuestSave');
        if (savedGame) {
            gameState = JSON.parse(savedGame);
            updateStats();
            renderScene(gameState.currentScene);
            return true;
        }
        return false;
    }

    // Function to play sound effects
    function playSound(soundName) {
        if (gameState.soundOn && sounds[soundName]) {
            sounds[soundName].currentTime = 0;
            sounds[soundName].play().catch(error => console.log("Sound play error:", error));
        }
    }

    // Function to update player stats display
    function updateStats() {
        healthDisplay.textContent = gameState.health;
        goldDisplay.textContent = gameState.gold;
        itemsDisplay.textContent = gameState.inventory.length;
        
        // Clear and update inventory display
        inventoryItems.innerHTML = '';
        gameState.inventory.forEach(item => {
            const itemElement = document.createElement('div');
            itemElement.className = 'inventory-item';
            itemElement.innerHTML = `<i class="fas fa-gem"></i> ${item}`;
            itemElement.addEventListener('click', () => {
                showItemDetails(item);
            });
            inventoryItems.appendChild(itemElement);
        });
    }

    // Function to show item details
    function showItemDetails(item) {
        // Create a modal to display item info
        const modal = document.createElement('div');
        modal.className = 'item-modal';
        
        let itemDescription = "A mysterious item with unknown properties.";
        let itemIcon = "fas fa-gem";
        
        // Set description based on item type
        if (item.includes("Potion") || item.includes("Herbs")) {
            itemDescription = "A healing item that can restore your health in times of need.";
            itemIcon = "fas fa-flask";
        } else if (item.includes("Map")) {
            itemDescription = "A detailed map that will guide you through treacherous terrain.";
            itemIcon = "fas fa-map";
        } else if (item.includes("Shield")) {
            itemDescription = "A sturdy shield that offers protection from enemy attacks.";
            itemIcon = "fas fa-shield-alt";
        } else if (item.includes("Crystal") || item.includes("Eye") || item.includes("Tongue")) {
            itemDescription = "A powerful magical artifact that radiates ancient energy.";
            itemIcon = "fas fa-gem";
        } else if (item.includes("Blessing")) {
            itemDescription = "A divine blessing that enhances your abilities.";
            itemIcon = "fas fa-sun";
        } else if (item.includes("Key")) {
            itemDescription = "A key that unlocks sealed doors and hidden passages.";
            itemIcon = "fas fa-key";
        } else if (item.includes("Notes")) {
            itemDescription = "Important information that might be crucial to your quest.";
            itemIcon = "fas fa-scroll";
        }
        
        modal.innerHTML = `
            <div class="item-modal-content">
                <i class="${itemIcon} item-icon"></i>
                <h3>${item}</h3>
                <p>${itemDescription}</p>
                <button class="close-btn">Close</button>
            </div>
        `;
        
        document.body.appendChild(modal);
        
        // Close button functionality
        modal.querySelector('.close-btn').addEventListener('click', () => {
            modal.classList.add('fade-out');
            setTimeout(() => {
                document.body.removeChild(modal);
            }, 300);
        });
        
        // Close when clicking outside the modal content
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.classList.add('fade-out');
                setTimeout(() => {
                    document.body.removeChild(modal);
                }, 300);
            }
        });
        
        // Animation
        setTimeout(() => {
            modal.classList.add('show');
        }, 10);
    }

    // Function to render a scene
    function renderScene(sceneId) {
        const scene = scenes[sceneId];
        if (!scene) return;

        // Update current scene
        gameState.currentScene = sceneId;
        
        // Set scene text
        storyText.innerHTML = '';
        storyText.classList.remove('fade-in');
        void storyText.offsetWidth; // Trigger reflow for animation reset
        storyText.classList.add('fade-in');
        storyText.textContent = scene.text;
        
        // Set scene image
        if (sceneImages[sceneId]) {
            sceneImage.style.backgroundImage = `url(${sceneImages[sceneId]})`;
        } else {
            // Default image if specific one isn't available
            sceneImage.style.backgroundImage = `url(${sceneImages.start})`;
        }
        
        // Clear and create choice buttons
        choicesContainer.innerHTML = '';
        scene.choices.forEach(choice => {
            // Check if choice should be disabled due to conditions
            let isDisabled = false;
            if (choice.condition) {
                if (choice.condition.gold && gameState.gold < choice.condition.gold) {
                    isDisabled = true;
                }
                if (choice.condition.health && gameState.health < choice.condition.health) {
                    isDisabled = true;
                }
                if (choice.condition.items && gameState.inventory.length < choice.condition.items) {
                    isDisabled = true;
                }
            }
            
            const button = document.createElement('button');
            button.className = `choice-btn ${isDisabled ? 'disabled' : ''}`;
            button.textContent = choice.text;
            button.disabled = isDisabled;
            
            if (isDisabled) {
                // Add tooltip for disabled buttons
                button.setAttribute('data-tooltip', 'You do not meet the requirements for this choice');
            }
            
            button.addEventListener('click', () => {
                playSound('click');
                
                // Apply effects if any
                if (choice.effect) {
                    if (choice.effect.health) {
                        gameState.health += choice.effect.health;
                        if (choice.effect.health < 0) {
                            playSound('damage');
                            showEffect('-' + Math.abs(choice.effect.health), 'health');
                        } else {
                            playSound('success');
                            showEffect('+' + choice.effect.health, 'health');
                        }
                    }
                    if (choice.effect.gold) {
                        gameState.gold += choice.effect.gold;
                        if (choice.effect.gold > 0) {
                            playSound('gold');
                            showEffect('+' + choice.effect.gold, 'gold');
                        } else {
                            showEffect('-' + Math.abs(choice.effect.gold), 'gold');
                        }
                    }
                }
                
                // Add item to inventory if provided
                if (choice.item && !gameState.inventory.includes(choice.item)) {
                    gameState.inventory.push(choice.item);
                    playSound('success');
                    showItemAcquired(choice.item);
                }
                
                // Check if game is over due to health
                if (gameState.health <= 0) {
                    playSound('gameOver');
                    gameState.health = 0;
                    renderGameOver();
                    return;
                }
                
                // Update stats and render next scene
                updateStats();
                
                // Special restart case
                if (choice.nextScene === 'restart') {
                    resetGame();
                    return;
                }
                
                renderScene(choice.nextScene);
            });
            
            choicesContainer.appendChild(button);
        });
    }

    // Function to show visual effects for stat changes
    function showEffect(value, type) {
        const effect = document.createElement('div');
        effect.className = `floating-effect ${type}-effect`;
        effect.textContent = value;
        
        if (type === 'health') {
            healthDisplay.parentElement.appendChild(effect);
        } else if (type === 'gold') {
            goldDisplay.parentElement.appendChild(effect);
        }
        
        setTimeout(() => {
            effect.classList.add('animate');
            setTimeout(() => {
                effect.parentElement.removeChild(effect);
            }, 1000);
        }, 10);
    }

    // Function to show item acquisition
    function showItemAcquired(item) {
        const notification = document.createElement('div');
        notification.className = 'item-notification';
        notification.innerHTML = `<i class="fas fa-gem"></i> Acquired: ${item}`;
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.classList.add('show');
            setTimeout(() => {
                notification.classList.remove('show');
                notification.classList.add('hide');
                setTimeout(() => {
                    document.body.removeChild(notification);
                }, 500);
            }, 2500);
        }, 10);
    }

    // Function to render game over screen
    function renderGameOver() {
        storyText.innerHTML = '<h2>Game Over</h2><p>Your health has reached zero. Your quest ends here.</p>';
        sceneImage.style.backgroundImage = `url(${sceneImages.end})`;
        sceneImage.classList.add('game-over');
        
        choicesContainer.innerHTML = '';
        const restartButton = document.createElement('button');
        restartButton.className = 'choice-btn';
        restartButton.textContent = 'Try Again';
        restartButton.addEventListener('click', () => {
            resetGame();
        });
        
        choicesContainer.appendChild(restartButton);
    }

    // Function to reset the game
    function resetGame() {
        gameState = {
            health: 100,
            gold: 0,
            inventory: [],
            currentScene: 'start',
            soundOn: gameState.soundOn,
            playerName: gameState.playerName
        };
        
        sceneImage.classList.remove('game-over');
        updateStats();
        renderScene('start');
    }

    // Event listeners
    restartBtn.addEventListener('click', () => {
        playSound('click');
        if (confirm('Are you sure you want to restart? All progress will be lost.')) {
            resetGame();
        }
    });
    
    soundToggle.addEventListener('click', () => {
        gameState.soundOn = !gameState.soundOn;
        soundToggle.className = gameState.soundOn ? 'fas fa-volume-up' : 'fas fa-volume-mute';
    });
    
    saveBtn.addEventListener('click', () => {
        playSound('click');
        saveGame();
    });
    
    loadBtn.addEventListener('click', () => {
        playSound('click');
        if (loadGame()) {
            loadBtn.classList.remove('pulse');
        } else {
            alert('No saved game found!');
        }
    });

    // Add CSS for new elements
    const style = document.createElement('style');
    style.textContent = `
        .floating-effect {
            position: absolute;
            font-weight: bold;
            animation: floatUp 1s forwards;
            opacity: 0;
            pointer-events: none;
        }
        
        .health-effect {
            color: var(--health-color);
        }
        
        .gold-effect {
            color: var(--gold-color);
        }
        
        @keyframes floatUp {
            0% { transform: translateY(0); opacity: 0; }
            10% { opacity: 1; }
            90% { opacity: 1; }
            100% { transform: translateY(-20px); opacity: 0; }
        }
        
        .item-notification {
            position: fixed;
            top: 20px;
            right: 20px;
            background-color: var(--secondary-color);
            color: var(--text-color);
            padding: 10px 15px;
            border-radius: 5px;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
            z-index: 1000;
            transform: translateX(120%);
            transition: transform 0.3s ease;
        }
        
        .item-notification.show {
            transform: translateX(0);
        }
        
        .item-notification.hide {
            transform: translateX(120%);
        }
        
        .save-notification {
            position: fixed;
            bottom: 20px;
            left: 20px;
            background-color: var(--accent-color);
            color: var(--text-color);
            padding: 10px 15px;
            border-radius: 5px;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
            z-index: 1000;
            opacity: 0;
            transition: opacity 0.3s ease;
        }
        
        .save-notification.fade-in {
            opacity: 1;
        }
        
        .save-notification.fade-out {
            opacity: 0;
        }
        
        .item-modal {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.7);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 1000;
            opacity: 0;
            transition: opacity 0.3s ease;
        }
        
        .item-modal.show {
            opacity: 1;
        }
        
        .item-modal.fade-out {
            opacity: 0;
        }
        
        .item-modal-content {
            background-color: var(--background-light);
            padding: 20px;
            border-radius: 10px;
            max-width: 400px;
            text-align: center;
            box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
            border: 2px solid var(--accent-color);
        }
        
        .item-icon {
            font-size: 3rem;
            color: var(--gold-color);
            margin-bottom: 10px;
        }
        
        .close-btn {
            margin-top: 15px;
            background-color: var(--accent-color);
            color: var(--text-color);
            border: none;
            border-radius: 5px;
            padding: 8px 15px;
            cursor: pointer;
            transition: background-color 0.2s;
        }
        
        .close-btn:hover {
            background-color: var(--secondary-color);
        }
        
        [data-tooltip] {
            position: relative;
        }
        
        [data-tooltip]:hover::after {
            content: attr(data-tooltip);
            position: absolute;
            bottom: -30px;
            left: 50%;
            transform: translateX(-50%);
            background-color: rgba(0, 0, 0, 0.8);
            color: white;
            padding: 5px 10px;
            border-radius: 5px;
            font-size: 0.8rem;
            white-space: nowrap;
            z-index: 100;
        }
    `;
    document.head.appendChild(style);

    // Initialize the game
    preloadImages();
    updateStats();
    renderScene('start');
});

