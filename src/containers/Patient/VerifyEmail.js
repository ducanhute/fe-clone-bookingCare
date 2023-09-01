import React, { Component } from "react";
import { connect } from "react-redux";
import { postVerifyBookAppointment } from "../../services/userService";
import HomeHeader from "../HomePage/Sections/HomeHeader";
import { FormattedMessage } from "react-intl";
class VerifyEmail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isVerifyEmail: false,
        };
    }
    async componentDidMount() {
        console.log("ditmout verify email");
        if (this.props.location && this.props.location.search) {
            let urlParams = new URLSearchParams(this.props.location.search);
            let token = urlParams.get("token");
            let doctorId = urlParams.get("doctorId");
            let res = await postVerifyBookAppointment({
                doctorId: doctorId,
                token: token,
            });
            if (res && res.errCode === 0) {
                this.setState({
                    isVerifyEmail: true,
                });
            }
        }
    }
    async componentDidUpdate(prevProps, prevState, savedProps) {}
    render() {
        let { isVerifyEmail } = this.state;
        return (
            <div>
                <HomeHeader />
                <div className=" pt-5 mt-5">
                    {!isVerifyEmail && (
                        <h2 className="text-center text-red font-weight-bold">
                            <FormattedMessage id="patient.verify.failure" />
                        </h2>
                    )}
                    {isVerifyEmail && (
                        <h2 className="text-center text-red font-weight-bold">
                            <FormattedMessage id="patient.verify.success" />
                        </h2>
                    )}
                </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(VerifyEmail);
