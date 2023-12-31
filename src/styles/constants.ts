
export const STATE_CIRCRADIUS = 40
export const STATE_RECTWIDTH = 80
export const STATE_RECTHEIGHT = 30
export const STATE_RECTOFFSET = {x : -40, y: 30}
export const STATE_BOUNDS = STATE_CIRCRADIUS 

export const TRANSITION_ANCHOR_DISTANCE = 50
export const TRANSITION_LOOP_DISTANCE = 180
export const TRANSITION_LOOP_OFFSET = STATE_CIRCRADIUS * 0.9

export const DIAGRAM_SCALE_CONSTANT = 2

export const BOUNDS = {
    top: 2 * STATE_CIRCRADIUS + TRANSITION_LOOP_DISTANCE,
    bottom: 2 * STATE_CIRCRADIUS,
    left: 2 * STATE_CIRCRADIUS,
    right: 2 * STATE_CIRCRADIUS
}

export const TARGET_TRANSITION_LENGTH = 200

export const MEMORY_CELLWIDTH = 50
export const MEMORY_CELLHEIGHT = 50

export const ATTRACTION_STRENGTH = 0.1
export const REPULSION_STRENGTH = 1
export const LAYOUT_ITERATIONS = 10000

export const DIAGRAM_WIDTH = 1000
export const DIAGRAM_HEIGHT = 1000
export const MEMORY_MAX_ROWS = 8