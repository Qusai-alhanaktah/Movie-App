import React, { Component } from 'react';
import {
    View,
    Text,
    Image,
    FlatList,
    TouchableOpacity,
    ActivityIndicator,
} from 'react-native';
import { API_URL, API_KEY, GENRES } from '../env.json';
import RNSpeedometer from 'react-native-speedometer';

const labels = [
    {
        name: '',
        labelColor: '#ff2900',
        activeBarColor: '#ff2900',
    },
    {
        name: '',
        labelColor: '#ff5400',
        activeBarColor: '#ff5400',
    },
    {
        name: '',
        labelColor: '#f4ab44',
        activeBarColor: '#f4ab44',
    },
    {
        name: '',
        labelColor: '#f2cf1f',
        activeBarColor: '#f2cf1f',
    },
    {
        name: '',
        labelColor: '#14eb6e',
        activeBarColor: '#14eb6e',
    },
    {
        name: '',
        labelColor: '#00ff6b',
        activeBarColor: '#00ff6b',
    },
]

class Home extends Component {
    constructor(props) {
        super(props)

        this.state = {
            loading: true,
            refreshing: false,
            movies: [],
            selectedType: 'now_playing',
        }
    }

    async componentDidMount() {
        this.fetchData();
    }
    handleRefresh = () => {
        this.setState({
            selectedType: 'now_playing',
        }, () => {
            this.fetchData();
        })
    }
    fetchData = async () => {
        try {
            this.setState({ loading: true, })
            let type = this.state.selectedType ? this.state.selectedType : 'now_playing';
            let response = await fetch(`${API_URL}/movie/${type}?api_key=${API_KEY}`);
            let data = await response.json();
            let movies = data.results.map(item => {
                let genres = []
                GENRES.forEach(genre => item.genre_ids.includes(genre.id) ? genres.push(genre.name) : '');
                return {
                    id: item.id,
                    title: item.title,
                    image: `https://image.tmdb.org/t/p/w500/${item.poster_path}`,
                    date: item.release_date,
                    avgVote: item.vote_average,
                    genres: genres ? genres[0] : ''
                }
            })
            this.setState({ movies, }, () => this.setState({ loading: false, }));
        } catch (error) {
            console.error(error);
        }
    }

    render() {
        let {
            loading,
            movies,
            selectedType,
            refreshing,
        } = this.state;
        if (loading) {
            return (
                <View style={{
                    flex: 1,
                    backgroundColor: 'white',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}>
                    <ActivityIndicator size="large" />
                </View>
            )
        }
        return (
            <FlatList
                data={movies}
                numColumns={2}
                keyExtractor={(item, index) => index.toString()}
                refreshing={refreshing}
                onRefresh={this.handleRefresh}
                contentContainerStyle={{
                    paddingBottom: 50,
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
                ListHeaderComponent={() => (
                    <View style={{
                        flexDirection: 'row',
                        justifyContent: 'space-around',
                        alignItems: 'center',
                        marginVertical: 10,
                    }}>
                        <TouchableOpacity
                            style={{ paddingHorizontal: 5, }}
                            onPress={() => this.setState({ selectedType: selectedType == 'upcoming' ? '' : 'upcoming' }, () => this.fetchData())}
                        >
                            <Text style={{ fontSize: 14, padding: 10, borderRadius: 3, fontWeight: 'bold', color: 'white', backgroundColor: selectedType == 'upcoming' ? '#1dbeca' : 'black', }}>Upcoming</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={{ paddingHorizontal: 5, }}
                            onPress={() => this.setState({ selectedType: selectedType == 'popular' ? '' : 'popular' }, () => this.fetchData())}
                        >
                            <Text style={{ fontSize: 14, padding: 10, borderRadius: 3, fontWeight: 'bold', color: 'white', backgroundColor: selectedType == 'popular' ? '#1dbeca' : 'black', }}>Popular</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={{ paddingHorizontal: 5, }}
                            onPress={() => this.setState({ selectedType: selectedType == 'top_rated' ? '' : 'top_rated' }, () => this.fetchData())}
                        >
                            <Text style={{ fontSize: 14, padding: 10, borderRadius: 3, fontWeight: 'bold', color: 'white', backgroundColor: selectedType == 'top_rated' ? '#1dbeca' : 'black', }}>Top Rated</Text>
                        </TouchableOpacity>
                    </View>
                )}
                ListHeaderComponentStyle={{
                    width: '100%',
                }}
                renderItem={({ item, index }) => (
                    <TouchableOpacity
                        style={{
                            width: '48%',
                            alignItems: 'center',
                            elevation: 5,
                            borderRadius: 5,
                            backgroundColor: 'white',
                            margin: 3,
                            paddingVertical: 5,
                        }}
                        onPress={() => this.props.navigation.navigate('Show', { id: item.id })}
                    >
                        <Image
                            source={{ uri: item.image }}
                            style={{
                                width: 150,
                                height: 200,
                                borderRadius: 10,
                                marginTop: 10,
                                marginBottom: 5,
                            }}
                        />
                        <View style={{ width: '100%', paddingHorizontal: 5, flexDirection: 'row', }}>
                            <Text style={{ fontSize: 10, fontWeight: 'bold' }}>{item.title}</Text>
                        </View>
                        <View style={{
                            width: '100%',
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            alignItems: 'flex-end',
                            paddingBottom: 5,
                        }}>
                            <View style={{ marginLeft: 5, alignSelf: 'flex-end', }}>
                                <Text style={{ fontWeight: 'bold', fontSize: 10, color: 'gray', }}>{item.genres}</Text>
                                <Text style={{ fontWeight: 'bold', fontSize: 10, color: 'gray', }}>{item.date}</Text>
                            </View>
                            <View
                                style={{
                                    paddingRight: 5,
                                    paddingBottom: 5,
                                }}
                            >
                                <RNSpeedometer
                                    maxValue={10}
                                    value={item.avgVote}
                                    allowedDecimals={1}
                                    size={30}
                                    labels={labels}
                                    labelStyle={{
                                        fontSize: 7,
                                    }}
                                />
                            </View>
                        </View>
                    </TouchableOpacity>
                )}
            />
        )
    }
}

export default Home;