async function solveMaze(){ 
    
    if(isSolved){
        await drawAgain()
        await new Promise(r => setTimeout(r, 250));
    }

    getMapFromNodes()
    

    if(start == -1 || end == -1){
        alert("No start or finish node selected.")        
        return -1
    }
           
    disableInteraction(true)
    makeMazeInteractable(false)
    var waitTime = 25
    stopSample = false
    sampleWaitTime()

    algSelect = document.getElementById("algorithm")     
    switch (algSelect.value) {
        case "dfs":
            await dfs(start) 
            break;
        case "aStar":
            await aStar()
            break;
        default:
            console.log("algorithm not selected")
            break;
    }

    isSolved = true
    stopSample = true  

    makeMazeInteractable(true)
    disableInteraction(false) 

        
    
}

function distance(a, b){
    aX = a % xSize
    aY = Math.floor(a / xSize)
    bX = b % xSize
    bY = Math.floor(b / xSize)

    cX = bX - aX
    cY = bY - aY
    return Math.sqrt(cX * cX + cY * cY)
}

function getMapFromNodes(){
    if(map != ""){map = ""}
    
    for(var i = 0; i < nodes.length; i++){        
        if(nodes[i].className.includes("Full")){
            map += '0'
        }
        else if(nodes[i].className.includes("Start")){
            map += '1'
            start = i
        }
        else if(nodes[i].className.includes("Finish")){
            map += '1'
            end = i
        }else{
            map += '1'
        }        
    }
}

async function sampleWaitTime(){
    while(!stopSample){
        waitTime = document.getElementById("slider").value
        await new Promise(r => setTimeout(r, 100));
    }
}