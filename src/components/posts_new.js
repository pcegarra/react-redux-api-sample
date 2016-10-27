import React,{Component,PropTypes} from 'react';
import {reduxForm} from 'redux-form';
import {createPost} from '../actions/index';
import {Link} from 'react-router';
import _ from 'lodash';

const FIELDS = {
  title:{
    type:'input',
    label:'Title for Post'
  },
  categories:{
    type:'input',
    label:'Enter some categories for this post'
  },
  content:{
    type:'textarea',
    label:'Post Contents'
  }
}

class PostsNew extends Component {

  static contextTypes = {
    router: PropTypes.object
  }





  render(){

    // se puede hacer de las dos formas:
    //const handleSubmit = this.props.handleSubmit;
    //const title = this.props.fields.title;
    const {handleSubmit} = this.props;

    return (
      <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
        <h3>Create a new post</h3>

        {_.map(FIELDS,this.renderField.bind(this))}

        <Link to="/" className="btn btn-danger">Cancelar</Link>
        <button type="submit" className="btn btn-primary">Submit</button>

      </form>
    );
  }

  renderField(fieldConfig, field){
    const fieldHelper = this.props.fields[field];

    return(
      <div
       className={`form-group ${fieldHelper.touched && fieldHelper.invalid ? 'has-danger':''}`}>
        <label>{fieldConfig.label}</label>
        <fieldConfig.type type="text" className="form-control" {...fieldHelper}/>
        <div className="text-help">
          {fieldHelper.touched ? fieldHelper.error:''}
        </div>
      </div>
    );
  }

  onSubmit(props){
    this.props.createPost(props).then( () => {
        //post created:
        this.context.router.push('/');
    });
  }

}

function validate(values){
  const errors = {};

  _.each(FIELDS, (type,field) => {
    if(!values[field]){
      errors[field] = `Enter a ${field}`;
    }
  });

  return errors;
}

export default reduxForm({
  form:'PostsNewForm',
  fields: _.keys(FIELDS),
  validate
},null,{createPost})(PostsNew);
