import React from 'react'
import {connect} from 'react-redux'

const mapStateToProps = state => {
    return {
        articles: state.articles
    }
}

const ConnectedList = ({ asticles }) => {
    return (
        <ul className='list-group list-group-flush'>
            {articles.map(el => {
                return (
                    <li className='list-group-item' key={el.id}>
                        {el.title}
                    </li>
                );
            })}
        </ul>
    )
}
const List = connect(mapStateToProps)(ConnectedList)
export default List
