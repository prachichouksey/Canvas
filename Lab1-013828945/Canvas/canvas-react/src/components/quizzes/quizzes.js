import React, {Component} from 'react';
import QuizDetails from './QuizDetails'
import axios from 'axios'

class Quizzes extends Component {
    constructor(props) {
        super(props);
        this.state = {
            quizzesList: [],
            questionsList:[],
            currentQuiz: null,
            showDetails: false
        };
        this.showDetailsHandler = this.showDetailsHandler.bind(this);
        this.hideDetailsHandler = this.hideDetailsHandler.bind(this);
    }

    componentDidMount() {
    axios.get("http://localhost:4000/quizzes/all", {
        params: {
          courseid: this.props.courseid,
        }
      })
      .then(response => {
        response.status === 200 &&
          this.setState({ quizzesList: response.data });
      });
  }

    showDetailsHandler(currentQuiz) {
        this.setState({
            showDetails: true,
            currentQuiz: currentQuiz
        });
        axios.get("http://localhost:4000/quizzes/questions", {
            params: {
                quizid: currentQuiz.quizid,
            }
        })
        .then(response => {
            response.status === 200 &&
            this.setState({ questionsList: response.data });
        });
    }

    hideDetailsHandler() {
        this.setState({showDetails: false});
    }

    // componentDidMount() {
    //     //todo: add server call
    //     this.setState({
    //         quizzesList: [{id: "1", title: "Quiz1"}, {id: "2", title: "Quiz2"}]
    //     })
    // }

    render() {
        return (
            <div>
                {
                    !this.state.showDetails ?
                        this.state.quizzesList.map(quiz => {
                            return (
                                <div
                                    className="col-3 mt-3 mb-3"
                                    key={quiz.quizid}
                                    onClick={this.showDetailsHandler.bind(this, quiz)}>
                                    <div className="border quiz">
                                        <div>{"Quiz "+quiz.quizid}</div>
                                    </div>
                                </div>
                            );
                        }) :
                        <QuizDetails questions={this.state.questionsList} onClose={this.hideDetailsHandler} detail={this.state.currentQuiz}/>
                }
            </div>
        );
    }
}

export default Quizzes;
