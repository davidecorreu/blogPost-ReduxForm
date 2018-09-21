import React , {Component} from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchPosts } from '../actions';
import _ from 'lodash';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

class PostsIndex extends Component {
  componentDidMount() {
    this.props.fetchPosts();
  }

  renderPosts() {
    return _.map(this.props.posts, post =>
      <li key={post.id} className="list-group-item">
        <Link to={`/posts/${post.id}`}>{post.title}</Link>
      </li>);
  }

  render() {
    const transitonOptions = {
      transitionName: 'fade',
      transitionEnterTimeout: 500,
      transitionLeaveTimeout: 500
    }

    return (
      <div>
        <div className="text-xs-right">
          <Link className="btn btn-primary" to="/posts/new">
            Add a Post
          </Link>
        </div>
        <h3>Posts</h3>
        <ul className="list-group">
          <ReactCSSTransitionGroup {...transitonOptions}>
            {this.renderPosts()}
          </ReactCSSTransitionGroup>
        </ul>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  posts: state.posts
})

export default connect(mapStateToProps, { fetchPosts })(PostsIndex);
