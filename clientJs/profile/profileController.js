import { connect } from 'react-redux'
import View from './profileView'

const mapStateToProps = (state) => {
  return {
    stories:state.stories,
    author:state.author
  }
}

const Container = connect(
  mapStateToProps
)(View)


export default Container
