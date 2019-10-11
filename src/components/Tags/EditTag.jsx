import React, { Component } from 'react';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import TextField from "@material-ui/core/TextField"
class EditTag extends Component {



    componentDidMount() {
        this.fetchTagInformation();
    }


    fetchTagInformation = () => {
        let id = this.props.match.params.id;
        this.props.dispatch({
            type: 'FETCH_TAG_INFO',
            payload: id
        });

    }


    edit = (event) => {
        event.preventDefault();
        //replaces the state with the new imputs
        let edit = {
            TagID: this.props.reduxStore.TagDetailReducer.TagID,
            TagName: this.props.reduxStore.TagDetailReducer.TagName,
        }
        //send the editted state back to the saga
        console.log('edit', edit);
        this.props.dispatch({
            type: 'EDIT_TAG',
            payload: edit
        })
        //sends you back to admin
        this.props.history.push(`/tags`)

    }


    render() {
        
        return (
            <>


                <div style={{ textAlign: "center" }}>
                    <h1>Edit Tag</h1>
                    <form >
                        <p>Rename your Tag:</p>
                       
                        <TextField
                            label="Edit Tag"
                            value={this.props.info.TagName}
                            onChange={(event) => this.props.dispatch(
                                {
                                    type: 'UPDATE_PROPERTY',
                                    payload: { key: 'TagName', newValue: event.target.value }
                                }
                            )}
                        />
                        
                        <div>
                            <Button variant="contained" color="secondary" onClick={() => { this.props.history.push(`/tags`) }} >Cancel</Button>
                            <Button variant="contained" color="primary" onClick={this.edit} >Save Changes</Button>
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