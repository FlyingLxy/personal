/**
 * Created by lxy on 16/8/11.
 */
import { wrapper } from '../constants';

const drawerAction = toggle => {
    return {
        type: wrapper.toggleDrawer,
        drawer: toggle
    }
}


export default {
    drawerAction
}