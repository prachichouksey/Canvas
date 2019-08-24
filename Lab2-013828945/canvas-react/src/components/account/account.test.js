import React from "react";
import Account from "./account";
import renderer from "react-test-renderer";
import { mount, shallow, render } from "enzyme";
import { configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
configure({ adapter: new Adapter() });

it("should render correctly", () => {
  const component = mount(<Account />);
  expect(component).toMatchSnapshot();
});
