import {SAVE_COMMENT, FETCH_COMMENTS} from "actions/types"
import _ from "lodash";

export default function(state = [], action) {
  console.log(action.type, "type", action.payload, "payload");
  switch(action.type) {
    case SAVE_COMMENT:
    return [...state, action.payload];
    case FETCH_COMMENTS:
    const singleComm = _.map(action.payload.data, (single)=> {
      return {name: single.name, id: single.id}
    });
     console.log([...singleComm], "singleComm");
    return [...singleComm];
    default:
      return state;
  }
}
