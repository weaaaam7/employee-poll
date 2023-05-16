import { render } from "@testing-library/react";
import * as React from "react";
import { MemoryRouter as Router } from "react-router-dom";
import DBCard from "../DBCard";

describe("DBCard", () => {
  it("snapshot matched", () => {
    const component = render(
      <Router>
        <DBCard />
      </Router>
    );
    expect(component).toMatchSnapshot();
  });
});
