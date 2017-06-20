/**
 * Client tests
 */
import React from "react";
import { shallow } from "enzyme";

import TableComponent from "src/components/table-component";

describe("components/table-component", () => {

  describe("Mounting", () => {

    it("should render into the document", () => {
      const component = shallow(<TableComponent />);
      expect(component).to.not.be.null;
    });

  });

});
