import React, { Component } from 'react';
import { connect } from 'react-redux';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
class EditTag extends Component {


    state={
        
    }


    createTag = (event) => {
        event.preventDefault();
        
        //send the editted state back to the saga
        
        this.props.dispatch({
            type: 'CREATE_TAG',
            payload: {TagName: this.state.TagName}
        })
        //sends you back to Tags
        this.props.history.push(`/tags`)

    }


    render() {

        return (
            <>


                <div style={{ textAlign: "center" }}>
                    <h1>Create your Tag!</h1>
                    <form >
                      <TextField 
                      label="TagName"
                      onChange={(event) => this.setState({...this.state, TagName: event.target.value})}
                      />

                        

                        <div style={{marginTop:"3%"}}>
                            <Button style={{marginRight:"3%"}} variant="contained" color="secondary" onClick={() => { this.props.history.push(`/tags`) }} >Cancel</Button>
                            <Button variant="contained" color="primary" onClick={this.createTag} >Save Tag</Button>
                        </div>
                    </form>
                </div>
            </>
        );
    }
}
const mapStateToProps = (reduxStore) => {
    return {
        info: reduxStore.TagDetailReducer
    }
}
export default connect(mapStateToProps)(EditTag);