import { rndSalt } from '../../services/utils';

export enum ENotification {
    Success,
    Error,
}

class NoteModel {
    public msg: string;
    public type: ENotification;
    public id: string;

    constructor(msg: string, type: ENotification = ENotification.Success) {
        this.msg = msg;
        this.type = type;
        this.id = msg + rndSalt();
    }
}

export default NoteModel;
