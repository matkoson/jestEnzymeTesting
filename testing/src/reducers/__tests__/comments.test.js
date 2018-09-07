import commentsReducer from "reducers/comments";
import {SAVE_COMMENT} from "actions/types";



it("handles actions of type SAVE_COMMENT", ()=> {
  const action = {
    type: SAVE_COMMENT,
    payload: "New Comment"
  };
  const newState = commentsReducer([], action);
    expect(newState).toEqual(["New Comment"]);
})

it("handles unknown .typeS properly =returns the previous piece of redux state", ()=> {
  const action = {
    type: "",
    payload: ""
  };
   const newState = commentsReducer([], action);
    expect(newState).toEqual([]);
});
