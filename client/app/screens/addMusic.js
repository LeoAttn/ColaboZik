import { Button, Form } from 'native-base'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import React, { Component } from 'react'
import styled from 'styled-components'
import { Text } from 'react-native'
import YTSearch from 'youtube-api-search'

import InputLabeled from '../components/inputLabeled'
import VideosList from '../components/videosList'

import { API_KEY_YT } from '../../config'

const BackgroundView = styled.View`
  flex: 1;
  background-color: ${props => props.theme.color.background};
`

const ScrollPlaylists = styled.ScrollView`
  padding: 10px;
`

const Inputs = styled.View`
  width: 100%;
  padding: 10px;
`

const StyledButton = styled(Button)`
  background-color: ${props => props.theme.color.button};
`

class AddMusic extends Component {
  static propTypes = {
    navigation: PropTypes.object,
    theme: PropTypes.object
  }

  state = {
    search: '',
    videos: []
  }

  _handleChange = search => this.setState({ search })

  _handleKeyDown = e => {
    if (e.nativeEvent.key === 'Enter') this._search()
  }

  _search = () => {
    const { search } = this.state

    YTSearch({
      key: API_KEY_YT,
      term: search
    }, (videos) => this.setState({ videos }))
  }

  render() {
    const { navigation } = this.props
    return (
      <BackgroundView>
        <Inputs>
          <Form>
            <InputLabeled label='Recherche Youtube' icon='search'
                          onChange={this._handleChange}
                          onSubmit={this._search}/>
          </Form>
        </Inputs>
        <ScrollPlaylists>
          <VideosList videos={this.state.videos} navigation={navigation}/>
          <Text/>
        </ScrollPlaylists>
      </BackgroundView>
    )
  }
}

const mapStateToProps = state => ({
  theme: state.themes.currentTheme
})

export default connect(
  mapStateToProps
)(AddMusic)
