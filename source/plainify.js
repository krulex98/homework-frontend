'use strict';

const isEmpty = (obj) => {
	return Object.keys(obj).length === 0;
}

const isObject = (obj) => {
	return typeof obj == "object";
}

const innerPlainify = (data, level, result) => {
	for(const prop in data){
		const newLevel = level + prop;
		if(isObject(data[prop]) && !isEmpty(data[prop])){
			innerPlainify(data[prop], newLevel + '.', result);
		} else {			
			result[newLevel] = data[prop];
		}
	}
};

const plainify = (data) => {
	if(!isObject(data) || data == null ){
		return data;
	}

	let res = {};
	innerPlainify(data, "", res);
	return res;
}