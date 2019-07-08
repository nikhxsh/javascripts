import React, { Component } from 'react';

class AddQuestionForm extends Component{
    render(){
        return <div>
            <h1>Add Question Form</h1>
            <p>{JSON.stringify(this.props.match)}</p>
        </div>
    }
}

export default AddQuestionForm;