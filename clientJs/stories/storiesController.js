import { connect } from 'react-redux'
import View from './storiesView'
import  Actions from './storiesActions';

const mapStateToProps = (state) => {
  return {
    stories: state.stories,
    isFetching:state.isFetching
  }
}

// const mapDispatchToProps = (dispatch) => {
//   return {
//     updateSocial: (index,key) => {
//       const obj = Actions.updateSocial(index,key);
//       dispatch(obj);
//     }
//   }
// }

const StoriesContainer = connect(
  mapStateToProps
)(View)

export default StoriesContainer
