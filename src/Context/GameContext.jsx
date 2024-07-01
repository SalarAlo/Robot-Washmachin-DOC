import { createContext, useContext, useEffect, useReducer } from "react";
import { POSSIBLE_ACTIONS, CARDINAL_DIRECTIONS, SIZE_X, SIZE_Y, LEVELS } from "../config";

const GameContext = createContext();
const LOCAL_STORAGE_MOVES_KEY = "x23AF19x3Bd4xx5lUOA";
const LOCAL_STORAGE_HIGHEST_LEVEL_KEY = "s29A01vx39d4xe5lPOA"

const initialState = {
    playerPos: {
        x: 0,
        y: 0,
    },
    direction: CARDINAL_DIRECTIONS.NORTH,
    running: false,
    levelIndex: 0,
    highestLevel: localStorage.getItem(LOCAL_STORAGE_HIGHEST_LEVEL_KEY) == null ? 0 : +localStorage.getItem(LOCAL_STORAGE_HIGHEST_LEVEL_KEY),
    washingMachine: {...LEVELS[0].washingMachine},
    laundry: [...LEVELS[0].laundry],
    currentlyHolding: null,
    speed: 4,
    teleportation: [],
    blocks: [],
    movesInLevel: localStorage.getItem(LOCAL_STORAGE_MOVES_KEY) == null ? LEVELS.map(() => []) : JSON.parse(localStorage.getItem(LOCAL_STORAGE_MOVES_KEY)),
}
initialState.actions = initialState.movesInLevel[0];

const reducer = function(state, { type, payload }){
    const level = LEVELS[state.levelIndex];

    switch (type) {
        case "on-move":
            return {
                ...state,
                playerPos: payload,
            }
        case "set-level":
            return {
                ...state,
                playerPos: {...level.spawnPoint},
                direction: CARDINAL_DIRECTIONS.NORTH,
                washingMachine: {...level.washingMachine},
                laundry: [...level.laundry],
                teleportation: level.teleportation ? [...level.teleportation] : [] ,
                currentlyHolding: null,
                blocks: level.blocks ? [...level.blocks] : [],

            }
        case "on-action-added":
            localStorage.setItem(LOCAL_STORAGE_MOVES_KEY, JSON.stringify([...state.movesInLevel].map((actions, i) => i == state.levelIndex ? [...actions, payload] : actions)));
            return {
                ...state,
                actions: [...state.actions, payload],
                movesInLevel: [...state.movesInLevel].map((actions, i) => i == state.levelIndex ? [...actions, payload] : actions),
            }
        case "on-set-actions":
            localStorage.setItem(LOCAL_STORAGE_MOVES_KEY, JSON.stringify([...state.movesInLevel].map((actions, i) => i == state.levelIndex ? payload : actions)));
            return {
                ...state,
                actions: payload,
                movesInLevel: [...state.movesInLevel].map((actions, i) => i == state.levelIndex ? payload : actions),
            }
        case "on-delete-action":
            localStorage.setItem(LOCAL_STORAGE_MOVES_KEY, JSON.stringify([...state.movesInLevel].map((actions, i) => i == state.levelIndex ? state.actions.filter(action => action.id !== payload) : actions)));
            return {
                ...state,
                actions: state.actions.filter(action => action.id !== payload),
                movesInLevel: [...state.movesInLevel].map((actions, i) => i == state.levelIndex ? state.actions.filter(action => action.id !== payload) : actions),
            }
        case "rot":
            return {
                ...state,
                direction: payload,
            }
        case "on-pickup":
            return {
                ...state,
                currentlyHolding: payload,
                laundry: state.laundry.filter(l => l !== payload)
            }
        case "on-start-game":
            return {
                ...state,
                running: true,
            }
        case "on-end-game":
            return {
                ...state,
                running: false,
            }
        case "set-level-index":
            return {
                ...state,
                actions: [...state.movesInLevel[payload]],
                levelIndex: payload,
            }
        case "place-washing-machine":
            return {
                ...state,
                currentlyHolding: null,
            }
        case "set-speed":
            return {
                ...state,
                speed: payload,
            }
        case "new-highest-level":
            localStorage.setItem(LOCAL_STORAGE_HIGHEST_LEVEL_KEY, JSON.stringify(payload));
            return {
                ...state,
                highestLevel: payload,
            }
        default:
            console.log("You cant spell!");
            return state;
    }

}

let id = 0;

const GameContextProvider = function({ children }){
    const [
        { playerPos, direction, actions, running, levelIndex, washingMachine, laundry, currentlyHolding, blocks, speed, highestLevel, teleportation }, 
        dispatch
    ] = useReducer(reducer, initialState);

    useEffect(() => {
        dispatch({ type: "set-level", payload: levelIndex });

        if(highestLevel < levelIndex){
            dispatch({ type: "new-highest-level", payload: levelIndex })
        }
    }, [levelIndex, highestLevel]);


    const HandleAddAction = function(actionAdded) {
        dispatch({
            type: "on-action-added", 
            payload: { type: actionAdded.name, id: id++, img: actionAdded.img }
        })
    }

    const SetSpeed = newSpeed => dispatch({ type: "set-speed", payload: newSpeed})

    const HandleDeleteAction = function(id){
        dispatch({
            type: "on-delete-action", 
            payload: id
        })
    }

    const HandleRunGame = async function(){
        dispatch({ type: "on-start-game" })
        await HandleComputeActions();
        dispatch({ type: "on-end-game" })
        dispatch({ type: "set-level" })
    }

    const TryPickup = function(curPos){
        const possibleLaundryToPickup = laundry.find(({ pos }) => pos.x == curPos.x && pos.y == curPos.y);

        if (possibleLaundryToPickup){
            dispatch({ type: "on-pickup", payload: possibleLaundryToPickup })
            return true;
        }
        return false;
    }
    const HandlePlaceWashmachine = function(curPos, currentlyHolding){
        if (curPos.x !== washingMachine.x || curPos.y !== washingMachine.y) return false;
        if (!currentlyHolding) return false;

        dispatch({ type: "place-washing-machine" });
        return true;
    }

    const HandleComputeActions = async function() {
        let currentPos = {...playerPos};
        let currentDirection = direction;
        let currentlyHoldingSomething = Boolean(currentlyHolding);
        let forward;
        let currentLaundryAmt = laundry.length;

        for(const action of actions){
            switch (action.type) {
                case POSSIBLE_ACTIONS.MOVE_FORWARD.name:
                    forward = ComputeForwardPosition(currentDirection, {...currentPos});
                    if (!blocks.some(block => block.x === forward.x && block.y === forward.y)) { 
                        currentPos = forward;
                    }

                    dispatch({ type: "on-move", payload: currentPos });
                    break;
                case POSSIBLE_ACTIONS.ROTATE_LEFT.name:
                    currentDirection = currentDirection != CARDINAL_DIRECTIONS.NORTH ? currentDirection - 1 : CARDINAL_DIRECTIONS.WEST;
                    dispatch({
                        type: "rot",
                        payload: currentDirection
                    })
                    break;
                case POSSIBLE_ACTIONS.ROTATE_RIGHT.name:
                    currentDirection = currentDirection != CARDINAL_DIRECTIONS.WEST ? currentDirection + 1 : CARDINAL_DIRECTIONS.NORTH; 
                    dispatch({
                        type: "rot", 
                        payload: currentDirection
                    })
                    break;
                case POSSIBLE_ACTIONS.PICKUP.name:
                    if(TryPickup(currentPos)) { 
                        currentlyHoldingSomething = true;
                    }
                    break;
                case POSSIBLE_ACTIONS.WASHING_MACHINE.name:
                    if(HandlePlaceWashmachine(currentPos, currentlyHoldingSomething)) {
                        currentLaundryAmt--;
                        currentlyHoldingSomething = false;
                        
                        if (currentLaundryAmt == 0) {
                            dispatch({ type: "set-level-index", payload: levelIndex == LEVELS.length - 1 ? levelIndex : levelIndex+1});
                        }
                    }
                    break;
                case POSSIBLE_ACTIONS.TELEPORT.name:
                    if(teleportation.some(teleporter => teleporter.x == currentPos.x && teleporter.y == currentPos.y)){
                        currentPos = {...(teleportation.find(teleporter => (teleporter.x != currentPos.x || teleporter.y != currentPos.y)))};
                        dispatch({ type: "on-move", payload: currentPos });
                    }
                    break;
            }

            await new Promise(res => setTimeout(res, 1000 / speed));
        }
        
    }

    const ComputeForwardPosition = function(direction, curPos){
        switch (direction) {
            case CARDINAL_DIRECTIONS.NORTH:
                curPos.y = curPos.y === 0 ? 0 : curPos.y-1;
                break;
            case CARDINAL_DIRECTIONS.SOUTH:
                curPos.y = curPos.y === SIZE_Y - 1 ? SIZE_Y - 1 : curPos.y + 1;
                break;
            case CARDINAL_DIRECTIONS.EAST:
                curPos.x = curPos.x === SIZE_X - 1 ? SIZE_X - 1 : curPos.x + 1;
                break;
            case CARDINAL_DIRECTIONS.WEST:
                curPos.x = curPos.x === 0 ? 0 : curPos.x - 1;
                break;
        }
        return curPos;
    }

    const HandleSetActions = (actions) => dispatch({ type: "on-set-actions", payload: actions })
    const HandleSetLevel = (ind) => ind <= highestLevel &&  dispatch({ type: "set-level-index", payload: ind})

    return <GameContext.Provider 
        value= { 
            {
                playerPos, 
                direction,
                actions,
                running,
                washingMachine,
                laundry,
                speed,
                highestLevel,
                levelIndex,
                blocks,
                teleportation,
                currentlyHolding,
                OnAddAction: HandleAddAction,
                OnSetActions: HandleSetActions,
                OnDeleteAction: HandleDeleteAction, 
                OnRunGame: HandleRunGame,
                OnSetSpeed: SetSpeed,
                OnSetLevel: HandleSetLevel,
            }
        }
    >
        {children}
    </GameContext.Provider>
}

function useGameContext() {
    const context = useContext(GameContext);

    return context;
}

export { useGameContext, GameContextProvider}