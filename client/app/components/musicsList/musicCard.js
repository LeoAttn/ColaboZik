import { Body, Card, CardItem, Left, Text, Thumbnail } from 'native-base'
import PropTypes from 'prop-types'
import React, { Component } from 'react'
import styled from 'styled-components'

import DislikeButton from './dislikeButton'


const RightCard = styled.View`
  align-items: center;
`

export default class MusicCard extends Component {
  static propTypes = {
    music: PropTypes.object,
    actions: PropTypes.object
  }

  render() {
    const { music } = this.props
    const { title, thumbnail, dislike } = music
    console.log(music);
    console.log(dislike);
    console.log(dislike.length);

    return (
      <Card>
        <CardItem>
          <Left>
            <Thumbnail square large source={{ uri: thumbnail }}/>
            <Body header>
              <Text>{title}</Text>
            </Body>
          </Left>

          <RightCard>
            <DislikeButton music={music}/>
            <Text style={{ color: dislike.length > 0 ? 'red' : 'black' }}>{dislike.length}</Text>
          </RightCard>
        </CardItem>
      </Card>
    )
  }
}
