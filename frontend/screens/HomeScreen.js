import React, { useState, useContext, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, TextInput, ScrollView, RefreshControl } from 'react-native';
import axios from 'axios';
import { UserContext } from '../UserProvider.js';
import { useFocusEffect } from '@react-navigation/native';
import DatePicker from 'react-native-datepicker';


export default function HomeScreen({ navigation }) {
    const { user } = useContext(UserContext);
    const [posts, setPosts] = useState([]);
    const [search, setSearch] = useState('');
    const [currentUserPosts, setCurrentUserPosts] = useState(false);
    const [refreshing, setRefreshing] = useState(false);
    const [searchDatePosts, setSearchDatePosts] = useState(false);
    const [searchStartDate, setStartDate] = useState('');
    const [searchEndDate, setEndDate] = useState('');
    const [searchRentRange, setRentRange] = useState('');

    // only call function at first render
    useEffect(() => {
        // fetch all posts
        fetchPosts();
    },[]);

    const fetchPosts = () => {
        axios.post('http://localhost:4000/api/allposts')
        .then((response) => {
            setPosts(response.data);
        })
    }

    useFocusEffect(
      React.useCallback(() => {
        fetchPosts();
      }, [])
    );

    const handleRefresh = () => {
        setRefreshing(true);
        fetchPosts();
        setRefreshing(false);
    }

    const handlePress = (post) => {
        navigation.navigate('Details', { post });
    };

    // item is single post
    const renderPost = ({ item }) => {
        return (
        <TouchableOpacity style={styles.post} onPress={() => handlePress(item)}>
            <View style={styles.rentContainer}>
            <Text style={styles.rent}>{item.rentRange}</Text>
            </View>
            <View style={styles.postDetails}>
            <Text style={styles.postTitle}>{item.title}</Text>
            <Text style={styles.postContent}>
              {item.startDate ? item.startDate.toString().substring(0,10) : ''} - 
              {item.endDate ? item.endDate.toString().substring(0, 10) : ''}
            </Text>

            <Text style={styles.postAuthor}>Posted by: {item.username}</Text>
            </View>
        </TouchableOpacity>
        );
    };

    // fetch filtered posts
    const fetchFilteredPosts = () => {
      
      if (!searchDatePosts) {
        if (searchRentRange != '' && searchEndDate != '' && searchStartDate != ''){
          params = {
            searchStartDate: searchStartDate,
            searchEndDate: searchEndDate,
            searchRentRange: searchRentRange,
          }
          axios.post('http://localhost:4000/api/filteredposts', params)
          .then((response) => {
            console.log("filtered post success");
            setPosts(response.data);
          })
          .catch((error) => {
            console.log(error);
          })
          // we searched by dates, so set this to true
          setSearchDatePosts(true);
        }
        else if(searchRentRange == ''){
          params = {
            searchStartDate: searchStartDate,
            searchEndDate: searchEndDate,
   
          }
          axios.post('http://localhost:4000/api/filteredposts_date', params)
          .then((response) => {
            console.log("filtered post success");
            setPosts(response.data);
          })
          .catch((error) => {
            console.log(error);
          })
          // we searched by dates, so set this to true
          setSearchDatePosts(true);
        }
        else if(searchStartDate == '' && searchEndDate == ''){
          params = {
            searchRentRange: searchRentRange,
   
          }
          axios.post('http://localhost:4000/api/filteredposts_rent', params)
          .then((response) => {
            console.log("filtered post success");
            setPosts(response.data);
          })
          .catch((error) => {
            console.log(error);
          })
          // we searched by dates, so set this to true
          setSearchDatePosts(true);
        }

      }
      else {
        axios.post('http://localhost:4000/api/allposts')
        .then((response) => {
          setPosts(response.data);
        })
        .catch((error) => {
          console.log(error);
        })
        setSearchDatePosts(false);
      }
    }
  
    const filteredPosts = currentUserPosts
        ? posts.filter((post) => post.username === user) // replace with actual user id
        : posts.filter((post) => post.title.toLowerCase().includes(search.toLowerCase()));

    return (
        <View style={styles.container}>
          {/* <View style={styles.header}>
            <View style={{ flexDirection: 'row' }}>
              <Text style={styles.title}>Posts</Text>
              <TouchableOpacity
                style={[styles.postFilter, { alignSelf: 'flex-end' }]}
                onPress={() => setCurrentUserPosts(!currentUserPosts)}
              >
                <Text style={styles.myButton}>
                  {currentUserPosts ? 'Show all posts' : 'Show my posts'}
                </Text>
              </TouchableOpacity>
            </View>
          </View> */}
        <View style={styles.header}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
            <Text style={styles.title}>Posts</Text>
            <TouchableOpacity
                style={[styles.postFilter, { alignSelf: 'flex-end' }]}
                onPress={() => setCurrentUserPosts(!currentUserPosts)}
              >
                <Text style={styles.myButton}>
                  {currentUserPosts ? 'Show all posts' : 'Show my posts'}
                </Text>
              </TouchableOpacity>
          </View>
        </View>

        <TextInput
            placeholder="Search by title/ location"
            style={styles.searchInput}
            onChangeText={(text) => setSearch(text)}
            value={search}
        />
        <DatePicker
        useNativeDriver={false}
        style={{ marginBottom: 10, width: 200 }}
        date={searchStartDate}
        mode="date"
        placeholder="Select start date"
        format="YYYY-MM-DD"
        minDate={new Date()}
        confirmBtnText="Confirm"
        cancelBtnText="Cancel"
        customStyles={{
          dateInput: {
            backgroundColor: 'white',
            borderStyle: 'solid',
            borderWidth: 1,
            borderColor: '#c5c5c5',
            borderRadius: 5,
            alignItems: 'flex-start',
            paddingLeft: 10
          },
          placeholderText: {
            fontSize: 16,
            color: '#c5c5c5',
            fontFamily: 'Avenir',
          }
        }}
        onDateChange={(startDate) => setStartDate(startDate)}
        />
        

        <DatePicker
        useNativeDriver={false}
        style={{ marginBottom: 15, width: 200 }}
        date={searchEndDate}
        mode="date"
        placeholder="Select end date"
        format="YYYY-MM-DD"
        minDate={new Date(searchStartDate)}
        confirmBtnText="Confirm"
        cancelBtnText="Cancel"
        customStyles={{
          dateInput: {
            backgroundColor: 'white',
            borderStyle: 'solid',
            borderWidth: 1,
            borderColor: '#c5c5c5',
            borderRadius: 5,
            alignItems: 'flex-start',
            paddingLeft: 10,
          },
          placeholderText: {
            fontSize: 16,
            color: '#c5c5c5',
            fontFamily: 'Avenir',
          }
        }}
        onDateChange={(endDate) => setEndDate(endDate)}
      />
      
      <TextInput
            placeholder="Search by rent"
            style={styles.searchInput}
            onChangeText={(text) => setRentRange(text)}
            value={searchRentRange}
      />
      
      <TouchableOpacity
            style={styles.filterButton}
            onPress={() => fetchFilteredPosts()}
        >
            <Text style={styles.filterButtonText}>
            {searchDatePosts ? 'Back to all posts' : 'Search'}
            </Text>
        </TouchableOpacity>

        <FlatList 
            nestedScrollEnabled
            refreshControl={<RefreshControl refreshing={refreshing} onRefresh={handleRefresh}/>}
            data={filteredPosts}
            renderItem={renderPost}
            keyExtractor={(item) => item._id.toString()}
            style={styles.list}
        />
        </View>
    );
}

const styles = StyleSheet.create({

  header: {
    paddingVertical: 30,
    paddingHorizontal: 0,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 40,
    backgroundColor: '#f0f0f0',
    justifyContent: 'flex-start',
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#00356B',
    fontFamily: 'Avenir',

  },
  searchInput: {
    height: 40,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#0F4D92',
    paddingHorizontal: 10,
    marginBottom: 15,
    fontFamily: 'Avenir',
  },
  postFilter: {
    backgroundColor: '#00356B',
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginLeft: 10,
    fontFamily: 'Avenir',
  
  },
  myButton:{
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 15,
    textAlign: 'right',
    fontFamily: 'Avenir',
  },
  filterButton: {
    backgroundColor: '#00356B',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  filterButtonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 15,
    fontFamily: 'Avenir',
  },
  list: {
    flex: 1,
  },
  post: {
    backgroundColor: '#FFFFFF',
    fontFamily: 'Avenir',
    padding: 20,
    borderRadius: 5,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#00356B',
    flexDirection: 'row',
    justifyContent: 'space-between', // add this to align rent to right
    alignItems: 'center', // add this to center vertically
  },
  postDetails: {
    flex: 1,
  },
  postRent: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#0F4D92',
    fontFamily: 'Avenir',
    marginRight: 10,
  },
  postTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#00356B',
    fontFamily: 'Avenir',
  },
  postContent: {
    fontSize: 14,
    color: '#555555',
    fontFamily: 'Avenir',
  },
  rentContainer: {
    backgroundColor: '#00356B',
    borderRadius: 5,
    padding: 5,
    marginRight: 10,
  },
  rent: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
    fontFamily: 'Avenir',
  },
  postAuthor: {
    fontFamily: 'Avenir',
  }

});
