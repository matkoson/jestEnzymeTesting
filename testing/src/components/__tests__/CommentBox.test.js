import React from "react";
import {mount, unmount} from "enzyme";
import CommentBox from "components/CommentBox";
import Root from "Root";


let wrapped;
beforeEach(() => {
  wrapped = mount(<Root><CommentBox /></Root>);

});

afterEach(() => {
  wrapped.unmount();

});


it("has a text area and a button", ()=> {

  expect(wrapped.find("textarea").length).toEqual(1);
  expect(wrapped.find("button").length).toEqual(1);
});


describe("the <textarea>", ()=> {
  beforeEach(()=> {
    wrapped.find("textarea").simulate("change", {
    target: {value:"new comment"}
    });
    wrapped.update();
  });

  it("has a text area, that user can type in", ()=> {

    expect(wrapped.find("textarea").prop("value")).toEqual("new comment");
  });

  it("txt is being typed into <textarea>, submit is done correcty, the field is emptied", ()=> {
    wrapped.find("form").simulate("submit");


    expect(wrapped.find("textarea").prop("value")).toEqual("");
  });
});
