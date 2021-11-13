import {curry, allPass, all, values, anyPass, complement, prop, equals, compose, filter, length, lt} from 'ramda';
const getStarColor = prop('star');
const getSquareColor = prop('square');
const getTriangleColor = prop('triangle');
const getCircleColor = prop('circle');
const isColorRed = equals('red');
const isColorGreen = equals('green');
const isColorBlue = equals('blue');
const isColorOrange = equals('orange');
const isColorWhite = equals('white');
const isColorNotWhite = complement(isColorWhite);
const isColorNotRed = complement(isColorRed);
const isColorNotRedAndWhite = allPass([isColorNotWhite, isColorNotRed])
const isStarRed = compose(isColorRed, getStarColor);
const isSquareGreen = compose(isColorGreen, getSquareColor);
const isTriangleWhite = compose(isColorWhite, getTriangleColor);
const isTriangleNotWhite = compose(isColorNotWhite, getTriangleColor);
const isTriangleGreen = compose(isColorGreen, getTriangleColor);
const isCircleWhite = compose(isColorWhite, getCircleColor);
const isCircleBlue = compose(isColorBlue, getCircleColor);
const isSquareOrange = compose(isColorOrange, getSquareColor);
const greaterThenOne = curry(lt)(1);
const lengthOfGreen = compose(length, filter(isColorGreen), values);
const lengthOfRed = compose(length, filter(isColorRed), values);
const lengthOfBlue = compose(length, filter(isColorBlue), values);
const lengthOfOrange = compose(length, filter(isColorOrange), values);
const greaterThenTwo = curry(lt)(2);
const lengthOfGreenGTTwo = compose(greaterThenTwo, lengthOfGreen);
const lengthOfGreenEQTwo = compose(equals(2), lengthOfGreen);
const lengthOfRedGTTwo = compose(greaterThenTwo, lengthOfRed);
const lengthOfRedEQ1 = compose(equals(1), lengthOfRed);
const lengthOfBlueGTTwo = compose(greaterThenTwo, lengthOfBlue);
const lengthOfOrangeGTTwo = compose(greaterThenTwo, lengthOfOrange);
const greaterThenZero = curry(lt)(0);
const lengthOfGreenGreaterThenOne = compose(greaterThenOne, lengthOfGreen);
const lengthOfRedGreaterThenZero = compose(greaterThenZero, lengthOfRed);
const lengthOfBlueGreaterThenZero = compose(greaterThenZero, lengthOfBlue);
const countRedEqualsBlue = obj => lengthOfRed(obj) === lengthOfBlue(obj);
const isTriangleColorEqualsSquareColor = obj => getTriangleColor(obj) === getSquareColor(obj);



export const validateFieldN1 = allPass([isStarRed, isSquareGreen, isTriangleWhite, isCircleWhite]);

export const validateFieldN2 = compose(greaterThenOne, length, filter(isColorGreen), values);

export const validateFieldN3 = allPass([countRedEqualsBlue])

export const validateFieldN4 = allPass([isCircleBlue, isStarRed, isSquareOrange]);

export const validateFieldN5 = anyPass([lengthOfGreenGTTwo,lengthOfRedGTTwo,lengthOfBlueGTTwo,lengthOfOrangeGTTwo])

export const validateFieldN6 = allPass([lengthOfRedEQ1, lengthOfGreenEQTwo, isTriangleGreen])

export const validateFieldN7 = compose(all(isColorOrange), values);

export const validateFieldN8 = compose(isColorNotRedAndWhite, getStarColor);

export const validateFieldN9 = compose(all(isColorGreen), values);

export const validateFieldN10 = allPass([isTriangleColorEqualsSquareColor ,isTriangleNotWhite])
