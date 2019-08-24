import React, { Component } from "react";

import ViewCourses from "./viewCourses";

import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";

class Enroll extends Component {
  render() {
    return (
      <Tabs>
        <TabList>
          <Tab>Enroll Course</Tab>
        </TabList>

        <TabPanel>
          <ViewCourses />
        </TabPanel>
      </Tabs>
    );
  }
}

export default Enroll;
