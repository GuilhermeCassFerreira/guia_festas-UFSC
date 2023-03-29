import * as React from 'react';
import { Text, View, StyleSheet, Button, ActivityIndicator, Image, ScrollView, FlatList, TouchableOpacity } from 'react-native';
import Events from './Events.json';
import AsyncStorage from '@react-native-async-storage/async-storage';
 
export default class ContactListScreen extends React.Component {
  static navigationOptions = {
    title: 'Cursos',
  };
 
  constructor(props){
    super(props);
    this.state = {
      isLoading: true,
      eventsFav: '1,2,4'
    }
    AsyncStorage.getItem('guiaEventosUfsc_fav').then(
      value => {
        if(value){
          this.setState({ eventsFav: value }); 
        } else {
          this.setState({eventsFav: ''});
        }
      }
    );
    cleanFavs = () => {
      AsyncStorage.setItem('guiaEventosUfsc_fav', '');
      alert("Lista de eventos favoritos limpa!");
    };
  }

  componentDidMount(){
    const { navigation } = this.props;
    let favoritos = [];

    this.focusListener = navigation.addListener('didFocus', () => {
      Events.forEach(item => {
        if (this.state.eventsFav.includes(item.codigo)) {
          favoritos = [...favoritos, item];
        }
      });
      this.setState({
        isLoading: false,
        events: favoritos,
      });
      return
    })
  }
 
  componentWillUnmount() {
    this.focusListener.remove();
  } 
 
  render() {
    if(this.state.isLoading){
      return(
        <View style={{flex: 1, padding: 20}}>
          <ActivityIndicator/>
        </View>
      )
    }
 
    const {navigate} = this.props.navigation;
    return(
      <ScrollView style={styles.container}>
        <FlatList
          data={this.state.events}
          renderItem={({item}) =>
          <TouchableOpacity onPress={ () => navigate('CourseDetails', {events: item})}>
            <View style={styles.curso}>
              <Image style={styles.logo} source={{uri: item.fotos[0].url}} />
              <View style={{padding: 10}}>
                <Text style={styles.contact}>{item.name}</Text>
                <Text>
                  {item.campus}{'\n'}
                  {item.data}
                </Text>
              </View>
            </View>
          </TouchableOpacity>}
        />
        <Button title="Limpar Favoritos" onPress={cleanFavs} />
        <Button title="Voltar" onPress={() => navigate('Home')} />
        </ScrollView>
    );
  }
}
 
const styles = StyleSheet.create({
  container: {
   padding: 15
  },
  contact: {
    fontSize: 18
  },
  curso: {
    flex: 1,
    flexDirection: "row",
    padding: 10
  },
  logo: {
    height: 70,
    width: 50,
  },
})