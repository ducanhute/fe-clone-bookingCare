import React, { Component } from "react";
import { connect } from "react-redux";

class DefaultTemplete extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    async componentDidMount() {}
    async componentDidUpdate(prevProps, prevState, savedProps) {}
    render() {
        return (
            <div>
                <h1>DefaultTemplete</h1>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        language: state.app.language,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(DefaultTemplete);
