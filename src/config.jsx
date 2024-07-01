import rightIcon from "/Right.png";
import leftIcon from "/Left.png";
import laundry from "/Laundry.png";
import forward from "/Forward.png";
import teleport from "/Teleport.png";
import pickup from "/Pickup.png";

import shoe from "/Shoes.png";
import shirt from "/Shirt.png";
import pants from "/Pants.png";
import socks from "/Socks.png";

export const SIZE_X = 6;
export const SIZE_Y = 5;

export const POSSIBLE_ACTIONS = {
    ROTATE_RIGHT: {
        name: "Rechts Drehen",
        img: rightIcon,
    },
    ROTATE_LEFT: { 
        name: "Links Drehen",
        img: leftIcon,
    },
    MOVE_FORWARD: {
        name: "Vorne Bewegen",
        img: forward
    },
    WASHING_MACHINE: { 
        name: "Waschmaschine",
        img: laundry
    },
    PICKUP:{ 
        name: "Aufheben",
        img: pickup
    },
    TELEPORT: {
        name: "Teleportieren",
        img: teleport 
    }
}

export const CARDINAL_DIRECTIONS = {
    NORTH: 0,
    EAST: 1,
    SOUTH: 2,
    WEST: 3,
}

export const LAUNDRY_TYPES = {
    SOCKS: socks,
    SHOES: shoe,
    SHIRT: shirt,
    PANTS: pants,
}

export const LEVELS = [
    // 1
    {
        washingMachine: { x: SIZE_X-1, y: 2, },
        spawnPoint: { x: 2, y: SIZE_Y-1, },
        laundry: [
            {
                type: LAUNDRY_TYPES.PANTS,
                pos: {  x: 3, y: 3, }
            }
        ],
    },
    // 2
    {
        washingMachine: {
            x: 4,
            y: 1,
        },
        spawnPoint: {
            x: 2,
            y: SIZE_Y-1,
        },
        laundry: [
            {
                type: LAUNDRY_TYPES.SHIRT,
                pos: {
                    x: 0,
                    y: 2,
                }
            }
        ]
    },
    // 3
    {
        washingMachine: {
            x: 0,
            y: 3,
        },
        spawnPoint: {
            x: 1,
            y: SIZE_Y-1,
        },
        laundry: [
            {
                type: LAUNDRY_TYPES.SOCKS,
                pos: {
                    x: 4,
                    y: 1,
                }
            }
        ]
    },
    // 4
    {
        washingMachine: {
            x: 5,
            y: 3,
        },
        spawnPoint: {
            x: 4,
            y: 1,
        },
        laundry: [
            {
                type: LAUNDRY_TYPES.PANTS,
                pos: {
                    x: 0,
                    y: SIZE_Y-1,
                }
            }
        ]
    },
    // 5
    {
        washingMachine: {
            x: 1,
            y: 0,
        },
        spawnPoint: {
            x: 1,
            y: SIZE_Y-1,
        },
        laundry: [
            {
                type: LAUNDRY_TYPES.SOCKS,
                pos: {
                    x: 0,
                    y: 3,
                }
            },
            {
                type: LAUNDRY_TYPES.SHIRT,
                pos: {
                    x: 3,
                    y: 2,
                }
            }
        ]
    },
    // 6
    {
        washingMachine: {
            x: 2,
            y: 2,
        },
        spawnPoint: {
            x: 2,
            y: SIZE_Y-1,
        },
        laundry: [
            {
                type: LAUNDRY_TYPES.PANTS,
                pos: {
                    x: 1,
                    y: 3,
                }
            },
            {
                type: LAUNDRY_TYPES.SHIRT,
                pos: {
                    x: 4,
                    y: 3,
                }
            }
        ]
    },
    // 7
    {
        washingMachine: {
            x: SIZE_X-1,
            y: 1,
        },
        spawnPoint: {
            x: 2,
            y: SIZE_Y-1,
        },
        laundry: [
            {
                type: LAUNDRY_TYPES.SOCKS,
                pos: {
                    x: 1,
                    y: 3,
                }
            },
            {
                type: LAUNDRY_TYPES.SHIRT,
                pos: {
                    x: 4,
                    y: 3,
                }
            },
            {
                type: LAUNDRY_TYPES.PANTS,
                pos: {
                    x: 3,
                    y: 2,
                }
            }
        ]
    },
    // 8
    {
        washingMachine: {
            x: 3,
            y: 3,
        },
        spawnPoint: {
            x: 2,
            y: 2,
        },
        laundry: [
            {
                type: LAUNDRY_TYPES.SOCKS,
                pos: {
                    x: 1,
                    y: 1,
                }
            },
            {
                type: LAUNDRY_TYPES.SHIRT,
                pos: {
                    x: 3,
                    y: 1,
                }
            },
            {
                type: LAUNDRY_TYPES.PANTS,
                pos: {
                    x: 1,
                    y: 3,
                }
            }
        ]
    },
    // 9
    {
        washingMachine: {
            x: SIZE_X-1,
            y: 0,
        },
        spawnPoint: {
            x: 2,
            y: SIZE_Y-1,
        },
        laundry: [
            {
                type: LAUNDRY_TYPES.PANTS,
                pos: {
                    x: 1,
                    y: 3,
                }
            }
        ],
        teleportation: [
            {x: 1, y: 2 },
            {x: 4, y: 0}
        ]
    },
    // 10
    {
        washingMachine: {
            x: 4,
            y: 1,
        },
        spawnPoint: {
            x: 2,
            y: SIZE_Y-1,
        },
        laundry: [
            {
                type: LAUNDRY_TYPES.SHIRT,
                pos: {
                    x: 1,
                    y: SIZE_Y-1,
                }
            }
        ],
        teleportation: [
            { x: 0, y: 3 },
            { x: SIZE_X-1, y: 1 }
        ]
    },
    // 11
    {
        washingMachine: {
            x: 0,
            y: 3,
        },
        spawnPoint: {
            x: 1,
            y: SIZE_Y-1,
        },
        laundry: [
            {
                type: LAUNDRY_TYPES.SOCKS,
                pos: {
                    x: 4,
                    y: 1,
                }
            }
        ],
        teleportation: [
            { x: 4, y: 0 },
            { x: 1, y: 3 }
        ]
    },
    // 12
    {
        washingMachine: {
            x: 4,
            y: 3,
        },
        spawnPoint: {
            x: 4,
            y: 1,
        },
        laundry: [
            {
                type: LAUNDRY_TYPES.PANTS,
                pos: {
                    x: 0,
                    y: SIZE_Y-1,
                }
            }
        ],
        teleportation: [
            { x: SIZE_X-1, y: 0 },
            { x: 1, y: SIZE_Y-1 }
        ]
    },
    // 13
    {
        washingMachine: {
            x: 2,
            y: 3,
        },
        spawnPoint: {
            x: 1,
            y: SIZE_Y-1,
        },
        laundry: [
            {
                type: LAUNDRY_TYPES.SOCKS,
                pos: {
                    x: 0,
                    y: 3,
                }
            },
            {
                type: LAUNDRY_TYPES.SHIRT,
                pos: {
                    x: SIZE_X-1,
                    y: 0,
                }
            }
        ],
        teleportation: [
            { x: 3, y: 0 },
            { x: 1, y: 3 }
        ]
    },
    // 14
    {
        washingMachine: {
            x: 0,
            y: 2,
        },
        spawnPoint: {
            x: 2,
            y: SIZE_Y-1,
        },
        laundry: [
            {
                type: LAUNDRY_TYPES.SOCKS,
                pos: {
                    x: 2,
                    y: 0,
                }
            },
            {
                type: LAUNDRY_TYPES.PANTS,
                pos: {
                    x: 2,
                    y: 3,
                }
            }
        ],
        blocks: [
            { x: 3, y: 0 },
            { x: 2, y: 1 },
            { x: 3, y: 1 },
            { x: 4, y: 1 },
            { x: 5, y: 1 },
            { x: 3, y: 3 },
            { x: 4, y: 3 },
            { x: 5, y: 3 },
        ]
    },
    // 15
    {
        washingMachine: {
            x: SIZE_X-1,
            y: 2,
        },
        spawnPoint: {
            x: 0,
            y: SIZE_Y-1,
        },
        laundry: [
            {
                type: LAUNDRY_TYPES.PANTS,
                pos: {
                    x: 2,
                    y: 0,
                }
            },
            {
                type: LAUNDRY_TYPES.SHIRT,
                pos: {
                    x: SIZE_X-1,
                    y: SIZE_Y-1,
                }
            }
        ],
        teleportation: [
            { x: 4, y: 0 },
            { x: 2, y: SIZE_Y-1 }
        ],
        blocks: [
            { x: 0, y: 1 },
            { x: 1, y: 1 },
            { x: 2, y: 1 },
            { x: 3, y: 1 },
            { x: 3, y: 2 },
            { x: 1, y: 3 },
            { x: 3, y: 3 },
            { x: 4, y: 3 },
            { x: 5, y: 3 },
            { x: 1, y: 4 },
        ]
    },
    // 16
    
    {
        washingMachine: {
            x: 4,
            y: SIZE_Y-1,
        },
        spawnPoint: {
            x: 1,
            y: SIZE_Y-1,
        },
        laundry: [
            {
                type: LAUNDRY_TYPES.SHIRT,
                pos: {
                    x: 3,
                    y: 2,
                }
            }
        ],
        teleportation: [
            { x: 2, y: 0 },
            { x: 2, y: 2 }
        ],
        blocks: [
            { x: 1, y: 1 },
            { x: 2, y: 1 },
            { x: 3, y: 1 },
            { x: 4, y: 1 },
            { x: 1, y: 2 },
            { x: 4, y: 2 },
            { x: 1, y: 3 },
            { x: 2, y: 3 },
            { x: 3, y: 3 },
            { x: 4, y: 3 },
        ]
    },

]