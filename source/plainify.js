'use strict';

const isEmpty = (obj) =>  Object.keys(obj).length === 0;

const isObject = (obj) => typeof obj === 'object';

const innerPlainify = (object) => {	
	let result = {};
	for (const prop in object) {
		if (isObject(object[prop]) && !isEmpty(object[prop])) {
			const newObj =  innerPlainify(object[prop]);
			for (const newProp in newObj) {
				result[prop + '.' + newProp] = newObj[newProp];
			}
		} else { 
			result[prop] = object[prop];
		}
	}
	return result;
};

const plainify = (object) => {
	if(!isObject(object) || object == null ){
		return object;
	}
	
	return innerPlainify(object);
	
};
