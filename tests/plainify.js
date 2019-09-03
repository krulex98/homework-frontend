'use strict';

QUnit.module('Тестируем функцию plainify', function () {
	QUnit.test('plainify работает правильно', function (assert) {
		assert.deepEqual(plainify({foo: 'bar', baz: 42}), {'foo': 'bar', 'baz': 42});

		const nested1 = {
			deep: {
				foo: 'bar',
				baz: 42
			}
		};

		const plain1 = {
			'deep.foo': 'bar',
			'deep.baz': 42
		};

		assert.deepEqual(plainify(nested1), plain1);

		const nested2 = {
			deep: {
				foobar: 0,
				nested: {
					object: {
						fields: {
							foo: 42,
							bar: 42,
							baz: 42
						}
					}
				}
			}
		};

		const plain2 = {
			'deep.foobar': 0,
			'deep.nested.object.fields.foo': 42,
			'deep.nested.object.fields.bar': 42,
			'deep.nested.object.fields.baz': 42
		};

		assert.deepEqual(plainify(nested2), plain2);
	});

	QUnit.test('дополнительные тесты plainify', function (assert) {
		const obj1 = {foo: {}};
		assert.deepEqual(plainify(obj1), obj1);

		const obj2 = {
			foo: {
				bar: {
					object: {}
				},
				kek: {}
			}
		};

		const plain2 = {
			'foo.bar.object': {},
			'foo.kek' : {}
		};

		assert.deepEqual(plainify(obj2), plain2);

		assert.deepEqual(plainify({}), {});

		assert.deepEqual(plainify(null), null);

		assert.deepEqual(plainify(Infinity), Infinity);

		assert.deepEqual(plainify(undefined), undefined);

	});
});
