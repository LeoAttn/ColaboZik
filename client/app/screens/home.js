import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Fab, Icon } from 'native-base'
import { Text } from 'react-native'
import PropTypes from 'prop-types'
import React, { Component } from 'react'
import styled from 'styled-components'

import PlaylistsList from '../components/playlistsList'

import allTheActions from '../actions'

const BackgroundView = styled.View`
  flex: 1;
  background-color: ${props => props.theme.color.background};
`

const ScrollPlaylists = styled.ScrollView`
  padding: 10px;
`

const StyledFab = styled(Fab)`
  background-color: ${props => props.theme.color.button};
`

class Home extends Component {
  static propTypes = {
    actions: PropTypes.object,
    navigation: PropTypes.object,
    playlists: PropTypes.array,
    theme: PropTypes.object,
    user: PropTypes.object
  }

  componentDidMount() {
    const { actions, user } = this.props

    actions.playlists.loadPlaylists(user)
  }

  _addPlaylistPress = () => {
    const { navigation } = this.props

    navigation.navigate('AddPlaylist')
  }

  render() {
    const { navigation, playlists } = this.props

    return (
      <BackgroundView>
        <ScrollPlaylists>
          <PlaylistsList playlists={playlists} navigation={navigation}/>
          <Text/>
        </ScrollPlaylists>

        <StyledFab position="bottomRight" onPress={this._addPlaylistPress}>
          <Icon name="add"/>
        </StyledFab>
      </BackgroundView>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  actions: {
    playlists: bindActionCreators(allTheActions.playlists, dispatch)
  }
})

const mapStateToProps = state => ({
  playlists: state.playlists.playlists,
  theme: state.themes.currentTheme,
  user: state.feathers.user
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home)
