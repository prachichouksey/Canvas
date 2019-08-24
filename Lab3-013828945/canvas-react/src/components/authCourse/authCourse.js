import React, { Component } from "react";
import CreateCourse from "./createCourse";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";

class AuthCourse extends Component {
  render() {
    return (
      <Tabs>
        <TabList>
          <Tab>Create Course</Tab>
        </TabList>

        <TabPanel>
          <CreateCourse />
        </TabPanel>
      </Tabs>
    );
  }
}

export default AuthCourse;
