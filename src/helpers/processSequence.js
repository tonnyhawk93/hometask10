import Api from '../tools/api';
import {allPass, prop, compose, length, lt, gt, test, split, tap, join, toString, filter, invoker, tryCatch, lensProp, andThen, otherwise, over, ifElse} from 'ramda';
const api = new Api();
const getValue = prop('value');
const convert = api.get('https://api.tech/numbers/base');
const toBinary = value => ({from: 10, to: 2, number: value});
const lessThan10 = gt(10);
const toArray = compose(filter(el => el !== '"'), split(''));
const greaterThan2 = lt(2);
const isLengthLessThan10 = compose(lessThan10, length);
const isLengthGreaterThan2 = compose(greaterThan2, length);
const isAllCharIsNumbers = test(/^[1-9]+(.)?\d+$/);
const toStr = join('');
const pow = n => n ** 2;
const isNumeric = compose(isAllCharIsNumbers, toStr);
const getValueLens = lensProp('value');
const setValue = over(getValueLens);
const toRoundedNumber = compose(Math.round, parseFloat)
const setValuetoRoundedNumber = setValue(toRoundedNumber);
const getSumbolCount = compose(length, toArray, toString);
const setValuetoSumbolCount = setValue(getSumbolCount);
const restOfDivision3 = num => num % 3
const setValuetoPow = setValue(pow);
const setValuetorestOfDivision3 = setValue(restOfDivision3);
const getResult = prop('result');
const handleError = invoker(1, 'handleError');
const setValuetoBinary = async (obj) => {
    const {handleError} = obj;
    try {
        let binary = await getResult(await convert(toBinary(obj.value)))
        return setValue(()=>binary)(obj);
    } catch (error) {
        handleError(error)
        return Promise.reject()
    }    
}
const getAnimal = async (obj) => {
    let res = await api.get(`https://animals.tech/${obj.value}`, {});
    let animal = getResult(res)
    return setValue(()=>animal)(obj);
}

const success = ({value, handleSuccess}) => {
    handleSuccess(value)
}


const validator = allPass([
    isNumeric,
    isLengthLessThan10,
    isLengthGreaterThan2
])
const validate = compose (
    validator,
    toArray,
    getValue
)
const logValue = ({writeLog, value}) => {
    writeLog(value);
}
const app = compose(
    andThen(success),
    andThen(getAnimal),
    andThen(tap(logValue)),
    andThen(setValuetorestOfDivision3),
    andThen(tap(logValue)),
    andThen(setValuetoPow),
    andThen(tap(logValue)),
    andThen(setValuetoSumbolCount),
    andThen(tap(logValue)),
    setValuetoBinary,
    tap(logValue),
    setValuetoRoundedNumber
)
const validation = ifElse(
    validate,
    app,
    tap(handleError('ValidationError'))
)
const processSequence = compose(
    validation,
    tap(logValue)
)
export default processSequence;

