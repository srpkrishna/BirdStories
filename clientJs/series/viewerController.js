import { connect } from 'react-redux'
import View from '../viewer/viewerView'
import  Actions from './seriesActions';

const mapStateToProps = (state) => {

  return {
    content: state.selectedContent,
    story:state.selectedSeries,
    author:state.selectedAuthor,
    authorLink:state.authorLink,
    comments:state.selectedSeriesComments,
    episode:state.selectedEpisode
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
    },
    getEpisodeContent(authorId,name,episode){
       const obj = Actions.getSeriesContent(authorId,name,episode);
       dispatch(obj);
    }
  }
}

const Container = connect(
  mapStateToProps,
  mapDispatchToProps
)(View)

export default Container
