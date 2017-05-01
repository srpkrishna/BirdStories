import { connect } from 'react-redux'
import View from '../viewer/viewerView'
import  Actions from './storiesActions';

const mapStateToProps = (state) => {

  return {
    content: state.selectedContent,
    story:state.selectedStory,
    author:state.selectedAuthor,
    authorLink:state.authorLink,
    comments:state.selectedStoryComments
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    updateSocial: (element) => {
      const obj = Actions.updateSocial(element);
      dispatch(obj);
    },
    publishComment:(comment) => {
      const obj = Actions.publishComment(comment);
      dispatch(obj);
    },
    showMoreComments:() =>{
      const obj = Actions.getMoreComments();
      dispatch(obj);
    }
  }
}

const Container = connect(
  mapStateToProps,
  mapDispatchToProps
)(View)

export default Container
