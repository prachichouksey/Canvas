import React, {Component} from 'react';
import './InputBoxStyle.css'

class InputBox extends Component {
    render() {
        let {display, value, onChange, name} = this.props;
        return (
            <div className={'InputBox-Container'}>
                <input
                    type="number"
                    placeholder={display}
                    value={value}
                    onChange={onChange.bind(this, name)}
                />
            </div>
        );
    }
}

export default InputBox;
