'use strict';

/**
  * @description check if object is empty
  * 
  * @param {object} obj
  * @returns {boolean}
  */
const isEmpty = (obj) =>  Object.keys(obj).length === 0;

/**
  * @description check if object is object
  * 
  * @param {object} obj
  * @returns {boolean}
  */
const isObject = (obj) => typeof obj === 'object';

/**
  * @description function turns an object with several levels of nesting
  * into an object with one level of nesting, 
  * where the property is the path
  * 
  * @param {object} obj
  * @returns {object}
  */
const innerPlainify = (object) => {	
	const result = {};
	for (const prop in object) {
		if (!isObject(object[prop]) || isEmpty(object[prop])) {
			result[prop] = object[prop];
			continue;
		}
		const newObj =  innerPlainify(object[prop]);
		for (const newProp in newObj) {
			result[prop + '.' + newProp] = newObj[newProp];
		}
	}
	return result;
};

/**
  * @description if the data is nonnullable and is object 
  * then the function plainify is applied, else return data
  * 
  * @param {*} object
  * @returns {*}
  */
const plainify = (data) => {
	if(!isObject(data) || data === null ){
		return data;
	}
	
	return innerPlainify(data);
};
