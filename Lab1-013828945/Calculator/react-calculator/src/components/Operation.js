import React, {Component} from 'react';
import './OperationStyle.css'

class Operation extends Component {
    render() {
        return (
            <div className="Operation-container">
                <button onClick={this.props.onClick.bind(this, this.props.name)}>{this.props.display}</button>
            </div>
        );
    }
}

export default Operation;
