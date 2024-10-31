import React from 'react';
import { t } from "../../services/i18n";

interface IProps {
    show?: boolean;
    inline?: boolean;
    className?: string
}

const Loading = (props: IProps) => {
    if (props.show === true || props.show === undefined) {
        if (props.inline) {
            return (
                <span className={props.className}>
                    {t('loading')}
                </span>
            );
        }
        return (
            <div className={props.className}>
                {t('loading')}
            </div>
        );
    }
    return null;
};

export default Loading;
