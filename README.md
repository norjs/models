# Models for NorJS

Abstracts, factories and utils for implementing model classes in ES6 
JavaScript.

Also includes NorJS concrete model classes, which are also examples
of usage.

--------------------------------------------------------------------------------

## Package usage

### Requirements 

 * Babel 7 with ES6 support (building)
 * Lodash
 * Support for symbols

### Install in your project

```
npm i --save-dev @norjs/models
```

### Import

For eg. `Model`, use:

```js
import { Model } from "@norjs/models";
```

### Run tests

```
npm test
```

--------------------------------------------------------------------------------

## `Model`

The abstract base class for models.

As an abstract class it doesn't work unless you extend from it and define 
missing abstract methods, or use one of our ready to use classes. 

See also:

  * [`InternalObjectModel`](#InternalObjectModel),
  * [`PlainObjectModel`](#PlainObjectModel),
  * [`ShallowCowModel`](#ShallowCowModel),
  * [`Model.create(model)`](#modelcreatemodel)
  * [`Model.deleteProperty(model, key)`](#modeldeletepropertyobj-key),
  * [`Invoice`](#Invoice),
  * [`InvoiceRow`](#InvoiceRow)

You can also compose your own classes a bit by bit using our factory functions:

  * [`InternalObjectModelFactory`](#InternalObjectModelFactory),
  * [`PlainObjectModelFactory`](#PlainObjectModelFactory),
  * [`ShallowCowModelFactory`](#ShallowCowModelFactory)
  * [`InvoiceFactory`](#InvoiceFactory)
  * [`InvoiceRowFactory`](#InvoiceRowFactory)

These factory functions make it possible to swap parts of the implementation,
 or use your own instead.

--------------------------------------------------------------------------------

### `Model.create(model)`

Static, public.

This is a static method which you can use to create a freezed instance of your 
model. 

You need to call it from your own class, of course.

Eg. if your class is `MyModel extends Model`, you'll call it as 
`const model = MyModel.create(...)`

--------------------------------------------------------------------------------

### `Model.deleteProperty(obj, key)`

Static, public.

Delete a property inside the model by a keyword.

**Note!** It is *recommended* to save your keywords as static constants into 
your model class, so user's don't need to use your internal keyword strings or 
symbols to delete properties.

--------------------------------------------------------------------------------

### `Model#valueOf()`

Public.

Returns the internal value for the model. Usually it is an object.

--------------------------------------------------------------------------------

### `Model#getId()`

Abstract, Public.

Returns the unique identifier value for this model instance. (Eg. the primary 
key in a database table.)

--------------------------------------------------------------------------------

### `Model#setId(value)`

Abstract, Public.

Sets the unique identifier value for this model instance. (Eg. the primary 
key in a database table.)

--------------------------------------------------------------------------------

### `Model#constructor(value)`

Protected.

The constructor, which is declared as protected to disable using `new Model()` 
style.

--------------------------------------------------------------------------------

### `Model#_getInternal()`

Returns the internal value for the model. Usually it is an object.

Abstract, protected.

--------------------------------------------------------------------------------

### `Model#_setInternal(value)`

Abstract, Protected.

Sets the internal value of the model. Usually it's an object.

--------------------------------------------------------------------------------

### `Model#_has(key)`

Abstract, Protected.

Returns `true` or `false` depending if a keyword is defined in the model's 
internal value.

See `Model#_get(key)` for more information for the keyword format.

--------------------------------------------------------------------------------

### `Model#_get(key)`

Abstract, Protected.

Returns the value for a property from the model's internal value.

The `key` can be:
 
 * a `symbol` for the value, eg `FOO` for `.valueOf()[FOO]`
 * a `string` with a path to the property, eg. `"foo.bar"` for `.valueOf().foo.bar`
 * an `array` of symbol or string values, eg. `["foo", "bar"]` for `.valueOf().foo.bar`

--------------------------------------------------------------------------------

### `Model#_set(key, value)`

Abstract, Protected.

Sets a value for a property in the model's internal value.

See `Model#_get(key)` for more information for the keyword format.

--------------------------------------------------------------------------------

### `Model#_delete(key)`

Abstract, Protected.

Delete a value for a property in the model's internal value.

See `Model#_get(key)` for more information for the keyword format.

--------------------------------------------------------------------------------

## InternalObjectModel

This is an abstract class extended from `Model` which has implemented 
interface to get and set an internal model value as a plain object.

It implements: 

 * `Model#constructor(value = {})` using `Model#_setInternal(value)`
 * `Model#_getInternal()`
 * `Model#_setInternal(value)`.

It *doesn't* implement:

 * `Model#_has(key)`
 * `Model#_get(key)`
 * `Model#_set(key, value)`
 * `Model#_delete(key)`
 * `Model#getId()`
 * `Model#setId(value)`
 
--------------------------------------------------------------------------------

## InternalObjectModelFactory

This is a factory function which returns a class extending to the 
provided Model class and implementing `Model#_getInternal()` and 
`Model#_setInternal(value)` using a private member variable.

```js
class MyModel extends InternalObjectModelFactory(Model) {
	// ...
}
```

You'll need to implement other abstract methods.

See also [InternalObjectModel](#InternalObjectModel).

--------------------------------------------------------------------------------

## PlainObjectModel

This is an abstract class extended from `InternalObjectModel` which has 
implemented interface to get and set an internal model value as a plain object.

It implements:

 * `Model#_has(key)`
 * `Model#_get(key)`
 * `Model#_set(key, value)`
 * `Model#_delete(key)`

It also implements: 

 * `Model#_getInternal()` (from [InternalObjectModel](#InternalObjectModel))
 * `Model#_setInternal(value)` (from [InternalObjectModel](#InternalObjectModel))

It *doesn't* implement:

 * `Model#getId()`
 * `Model#setId(value)`

--------------------------------------------------------------------------------

## PlainObjectModelFactory

This is a factory function which returns a class extended from the provided 
model class implementing `Model#_has(key)`, `Model#_get(key)`, 
`Model#_set(key, value)` and `Model#_delete(key)`.

It implements them using `Model#_getInternal()` and 
`Model#_setInternal(value)`, which must be implemented in the provided model or 
later in your own class.

```js
class MyModel extends PlainObjectModelFactory(Model) {
	// ...
}
```

See also [PlainObjectModel](#PlainObjectModel) and 
[ShallowCowModel](#ShallowCowModel) for ready to use abstract classes.

--------------------------------------------------------------------------------

## ShallowCowModel

This is a class extended from `PlainObjectModel` which implements 
abstract shallow copy on write model class implementation.

The shallow copy will be made only when there is a write operation and only 
to the parent objects of the modified property.

You can trust that the internal object returned from a call to `#valueOf()` will 
not be modified later (by the model class implementation). It also will not be 
deep copied when returned since this is a *copy-on-**write**, not *copy-on-read* 
implementation.

Later call to `#valueOf()` may return a different object, but only if it was 
modified, and only modified inner objects (and their parents) will point to new 
copies. Eg. a change in a property of `"foo.bar"` doesn't modify a reference of
an object in `"bar.foo"`.

It re-implements:
 
 * `Model#_set(key, value)`
 * `Model#_delete(key)`

It also implements: 

 * `Model#_has(key)` (from [PlainObjectModel](#PlainObjectModel))
 * `Model#_get(key)`  (from [PlainObjectModel](#PlainObjectModel))
 * `Model#_getInternal()` (from [InternalObjectModel](#InternalObjectModel))
 * `Model#_setInternal(value)` (from [InternalObjectModel](#InternalObjectModel))

It *doesn't* implement:

 * `Model#getId()`
 * `Model#setId(value)`
 
--------------------------------------------------------------------------------

## ShallowCowModelFactory

This is a factory function which returns a class extended from the provided 
model class implementing `Model#_set(key, value)` and `Model#_delete(key)`.

It implements them using abstract `Model#_setInternal(value)`, which you need
 to implement.

```js
class MyModel extends ShallowCowModelFactory(Model) {
	// ...
}
```

It doesn't implement: 

 * `Model#_has(key)`
 * `Model#_get(key)`
 * `Model#_getInternal()`
 * `Model#_setInternal(value)`
 * `Model#getId()`
 * `Model#setId(value)`

See also [ShallowCowModel](#ShallowCowModel) for ready to use abstract class.

--------------------------------------------------------------------------------

## Invoice

This is our invoice model class. See 
[the source code](./src/concretes/Invoice.js) 
for updated inline documentation.

## InvoiceFactory

This is our invoice model factory function. See 
[the source code](./src/factories/InvoiceFactory.js) 
for updated inline documentation.

--------------------------------------------------------------------------------

## InvoiceRow

This is our invoice row model class. See 
[the source code](./src/concretes/InvoiceRow.js) 
for updated inline documentation.

## InvoiceRowFactory

This is our invoice row model factory function. See 
[the source code](./src/factories/InvoiceRowFactory.js) 
for updated inline documentation.

--------------------------------------------------------------------------------

## ModelUtils

--------------------------------------------------------------------------------

### `ModelUtils.getPathToProperty(model, key)`

Returns a readable and writable interface to a property inside the model object.

--------------------------------------------------------------------------------

### `ModelUtils.shallowCopyByPath(model, path)`

Returns a new model object with the path shallow copied to the property.

--------------------------------------------------------------------------------
