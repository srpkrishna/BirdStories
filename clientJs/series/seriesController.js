import { connect } from 'react-redux'
import View from './seriesView'
import  Actions from './seriesActions';
import SA from '../util/analytics';

const mapStateToProps = (state) => {
  return {
    seriesList: state.seriesList,
    isFetching:state.isFetching,
    reachedEnd:state.reachedEnd
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    showMoreSeries:() => {
      const obj = Actions.getMoreSeries();
      dispatch(obj);
      SA.sendEvent('Home','showmore','series');
    }
  }
}

const SeriesContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(View)

export default SeriesContainer
