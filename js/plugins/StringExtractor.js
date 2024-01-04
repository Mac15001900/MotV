/*:
 * @plugindesc Extracts all strings into a file
 * @author Mac15001900
 * 
 * @help
 * 
 */


//Converts a list of commands to a printable string
function showList(page) {
    let res = "";
    let commandList = page.list;
    for (id in commandList) {
        if (commandList[id].code === 101) res += "\n";
        if (commandList[id].code === 401) res += commandList[id].parameters[0] + "\n";
        if (commandList[id].code === 102) res += "\nChoice:\n" + commandList[id].parameters[0].map(s => "  -" + s).join('\n') + "\n";
    }
    return res.substring(1);
}

function showEvent(event, useEnglish) {
    if (!event) return "";
    let langPages = useEnglish ? event.pages.filter(pageIsEnglish) : event.pages.filter(p => !pageIsEnglish(p));
    let pageStrings = langPages.map(showList).filter(s => s.length > 0);
    if (pageStrings.length === 0) return "";
    return "--- Event " + event.name + " (" + event.id + ") ---\n\n" + pageStrings.join("\n-----\n\n");
}

function showCommonEvent(id) {
    let event = $dataCommonEvents[id];
    if (!event) return "";
    let text = showList(event);
    if (text.length === 0) return "";
    return "--- Common Event " + event.name + " (" + id + ") ---\n\n" + text;

}

function showMap(mapData, useEnglish) {
    let res = "";
    for (let id = 0; id < mapData.events.length; id++) {
        let eventString = showEvent(mapData.events[id], useEnglish);
        if (eventString.length > 0) res += eventString + "\n";
    }
    return res;
}

function runExtractor(useEnglish, currentId) {
    //First call of this function. Let's set some things up
    if (currentId == null) {
        SceneManager.stop();
        if ($dataMapInfos[0]) DataManager.loadMapData(0);
        window.extractedString = "";
        //Show common events
        for (let id = 1; id < $dataCommonEvents.length; id++) {
            let commonEventString = showCommonEvent(id);
            if (commonEventString.length > 0) window.extractedString += commonEventString + "\n";
        }
        tryLoadingMap(0);
        runExtractor(useEnglish, 0);
        return;
    }

    //We've iterated over all ids. Return the string
    if (currentId >= $dataMapInfos.length) {
        DataManager.loadMapData($gameMap.mapId()); //Load the previous map back
        setTimeout(SceneManager.resume, 1000);
        copyTextToClipboard(null, window.extractedString, true, false);
        console.log("All done.");
        alert("Done! The string has been copied to your clipboard.");
        return;
    }

    //There is no map with this id. Let's try the next one.    
    if (!$dataMapInfos[currentId]) {
        console.log("No map with id " + currentId);
        tryLoadingMap(currentId + 1);
        runExtractor(useEnglish, currentId + 1);
        return;
    }

    if (!DataManager.isMapLoaded()) setTimeout(runExtractor, 50, useEnglish, currentId); //Data is not loaded yet. Wait 50ms and try again.    
    else { // Data is loaded, and it's the right map. Show the map and try the next one.
        let mapString = showMap($dataMap, useEnglish);
        if (mapString.length > 0) window.extractedString += "--------- Map " + $dataMapInfos[currentId].name + " (" + currentId + ") ---------\n\n" + mapString + "\n";
        console.log("Map " + $dataMapInfos[currentId].name + " extracted.");
        tryLoadingMap(currentId + 1);
        runExtractor(useEnglish, currentId + 1);
    }
}

function pageIsEnglish(page) {
    return page.conditions.switch2Valid && page.conditions.switch2Id === langData.switches["en"];
}

function tryLoadingMap(mapId) {
    if ($dataMapInfos[mapId]) DataManager.loadMapData(mapId);
}