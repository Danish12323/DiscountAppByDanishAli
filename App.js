import React, { useState,useEffect } from 'react';
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  Button,
  ScrollView,
  TouchableOpacity,
  Alert,Modal,
  
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
var historylist = [];
const Homescreen = ({ navigation }) => {
  const [getam, setam] = useState('');
  const [getpm, setpm] = useState('');
  const [getscreen,setcreen]=useState(0)

  const [getdiscount, setdiscount] = useState(0);
  const [getfinalprice, setfinalprice] = useState(0);
  const [geterror1, seterror1] = useState('');
  const [gettempcheck,settempcheck]=useState(0)
  const [geterror2, seterror2] = useState('');

  const factcalculate = (am, pm) => {
    if (pm>=0 &&am >= 0 && pm <= 100) {
      setam(am);
      setpm(pm);
      let Amount = (pm / 100) * am;
      setfinalprice((am - Amount).toFixed(2));
      setdiscount(Amount.toFixed(2));
      seterror1("");
      seterror2("");
    } else if (isNaN(am)) {
      seterror1('Amount should be positive number');
    } else if (isNaN(pm)) {
      seterror2('Discount percent should be positive num');
    }
  };
  const saveitem = () => {
    var newobj = {
      key: Math.random().toString(),
      OrgAmount: getam,
      disc: getpm,
      finalamount: getfinalprice,
    };
    historylist.push(newobj);
    setam("");
    setpm("");

    console.log(historylist);
  };

const checkalready=(a1,a2)=>{
  var l = historylist.filter((item) => item.OrgAmount == a1 && item.disc==a2 );

if(l.length>0){
  return true
}
else{
  return false
}
}



  return (
    <View style={styles.container}>
      <View style={styles.wrapper}>
        <TextInput
          style={styles.textfield}
          placeholder="Enter original Amount"
          placeholderTextColor="white" 
          onChangeText={(am) => factcalculate(am, getpm)}
          value={getam}
        />
        <Text style={styles.errortext}> {geterror1} </Text>
        <TextInput
          style={styles.textfield}
          placeholder="Enter discount %"
          placeholderTextColor="white" 
          onChangeText={(pm) => factcalculate(getam, pm)}
          value={getpm}
        />
        <Text style={styles.errortext}> {geterror2} </Text>

        <View style={styles.result}>
          <Text style={styles.fact}> Final Amount </Text>
          <Text style={styles.fact,{color:"white",fontSize:15}}> {getfinalprice} </Text>
        </View>

        <View style={styles.result}>
          <Text style={styles.fact}> Saved Amount </Text>
          <Text style={styles.fact,{color:"white",fontSize:15}}> {getdiscount} </Text>
        </View>

        <View style={{marginTop: 15,backgroundColor:"red"}}>
          <Button
            disabled={(getam == '' || getpm == '')||(

             checkalready(getam,getpm)==true


            )}
            title="Save Record"
            onPress={() => saveitem(this)}
          />
        </View>
      </View>
    </View>
  );
};

const Historyscreen = ({ navigation }) => {
  
  const [gettemplist, settemplist] = useState(historylist);



 navigation.setOptions({
      headerRight: () => (
                <Button
                  color='orange'
                  title="CLEAR"
                  onPress={() => Alert.alert(
                                "You are sure to delete?",
                                "Are you sure to delete the history?",
                      [
                    {
                      text: "Cancel",
                      style: "cancel"
                    },
                    { text: "Yes", onPress: () =>{
                            settemplist([]);
                            historylist = [];
                    }  } 
                  ]
                )}
                />
        )
        
        });




  
  const deletespecificitem = (key) => {
    var newlist = gettemplist.filter((listitem) => listitem.key != key);
    settemplist(newlist);
    historylist = newlist;
  };



  return (
    <View style={styles.container}>
      <View style={styles.recordrow}>
        <Text style={styles.header}> OrgAmount </Text>
        <Text style={styles.header}> Discount% </Text>
        <Text style={styles.header}> Final Amount </Text>
        <Text> </Text>
      </View>
      <ScrollView>
        {gettemplist.map((item) => (
          <TouchableOpacity key={item.key} onPress={() => deletespecificitem(item.key)}>
            <View style={styles.recordrow}>
              <Text style={styles.firstcol}>
                
                {item.OrgAmount}
              </Text>
              <Text style={styles.midcol}>
                
                {item.disc}%
              </Text>
              <Text style={styles.midcol}>
                
                {item.finalamount}
              </Text>
              <Text style={styles.lastcol}> Delete </Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

const Stack = createStackNavigator();
export default function App({ navigation }) {
  const [getdum, setdum] = useState(0);
  return (
    <View style={styles.container}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName={'homescreen'}>
          <Stack.Screen
            name="homescreen"
            component={Homescreen}
            options={({ navigation }) => ({
              headerTitle: 'Discount App',
              headerStyle: {
                backgroundColor: '#659DBD',
                borderWidth: 0,
                color: 'white',
              },

              headerTitleStyle: {
                color: 'white',
              },

              headerRight: () => (
                <Button
                  color="orange"
                  
                  title="HISTORY"
                  onPress={() => navigation.navigate('historyscreen')}
                />
              ),
            })}
          />
          <Stack.Screen
            name="historyscreen"
            component={Historyscreen}
            options={{
              headerTitle: 'History',

              headerStyle: {
                backgroundColor: '#659DBD',
                borderWidth: 0,
                color: 'white',
              },
              headerTitleStyle: {
                color: 'white',
              },
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#659DBD',
    padding: 8,
  },
  textfield: {
    borderColor: 'darkorange',
    borderWidth: 3,

    padding: 8,
    outline: 'none',
    marginTop: 25,
    color: 'white',

    fontSize: 15,

    fontFamily: 'trebuchet MS',
    borderRadius:50
  },
  wrapper: {
    width: '100%',
    padding: 10,
    height: '90%',
  },
  errortext: {
    color: 'white',
    fontSize: 15,
  },
  result: {
    width: '100%',
    backgroundColor: 'orange',
    flexDirection: 'row',
    marginTop: 10,
    justifyContent: 'space-between',
    padding: 10,
    borderRadius:50,
  
  },
  fact: {
    fontSize: 15,
    color: 'white',
    fontFamily: 'trebuchet MS',
  },
  recordrow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    color: 'white',
  },
  header:{
    fontWeight:"bold"
  },
  firstcol:{ lineHeight: 50, marginLeft: '5%' }
  ,midcol:{ lineHeight: 50, marginLeft: '10%' }

,lastcol:{ lineHeight: 50 }
});
