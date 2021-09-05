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
            selectedType: 'now_playing',
        }
    }

    async componentDidMount() {
        this.fetchData()
    }

    async fetchData() {
        try {
            this.setState({ loading: true, })
            let type = this.state.selectedType ? this.state.selectedType : 'now_playing';
            let response = await fetch(`https://api.themoviedb.org/3/movie/${type}?api_key=4f298a53e552283bee957836a529baec`);
            let data = await response.json();
            let movies = data.results.map(item => {
                return {
                    id: item.id,
                    title: item.title,
                    image: `https://image.tmdb.org/t/p/w500/${item.poster_path}`,
                    date: item.release_date,
                    avgVote: item.vote_average,
                    genres: ''
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
                            }}
                        />
                        <View style={{ width: '100%', padding: 10, }}>
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