import React, { useState } from 'react';
import styles from 'components/createContact/addHistory/AddHistory.module.scss';
import { HeadingH2 } from 'components/headingH2/headingH2';
import { DatePicker } from 'components/datePicker/DatePicker';
import { TextAreaField } from 'components/textAreaField/TextAreaField';
import { ContactEditStore } from 'store/ContactEditStore';
import { observer } from 'mobx-react';
import moment, { Moment } from 'moment';
import { ReactComponent as Add } from 'common/assets/icon/add.svg';
import { ReactComponent as Delete } from 'common/assets/icon/delete.svg';
import { ButtonImage } from 'components/buttonImage/ButtonImage';

interface AddHistoryProps {
    contactEditStore: ContactEditStore;
}

export const AddHistory = observer(({ contactEditStore }: AddHistoryProps) => {
    const [fieldDate, setFieldDate] = useState(new Date());
    const [fieldComment, setFieldComment] = useState<string>('');

    return (
        <div className={styles.addHistory}>
            <HeadingH2 title='Добавление истории событий' />
            <div className={styles.header}>
                <DatePicker date={fieldDate} handleChange={handleDate} />
                <div className={styles.headerContent}>
                    <TextAreaField
                        value={fieldComment}
                        changeHandler={handleTextArea}
                        name='historyComment'
                        placeHolder='Комментарий к истории'
                        className={styles.fieldArea}
                    />
                    <ButtonImage
                        onClick={onClickAddHistory}
                        image={<Add />}
                        onlyImage={true}
                        className={styles.iconAdd}
                        variant='add'
                        isDisabled={!fieldDate || fieldComment.length === 0}
                    />
                </div>
            </div>
            <div className={styles.historyList}>
                {contactEditStore.historyList.map((history) => (
                    <div key={history.id} className={styles.row}>
                        <div className={styles.historyDate}>{moment(history.date).format('lll')}</div>
                        <div className={styles.historyComment}>{history.historyComment}</div>
                        <div className={styles.iconActions}>
                            <div role='presentation' onClick={() => handleDelete(history.id)}>
                                <Delete />
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );

    function handleDate(date: Moment | null) {
        if (date) {
            setFieldDate(date.toDate());
        }
    }

    function handleTextArea(e: React.ChangeEvent<HTMLTextAreaElement>) {
        setFieldComment(e.target.value);
    }

    function onClickAddHistory(): void {
        contactEditStore.setHistoryList(fieldDate, fieldComment);
        setFieldDate(new Date());
        setFieldComment('');
    }

    function handleDelete(number: string) {
        contactEditStore.deleteFromHistoryList(number);
    }
});
