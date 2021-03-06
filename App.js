import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Alert,StyleSheet, Text, View,TextInput, TouchableOpacity,FlatList} from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import {listStudents} from './components/listStudents';

 class Home  extends React.Component {
  //Denificion del constructor y sus variables de estado
  constructor(props) {

    super(props)
  // variables de estado  
    this.state = {
      Student_ID: '',
      Student_Name: '',
      Student_Class: '',
      Student_Phone_Num: '',
      Student_Email: '',
      dataSource:[]
    }

  }

  //Metodos
  refreshStudent() {
    fetch(`http://localhost:8081/apireactnativeacademic/ShowAllStudentsList.php`)
    .then((response) => response.json())
    .then ((responseJson)=>{
      this.setState({
        dataSource: responseJson
      })
    })
  }
  
  //Al cargar todos los componentes de la interfaz 
  componentDidMount() {
     this.refreshStudent();
  }
  
  //Agregar un estudiante
  InsertStudent =()=>{
    fetch(`http://localhost:8081/apireactnativeacademic/InsertStudentData.php`,{
      method:'POST',
      headers:{
        'Accept':'application/json',
        'Content-Type':'application/json',
      },
      body:JSON.stringify({
        student_name: this.state.Student_Name,
        student_class:this.state.Student_Class,
        student_phone_num: this.state.Student_Phone_Num,
        student_email: this.state.Student_Email
      })

    })
    .then((response)=> response.json())
    .then((responseJson)=>{
      alert ("Estudiante agregado correctamente..."+ responseJson)
      this.refreshStudent()
    })
    .catch((error) => {
      console.error(error)
    })
  }


  //Buscar estudiante mediante un Id
  SearchStudent =()=>{
    fetch(`http://localhost:8081/apireactnativeacademic/ShowStudentxId.php`,{
      method: 'POST',
      headers: {
        "Accept":"application/json",
        "Content-Type":"application/json"
      },
      body:JSON.stringify({
        student_id:this.state.Student_ID
      })
    })
    .then((response) => response.json())
    .then((responseJson)=>{
      this.setState({
        Student_Name:responseJson[0]['student_name'],
        Student_Class:responseJson[0]['student_class'],
        Student_Phone_Num:responseJson[0]['student_phone_num'],
        Student_Email:responseJson[0]['student_email']
      })
    })

    .catch((error)=>{
      alert("Id del estudiante no se encuentra");
      //limpiar informacion de los controles
      this.setState({
        Student_ID:'',
        Student_Name:'',
        Student_Class:'',
        Student_Phone_Num:'',
        Student_Email: ''
      })
    })
  }

  //Actualizar estudiante por ID 
  UpdateStudent =() => {
    fetch(`http://localhost:8081/apireactnativeacademic/UpdateStudentRecord.php`,{
      method: 'PUT',
      headers:{
        "Accept":"application/json",
        "Content-Type":"application/json"
      },
      body:JSON.stringify({
        student_id:this.state.Student_ID,
        student_name: this.state.Student_Name,
        student_class: this.state.Student_Class,
        student_phone_num: this.state.Student_Phone_Num,
        student_email: this.state.Student_Email
      })
    })
    .then((response) => response.json())
    .then((responseJson)=>{
      alert(responseJson);
      this.refreshStudent()
    })

    .catch((error)=>{
      console.error(error)
    })
  }

  //Eliminar por Id
  DeleteStudent =()=>{
    fetch(`http://localhost:8081/apireactnativeacademic/DeleteStudentRecord.php`,{
      method: 'POST',
      headers :{
        "Accept":"application/json",
        "Content-Type":"application/json"
      },
      body:JSON.stringify({
        student_id:this.state.Student_ID
      })
    })
    .then((response) => response.json())
    .then((responseJson)=>{
      alert(responseJson);
      this.refreshStudent()
    })
    .catch((error)=>{
      console.error(error)
    })
  }


  render() {
    return (
      <View style={styles.MainContainer}>
        <Text style={{ fontSize: 20, textAlign: 'center', marginBottom: 7 }}> Registro de Estudiante </Text>
        <TextInput
          placeholder="Ingrese el Id del estudiante"
          onChangeText={TextInputValue => this.setState({ Student_ID: TextInputValue })}
          underlineColorAndroid='transparent'
          style={styles.TextInputStyleClass}
          value={this.state.Student_ID}
        />
        <TextInput
          placeholder="Ingrese el nombre del estudiante"
          onChangeText={TextInputValue => this.setState({Student_Name: TextInputValue })}
          underlineColorAndroid='transparent'
          style={styles.TextInputStyleClass}
          value={this.state.Student_Name}
          autoFocus={true}
         
          
        />
        <TextInput
          placeholder="Ingrese la clase del estudiante"
          onChangeText={TextInputValue => this.setState({ Student_Class: TextInputValue })}
          underlineColorAndroid='transparent'
          style={styles.TextInputStyleClass}
          value={this.state.Student_Class}
        />
        <TextInput
          placeholder="Ingrese n??mero de tel??fono"
          onChangeText={TextInputValue => this.setState({ Student_Phone_Num: TextInputValue })}
          underlineColorAndroid='transparent'
          style={styles.TextInputStyleClass}
          value={this.state.Student_Phone_Num}
          
        />
        <TextInput
          placeholder="Ingrese el correo electr??nico"
          onChangeText={TextInputValue => this.setState({ Student_Email: TextInputValue })}
          underlineColorAndroid='transparent'
          style={styles.TextInputStyleClass}
          value={this.state.Student_Email}
         
          
        />
        <TouchableOpacity activeOpacity={.4} style={styles.TouchableOpacityStyle} onPress={this.InsertStudent} >
          <Text style={styles.TextStyle}> Agregar </Text>
        </TouchableOpacity>
        <TouchableOpacity activeOpacity={.4} style={styles.TouchableOpacityStyle} onPress={this.SearchStudent} >
          <Text style={styles.TextStyle}> Buscar </Text>
        </TouchableOpacity>
        <TouchableOpacity activeOpacity={.4} style={styles.TouchableOpacityStyle} onPress={this.UpdateStudent} >
          <Text style={styles.TextStyle}> Actualizar </Text>
        </TouchableOpacity>
        <TouchableOpacity activeOpacity={.4} style={styles.TouchableOpacityStyle} onPress={this.DeleteStudent} >
          <Text style={styles.TextStyle}> Eliminar </Text>
        </TouchableOpacity>
        <TouchableOpacity activeOpacity={.4} style={styles.TouchableOpacityStyle} >
          <Text style={styles.TextStyle}> Listar </Text>
        </TouchableOpacity>
    

      </View>
    );
  }
}
const RootStack = createStackNavigator(
  {
    Inicio: Home,
    Estudiantes:listStudents,
    //Sesion:Users
  },
  {
    initialRouteName: 'Inicio',
  }
);

const AppContainer = createAppContainer(RootStack);

export default class App extends React.Component {
  render() {
    return <AppContainer />;
  }
}

const styles = StyleSheet.create({

  MainContainer: {

    alignItems: 'center',
    flex: 1,
    paddingTop: 30,
    backgroundColor: '#fff'

  },

  TextInputStyleClass: {

    textAlign: 'center',
    width: '90%',
    marginBottom: 7,
    height: 40,
    borderWidth: 1,
    borderColor: '#FF5722',
    borderRadius: 5,

  },

  TouchableOpacityStyle: {

    paddingTop: 10,
    paddingBottom: 10,
    borderRadius: 5,
    marginBottom: 7,
    width: '80%',
    backgroundColor: 'grey'

  },

  TextStyle: {
    color: '#fff',
    textAlign: 'center',
  },

  rowViewContainer: {
    fontSize: 20,
    paddingRight: 10,
    paddingTop: 10,
    paddingBottom: 10,
  }

});
