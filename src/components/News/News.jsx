import React, {Component} from 'react';
import {connect} from 'react-redux';
import TextField from '@material-ui/core/TextField'
class News extends Component {
    render(){
        return (
          <div>
            <p>News</p>
            <TextField
              label="Convention News"
              InputLabelProps={{ shrink: this.props.reduxStore.homePageReducer.ConventionNews}}
              value={this.props.reduxStore.homePageReducer.ConventionNews}
              onChange={event =>
                this.props.dispatch({
                  type: "EDIT_DETAIL_MIDDLE_NAME",
                  payload: event.target.value
                })
              }
            ></TextField>
          </div>
        );
}}

const mapStateToProps = reduxStore => {
    return{
        reduxStore
    };
}
export default connect(mapStateToProps)(News);