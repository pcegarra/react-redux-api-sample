import React,{Component,PropTypes} from 'react';
import {Link} from 'react-router';
import {connect} from 'react-redux';
import {fetchPost,deletePost} from '../actions/index';

class PostsShow extends Component {

  static contextTypes = {
    router:PropTypes.object
  };

  componentWillMount(){
    this.props.fetchPost(this.props.params.id);
  }

  render(){

    const {post} = this.props;

    if(!this.props.post){
      return <div>Loading...</div>
    }
    return (
      <div>
        <Link to="/">Volver</Link>
        <button
          onClick={this.onDeleteClick.bind(this)}
          className="btn btn-danger pull-xs-right">
          Borrar
        </button>
        <h3>{post.title}</h3>
        <h6>Categories:{post.categories}</h6>
        <p>{post.content}</p>
      </div>
    );
  }

  onDeleteClick(){
    this.props.deletePost(this.props.params.id).then( () => {
      this.context.router.push('/');
    });
  }
}

function mapStateToProps(state){
  return {post:state.posts.post};
}

export default connect(mapStateToProps, {fetchPost,deletePost})(PostsShow);
