import { connect } from 'react-redux'
import View from './storiesView'
import  Actions from './storiesActions';
import SA from '../util/analytics';

const mapStateToProps = (state) => {
  return {
    stories: state.stories,
    isFetching:state.isFetching
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    showMoreStories:() => {
      const obj = Actions.getMoreStories();
      dispatch(obj);
      SA.sendEvent('Home','showmore','stories');
    }
  }
}

const StoriesContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(View)

export default StoriesContainer
