import { connect } from 'react-redux'
import View from './viewerView'
import  Actions from '../storiesActions';

const mapStateToProps = (state,ownprops) => {
  return {
    content: state.content,
    story:ownprops.story
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

const Container = connect(
  mapStateToProps,
  mapDispatchToProps
)(View)

export default Container
