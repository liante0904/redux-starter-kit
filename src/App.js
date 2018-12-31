import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as counterActions from './modules/counter';
import * as postActions from './modules/post';

import axios from 'axios';

class App extends Component {
    componentDidMount() {
        // 컴포넌트가 처음 마운트 될 때 현재 number를 postId로 사용하여 포스트 내용을 불러옵니다.
        const { number } = this.props;
        this.getPost(number)
        /*
        axios.get('https://jsonplaceholder.typicode.com/posts/1')
             .then(response => console.log(response.data));
        */
    }
    componentWillReceiveProps(nextProps) {

        const { PostActions } = this.props;

        // 현재 number 와 새로 받을 number 가 다를 경우에 요청을 시도합니다.
        if(this.props.number !== nextProps.number) {
            PostActions.getPost(nextProps.number)
        }
    }
    getPost = async(postId) => {
        const { PostActions } = this.props;

        try {
            await PostActions.getPost(postId);
            console.log('async success!');
        } catch (error) {
            console.log('error!' + error);
        }
    }
    render() {
        const { CounterActions, number, post, error, loading } = this.props;

        return (
            <div>
                <p>{number}</p>
                <button onClick={CounterActions.increment}>+</button>
                <button onClick={CounterActions.decrement}>-</button>
                { loading && <h2>로딩중...</h2>}
                { error 
                    ? <h1>에러발생!</h1> 
                    : (
                        <div>
                            <h1>{post.title}</h1>
                            <p>{post.title}</p>
                        </div>
                    )}
            </div>
        );
    }
}

export default connect(
    (state) => ({
        number: state.counter,
        post: state.post.data,
        loading: state.post.pending,
        error: state.post.error
    }),
    (dispatch) => ({
        CounterActions: bindActionCreators(counterActions, dispatch),
        PostActions: bindActionCreators(postActions, dispatch)
    })
)(App);