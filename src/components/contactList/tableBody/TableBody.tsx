import React from "react";
import styles from "./TableBody.module.scss";
import { ContactListStore } from "store/ContactListStore";
import { ReactComponent as IconBellActive } from "common/assets/icon/bellActive.svg";
import { ReactComponent as IconPerson } from "common/assets/icon/iconPerson.svg";
import { ReactComponent as IconPersonTie } from "common/assets/icon/iconPersonTie.svg";
import { ReactComponent as IconPrint } from "common/assets/icon/iconPrint.svg";
import { observer } from "mobx-react";
import { NoRecords } from "components/noRecords/NoRecords";
import { ContactListSkeleton } from "components/skeletons/ContactListSkeleton";

interface TableBodyProps {
    contactStore: ContactListStore;
    handleClickOnContact: (id: number) => void;
}

/**
 * @description Тело таблицы.
 */
export const TableBody = observer(({ contactStore, handleClickOnContact }: TableBodyProps) => {
        const moment = require("moment");

        if (contactStore.isLoading) {
            return <ContactListSkeleton />;
        }

        return (<div className={styles.tableBody}>
                {contactStore.contactList.length !== 0 ?
                    contactStore.contactList.map((contact) => (
                        <div className={styles.tableBodyRow}
                             id={contact.id.toString()}
                             key={contact.id}
                             onClick={() => handleClickOnContact(contact.id)}
                             role={"presentation"}>
                            <div className={styles.name}>
                                {contact.organization.length
                                    ? < div className={styles.iconTie}><IconPersonTie /></div>
                                    : < div className={styles.iconPerson}><IconPerson /></div>
                                }
                                <div className={styles.information}>
                                    <div className={styles.organization}>{contact.organization}</div>
                                    <div className={styles.contactFace}>{contact.contactFace}</div>
                                </div>
                            </div>
                            <div className={styles.contacts}>
                                <div className={styles.phone}>
                                    {contact.phoneList.length
                                        ? contact.phoneList[0].number
                                        : null}
                                </div>
                                <div className={styles.email}>
                                    {contact.emailList.length
                                        ? contact.emailList[0].email
                                        : null
                                    }
                                </div>
                            </div>
                            <div className={styles.products}>
                                {contact.productList.length !== 0
                                    ? <div className={styles.iconActive}><IconPrint /></div>
                                    : null}
                                {contact.productListArchive.length !== 0
                                    ? <div className={styles.iconArchive}><IconPrint /></div>
                                    : null}
                            </div>
                            <div className={styles.reminder}>
                                {contact.reminder?.bell ?
                                    <div className={styles.reminderWrapper}>
                                        {<IconBellActive />}{moment(contact.reminder.date).format("lll")}
                                    </div> :
                                    null}
                            </div>
                        </div>
                    )) :
                    <NoRecords text="Записей нет" variantFontSize="large" variantAlign="center" />
                }
            </div>
        );
    })
;