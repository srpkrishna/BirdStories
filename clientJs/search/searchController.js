import { connect } from 'react-redux'
import View from './searchView'

const mapStateToProps = (state) => {
  return {
    stories:state.stories,
    authors:state.authors
  }
}

const SearchContainer = connect(
  mapStateToProps
)(View)


export default SearchContainer
