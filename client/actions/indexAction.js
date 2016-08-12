/**
 * Created by lxy on 16/8/11.
 */
import {toggleDrawer} from '../constants/indexConst.js';

export const drawerAction = toggle => {
    return {
        type: toggleDrawer,
        drawer: toggle
    }
}