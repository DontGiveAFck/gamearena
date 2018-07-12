import React from 'react'
import PropTypes from 'prop-types'

const InlineError = (props) => (
    <span style={{ color: '#ae5856' }}>
        {props.text}
    </span>
)

InlineError.propTypes = {
    text: PropTypes.string.isRequired
}

export default InlineError
