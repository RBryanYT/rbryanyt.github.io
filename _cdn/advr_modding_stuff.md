# RB's Ancient Dungeon VR Modding Stuff
A bunch of random code snippets for doing stuff in ADVR modding.

## Spawning
### Override Spawn
Put this in your onLoad:
```lua
pickup.preObjectSpawnListeners = {game.GetObjectMapping("enemy_og_slime"), game.GetObjectMapping("enemy_id_slime"), game.GetObjectMapping("enemy_fg_slime_phase"), game.GetObjectMapping("enemy_lm_slime_bone")} -- Say which items to run code before they spawn
```
And the overriding code:
```lua
function onPreObjectSpawn(prefab, obj, position) -- Run the below code when the enemies spawn
	if game.IsPlayerWhoStartedRun() then
		if helperMethods.IsValidWithLuck(0.09, 0.11, 0.1) then -- If lucky, run below code
			return game.stringToObjectMapper.GetObject("enemy_golden_slime") -- Tell game to change enemy to a golden slime
		end
	end
	return obj -- If the function wasn't stopped by return, don't change the enemy
end
```

### Spawn Object
```lua
game.spawnObjectNetwork("item_food_apple", game.playerController.rightHand.transform.position) -- Spawns an apple on your right hand
-- You can find the whole list of spawnable objects in the official modding docs
```

### Spawn Specific Relic
```lua
local sRelic = game.spawnObjectNetwork("item_upgrade_all", game.playerController.rightHand.transform.position) -- Spawn the relic on your right hand
sRelicComponent = getComponent(sRelic, "ItemUpgrade") -- Get the ItemUpgrade component of the relic
sRelicComponent.forceSpawn = "erthu_chrwa_black_box" -- Make the ItemUpgrade force spawn Black Box
```

### Add Item to Drop Table
```lua
game.dropTableHandler.addToDropTable("prop_pot", "item_food_steak", 0.01, 0.005, 0.01, 1, 2) -- Adds Steak to the pot loot table
-- argument 1 - what loot table are you adding to?
-- argument 2 - what item are you adding to the loot table?
-- argument 3 - chance in normal mode? (1% here)
-- argument 4 - chance in hard mode? (0.5% here)
-- argument 5 - chance in multiplayer? (1% here)
-- argument 6 - minimum amount of the item
-- argument 7 - maximum amount of the item
```

## What is IsValidWithLuck?
```lua
-- What does this do?
if helperMethods.IsValidWithLuck(0.09, 0.11, 0.1) then
-- It uses your luck stat to determine chance,
-- the first argument is the lowest chance (9% here) [when luck is -100]
-- the second argument is the highest chance (11% here) [when luck is 100]
-- and the third argument is the middle point (10% here) [when luck is 0]
```

## Player
### Set Player's Max Health
```lua
player.maxHealth = 10 -- Set to 5 hearts (10 HP)
```

### Heal Player
```lua
player.Heal(1, false) -- Second argument determines if it will be protection or not (1 HP is 0.5 hearts)
```

### Kill Player
```lua
player.onDeath(nil)
```

## Miscellaneous

### Check if Food Eaten is a Certain Type
```lua
function onFoodEaten(food)
	if food.livingBase.livingId == "item_food_potato" then -- If the food is a potato, heal the player
		player.Heal(1, false)
	end
end
```

## Hide HP
```lua
game.playerStatsUI.playerHP.gameObject.setActive(false) -- Hides HP on hand
--                                                         or would if Mr. Eric Thullen made his game functional
```