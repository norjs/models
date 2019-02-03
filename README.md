# Models for NorJS

Abstracts, factories and utils for implementing classes in ES6 
JavaScript.

Also includes some NorJS concrete model classes, which are also examples
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

For eg. `DataModel`, use:

```js
import { DataModel } from "@norjs/models";
```

### Run tests

```
npm test
```

--------------------------------------------------------------------------------

## `DataModel`

The abstract base class for models.

As an abstract class it does not work unless you extend from it and define 
missing abstract methods, or use one of our ready to use classes. 

See also:

  * [`InternalDataModel`](#InternalDataModel),
  * [`PlainDataModel`](#PlainDataModel),
  * [`ShallowCowDataModel`](#ShallowCowDataModel),
  * [`DataModel.create(model)`](#datamodelcreatemodel)
  * [`DataModel.deleteProperty(model, key)`](#datamodeldeletepropertyobj-key),
  * [`Invoice`](#Invoice),
  * [`InvoiceRow`](#InvoiceRow)

You can also compose your own classes a bit by bit using our factory functions:

  * [`InternalDataModelFactory`](#InternalDataModelFactory),
  * [`PlainDataModelFactory`](#PlainDataModelFactory),
  * [`ShallowCowDataModelFactory`](#ShallowCowDataModelFactory)
  * [`InvoiceFactory`](#InvoiceFactory)
  * [`InvoiceRowFactory`](#InvoiceRowFactory)

These factory functions make it possible to swap parts of the implementation,
 or use your own instead.

--------------------------------------------------------------------------------

### `DataModel.create(model)`

Static, public.

This is a static method which you can use to create a freezed instance of your 
model. 

You need to call it from your own class, of course.

Eg. if your class is `MyData extends DataModel`, you'll call it as 
`const model = MyData.create(...)`

--------------------------------------------------------------------------------

### `DataModel.deleteProperty(obj, key)`

Static, public.

Delete a property inside the model by a keyword.

**Note!** It is *recommended* to save your keywords as static constants into 
your model class, so user's don't need to use your internal keyword strings or 
symbols to delete properties.

--------------------------------------------------------------------------------

### `DataModel#valueOf()`

Public.

Returns the internal value for the model. Usually it is an object.

--------------------------------------------------------------------------------

### `DataModel#getId()`

Abstract, Public.

Returns the unique identifier value for this model instance. (Eg. the primary 
key in a database table.)

--------------------------------------------------------------------------------

### `DataModel#setId(value)`

Abstract, Public.

Sets the unique identifier value for this model instance. (Eg. the primary 
key in a database table.)

--------------------------------------------------------------------------------

### `DataModel#constructor(value)`

Protected.

The constructor, which is declared as protected to disable using `new DataModel
()` 
style.

--------------------------------------------------------------------------------

### `DataModel#_getInternal()`

Returns the internal value for the model. Usually it is an object.

Abstract, protected.

--------------------------------------------------------------------------------

### `DataModel#_setInternal(value)`

Abstract, Protected.

Sets the internal value of the model. Usually it's an object.

--------------------------------------------------------------------------------

### `DataModel#_has(key)`

Abstract, Protected.

Returns `true` or `false` depending if a keyword is defined in the model's 
internal value.

See `DataModel#_get(key)` for more information for the keyword format.

--------------------------------------------------------------------------------

### `DataModel#_get(key)`

Abstract, Protected.

Returns the value for a property from the model's internal value.

The `key` can be:
 
 * a `symbol` for the value, eg `FOO` for `.valueOf()[FOO]`
 * a `string` with a path to the property, eg. `"foo.bar"` for `.valueOf().foo.bar`
 * an `array` of symbol or string values, eg. `["foo", "bar"]` for `.valueOf().foo.bar`

--------------------------------------------------------------------------------

### `DataModel#_set(key, value)`

Abstract, Protected.

Sets a value for a property in the model's internal value.

See `DataModel#_get(key)` for more information for the keyword format.

--------------------------------------------------------------------------------

### `DataModel#_delete(key)`

Abstract, Protected.

Delete a value for a property in the model's internal value.

See `DataModel#_get(key)` for more information for the keyword format.

--------------------------------------------------------------------------------

## InternalDataModel

This is an abstract class extended from `DataModel` which has implemented 
interface to get and set an internal model value as a plain object.

It implements: 

 * `DataModel#constructor(value = {})` using `DataModel#_setInternal(value)`
 * `DataModel#_getInternal()`
 * `DataModel#_setInternal(value)`.

It *does not* implement:

 * `DataModel#_has(key)`
 * `DataModel#_get(key)`
 * `DataModel#_set(key, value)`
 * `DataModel#_delete(key)`
 * `DataModel#getId()`
 * `DataModel#setId(value)`
 
--------------------------------------------------------------------------------

## InternalDataModelFactory

This is a factory function which returns a class extending to the 
provided DataModel class and implementing `DataModel#_getInternal()` and 
`DataModel#_setInternal(value)` using a private member variable.

```js
class MyData extends InternalDataModelFactory(DataModel) {
	// ...
}
```

You'll need to implement other abstract methods.

See also [InternalDataModel](#InternalDataModel).

--------------------------------------------------------------------------------

## PlainDataModel

This is an abstract class extended from `InternalDataModel` which has 
implemented interface to get and set an internal model value as a plain object.

It implements:

 * `DataModel#_has(key)`
 * `DataModel#_get(key)`
 * `DataModel#_set(key, value)`
 * `DataModel#_delete(key)`

It also implements: 

 * `DataModel#_getInternal()` (from [InternalDataModel](#InternalDataModel))
 * `DataModel#_setInternal(value)` (from [InternalDataModel]
 (#InternalDataModel))

It *does not* implement:

 * `DataModel#getId()`
 * `DataModel#setId(value)`

--------------------------------------------------------------------------------

## PlainDataModelFactory

This is a factory function which returns a class extended from the provided 
model class implementing `DataModel#_has(key)`, `DataModel#_get(key)`, 
`DataModel#_set(key, value)` and `DataModel#_delete(key)`.

It implements them using `DataModel#_getInternal()` and 
`DataModel#_setInternal(value)`, which must be implemented in the provided model
 or 
later in your own class.

```js
class MyData extends PlainDataModelFactory(DataModel) {
	// ...
}
```

See also [PlainDataModel](#PlainDataModel) and 
[ShallowCowDataModel](#ShallowCowDataModel) for ready to use abstract classes.

--------------------------------------------------------------------------------

## ShallowCowDataModel

This is a class extended from `PlainDataModel` which implements 
abstract shallow copy on write model class implementation.

The shallow copy will be made only when there is a write operation and only 
to the parent objects of the modified property.

You can trust that the internal object returned from a call to `#valueOf()` will 
not be modified later (by the model class implementation). It also will not be 
deep copied when returned since this *is* a *copy on* ***write***, not 
*copy on read* implementation.

Later call to `#valueOf()` may return a different object, but only if it was 
modified, and only modified inner objects (and their parents) will point to new 
copies. Eg. a change in a property of `"foo.bar"` does not modify a reference of
an object in `"bar.foo"`.

It re-implements:
 
 * `DataModel#_set(key, value)`
 * `DataModel#_delete(key)`

It also implements: 

 * `DataModel#_has(key)` (from [PlainDataModel](#PlainDataModel))
 * `DataModel#_get(key)`  (from [PlainDataModel](#PlainDataModel))
 * `DataModel#_getInternal()` (from [InternalDataModel](#InternalDataModel))
 * `DataModel#_setInternal(value)` (from [InternalDataModel]
 (#InternalDataModel))

It *does not* implement:

 * `DataModel#getId()`
 * `DataModel#setId(value)`
 
--------------------------------------------------------------------------------

## ShallowCowDataModelFactory

This is a factory function which returns a class extended from the provided 
model class implementing `DataModel#_set(key, value)` and `DataModel#_delete(key)`.

It implements them using abstract `DataModel#_setInternal(value)`, which you need
 to implement.

```js
class MyData extends ShallowCowDataModelFactory(DataModel) {
	// ...
}
```

It does not implement: 

 * `DataModel#_has(key)`
 * `DataModel#_get(key)`
 * `DataModel#_getInternal()`
 * `DataModel#_setInternal(value)`
 * `DataModel#getId()`
 * `DataModel#setId(value)`

See also [ShallowCowDataModel](#ShallowCowDataModel) for ready to use abstract 
class.

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

## DataModelUtils

--------------------------------------------------------------------------------

### `DataModelUtils.getPathToProperty(model, key)`

Returns a readable and writable interface to a property inside the model object.

--------------------------------------------------------------------------------

### `DataModelUtils.shallowCopyByPath(model, path)`

Returns a new model object with the path shallow copied to the property.

--------------------------------------------------------------------------------
