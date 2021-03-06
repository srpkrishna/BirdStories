import { connect } from 'react-redux'
import View from './authorView'

const mapStateToProps = (state) => {
  return {
    stories:state.stories,
    series:state.series,
    author:state.author
  }
}

const Container = connect(
  mapStateToProps
)(View)


export default Container
