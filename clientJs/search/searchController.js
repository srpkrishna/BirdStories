import { connect } from 'react-redux'
import View from './searchView'
import Actions from './searchActions';
import SA from '../util/analytics';

const mapStateToProps = (state) => {
  return {
    searchText:state.searchText,
    stories:state.stories,
    authors:state.authors
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    handleChange: (event) => {
      var value = event.target.value.toLowerCase();
      SA.sendEvent('Search','searching',value);
      const obj = Actions.search(value);
      dispatch(obj)
    }
  }
}

const Container = connect(
  mapStateToProps,
  mapDispatchToProps
)(View)


export default Container
