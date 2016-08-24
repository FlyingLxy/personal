/**
 * Created by lxy on 16/8/24.
 */
import { syncHistoryWithStore } from 'react-router-redux';
export default (history,store) => {
    return syncHistoryWithStore(history,store);
}