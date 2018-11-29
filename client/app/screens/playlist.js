import { Fab, Icon } from 'native-base'
import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { Text } from 'react-native'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import styled from 'styled-components'

import MusicsList from '../components/musicsList'

import allTheActions from '../actions'

const BackgroundView = styled.View`
  flex: 1;
  background-color: ${props => props.theme.color.secondary};
`

const ScrollMusic = styled.ScrollView`
  padding: 10px;
`

class Playlist extends Component {
  static propTypes = {
    navigation: PropTypes.object,
    actions: PropTypes.object,
    musics: PropTypes.array
  }

  componentDidMount() {
    const { navigation, actions } = this.props
    const playlist = navigation.getParam('playlist', undefined)

    actions.musics.loadMusic(playlist._id)
  }

  componentWillUnmount() {
    const { actions } = this.props

    actions.musics.unloadMusic()
  }

  render() {
    const { navigation, musics } = this.props
    const playlist = navigation.getParam('playlist', undefined)
    if (!playlist) navigation.navigate('Home')

    return (
      <BackgroundView>
        <ScrollMusic>
          <MusicsList musics={musics} navigation={navigation}/>
          <Text/>
        </ScrollMusic>

        <Fab
          style={{ backgroundColor: '#5067FF' }}
          position="bottomRight"
          onPress={() => navigation.navigate('AddMusic', { playlist })}>
          <Icon name="add"/>
        </Fab>

        <Fab
          style={{ backgroundColor: '#5067FF' }}
          position="bottomLeft"
          onPress={() => navigation.navigate('Player', { playlist })}>
          <Icon name="play"/>
        </Fab>
      </BackgroundView>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  actions: {
    musics: bindActionCreators(allTheActions.musics, dispatch)
  }
})

const mapStateToProps = state => {
  return {
    musics: state.musics.musics
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Playlist)
