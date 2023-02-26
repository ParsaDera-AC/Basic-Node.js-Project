// @ts-nocheck

import AbstractEntity from './AbstractEntity';

import {ObjectModel,StringModel,NumberModel,ArrayModel,BooleanModel,Required,ModelValue,_getPropertyModel} from '@hilla/form';

import {Email,Null,NotNull,NotEmpty,NotBlank,AssertTrue,AssertFalse,Negative,NegativeOrZero,Positive,PositiveOrZero,Size,Past,Future,Digits,Min,Max,Pattern,DecimalMin,DecimalMax} from '@hilla/form';

/**
 * This module is generated from com.example.application.data.entity.AbstractEntity.
 * All changes to this file are overridden. Please consider to make changes in the corresponding Java file if necessary.
 * @see {@link file:///H:/Coding%20Projects/Ski%20Patrol/Basic-Node.js-Project/src/main/java/com/example/application/data/entity/AbstractEntity.java}
 */
export default class AbstractEntityModel<T extends AbstractEntity = AbstractEntity> extends ObjectModel<T> { 
  static createEmptyValue: () => AbstractEntity;

  get id(): StringModel {
    return this[_getPropertyModel]('id', StringModel, [true]);
  }
}
