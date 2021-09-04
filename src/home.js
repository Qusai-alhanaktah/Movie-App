import React, { Component } from 'react';
import {
    View,
    Text,
    Image,
    FlatList,
    TouchableOpacity,
    ActivityIndicator,
} from 'react-native';

class Home extends Component {
    constructor(props) {
        super(props)

        this.state = {
            loading: true,
            movies: [],
            selectedType: '',
        }
    }

    async componentDidMount() {
        let response = await fetch('https://api.themoviedb.org/3/movie/top_rated?api_key=4f298a53e552283bee957836a529baec');
        let data = await response.json();
        let movies = data.results.map(item => {
            return {
                title: item.title,
                image: `https://image.tmdb.org/t/p/w500/${item.poster_path}`,
                date: item.release_date,
                avgVote: item.vote_average,
                genres: ''
            }
        })
        this.setState({ movies, }, () => this.setState({ loading: false, }));
    }

    render() {
        let {
            loading,
            movies,
            selectedType,
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
                contentContainerStyle={{
                    paddingBottom: 50,
                    paddingTop: 10,
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
                ListHeaderComponent={() => (
                    <View style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        marginHorizontal: 30,
                        marginBottom: 5,
                    }}>
                        <TouchableOpacity
                            style={{ padding: 5, }}
                            onPress={() => this.setState({ selectedType: selectedType == 'Upcoming' ? '' : 'Upcoming' })}
                        >
                            <Text style={{ fontSize: 14, padding: 10, borderRadius: 3, fontWeight: 'bold', color: selectedType == 'Upcoming' ? 'white' : 'black', backgroundColor: selectedType == 'Upcoming' ? '#1dbeca' : '', }}>Upcoming</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={{ padding: 5, }}
                            onPress={() => this.setState({ selectedType: selectedType == 'Popular' ? '' : 'Popular' })}
                        >
                            <Text style={{ fontSize: 14, padding: 10, borderRadius: 3, fontWeight: 'bold', color: selectedType == 'Popular' ? 'white' : 'black', backgroundColor: selectedType == 'Popular' ? '#1dbeca' : '', }}>Popular</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={{ padding: 5, }}
                            onPress={() => this.setState({ selectedType: selectedType == 'Top rated' ? '' : 'Top rated' })}
                        >
                            <Text style={{ fontSize: 14, padding: 10, borderRadius: 3, fontWeight: 'bold', color: selectedType == 'Top rated' ? 'white' : 'black', backgroundColor: selectedType == 'Top rated' ? '#1dbeca' : '', }}>Top rated</Text>
                        </TouchableOpacity>
                    </View>
                )}
                ListHeaderComponentStyle={{
                    width: '100%',
                }}
                renderItem={({ item, index }) => (
                    <TouchableOpacity
                        style={{
                            width: '50%',
                            alignItems: 'center',
                        }}
                    >
                        <Image
                            source={{ uri: item.image }}
                            style={{
                                width: 170,
                                height: 200,
                                borderRadius: 10,
                                marginVertical: 5,
                            }}
                        />
                        <View style={{ width: '100%', paddingHorizontal: 10, }}>
                            <Text style={{ fontWeight: 'bold', }}>{item.avgVote}</Text>
                            <Text style={{ fontSize: 10, paddingVertical: 5, }}>{item.title}</Text>
                            <Text style={{ fontWeight: 'bold', fontSize: 10, color: 'gray' }}>{item.date}</Text>
                        </View>
                    </TouchableOpacity>
                )}
            />
        )
    }
}

export default Home;