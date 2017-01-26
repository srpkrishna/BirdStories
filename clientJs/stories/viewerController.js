import { connect } from 'react-redux'
import View from './viewer'
import  Actions from './storiesActions';

const mapStateToProps = (state) => {
  return {
    content: state.content
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    updateSocial: (index,key) => {
      const obj = Actions.updateSocial(index,key);
      dispatch(obj);
    }
  }
}

const StoriesContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(View)

export default StoriesContainer
