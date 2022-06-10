import EumTransactionType from "types/enums/EumTransactionType";

interface FormProp {
    children?: JSX.Element | JSX.Element[],
    onCancel?: () => void,
    onOk?: (T: any) => void,
    transaction?: EumTransactionType,
    textCancel?: string,
    textOk?: string,
    showCancel?: boolean,
    showOk?: boolean,
    disabled?: boolean,
    titleForm?: string
}


export default FormProp;