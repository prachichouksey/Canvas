import React, {Component} from "react";
import axios from "axios";

class Announcement extends Component {
    constructor(props) {
        super(props);
        this.state = {
            announcement: []
        };
    }

    componentDidMount() {
        axios
            .get("http://localhost:4000/announcement/all", {
                params: {
                    courseid: this.props.courseid
                }
            })
            .then(response => {
                if (response.status === 200) {
                    console.log(response.data);
                    this.setState({
                        announcement: response.data
                    });
                }
            });
    }

    render() {
        let announcementlist = this.state.announcement;
        let announcements = null;
        if (announcementlist != null) {
            announcements = announcementlist.map(announcement => {
                return (
                    <div className="col-3 mt-3 mb-3" key={announcement.annid}>
                        <div className="border announcements">
                            <div>
                                <b>{announcement.heading}</b>
                            </div>
                            <div>{announcement.details}</div>
                        </div>
                    </div>
                );
            });
        }
        let userType = localStorage.getItem("userid");
        return (

            <div >
         {
          userType === "Faculty" ? (
          <button style={{
    "padding":" 10px",
    "border":" 0",
    "border-radius":" 2px",
    "background-color":" rgb(0, 85, 162)",
    "color":" white",
    "font-weight":" bolder",
    "cursor":"pointer"
}} >Create Announcement</button>
        ) : (
          <div />
        )}

      
            <div>{announcements}</div>
            </div>);
    }
}

export default Announcement;
