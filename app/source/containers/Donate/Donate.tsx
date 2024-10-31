import React from 'react';

import './Donate.less';

class Donate extends React.PureComponent {
    renderPayPalButton() {
        return (
            <form action="https://www.paypal.com/cgi-bin/webscr" method="post" target="_top">
                <input type="hidden" name="cmd" value="_s-xclick" />
                <input type="hidden" name="hosted_button_id" value="7YZCZ88DK8RP4" />
                <input
                    type="image"
                    src="https://www.paypalobjects.com/en_US/i/btn/btn_donate_LG.gif"
                    name="submit"
                    title="PayPal - The safer, easier way to pay online!"
                    alt="Donate with PayPal button"
                />
                <img alt="" src="https://www.paypal.com/en_US/i/scr/pixel.gif" width="1" height="1" />
            </form>
        );
    }

    render() {
        return (
            <div className='donate-wrapper'>
                <div className='donate-button-container'>
                    {this.renderPayPalButton()}
                </div>
                ☕️ Buy coffee to the plugin developer 😀👍
            </div>
        )
    }
}

export default Donate;
