import { connect } from 'react-redux'
import View from './viewerView'
import  Actions from '../storiesActions';

const mapStateToProps = (state) => {

  return {
    content: state.selectedContent,
    story:state.selectedStory,
    author:state.selectedAuthor,
    authorLink:state.authorLink
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    updateSocial: (element) => {
      const obj = Actions.updateSocial(element);
      dispatch(obj);
    }
  }
}

const Container = connect(
  mapStateToProps,
  mapDispatchToProps
)(View)

export default Container
