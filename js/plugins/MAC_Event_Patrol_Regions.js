/*:
 * @plugindesc Adds on-map enemies that randomly patrol a given region
 * @author Mac15001900, commissioned by TheAM-Dol
 * 
 * @param On-Enter common event
 * @desc The common event that will be ran when the player enters an enemy's region
 * @type number
 * @default 0
 *
 * @param On-Exit common event
 * @desc The common event that will be ran when the player exits an enemy's region
 * @type number
 * @default 0
 * 
 * @param On-Stun common event
 * @desc The common event that will be ran when an enemy gets stunned
 * @type number
 * @default 0
 * 
 * @param Patrol speed
 * @desc The speed on-map enemies will move at when patrolling. They will increase their speed by 1 when chasing the player.
 * @type float
 * @default 3
 * 
 * @param Stun range
 * @desc Range of the stun ability in tiles.
 * @type number
 * @default 8
 * 
 * @param Stun origin shift
 * @desc How many tiles to offset the player's position forwards for the purpose of determining the closest enemy.
 * @type float
 * @default 2
 * 
 * @param In-range player animation
 * @desc Animation to play on the player when a stunnable enemy enters stun range.
 * @type animation
 * @default 0
 * 
 * @param In-range enemy animation
 * @desc Animation to play on the enemy when they become the new target for stuns.
 * @type animation
 * @default 0
 * 
 * @param Stun condition variable
 * @desc Stun range-related animations will only play if this variable has a value greater than 0
 * @type variable
 * @default 0
 * 
 * @param Range check delay
 * @desc How many frames to wait between checking if an enemy is in range of a stun (this only affects animations).
 * @type number
 * @default 10
 * 
 * 
 * @help
 * 
 * This plugin adds on-map enemies that randomly patrol the region they're 
 * placed in. They will chase the player if they enter an enemy's region.
 * 
 * To create an enemy, create an event and add a comment as its first command, 
 * with one of the following tags:
 * 
 * <Patrol> to randomly patrol the current region
 * <Guard> to stay in one place (but chase the player if they enter the region)
 * <Guard: x, y> the above, but staying on those specific coordinates instead
 * of where they were placed on the map
 * 
 * Then set its trigger to "Event touch", add commands starting a battle,
 * as well as "Erase event" afterwards.
 * 
 * ------------------------------- Plugin commands ------------------------------
 * 
 * EventPatrol StunEffect - stuns the closest enemy
 * 
 * EventPatrol StunEffect off - removes all stuns (this also happens 
 * automatically when changing maps)
 * 
 * EventPatrol SetSpeed <speed> - sets the speed of the next chasing enemy to 
 * <speed> (for use in the region entering common event)
 * 
 * EventPatrol UpdateMap - updates all events on the current map to see if their 
 * conditions changed (this too happens automatically when changing maps)
 * 
 */

Imported = Imported || {}
Imported.MAC_Event_Patrol_Regions = "0.3.0";
window.MAC_Event_Patrol_Regions = {}


void ((mep) => {
    params = PluginManager.parameters('MAC_Event_Patrol_Regions');
    mep.params = params;

    mep.onEnterEvent = Number(params["On-Enter common event"] || 0);
    mep.onExitEvent = Number(params["On-Exit common event"] || 0);
    mep.onStunEvent = Number(params["On-Stun common event"] || 0);
    mep.defaultPatrolSpeed = Number(params["Patrol speed"]);
    mep.stunRange = Number(params["Stun range"]);
    mep.stunOriginShift = Number(params["Stun origin shift"] || 0);
    mep.inRangePlayerAnimation = Number(params["In-range player animation"] || 0);
    mep.inRangeEnemyAnimation = Number(params["In-range enemy animation"] || 0);
    mep.stunConditionVariable = Number(params["Stun condition variable"] || 0);
    mep.rangeCheckDelay = Number(params["Range check delay"] || 1);

    mep.enemies = {};
    mep.enemyCount = 0;
    mep.currentStunTargetId = null;
    mep.lastMapId = null;
    mep.currentDangerRegion = null;

    /**
     * @returns The currently chasing enemy (or undefined if there isn't one)
     */
    mep.getEnemy = function () { return this.enemies[this.currentDangerRegion]; }

    /**
     * @returns The currently active interpreter
     */
    mep.getInterpreter = function () {
        let res = $gameMap._interpreter;
        while (res._childInterpreter && res._childInterpreter.isRunning()) res = res._childInterpreter;
        return res;
    }

    Type = {
        NONE: 0, //Not a patrolling enemy
        WANDER: 1, //Enemy that randomly wanders around
        GUARD: 2, //Enemy that stands guard on one spot
    }

    //Plugin commands
    void ((alias) => {
        Game_Interpreter.prototype.pluginCommand = function (command, args) {
            alias.call(this, command, args);
            if (command === 'EventPatrol') {
                switch (args[0]) {
                    case 'StunEffect':
                        if (args.length === 1) mep.useStun();
                        else mep.resetStuns();
                        break;
                    case 'SetSpeed':
                        mep.tempSpeed = Number(args[1]);
                        break;
                    case 'UpdateMap':
                        performance.mark("preparing-start")
                        mep.prepareEnemies($gameMap.events());
                        performance.mark("preparing-end");
                        console.log(performance.measure("preparing", "preparing-start", "preparing-end"));
                        break;
                }
            }
        }
    })(Game_Interpreter.prototype.pluginCommand);

    //Preparations when a map is first loaded
    void ((alias) => {
        Scene_Map.prototype.onMapLoaded = function () {
            alias.call(this);
            if (mep.lastMapId !== $gameMap.mapId()) {
                mep.prepareEnemies($gameMap.events());
                mep.lastMapId = $gameMap.mapId();
            }
        }
    })(Scene_Map.prototype.onMapLoaded);


    /**
     * Prepares all enemies on the current map for patroling
     * @param {[Game_Event]} events The list of events on the map
     */
    mep.prepareEnemies = function (events) {
        let res = {};
        mep.enemyCount = 0;
        mep.currentStunTargetId = null;
        events.forEach(event => {
            let data = mep.buildEnemyData(event);
            if (data) {
                mep.enemyCount++;
                if (res[data.region]) console.warn("Multiple patrolling events found in region " + data.region + ". Only one of them will work properly.");
                res[data.region] = data;
                if (data.type === Type.WANDER) event._moveType = 1;
                event.setMoveSpeed(mep.defaultPatrolSpeed);
                event.setMoveFrequency(5);
                void ((alias) => { //Patrolling events are forbidden from moving between tiles with two different region ids
                    event.isMapPassable = function (x, y, d) {
                        let startId = $gameMap.regionId(x, y);
                        let endId = $gameMap.regionId(x + (d - 1) % 3 - 1, y - Math.floor((d - 1) / 3) + 1);
                        if (startId !== endId) return false
                        else return alias.call(this, x, y, d);
                    }
                })(event.isMapPassable);
                if (event._trigger !== 2) console.warn("Event with id " + event.eventId() + " has been set to patrol, but doesn't have an event touch trigger. " +
                    "Are you sure this is what you want? (you can disable this warning by commenting out lines 191 and 192)");
            }
        });
        mep.enemies = res;
    }

    /**
     * Checks how (if at all) a given event is supposed to be patrolling an area based on the first comment on its currently active page. Also moves guard enemies to the correct spot if needed.
     * @param {Game_Event} event 
     * @returns Enemy data for a given event (or null if it's not a patrol event)
     */
    mep.buildEnemyData = function (event) {
        if (!event.page()) return null;
        if (!(event.page().list && event.page().list[0])) return null;
        let list = event.page().list;
        if (!list[0].code === 108) return null;

        let comment = list[0].parameters[0];
        let index = 1;
        while (list[index] && list[index].code === 408) {
            comment += "\n" + list[index].parameters[0];
            index++;
        }

        let mode = /(<Patrol>|<Guard(: *\d+, *\d+ *)?>)/.exec(comment);
        if (!mode) return null;

        let region = $gameMap.regionId(event.x, event.y);
        let res = { region, id: event.eventId(), event, stunned: 0 }
        if (mode[0].includes("<Guard")) {
            if (mode[0].length > 8) {
                let numberFinder = /\d+/g;
                event.setPosition(Number(numberFinder.exec(mode[0])), Number(numberFinder.exec(mode[0])))
                res.region = $gameMap.regionId(event.x, event.y);
            }
            res.type = Type.GUARD;
            res.position = [event.x, event.y];
            res.direction = event.direction();
        } else {
            res.type = Type.WANDER;
        }
        return res;
    }

    /*Things that happen when a player makes a step.
    
    Order of things when moving between regions (discarding points that do not apply)
    1. Reset move speed and behaviour of the enemy from the region we left
    2. Run the common event for the exited region
    3. Run the common event for the entered region
    4. Start chasing the player
    */
    void ((alias) => {
        Game_Player.prototype.executeMove = function (direction) {
            alias.call(this, direction);
            let newRegionId = $gameMap.regionId(this._x, this._y);
            let bigList = [];

            if (mep.currentDangerRegion && newRegionId !== mep.currentDangerRegion) { //We left a danger zone
                let data = mep.getEnemy();
                let event = data.event;
                if (event && event.page()) {
                    if (data.type === Type.GUARD) {
                        event.setMoveRoute({
                            "list": [
                                { "code": Game_Character.ROUTE_SCRIPT, "parameters": [`this.pathfindToPosition(${data.position[0]}, ${data.position[1]})`] },
                                { "code": Game_Character.ROUTE_SCRIPT, "parameters": [`this.setDirection(${data.direction})`] }
                            ], "repeat": false, "skippable": false, "wait": true
                        });
                    } else {
                        event._moveType = 1;
                    }

                    event.setMoveSpeed(mep.defaultPatrolSpeed - (data.stunned ? 1 : 0));
                    // event.setMoveFrequency(3);
                    if (mep.onExitEvent) bigList.push({ code: 355, indent: 0, parameters: [`this.setupChild($dataCommonEvents[MAC_Event_Patrol_Regions.onExitEvent].list, ${data.id})`] });

                }
                mep.currentDangerRegion = null;
            }

            if (newRegionId !== mep.currentDangerRegion && mep.enemies[newRegionId]) { //We entered a potential danger zone
                let data = mep.enemies[newRegionId];
                if (data.event.page()) { //We entered a danger zone with an alive enemy
                    if (mep.onEnterEvent) bigList.push({ code: 355, indent: 0, parameters: [`this.setupChild($dataCommonEvents[MAC_Event_Patrol_Regions.onEnterEvent].list, ${data.id})`] });
                    bigList.push({ code: 355, indent: 0, parameters: ["MAC_Event_Patrol_Regions.startChase(" + newRegionId + ")"] });

                    mep.currentDangerRegion = newRegionId;
                }
            }

            if (bigList.length > 0) {
                let inp = mep.getInterpreter();
                inp.setup(bigList, 0);
            }
        }
    })(Game_Player.prototype.executeMove);

    /**
     * Start chasing the player in the given region.
     * @param {number} regionId The region to start the chase in
     */
    mep.startChase = function (regionId) {
        let data = mep.enemies[regionId];
        if (!data) {
            console.error("Started chase in a region without an enemy.");
            return;
        }
        let event = data.event;
        if (event && event.page()) {
            if (mep.tempSpeed) {
                event.setMoveSpeed(mep.tempSpeed - (data.stunned ? 1 : 0));
                mep.tempSpeed = null;
            } else event.setMoveSpeed(mep.defaultPatrolSpeed + 1 - (data.stunned ? 1 : 0));
            event._moveType = 3;
            event.setMoveRoute({ "list": [{ "code": Game_Character.ROUTE_SCRIPT, "parameters": ["this.pathfindToPlayer()"] }], "repeat": true, "skippable": false, "wait": false });
        }
    }


    //Function by orphalese, https://forums.rpgmakerweb.com/index.php?threads/js-snippets-thread.92501/page-2
    Game_Character.prototype.pathfindToPosition = function (x, y) {
        if (!((this.x == x) && (this.y == y))) {
            let direction = this.findDirectionTo(x, y);
            this.setDirection(direction);
            this.moveForward()
            if (this.isMovementSucceeded()) {
                this._moveRouteIndex = this._moveRouteIndex - 1;
            }
        }
    }

    Game_Character.prototype.pathfindToPlayer = function () {
        let { x, y } = $gamePlayer;
        this.pathfindToPosition(x, y);
    }

    mep.resetStuns = function () {
        for (let key in mep.enemies) {
            if (mep.enemies[key].stunned) {
                let event = mep.enemies[key].event;
                event.setMoveSpeed(event.moveSpeed() + 1);
                mep.enemies[key].stunned = false;
            }
        }
    }

    /**
     * @returns The closest enemy that can be stunned, or null if there are none in range
     */
    mep.getClosestStunnableEnemy = function () {
        let closestRegion = null;
        let smallestDistance = mep.stunRange;
        let originX = $gamePlayer.x + mep.stunOriginShift * (($gamePlayer.direction() - 1) % 3 - 1);
        let originY = $gamePlayer.y + mep.stunOriginShift * (1 - Math.floor(($gamePlayer.direction() - 1) / 3));

        for (let key in mep.enemies) {
            let data = mep.enemies[key];
            let event = data.event;
            if (!event || !event.page() || data.stunned) continue;
            let distance = Math.abs(event.x - originX) + Math.abs(event.y - originY);
            if (distance <= smallestDistance) {
                closestRegion = key;
                smallestDistance = distance;
            }
        }

        if (closestRegion) return mep.enemies[closestRegion];
        else return null;
    }

    /**
     * If one exists, stuns the closest enemy that can be stunned and runs the 'onStunEvent' common event
     */
    mep.useStun = function () {
        let enemy = mep.getClosestStunnableEnemy();
        if (!enemy) return;
        enemy.stunned = true;
        enemy.event.setMoveSpeed(enemy.event.moveSpeed() - 1);
        if (mep.onStunEvent) {
            let args = [$dataCommonEvents[mep.onStunEvent].list, enemy.id];
            let inp = mep.getInterpreter();
            if (inp.isRunning()) inp.setupChild(...args)
            else inp.setup(...args);
        }
    }

    //Stun range-related animations
    if ((mep.inRangePlayerAnimation > 0 || mep.inRangeEnemyAnimation > 0) && mep.stunConditionVariable > 0) {
        void ((alias) => {
            Scene_Map.prototype.updateScene = function () {
                alias.call(this);
                if (mep.enemyCount > 0 && Graphics.frameCount % mep.rangeCheckDelay === 0) {
                    if ($gameVariables.value(mep.stunConditionVariable) <= 0) { //We have no charges, treat this as outside of range
                        mep.currentStunTargetId = null;
                        return;
                    }
                    performance.mark("stun-start");
                    let enemy = mep.getClosestStunnableEnemy();
                    if (enemy && enemy.id !== mep.currentStunTargetId) { //There is an enemy in range, and it's different than the last one
                        if (!mep.currentStunTargetId) $gamePlayer.requestAnimation(mep.inRangePlayerAnimation);
                        $gameMap.event(enemy.id).requestAnimation(mep.inRangeEnemyAnimation);
                        mep.currentStunTargetId = enemy.id;
                    } else if (!enemy && mep.currentStunTargetId) { //There is no longer an enemy in range
                        mep.currentStunTargetId = null;
                    }
                    performance.mark("stun-end");
                    console.log(performance.measure("stun check length", "stun-start", "stun-end"));
                }
            }
        })(Scene_Map.prototype.updateScene);
    }

})(window.MAC_Event_Patrol_Regions);