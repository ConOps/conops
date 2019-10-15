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
        //replaces the state with the new inputs
        let edit = {
            TagID: this.props.info.TagID,
            TagName: this.props.info.TagName,
        }
        //send the edit state back to the saga
        console.log('edit', edit);
        this.props.dispatch({
            type: 'EDIT_TAG',
            payload: edit
        })
        //sends you back to Tags component
        this.props.history.push(`/tags`)

    }


    render() {
        
        return (
          <>
            <div style={{ textAlign: "center" }}>
              <h1>Rename your Tag!</h1>
              <form>
                <TextField
                  label="Edit Tag"
                  InputLabelProps={{ shrink: this.props.info.TagName }}
                  value={this.props.info.TagName}
                  onChange={event =>
                    this.props.dispatch({
                      type: "UPDATE_PROPERTY",
                      payload: { key: "TagName", newValue: event.target.value }
                    })
                  }
                />

                <div style={{ marginTop: "3%" }}>
                  <Button
                    style={{ marginRight: "3%" }}
                    variant="contained"
                    color="secondary"
                    onClick={() => {
                      this.props.history.push(`/tags`);
                    }}
                  >
                    Cancel
                  </Button>
                  {this.props.user.authorization === 4 && (
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={this.edit}
                    >
                      Save Changes
                    </Button>
                  )}
                </div>
              </form>
            </div>
          </>
        );
    }
}
const mapStateToProps = (reduxStore) => {
    return {
       info: reduxStore.TagDetailReducer,
       user: reduxStore.user
    }
}
export default connect(mapStateToProps)(EditTag);