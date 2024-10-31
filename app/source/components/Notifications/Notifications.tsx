import React from 'react';
import NanoEvents from 'nanoevents';
import NoteModel, { ENotification } from './NoteModel';
import Note from './Note';

const emitter = new NanoEvents();

const SEND_NOTIFICATION = 'SEND_NOTIFICATION';

export const sendNotification = (msg: string, type: ENotification = ENotification.Success) => {
    emitter.emit(SEND_NOTIFICATION, new NoteModel(msg, type));
};

interface IProps {}
interface IState {
    messages: NoteModel[];
}

class Notifications extends React.PureComponent<IProps, IState> {
    state = {
        messages: [],
    };

    componentDidMount(): void {
        emitter.on(SEND_NOTIFICATION, this.handleMessage);
    }

    handleMessage = (note) => {
        this.setState(prevState => ({
            messages: [
                ...prevState.messages,
                note,
            ],
        }));
        setTimeout(() => {
            this.setState(prevState => ({
                messages: prevState.messages.filter(item => item !== note),
            }));
        }, 5000);
    };

    render() {
        return (
            <React.Fragment>
                {this.state.messages.map((item: NoteModel, index: number) => (
                    <Note data={item} index={index} key={item.id} />
                ))}
            </React.Fragment>
        );
    }
}

export default Notifications;
