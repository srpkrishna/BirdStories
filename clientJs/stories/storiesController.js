import { connect } from 'react-redux'
import View from './storiesView'
import  Actions from './storiesActions';

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
    }
  }
}

const StoriesContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(View)

export default StoriesContainer
