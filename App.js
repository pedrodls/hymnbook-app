/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {Component} from 'react';

import { Container, Header, List, ListItem, Item, Input,Left, Body, Right, Thumbnail, Text, Icon } from 'native-base';
import { ActivityIndicator, FlatList, View } from 'react-native';

import _ from 'lodash'

export default class App extends Component {

  constructor(props){
    super(props)

      this.state={
        data: [],
        fullData: [],
        loading: false,
        errors: null,
        query: ""
    }
  }

  componentDidMount(){
    this.requestApiPhotos()
  }

  requestApiPhotos(){
    this.setState({loading: true})
    
    const apiURL = "http://192.168.100.13:8800/api/v1/hymns"
    
    fetch(apiURL).then((res) => res.json())
    .then((resJson) => {
      this.setState({
        loading: false,
        data: _.sortBy(resJson.data, 'number'),
        fullData: _.sortBy(resJson.data, 'number')
      })
    })
    .catch(error => {
      this.setState({error, loading: false})
    })

  }

  renderFooter = () => {
    if(!this.state.loading) return null
    return (
      <View style={{paddingVertica: 20, borderTopWidth: 1, borderColor: "#CED0CE"}}>
        <ActivityIndicator animating size="large"/>
      </View>
    )
  }

  _renderItem = ({item, index}) => {
    return(
      <ListItem avatar>
        <Left>
          <Text>{item.number}</Text>
        </Left>
        <Body>
          <Text>{item.title}</Text>
        </Body>
      </ListItem>
    );
  }

  handleSearch = (text) => {
    const formattedQuery = text.toLowerCase()
    const data = _.filter(this.state.fullData, data => {
      if(data.title.toLowerCase().includes(formattedQuery) || data.number == text){
        return true
      }
      return false
    })
    this.setState({data, query: text})
  }
  
  render(){
    return(
      <Container>
      <Header searchBar rounded>
        <Item>
          <Input placeholder="Search hymn by number or title" 
                 onChangeText={this.handleSearch}        
          />
        </Item>
      </Header>
      <List>
        <FlatList 
          data={this.state.data}
          renderItem={this._renderItem}
          keyExtractor={(item, index) => index.toString()}
          ListFooterComponent={this.renderFooter}
        />            
      </List>
    </Container>
    );
  }
}