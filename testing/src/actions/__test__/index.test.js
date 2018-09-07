import {saveComment} from "actions";
import {SAVE_COMMENT} from "actions/types";

describe("saveComment",()=> {
  const newAct = saveComment("comment");
  it("has the correct type", ()=> {
    expect(newAct.type).toEqual(SAVE_COMMENT)

  });
  it("has the correct payload", ()=> {
    expect(newAct.payload).toEqual("comment")
  });
});
