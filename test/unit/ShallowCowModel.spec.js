import _ from 'lodash';
import assert from 'assert';
import { ShallowCowModel } from '../../src/abstracts/ShallowCowModel.js';

describe('abstracts', () => {

  describe('ShallowCowModel', () => {

    let model, ModelClass;

    beforeEach(() => {

      class TestModel extends ShallowCowModel {

        get foo () {
          return this._get("foo");
        }

        set foo (value) {
          this._set("foo", value);
        }

        get test () {
          return this._get("test");
        }

        set test (value) {
          this._set("test", value);
        }

      }

      model = TestModel.create();

      ModelClass = TestModel;

    });

    it('can use a getter and setter', () => {
      assert.strictEqual(model.foo, undefined);
      model.foo = "hello";
      assert.strictEqual(model.foo, "hello");
    });

    it('new ModelClass() can assign to undefined properties', () => {
      let model2 = new ModelClass();
      model2.bar = "foo";
    });

    it('cannot assign to undefined properties', () => {
      assert.throws(() => {
        model.bar = "foo";
      });
    });

    it('cannot delete a property with delete', () => {
      assert.strictEqual(model.foo, undefined);
      model.foo = "hello";
      assert.strictEqual(model.foo, "hello");
      delete model.foo;
      assert.strictEqual(model.foo, "hello");
    });

    it('can delete a property with .deleteProperty(key)', () => {
      assert.strictEqual(model.foo, undefined);
      model.foo = "hello";
      assert.strictEqual(model.foo, "hello");
      ModelClass.deleteProperty(model, "foo");
      assert.strictEqual(model.foo, undefined);
      assert.strictEqual(_.has(model.valueOf(), "foo"), false);
    });

    it('has immutable internal value for assign', () => {
      assert.strictEqual(model.foo, undefined);
      model.foo = "hello";

      let modelValue = model.valueOf();
      assert.strictEqual(modelValue.foo, "hello");

      model.foo = "world";
      assert.strictEqual(model.foo, "world");

      assert.strictEqual(modelValue.foo, "hello");
    });

    it('has immutable internal value for .deleteProperty()', () => {
      assert.strictEqual(model.foo, undefined);
      model.foo = "hello";

      let modelValue = model.valueOf();
      assert.strictEqual(modelValue.foo, "hello");

      ModelClass.deleteProperty(model, "foo");
      assert.strictEqual(model.foo, undefined);
      assert.strictEqual(_.has(model.valueOf(), "foo"), false);

      assert.strictEqual(modelValue.foo, "hello");
    });

    it('has shallow copied internal value for .deleteProperty()', () => {
      assert.strictEqual(model.foo, undefined);
      model.foo = "hello";

      const test = {"hello" : "world"};
      Object.freeze(test);

      model.test = test;

      let modelValue = model.valueOf();
      assert.strictEqual(modelValue.foo, "hello");
      assert.strictEqual(modelValue.test.hello, "world");
      assert.strictEqual(modelValue.test, test);

      ModelClass.deleteProperty(model, "foo");
      assert.strictEqual(model.foo, undefined);
      assert.strictEqual(_.has(model.valueOf(), "foo"), false);

      assert.strictEqual(modelValue.foo, "hello");
      assert.strictEqual(modelValue.test.hello, "world");
      assert.strictEqual(modelValue.test, test);
      assert.strictEqual(model.valueOf().test, test);

    });

    it('has shallow copied internal value for assign', () => {
      assert.strictEqual(model.foo, undefined, "initial value must be undefined");
      model.foo = "hello";

      const test = {"hello" : "world"};
      Object.freeze(test);

      model.test = test;

      let modelValue = model.valueOf();
      assert.strictEqual(modelValue.foo, "hello", ".foo must be 'hello'");
      assert.strictEqual(modelValue.test.hello, "world", ".test.hello must be 'world'");
      assert.strictEqual(modelValue.test, test, ".test must be our test object");

      model.foo = "world";
      assert.strictEqual(model.foo, "world", ".foo must be 'world'");
      assert.strictEqual(model.valueOf().foo, "world", ".valueOf().foo must be 'world'");

      assert.strictEqual(modelValue.foo, "hello", ".foo must be 'hello'");
      assert.strictEqual(modelValue.test.hello, "world", ".test.hello must be 'world'");
      assert.strictEqual(modelValue.test, test, ".test must be our test object");
      assert.strictEqual(model.valueOf().test, test, ".valueOf().test must be our test object");

    });

  });

});
