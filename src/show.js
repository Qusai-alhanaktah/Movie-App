import React, { Component } from 'react'
import {
    ActivityIndicator,
    Image,
    Text,
    View,
} from 'react-native'

class Show extends Component {
    constructor(props) {
        super(props)

        this.state = {
            loading: true,
            movie: {},
        }
    }
    async componentDidMount() {
        this.setState({ loading: true, });
        let id = this.props.route.params?.id;

        fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=4f298a53e552283bee957836a529baec`)
            .then(response => response.json())
            .then(movie => {
                movie.image = `https://image.tmdb.org/t/p/w500/${movie.poster_path}`;
                fetch(`https://api.themoviedb.org/3/movie/${id}/credits?api_key=4f298a53e552283bee957836a529baec`)
                    .then(response => response.json())
                    .then(data => {
                        movie.credits = data.cast
                        this.setState({ movie, }, () => this.setState({ loading: false, }));
                    })
                    .catch(e => console.error(e));
            })
            .catch(e => console.error(e));

    }
    render() {
        let {
            loading,
            movie,
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
            <View>
                <View style={{
                    paddingVertical: 10,
                    backgroundColor: 'black',
                    flexDirection: 'row',
                }}>
                    <View style={{
                        width: '46%',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}>
                        <Image
                            source={{ uri: movie.image, }}
                            style={{
                                width: 150,
                                height: 250,
                                borderRadius: 10,
                            }}
                        />
                    </View>
                    <View style={{ width: '4%', }}></View>
                    <View style={{
                        width: '50%',
                    }}>
                        <Text style={{ color: 'white', fontSize: 18, marginVertical: 3, }}>{movie.title}</Text>
                        <Text style={{ color: 'white', fontSize: 11, marginVertical: 3, }}>{movie.genres ? movie.genres[0].name : 'Non-type'} {'.'} {movie.runtime}m</Text>
                        <Text style={{ color: 'gray', fontSize: 10, marginVertical: 3, fontStyle: 'italic', }}>{movie.tagline}</Text>
                        <Text style={{ color: 'white', fontSize: 14, marginVertical: 3, }}>Overview</Text>
                        <Text style={{ color: 'white', fontSize: 9, marginVertical: 3, }}>{movie.overview}</Text>
                    </View>
                </View>
            </View>
        )
    }
}

export default Show